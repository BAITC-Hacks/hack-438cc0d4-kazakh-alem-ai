const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const app = require('../server');
const { analyzeTask } = require('../src/aiAgent');
const { readCollection } = require('../src/store');
const { calculateRating } = require('../src/rating');

test('fallback identifies missing details without assuming industry facts', () => {
  const result = analyzeTask('Студенттерге арналған платформа керек', 'education');
  assert.deepEqual(result.missingFields, ['users', 'data', 'expectedResult']);
  assert.equal(result.questions.length, 3);
  assert.equal(result.questions[0], 'Шешімді нақты кімдер қолданады?');
  assert.deepEqual(result, analyzeTask('Студенттерге арналған платформа керек', 'finance'));
});

test('explicit details remove missing fields while preserving three questions', () => {
  const result = analyzeTask('Қолданушылар: мұғалімдер. Деректер: CSV бағалар кестесі. Күтілетін нәтиже: прототип.');
  assert.deepEqual(result.missingFields, []);
  assert.equal(new Set(result.questions).size, 3);
});

test('initial storage is empty and rating is unimplemented', async () => {
  for (const name of ['tasks', 'teams', 'proposals']) {
    assert.deepEqual(await readCollection(name), []);
  }
  await assert.rejects(readCollection('../server'), TypeError);
  assert.equal(calculateRating({}), null);
});

test('HTTP endpoints validate requests and return analysis', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });
  const page = await fetch(base);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /id="task-form"/);
  const script = await fetch(`${base}/app.js`);
  assert.equal(script.status, 200);
  assert.match(await script.text(), /fetch\('\/api\/analyze'/);
  assert.equal((await fetch(`${base}/.env`)).status, 404);
  assert.equal((await fetch(`${base}/server.js`)).status, 404);
  const post = (body) => fetch(`${base}/api/analyze`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
  });
  const result = await post(JSON.stringify({ description: 'Студенттерге арналған платформа керек', industry: 'education' }));
  assert.equal(result.status, 200);
  assert.ok((await result.json()).questions.length >= 3);
  for (const invalid of [{}, { description: ' ' }, { description: 123 }, { description: 'Тапсырма', industry: [] }]) {
    assert.equal((await post(JSON.stringify(invalid))).status, 400);
  }
  assert.equal((await post('{broken')).status, 400);
});
