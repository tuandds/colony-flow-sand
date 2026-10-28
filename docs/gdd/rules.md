# 3. Rules & mechanics

All numbers come from `src/game/layout.ts` and `src/game/sim.ts`.

## 3.1 Win and lose <Badge type="tip" text="Live" />

- **Win:** every nest in every column has received all its blocks.
- **Lose:** all 30 conveyor slots hold a block and none of them can go into a nest any more: no front nest still wants a colour on the belt, no ant is on its way and no nest is popping. This lasts more than 0.35 s (the grace covers the moment one nest fills and the next takes its place). A full belt alone is not a loss as long as ants can still take blocks off it.

## 3.2 Sand picture <Badge type="tip" text="Live" />

| Rule | Value |
|---|---|
| Grains per picture cell | 8 × 8 = 64 (one *unit*) |
| Block size | 1 unit = 64 grains of one colour |
| Board frame | inside 824 × 744 px at (128, 197) |
| Picture area | built-in pictures: 738 × 738 px at (171, 200); level editor pictures: the whole frame |
| Swipe radius | max(1.1 × cell size, 34 px) |

- Sand is **fixed** until swiped. Swiped sand becomes **loose** and is drawn 22 % brighter.
- Loose sand falls with gravity 0.09 grains/step² up to 3.5 grains/step, at 110 steps per second. Blocked below, it slides down-left or down-right; on gentle slopes it creeps sideways toward a drop within 2 grains, with friction 0.82 bleeding off momentum.
- Loose sand on the picture's edges can slide past the picture and fall until the board frame stops it.
- Small or thin islands of fixed sand (≤ 48 grains, or narrower than 4 grains) come loose by themselves every 0.5 s.
- **Exact fit:** when a level loads, each colour is trimmed to a whole number of blocks (edge grains removed, enclosed grains handed to a neighbouring colour), so no sand is ever left over.

## 3.3 Funnel and hole <Badge type="tip" text="Live" />

- Sand leaving the board falls into the funnel in clumps of up to 6 grains.
- The funnel is as wide as the sand frame at the top (824 px) and narrows to the hole (92 px) over 110 px. It is its own sand pile (6 px cells, 40 steps/s): clumps fall straight down, and on the gentle walls they slide one cell toward the hole every step.
- The hole takes 90 clumps per second, but **only while no finished block is waiting in it**. A waiting block plugs the hole until it drops onto the conveyor.
- When the funnel is full, sand waits at the bottom of the board.

## 3.4 Conveyor <Badge type="tip" text="Live" />

| Rule | Value |
|---|---|
| Slots | 30 |
| Speed | 300 px/s, stadium loop around (300–780, 1192), radius 62 px |
| Blocks | 32 px cubes |
| Bar in the middle | Fullness: green, yellow from 60 %, red from 85 % |

## 3.5 Nests and ants <Badge type="tip" text="Live" />

- 4 columns of nests (levels from the level editor can have 2 to 6). Two rows show above the booster tray, the third about two thirds; the rest wait below it.
- Only the front nest of each column is active. Nests never change column: when the front nest fills it pops and the column slides up.
- Nest sizes and order are generated from the picture: the blocks are listed in the order the sand naturally comes out (bottom rows first, or outside-in for pictures with enclosed colours), cut into nests of `chunk × 2` blocks, and dealt to the column with the least sand still queued. Levels can pin a seed that a test player could solve.
- An ant leaves an active nest every 0.12 s while that nest still needs blocks and a matching block is on the belt. Ants walk at 420 px/s, are 74 px long and carry 26 px cubes.

## 3.6 Controls <Badge type="tip" text="Live" />

| Input | Action |
|---|---|
| Swipe on the picture | Free the sand under the finger |
| Pause button | Settings: Resume, Restart, cheat to jump to any level |
| ▶▶ x2 | Toggle double speed |
| Boosters | Visual only for now (they bounce) |
| Keys N / P / R | Next / previous level, restart (desktop testing) |

## 3.7 Levels <Badge type="tip" text="Live" />

Ten original pictures. Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale).

| # | Picture | Grid | Colours (with outline) | Chunk | Nest order |
|---|---|---|---|---|---|
| 1 | Cherries | 14 | 5 | 3–5 | rows |
| 2 | Ice Cream | 16 | 5 | 3–6 | rows |
| 3 | Goldfish | 18 | 6 | 4–6 | onion |
| 4 | Cupcake | 18 | 7 | 4–7 | rows |
| 5 | Little Owl | 20 | 6 | 5–8 | rows, seed 6 |
| 6 | Hot Air Balloon | 20 | 6 | 5–8 | rows, seed 3 |
| 7 | Cactus Pot | 20 | 6 | 5–8 | rows, seed 1 |
| 8 | Garden Snail | 22 | 6 | 5–9 | rows |
| 9 | Rocket | 22 | 7 | 6–9 | onion, seed 1 |
| 10 | Penguin | 22 | 10 | 6–9 | rows, seed 6 |

- Every level was cleared by a test bot with the order and seed above.
- **Design rule:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.
