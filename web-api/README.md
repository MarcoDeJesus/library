# web-api

Minimal Library CRUD web API built with Node.js and Express, using a JSON file for storage.

## Requirements

- Node.js (recent LTS or newer)
- npm

## Setup

```bash
cd web-api
npm install
```

## Run

```bash
npm start
```

The API will be available at `http://localhost:4000`.

## Endpoints

- **GET `/books`** – list all books.
- **GET `/books/:id`** – get a single book by id.
- **POST `/books`** – create a new book.
- **PUT `/books/:id`** – update an existing book.
- **DELETE `/books/:id`** – delete a book.

### Book JSON shape

```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "year": 2024,
  "status": "available"
}
```

`title` and `author` are required. `year` and `status` are optional (status defaults to `"available"`).

