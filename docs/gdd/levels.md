# 4. Levels

Twenty pictures; the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_20` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **Levels 1–10** (ids `builtin-10` to `builtin-19`) were drawn by the [level design rules](./level-design): one subject on the empty frame, no outline, 3 colours (4 on levels 5 and 10). Picture size rises in two runs of five, from about 6,000 to 15,000 grains (6,000 · 8,250 · 10,500 · 12,750 · 15,000). They exist only in `level-edits.json` (no older drawing in `levels.ts`). The game builds their nests from the picture (rows, seed 0).
- **Levels 11–20** are the earlier set (ids `builtin-0` to `builtin-9`, their own slots kept), moved back by ten: two small pictures, then eight full-frame scenes.

"Hand-set" nests come from the Level Editor; the game builds the others. Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests |
|---|---|---|---|---|---|---|
| 1 | Strawberry | 5,999 | 95 | red, green, yellow | 3–5 | rows |
| 2 | Mushroom | 8,248 | 130 | red, orange, white | 3–5 | rows |
| 3 | Donut | 10,500 | 165 | orange, pink, cyan | 3–5 | rows |
| 4 | Bee | 12,750 | 200 | black, yellow, white | 4–6 | rows |
| 5 | Tulips in a pot | 15,000 | 237 | orangered, pink, brown, green | 4–6 | rows |
| 6 | Whale | 6,000 | 96 | navy, white, teal | 3–5 | rows |
| 7 | Chick | 8,250 | 131 | yellow, brown, orangered | 3–5 | rows |
| 8 | Clownfish | 10,518 | 166 | orangered, purple, white | 3–5 | rows |
| 9 | Octopus | 12,756 | 201 | magenta, purple, white | 4–6 | rows |
| 10 | Ladybug on a leaf | 14,999 | 237 | green, red, black, white | 4–6 | rows |
| 11 | Cherries | | 108 | 3 | 3–5 | rows |
| 12 | Ice cream | | 105 | 3 | 4–6 | rows |
| 13 | Rocket | | 506 | 4 | 4–6 | hand-set |
| 14 | Sleeping cat with flowers | | 506 | 4 | 4–6 | rows, seed 5 |
| 15 | Black cat peeking | | 507 | 6 | 5–8 | hand-set |
| 16 | Sailboat | | 507 | 4 | 4–6 | hand-set |
| 17 | Sea turtle | | 506 | 4 | 4–6 | hand-set |
| 18 | Panda | | 507 | 4 | 4–6 | hand-set |
| 19 | Cottage with garden | | 507 | 4 | 4–7 | hand-set |
| 20 | Toucan | | 508 | 6 | 5–8 | hand-set |

## Design rules

The full rules for drawing, colouring and building levels are in [5. Level design rules](./level-design).

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
