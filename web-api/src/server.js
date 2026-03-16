const express = require('express');
const cors = require('cors');
const path = require('path');

const { getAllBooks, saveBooks, ensureStorageInitialized } = require('./storage');

const app = express();
const PORT = 4000;

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  })
);

app.get('/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    console.error('Error loading books', err);
    res.status(500).json({ error: 'Failed to load books' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const books = await getAllBooks();
    const book = books.find((b) => String(b.id) === String(req.params.id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error('Error loading book', err);
    res.status(500).json({ error: 'Failed to load book' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author, year, status } = req.body || {};
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const books = await getAllBooks();
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      year: year != null ? year : null,
      status: status || 'available',
    };
    const updated = [...books, newBook];
    await saveBooks(updated);
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error creating book', err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { title, author, year, status } = req.body || {};
    const books = await getAllBooks();
    const idx = books.findIndex((b) => String(b.id) === String(req.params.id));
    if (idx === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const existing = books[idx];
    const updatedBook = {
      ...existing,
      title: title != null ? title : existing.title,
      author: author != null ? author : existing.author,
      year: year !== undefined ? year : existing.year,
      status: status !== undefined ? status : existing.status,
    };
    const updatedBooks = [...books];
    updatedBooks[idx] = updatedBook;
    await saveBooks(updatedBooks);
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const books = await getAllBooks();
    const idx = books.findIndex((b) => String(b.id) === String(req.params.id));
    if (idx === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const updatedBooks = books.filter((b) => String(b.id) !== String(req.params.id));
    await saveBooks(updatedBooks);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting book', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

ensureStorageInitialized()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Library web-api listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize storage', err);
    process.exit(1);
  });

