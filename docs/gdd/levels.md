# 4. Levels

Twenty pictures of 136 × 128-grain frames (grains of about 6 px); the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_20` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **Level 1** (`builtin-0`, formerly level 11) is the cherries, a small picture (3,602 grains, 3 colours).
- **Levels 2–5** (`builtin-12`, `builtin-10`, `builtin-11`, `builtin-13`) are full-frame scenes with zoomed grains (**Phóng to hạt**, ×1.25 to ×1.5), so they hold fewer grains (6,675 to 9,396) and show them bigger.
- **Levels 6–11** (`builtin-14` to `builtin-19`, formerly levels 5–10) are one subject on the empty frame (3,811 to 7,945 grains); **level 12** is the ice cream; **levels 13–20** are the full-frame scenes (about 17,000 grains). Levels with ids `builtin-10` to `builtin-19` exist only in `level-edits.json` (no older drawing in `levels.ts`).

The game builds every level's nests (the hand-set ones were dropped when the grains grew, since the pictures' blocks changed; make new ones with **Tự sinh tổ kiến**). Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests | Grain zoom |
|---|---|---|---|---|---|---|---|
| 1 | Cherries | 3,602 | 57 | red, black, olivegreen | 3–5 | rows | — |
| 2 | Rocket | 6,675 | 106 | darkblue, white, red | 3–5 | rows | ×1.51 |
| 3 | Cat | 7,566 | 119 | white, darkblue, yellow | 3–5 | rows | ×1.41 |
| 4 | Castle | 8,245 | 130 | white, purple, yellow | 3–5 | rows | ×1.41 |
| 5 | Sailboat | 9,396 | 148 | teal, white, yellow | 4–6 | rows | ×1.25 |
| 6 | Tulips in a pot | 5,513 | 87 | orangered, pink, green, brown | 4–6 | rows | — |
| 7 | Whale | 3,811 | 61 | navy, teal, white | 3–5 | rows (3 columns) | — |
| 8 | Chick | 4,917 | 78 | yellow, brown, orangered | 3–5 | rows (3 columns) | — |
| 9 | Clownfish | 6,384 | 102 | orangered, purple, white | 3–5 | rows | — |
| 10 | Octopus | 6,921 | 111 | magenta, purple, white, skyblue | 4–6 | rows | — |
| 11 | Ladybug on a leaf | 7,945 | 126 | green, black, red, white | 4–6 | rows | — |
| 12 | Ice cream | 3,528 | 56 | pink, black, yellow | 4–6 | rows | — |
| 13 | Rocket | 16,999 | 268 | navy, white, lightyellow, red | 4–6 | rows | — |
| 14 | Sleeping cat with flowers | 17,000 | 268 | olivegreen, white, yellowgreen, yellow | 4–6 | rows, seed 5 | — |
| 15 | Black cat peeking | 17,000 | 268 | yellow, cyan, black, white, olivegreen, yellowgreen | 5–8 | onion | — |
| 16 | Sailboat | 17,000 | 268 | cyan, white, navy, orangered | 4–6 | rows, seed 3 | — |
| 17 | Sea turtle | 17,000 | 268 | navy, cyan, white, red | 4–6 | rows | — |
| 18 | Panda | 17,000 | 267 | olivegreen, yellowgreen, white, yellow | 4–6 | rows | — |
| 19 | Cottage with garden | 17,000 | 268 | white, pink, olivegreen, black | 4–7 | rows | — |
| 20 | Toucan | 17,000 | 269 | yellowgreen, lightorange, cyan, navy, lightyellow | 5–8 | rows, seed 6 | — |

## Design rules

The full rules for drawing, colouring and building levels are in [5. Level design rules](./level-design).

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
