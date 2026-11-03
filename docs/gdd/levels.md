# 4. Levels

Twenty pictures of 136 × 128-grain frames (grains of about 6 px); the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_20` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **Levels 1–10** (ids `builtin-10` to `builtin-19`): level 1 is a full-frame scene; levels 2–10 one subject on the empty frame, no outline, 3 colours (4 on levels 5, 9 and 10), from about 3,100 to 7,900 grains. Made in the Level Editor from images (colony-flow-levels (7).json). They exist only in `level-edits.json` (no older drawing in `levels.ts`).
- **Levels 11–20** are the earlier set (ids `builtin-0` to `builtin-9`, their own slots kept), moved back by ten: two small pictures, then eight full-frame scenes.

The game builds every level's nests (the hand-set ones were dropped when the grains grew, since the pictures' blocks changed; make new ones with **Tự sinh tổ kiến**). Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests |
|---|---|---|---|---|---|---|
| 1 | Waving cat in a boat (full frame) | 17,130 | 270 | darkblue, white, yellow | 3–5 | rows |
| 2 | Mushroom | 3,232 | 52 | red, white, orange | 3–5 | rows (3 columns) |
| 3 | Donut | 4,003 | 64 | orange, pink, cyan | 3–5 | rows |
| 4 | Bee | 4,210 | 67 | black, white, yellow | 4–6 | rows |
| 5 | Tulips in a pot | 5,513 | 87 | pink, green, brown, orangered | 4–6 | rows |
| 6 | Whale | 3,811 | 61 | navy, white, teal | 3–5 | rows (3 columns) |
| 7 | Chick | 4,917 | 78 | yellow, brown, orangered | 3–5 | rows (3 columns) |
| 8 | Clownfish | 6,384 | 102 | orangered, white, purple | 3–5 | rows |
| 9 | Octopus | 6,921 | 111 | magenta, purple, white, skyblue | 4–6 | rows |
| 10 | Ladybug on a leaf | 7,945 | 126 | black, green, white, red | 4–6 | rows |
| 11 | Cherries | 3,602 | 57 | 3 | 3–5 | rows |
| 12 | Ice cream | 3,528 | 56 | 3 | 4–6 | rows |
| 13 | Rocket | 16,997 | 268 | 4 | 4–6 | rows |
| 14 | Sleeping cat with flowers | 16,998 | 268 | 4 | 4–6 | rows, seed 5 |
| 15 | Black cat peeking | 16,998 | 268 | 6 | 5–8 | rows |
| 16 | Sailboat | 16,998 | 267 | 4 | 4–6 | rows |
| 17 | Sea turtle | 16,998 | 268 | 4 | 4–6 | rows |
| 18 | Panda | 16,998 | 267 | 4 | 4–6 | rows |
| 19 | Cottage with garden | 16,998 | 268 | 4 | 4–7 | rows |
| 20 | Toucan | 16,998 | 269 | 6 | 5–8 | rows |

## Design rules

The full rules for drawing, colouring and building levels are in [5. Level design rules](./level-design).

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
