const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const fs = require('node:fs');
const vm = require('node:vm');
const app = require('../server');
const { createAgent, CARD_FIELDS, COPY, fallbackAnalysis } = require('../src/aiAgent');

let server, base;
const input = { description: 'Студенттерге платформа керек', industry: 'education' };
function answers(language = 'kk') {
  return COPY[language].questions.map((question, index) => ({
    question, field: ['users', 'data', 'expectedResult'][index],
    answer: ['Студенттер', 'CSV материалдары', 'Оқу прототипі'][index]
  }));
}
const post = (url, body, language = 'kk') => fetch(base + url, {
  method: 'POST', headers: { 'Content-Type': 'application/json', 'X-App-Language': language }, body: JSON.stringify(body)
});
before(async () => {
  server = app.createApp(createAgent(null)).listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); });
});

test('health and frontend are served by the same server', async () => {
  assert.deepEqual(await (await fetch(base + '/api/health')).json(), { status: 'ok' });
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /id="language"/);
  assert.match(response.headers.get('content-security-policy'), /script-src 'self'/);
});
for (const language of ['kk', 'ru', 'en']) {
  test(`fallback analysis and task card work in ${language}`, async () => {
    const response = await post('/api/analyze', { ...input, language }, language);
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.mode, 'fallback');
    assert.deepEqual(result.questions, COPY[language].questions);
    assert.equal(result.questions.length, 3);
    const cardResponse = await post('/api/task-card', { ...input, language, answers: answers(language) }, language);
    assert.equal(cardResponse.status, 200);
    const { card } = await cardResponse.json();
    assert.equal(card.users, 'Студенттер');
    assert.equal(card.data, 'CSV материалдары');
    assert.equal(card.expectedResult, 'Оқу прототипі');
    assert.equal(card.contact, '');
    assert.equal(card.constraints, '');
    assert.equal(card.industry, 'education');
  });
}
test('invalid inputs return localized validation errors', async () => {
  for (const body of [null, [], {}, { ...input, description: 42 }, { ...input, description: '  ' }, { ...input, industry: 'invalid' }, { ...input, language: 'fr' }, { ...input, description: 'a'.repeat(5001) }]) {
    const response = await post('/api/analyze', body, 'ru');
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, body === null ? COPY.ru.json : COPY.ru.invalid);
  }
});
test('all 3–4 distinct answers are required', async () => {
  for (const values of [[], answers().slice(0, 1), [...answers().slice(0, 2), { ...answers()[2], answer: ' ' }], [answers()[0], answers()[0], answers()[0]], [{...answers()[0], field: 'unknown'}, ...answers().slice(1)]]) {
    assert.equal((await post('/api/task-card', { ...input, answers: values })).status, 400);
  }
});
test('JSON errors, oversized requests, and foreign origins are rejected', async () => {
  const request = (body, headers = {}) => fetch(base + '/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body });
  assert.equal((await request('{')).status, 400);
  assert.equal((await request(JSON.stringify({ ...input, description: 'x'.repeat(140000) }))).status, 413);
  assert.equal((await request(JSON.stringify(input), { Origin: 'https://example.org' })).status, 400);
});
test('fallback recognizes explicit fields in all supported languages', () => {
  for (const text of ['Қолданушылар: студенттер; Деректер: CSV; Күтілетін нәтиже: прототип', 'Пользователи: студенты; Данные: CSV; Ожидаемый результат: прототип', 'Users: students; Data: CSV; Expected result: prototype']) {
    assert.deepEqual(fallbackAnalysis(text, 'en').missingFields, []);
  }
});
function mockAgent(value, capture = () => {}, finish_reason = 'stop') {
  return createAgent({ chat: { completions: { create: async (request) => {
    capture(request);
    return { choices: [{ finish_reason, message: { content: JSON.stringify(value) } }] };
  } } } });
}
test('valid AI analysis uses strict structured output and the selected language', async () => {
  const response = { summary: 'Details are needed.', missingFields: ['users'], questions: answers('en').map((a) => ({ field: a.field, text: a.question })) };
  let request;
  const result = await mockAgent(response, (value) => { request = value; }).analyzeTask(input.description, input.industry, 'en');
  assert.equal(result.mode, 'ai');
  assert.equal(request.response_format.json_schema.strict, true);
  assert.match(request.messages[0].content, /Write in English/);
});
test('invalid, duplicate, too few and truncated AI questions use fallback', async () => {
  const question = { field: 'users', text: 'Who?' };
  for (const response of [null, {}, {summary:'x',missingFields:[],questions:[question]}, {summary:'x',missingFields:[],questions:[question,question,question]}]) {
    const result = await mockAgent(response).analyzeTask(input.description, input.industry, 'en');
    assert.equal(result.mode, 'fallback');
    assert.equal(result.questions.length, 3);
    assert.equal(result.fallbackReason, 'api_unavailable');
  }
  assert.equal((await mockAgent({}, () => {}, 'length').analyzeTask('x', 'education')).mode, 'fallback');
});
test('AI card accepts known fields and ignores model-supplied industry', async () => {
  const card = Object.fromEntries(CARD_FIELDS.map((field) => [field, '']));
  Object.assign(card, {title:'Study app',context:'Learning',users:'Students',data:'CSV',expectedResult:'Prototype',industry:'untrusted'});
  const result = await mockAgent(card).createTaskCard(input.description, answers(), 'education', 'en');
  assert.equal(result.mode, 'ai');
  assert.equal(result.card.industry, 'education');
});
test('API failures preserve answers to custom questions', async () => {
  const agent = createAgent({ chat: { completions: { create: async () => { throw new Error('Offline'); } } } });
  const result = await agent.createTaskCard('Study app', [{ question: 'What is known?', answer: 'Teachers need help' }], 'education', 'en');
  assert.equal(result.mode, 'fallback');
  assert.match(result.card.context, /Teachers need help/);
});
test('every static UI translation exists in all three languages', () => {
  const source = fs.readFileSync('public/app.js', 'utf8');
  const rows = vm.runInNewContext(source.slice(0, source.indexOf('const locales')) + '; TEXT');
  assert.equal(new Set(rows.map((row) => row[0])).size, rows.length);
  rows.forEach((row) => assert(row.length === 3 && row.every((text) => typeof text === 'string' && text.trim())));
  const keys = new Set(rows.map((row) => row[0]));
  const html = fs.readFileSync('public/index.html', 'utf8');
  for (const [,key] of html.matchAll(/data-i18n(?:-label|-placeholder)?="([^"]+)"/g)) assert(keys.has(key), key);
  assert.doesNotMatch(html, /<style\b|\sstyle=|\sonclick=/i);
  assert.doesNotMatch(source, /innerHTML\s*=/);
});
