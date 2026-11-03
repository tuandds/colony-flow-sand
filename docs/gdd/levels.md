# 4. Levels

Ten pictures, all made in the Level Editor (whole-frame pictures, 188 × 176 grains); the game plays them from `src/game/level-edits.json` (a Level Bank export, its "Game" chapter). Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). The levels are named `level_1` to `level_10` in the order the game plays them, in the game and in the Level Editor, whatever name a saved or imported copy carries (`GAME_ORDER` in `src/game/levels.ts`; their ids, `builtin-0` to `builtin-9`, stay the original ten's slots). "Hand-set" nests come from the Level Editor; the game builds the others (in rows, with the seed shown). Not yet checked with the test bot.

| # | Name | Colours | Chunk | Nests |
|---|---|---|---|---|
| 1 | level_1 | 4 | 3–5 | rows |
| 2 | level_2 | 4 | 4–6 | rows |
| 3 | level_3 | 4 | 4–6 | hand-set |
| 4 | level_4 | 4 | 4–6 | rows, seed 5 |
| 5 | level_5 | 6 | 5–8 | hand-set |
| 6 | level_6 | 4 | 4–6 | hand-set |
| 7 | level_7 | 4 | 4–6 | hand-set |
| 8 | level_8 | 4 | 4–6 | hand-set |
| 9 | level_9 | 4 | 4–7 | hand-set |
| 10 | level_10 | 6 | 5–8 | hand-set |

## Design rules

- **One area per colour:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.

- **Make and check levels in the Level Editor:** it turns an image into a sand picture in the game's colours and builds nests that a recorded play wins (see the [Level Editor guide](../guide/level-editor)).
