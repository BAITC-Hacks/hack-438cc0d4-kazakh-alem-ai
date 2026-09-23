const fs = require('node:fs/promises');
const path = require('node:path');

const collections = ['tasks', 'teams', 'proposals'];

// Бірінші кезеңде тек бос коллекцияларды оқу дайындалған.
async function readCollection(name) {
  if (!collections.includes(name)) {
    throw new Error('Белгісіз дерек коллекциясы.');
  }
  const filePath = path.join(__dirname, '..', 'data', `${name}.json`);
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

module.exports = { readCollection };
