# Getting Started

## Requirements

- Node.js 20.19 or newer
- npm

## Install

```bash
git clone https://github.com/tuandds/colony-flow-sand.git
cd colony-flow-sand
npm install
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the game dev server at http://localhost:8080 |
| `npm run build` | Type-check and build the game into `dist/` |
| `npm run preview` | Serve the built game locally |
| `npm run docs:dev` | Start the docs dev server |
| `npm run docs:build` | Build the docs into `docs/.vitepress/dist/` |
| `npm run build:site` | Build the full Pages site (landing + demo + docs) into `_site/` |

## Testing on a phone

Run `npx vite --host`, then open the printed network URL on a phone on the same Wi‑Fi.
