import { API_BASE_URL } from './config';

async function handleResponse(response) {
  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      if (data && data.error) {
        message = data.error;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }
  return response.json();
}

export async function getBooks() {
  const res = await fetch(`${API_BASE_URL}/books`);
  return handleResponse(res);
}

export async function createBook(book) {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return handleResponse(res);
}

export async function updateBook(id, book) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return handleResponse(res);
}

export async function deleteBook(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}

