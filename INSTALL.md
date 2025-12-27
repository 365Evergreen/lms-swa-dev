# Vite Project Setup

This project uses [Vite](https://vitejs.dev/) for fast, modern frontend development with React and Fluent UI.

## Prerequisites
- Node.js (v18+ recommended)
- pnpm (preferred) or yarn

## Project Initialization

To create a new Vite + React + TypeScript project (if starting from scratch):

```bash
pnpm create vite@latest . -- --template react-ts
```

- This initializes the current directory as a Vite project with React and TypeScript.
- If you prefer Yarn:

```bash
yarn create vite . --template react-ts
```

After initializing, install dependencies:

```bash
pnpm install
```

## Development
Start the local dev server:
```bash
pnpm run dev
```

## Build
Create a production build:
```bash
pnpm run build
```

## Test
Run tests (if configured):
```bash
pnpm run test
```

## Notes
- Use pnpm for all package management unless otherwise specified.
- For more project details, see README.md and .github/copilot-instructions.md.
