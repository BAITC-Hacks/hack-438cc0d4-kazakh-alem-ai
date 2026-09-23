const express = require('express');
const path = require('node:path');
const { analyzeTask } = require('./src/aiAgent');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/analyze', (req, res) => {
  const { description, industry } = req.body || {};
  if (typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'description бос емес мәтін болуы керек.' });
  }
  if (industry !== undefined && typeof industry !== 'string') {
    return res.status(400).json({ error: 'industry мәтін болуы керек.' });
  }
  return res.json(analyzeTask(description, industry));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON форматы қате.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Сұрау көлемі тым үлкен.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Сервердің ішкі қатесі.' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`AI Sana backend listening on port ${port}`));
}

module.exports = app;
