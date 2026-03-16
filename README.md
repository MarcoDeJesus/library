## AI Library

This repository contains a small library-themed application composed of two projects:

- **web-api**: A Node.js/Express REST API that serves library data from `web-api/data/library.json`. It exposes endpoints that allow clients to query available books and related information.
- **web-ui**: A React + Vite frontend that consumes the API, providing a modern interface for browsing and searching the library collection.

### Project structure

- `web-api`: Backend service, including:
  - `src/server.js`: Application entry point and HTTP routes.
  - `src/storage.js`: File-backed storage layer for reading library data.
  - `data/library.json`: Sample library dataset.
- `web-ui`: Frontend SPA, including:
  - `src/App.jsx`: Main application UI.
  - `src/api.js`: Client for calling the web API.
  - `src/config.js`: Frontend configuration (e.g., API base URL).

### Getting started

#### Prerequisites

- Node.js LTS (recommended) and npm.

#### Backend (`web-api`)

```bash
cd web-api
npm install
npm run start
```

By default the API listens on the port defined in `web-api/src/server.js` (commonly `http://localhost:3000`).

#### Frontend (`web-ui`)

In a separate terminal:

```bash
cd web-ui
npm install
npm run dev
```

Vite will print a local development URL (commonly `http://localhost:5173`). Make sure the API is running and that the UI's `API_BASE_URL` in `web-ui/src/config.js` points to the correct backend URL.

### Development notes

- This repo currently checks in `web-api/node_modules` as part of the initial snapshot; you can safely delete and regenerate it with `npm install` if desired.
- To create new features or fixes, prefer small, focused commits with descriptive messages, then open pull requests against `main` in `git@github.com:MarcoDeJesus/library.git`.

