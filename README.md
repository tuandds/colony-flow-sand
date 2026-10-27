# Colony Flow Sand

A sand-swipe ant puzzle prototype

A Phaser 4 + TypeScript prototype. Play it at https://tuandds.github.io/colony-flow-sand/demo/ · docs and Game Design Document at https://tuandds.github.io/colony-flow-sand/docs/.

## Run

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
```

## Releases

The live site is built locally and pushed to the `gh-pages` branch. There is no CI deploy.

```bash
npm run release:latest                  # after pushing main: update https://tuandds.github.io/colony-flow-sand/
npm version minor && npm run release    # publish a frozen copy at /colony-flow-sand/vX.Y.0/
```

The landing page lists every version. See `docs/guide/deployment.md` for details.
