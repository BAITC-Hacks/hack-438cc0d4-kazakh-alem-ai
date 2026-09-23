const { readFile } = require('node:fs/promises');
const path = require('node:path');

const collections = new Set(['tasks', 'teams', 'proposals']);

async function readCollection(name) {
  if (!collections.has(name)) throw new TypeError('Unknown collection.');
  const file = path.join(__dirname, '..', 'data', `${name}.json`);
  const records = JSON.parse(await readFile(file, 'utf8'));
  if (!Array.isArray(records)) throw new TypeError('Collection must be an array.');
  return records;
}

module.exports = { readCollection };
