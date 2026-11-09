# 6. Levels

Twenty-one pictures of 136 × 128-grain frames (grains of about 6 px; one is a taller scroll painting); the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_21` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **The game has 21 levels** (`GAME_ORDER` in `src/game/levels.ts`), in the order of colony-flow-levels (16).json: the cherries; four full-frame scenes with zoomed grains (levels 2–5); full-frame scenes (levels 6–15); the pumpkin (16); then five landmarks (17–21), one of them a [scroll painting](./obstacles#scroll-painting): the desert road (level 19, 136 × 176 grains). `builtin-1` and `builtin-16` to `builtin-19` are back with new pictures. A browser's Level Bank keeps its own copies. Levels with ids `builtin-10` to `builtin-20` exist only in `level-edits.json`, and so does `builtin-1`'s new picture.

The game builds every level's nests (the hand-set ones were dropped when the grains grew, since the pictures' blocks changed; make new ones with **Tự sinh tổ kiến**). Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests | Grain zoom |
|---|---|---|---|---|---|---|---|
| 1 | Cherries | 3,602 | 57 | red, black, olivegreen | 3–5 | rows (3 columns), hand-set | — |
| 2 | Rocket | 6,673 | 106 | darkblue, white, red | 3–5 | rows | ×1.51 |
| 3 | Cat | 7,564 | 119 | white, darkblue, yellow | 3–5 | rows | ×1.41 |
| 4 | Castle | 8,243 | 130 | white, skyblue, yellow | 3–5 | rows | ×1.41 |
| 5 | Sailboat | 9,392 | 148 | teal, white, yellow | 4–6 | rows | ×1.25 |
| 6 | Dog | 17,404 | 274 | pink, orange, black, white, red | 4–6 | rows, hand-set | — |
| 7 | Rocket | 16,997 | 268 | navy, white, lightyellow, red | 4–6 | rows | — |
| 8 | Sleeping cat with flowers | 16,998 | 268 | olivegreen, white, yellowgreen, yellow | 4–6 | rows, seed 5 | — |
| 9 | Sea turtle | 16,998 | 268 | navy, cyan, white, red | 4–6 | rows | — |
| 10 | Palm tree and sandcastle | 17,404 | 275 | darkblue, yellow, green, orangered, teal, red | 3–5 | rows, hand-set | — |
| 11 | Sailboat | 16,998 | 267 | cyan, white, navy, orangered | 4–6 | rows, seed 3 | — |
| 12 | Panda | 16,998 | 267 | olivegreen, yellowgreen, white, yellow | 4–6 | rows | — |
| 13 | Cottage with garden | 16,998 | 268 | white, pink, olivegreen, black | 4–7 | rows | — |
| 14 | Toucan | 16,998 | 269 | yellowgreen, lightorange, cyan, navy, lightyellow | 5–8 | rows, seed 6 | — |
| 15 | Black cat peeking | 16,998 | 268 | yellow, cyan, black, white, olivegreen, yellowgreen | 5–8 | onion | — |
| 16 | Jack-o'-lantern pumpkin | 10,000 | 157 | navy, orangered, green | 4–6 | rows | ×1.31 |
| 17 | Statue of Liberty | 14,382 | 228 | skyblue, springgreen, red, yellow, white | 3–5 | rows (3 columns) | ×1.10 |
| 18 | Golden Gate Bridge | 17,404 | 275 | skyblue, red, darkgreen, yellow, white | 4–6 | rows | — |
| 19 | Desert road with mesas and a cactus (scroll painting, 136 × 176) | 23,934 | 376 | purple, yellow, red, darkgreen | 3–5 | rows | — |
| 20 | Hollywood sign | 17,403 | 276 | darkblue, green, darkgreen, white, yellow, brown | 4–6 | rows | — |
| 21 | Mount Rushmore | 17,404 | 274 | lightorange, white, darkblue, darkgreen, yellow | 4–6 | rows | — |

## Design rules

The full rules for drawing, colouring and building levels are in [5. Level design rules](./level-design).

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
