# 4. Levels

Fifteen pictures of 136 × 128-grain frames (grains of about 6 px); the game plays them from `src/game/level-edits.json` in the order below, named `level_1` to `level_15` in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`).

- **The game has 15 levels** (`GAME_ORDER` in `src/game/levels.ts`); the earlier levels 16–20 (`builtin-5` to `builtin-9`) are gone from the game, `level-edits.json` and the Level Editor's Game chapter (a browser's Level Bank keeps its own copies).
- **Level 1** (`builtin-0`) is the cherries, a small picture. **Levels 2–5** (`builtin-12`, `builtin-10`, `builtin-11`, `builtin-13`) are full-frame scenes with zoomed grains (**Phóng to hạt**, ×1.25 to ×1.5). **Levels 6 and 7** (`builtin-14`, `builtin-15`) are full-frame scenes (a dog, a palm tree and sandcastle). **Levels 8–11** are one subject on the empty frame, **level 12** the ice cream, **levels 13–15** full-frame scenes. Levels with ids `builtin-10` to `builtin-19` exist only in `level-edits.json`.

The game builds every level's nests (the hand-set ones were dropped when the grains grew, since the pictures' blocks changed; make new ones with **Tự sinh tổ kiến**). Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Not yet checked with the test bot.

| # | Subject | Grains | Blocks | Colours | Chunk | Nests | Grain zoom |
|---|---|---|---|---|---|---|---|
| 1 | Cherries | 3,602 | 57 | red, black, olivegreen | 3–5 | rows | — |
| 2 | Rocket | 6,673 | 106 | darkblue, white, red | 3–5 | rows | ×1.51 |
| 3 | Cat | 7,564 | 119 | white, darkblue, yellow | 3–5 | rows | ×1.41 |
| 4 | Castle | 8,243 | 130 | white, skyblue, yellow | 3–5 | rows | ×1.41 |
| 5 | Sailboat | 9,392 | 148 | teal, white, yellow | 4–6 | rows | ×1.25 |
| 6 | Dog | 17,404 | 274 | pink, orange, black, white, red | 4–6 | rows, hand-set | — |
| 7 | Palm tree and sandcastle | 17,404 | 275 | darkblue, yellow, green, teal, red, orangered | 3–5 | rows (3 columns) | — |
| 8 | Chick | 4,917 | 78 | yellow, brown, orangered | 3–5 | rows (3 columns) | — |
| 9 | Clownfish | 6,384 | 102 | orangered, purple, white | 3–5 | rows | — |
| 10 | Octopus | 6,921 | 111 | magenta, purple, white, skyblue | 4–6 | rows | — |
| 11 | Ladybug on a leaf | 7,945 | 126 | green, black, red, white | 4–6 | rows | — |
| 12 | Ice cream | 3,528 | 56 | pink, black, yellow | 4–6 | rows | — |
| 13 | Rocket | 16,997 | 268 | navy, white, lightyellow, red | 4–6 | rows | — |
| 14 | Sleeping cat with flowers | 16,998 | 268 | olivegreen, white, yellowgreen, yellow | 4–6 | rows, seed 5 | — |
| 15 | Black cat peeking | 16,998 | 268 | yellow, cyan, black, white, olivegreen, yellowgreen | 5–8 | onion | — |

## Design rules

The full rules for drawing, colouring and building levels are in [5. Level design rules](./level-design).

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
