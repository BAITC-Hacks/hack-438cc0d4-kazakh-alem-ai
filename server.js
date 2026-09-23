const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const express = require('express');
const aiAgent = require('./src/aiAgent');
const { CARD_FIELDS, COPY, language } = aiAgent;

function createApp(agent = aiAgent) {
  const app = express();
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    req.language = language(req.get('X-App-Language'));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    next();
  });
  app.use(express.json({ limit: '128kb' }));
  app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'POST' && (!req.is('application/json') || (req.get('origin') && req.get('origin') !== `${req.protocol}://${req.get('host')}`))) {
      return res.status(400).json({ error: COPY[req.language].invalid });
    }
    next();
  });
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  app.get('/api/config', (req, res) => res.json({ aiConfigured: Boolean(process.env.OPENAI_API_KEY?.trim()) }));

  function input(req) {
    const body = req.body;
    const validText = (value, max) => typeof value === 'string' && value.trim() && value.length <= max;
    if (!body || Array.isArray(body) || !validText(body.description, 5000) ||
        !['education', 'healthcare', 'retail', 'finance', 'agriculture', 'logistics', 'services', 'other'].includes(body.industry) ||
        (body.language !== undefined && !['kk', 'ru', 'en'].includes(body.language))) throw Object.assign(new Error(), { status: 400 });
    req.language = body.language || req.language;
    return { description: body.description.trim(), industry: body.industry, language: req.language };
  }
  app.post('/api/analyze', async (req, res, next) => {
    try {
      const data = input(req);
      res.json(await agent.analyzeTask(data.description, data.industry, data.language));
    } catch (error) { next(error); }
  });
  app.post('/api/task-card', async (req, res, next) => {
    try {
      const data = input(req);
      const answers = req.body.answers;
      if (!Array.isArray(answers) || answers.length < 3 || answers.length > 4 || answers.some((item) =>
        !item || typeof item.question !== 'string' || !item.question.trim() || item.question.length > 1000 ||
        typeof item.answer !== 'string' || !item.answer.trim() || item.answer.length > 5000 ||
        (item.field !== undefined && !CARD_FIELDS.includes(item.field))) ||
        new Set(answers.map((item) => item.question.trim())).size !== answers.length) throw Object.assign(new Error(), { status: 400 });
      const clean = answers.map((item) => ({ question: item.question.trim(), answer: item.answer.trim(), field: item.field }));
      res.json(await agent.createTaskCard(data.description, clean, data.industry, data.language));
    } catch (error) { next(error); }
  });
  app.use((error, req, res, next) => {
    const copy = COPY[req.language || 'kk'];
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: copy.json });
    if (error.type === 'entity.too.large') return res.status(413).json({ error: copy.large });
    if (error.status === 400) return res.status(400).json({ error: copy.invalid });
    res.status(500).json({ error: copy.error });
  });
  return app;
}
const app = createApp();
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '127.0.0.1';
  app.listen(port, host, () => console.log(`AI Sana: http://${host}:${port}`));
}
module.exports = app;
module.exports.createApp = createApp;
