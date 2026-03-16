const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'library.json');

async function ensureStorageInitialized() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    try {
      await fs.access(dataFile);
    } catch {
      await fs.writeFile(dataFile, '[]', 'utf8');
    }
  } catch (err) {
    console.error('Error initializing storage', err);
    throw err;
  }
}

async function getAllBooks() {
  await ensureStorageInitialized();
  try {
    const contents = await fs.readFile(dataFile, 'utf8');
    const parsed = JSON.parse(contents);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Error reading books file', err);
    return [];
  }
}

async function saveBooks(books) {
  await ensureStorageInitialized();
  const json = JSON.stringify(books, null, 2);
  await fs.writeFile(dataFile, json, 'utf8');
}

module.exports = {
  ensureStorageInitialized,
  getAllBooks,
  saveBooks,
};

