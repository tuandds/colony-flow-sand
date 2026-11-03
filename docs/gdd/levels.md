# 4. Levels

Twenty pictures; the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_20` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **Levels 1–10** (ids `builtin-10` to `builtin-19`): one subject on the empty frame, no outline, 3 colours (4 on levels 5, 9 and 10), from about 5,900 to 15,000 grains. Made in the Level Editor from images (colony-flow-levels (7).json). They exist only in `level-edits.json` (no older drawing in `levels.ts`).
- **Levels 11–20** are the earlier set (ids `builtin-0` to `builtin-9`, their own slots kept), moved back by ten: two small pictures, then eight full-frame scenes.

"Hand-set" nests come from the Level Editor; the game builds the others. Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests |
|---|---|---|---|---|---|---|
| 1 | Strawberry | 5,884 | 94 | green, red, yellow | 3–5 | rows (3 columns) |
| 2 | Mushroom | 6,113 | 97 | red, white, orange | 3–5 | rows (3 columns) |
| 3 | Donut | 7,563 | 119 | orange, pink, cyan | 3–5 | rows |
| 4 | Bee | 7,958 | 125 | black, white, yellow | 4–6 | rows |
| 5 | Tulips in a pot | 10,446 | 166 | pink, green, brown, orangered | 4–6 | hand-set |
| 6 | Whale | 7,181 | 114 | navy, white, teal | 3–5 | hand-set (3 columns) |
| 7 | Chick | 9,292 | 147 | yellow, brown, orangered | 3–5 | hand-set (3 columns) |
| 8 | Clownfish | 12,052 | 190 | orangered, white, purple | 3–5 | hand-set |
| 9 | Octopus | 13,054 | 206 | magenta, purple, white, pink | 4–6 | rows |
| 10 | Ladybug on a leaf | 15,027 | 236 | black, green, white, red | 4–6 | rows |
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
