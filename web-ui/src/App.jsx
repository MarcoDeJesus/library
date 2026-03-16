import { useEffect, useState } from 'react';
import './App.css';
import { getBooks, createBook, updateBook, deleteBook } from './api';

function initialForm() {
  return {
    title: '',
    author: '',
    year: '',
    status: 'available',
  };
}

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(initialForm);
    setError('');
  }

  function startEdit(book) {
    setEditingId(book.id);
    setForm({
      title: book.title || '',
      author: book.author || '',
      year: book.year ?? '',
      status: book.status || 'available',
    });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.author.trim()) {
      setError('Title and author are required.');
      return;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      year: form.year === '' ? null : Number(form.year),
      status: form.status || 'available',
    };

    try {
      setLoading(true);
      if (editingId) {
        const updated = await updateBook(editingId, payload);
        setBooks((prev) =>
          prev.map((b) => (b.id === editingId ? updated : b))
        );
      } else {
        const created = await createBook(payload);
        setBooks((prev) => [...prev, created]);
      }
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete book');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Library Books</h1>
      </header>

      <main>
        {loading && <div className="banner banner-info">Loading...</div>}
        {error && <div className="banner banner-error">{error}</div>}

        <section className="layout">
          <div className="panel">
            <div className="panel-header">
              <h2>Books</h2>
              <button type="button" onClick={startCreate}>
                New Book
              </button>
            </div>
            {books.length === 0 ? (
              <p className="empty">No books yet. Add one using the form.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year ?? ''}</td>
                      <td>{book.status || ''}</td>
                      <td className="actions">
                        <button type="button" onClick={() => startEdit(book)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>{editingId ? 'Edit Book' : 'Create Book'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Title *
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Author *
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                />
              </label>
              <label>
                Year
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              </label>
              <label>
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="available">Available</option>
                  <option value="checked_out">Checked out</option>
                </select>
              </label>
              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {editingId ? 'Update Book' : 'Create Book'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={startCreate}
                    className="secondary"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
