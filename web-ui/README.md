# web-ui

Minimal React + Vite single-page app for managing Library books via the `web-api` backend.

## Requirements

- Node.js (recent LTS or newer)
- npm

## Setup

```bash
cd web-ui
npm install
```

## Run (development)

```bash
npm run dev
```

By default Vite runs on `http://localhost:5173`.

## API configuration

The app talks to the backend API via a configurable base URL defined in `src/config.js`.

- By default it uses `http://localhost:4000`.
- To override, create a `.env` file in `web-ui` with:

```bash
VITE_API_BASE_URL=http://localhost:4000
```

## Typical workflow

1. Start the backend:

   ```bash
   cd web-api
   npm install
   npm start
   ```

2. Start the frontend:

   ```bash
   cd web-ui
   npm install
   npm run dev
   ```

3. Open the browser at `http://localhost:5173` and manage books (create, edit, delete).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
