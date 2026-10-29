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
| Screen layout | like Sand Drop: Color Sort Puzzle: HUD row (pause left, level, x2 right), the boosters under it, the picture frame nearly as wide as the screen, then the funnel, the conveyor and the nests |
| Board frame | inside 864 × 820 px at (108, 330) |
| Picture scale | the same in every level: the frame is 22 cells (176 grains) tall, so a cell is 37 px and a grain about 4.6 px; a smaller picture sits centred in the frame |
| Picture area | 22 cells: 814 × 814 px at (133, 333); level editor pictures can use the whole frame (186 × 176 grains) |
| Swipe radius | max(1.1 × cell size, 34 px) = 41 px |

- Sand is **fixed** until swiped. Swiped sand becomes **loose** and is drawn 22 % brighter.
- Loose sand falls with gravity 0.09 grains/step² up to 3.5 grains/step, at 110 steps per second. Blocked below, it slides down-left or down-right; on gentle slopes it creeps sideways toward a drop within 2 grains, with friction 0.82 bleeding off momentum.
- Loose sand on the picture's edges can slide past the picture and fall until the board frame stops it.
- Small or thin islands of fixed sand (≤ 48 grains, or narrower than 4 grains) come loose by themselves every 0.5 s.
- **Exact fit:** when a level loads, each colour is trimmed to a whole number of blocks (edge grains removed, enclosed grains handed to a neighbouring colour), so no sand is ever left over.

## 3.3 Funnel and hole <Badge type="tip" text="Live" />

- Sand leaving the board falls into the funnel in clumps of up to 6 grains.
- The funnel is as wide as the sand frame at the top (864 px) and narrows to the hole (92 px) over 120 px. It is its own sand pile (6 px cells, 40 steps/s): clumps fall straight down, and on the gentle walls they slide one cell toward the hole every step.
- **First in, first out.** The clumps move in the order they arrived, oldest first, so a gap at the bottom is filled by the sand that has waited longest (often beside it on the wall), not by newer sand straight above. The hole also takes the oldest clumps in its bottom row first. Sand that lands far out on a wall still has to slide in, so it can reach the hole after sand that landed right above it.
- The hole takes 90 clumps per second, but **only while no finished block is waiting in it**. A waiting block plugs the hole until it drops onto the conveyor.
- Each colour is pressed on its own: a colour's sand waits under the hole until it has 64 grains, so a colour that comes in small amounts can make its block after a colour that came later.
- When the funnel is full, sand waits at the bottom of the board.

## 3.4 Conveyor <Badge type="tip" text="Live" />

| Rule | Value |
|---|---|
| Slots | 30 |
| Speed | 300 px/s, stadium loop around (236–844, 1404), radius 62 px |
| Blocks | 32 px cubes |
| Bar in the middle | Fullness: green, yellow from 60 %, red from 85 % |

## 3.5 Nests and ants <Badge type="tip" text="Live" />

- 4 columns of nests (levels from the level editor can have 2 to 6). Two rows show at the bottom of the screen and the third down to its number (rows 130 px apart); the rest wait below it.
- Only the front nest of each column is active. Nests never change column: when the front nest fills it pops and the column slides up.
- Nest sizes and order are generated from the picture: the blocks are listed in the order the sand naturally comes out (bottom rows first, or outside-in for pictures with enclosed colours), cut into nests of `chunk × 2` blocks, and dealt to the column with the least sand still queued. Levels can pin a seed that a test player could solve.
- An ant leaves an active nest every 0.12 s while that nest still needs blocks and a matching block is on the belt. Ants walk at 420 px/s, are 74 px long and carry 26 px cubes.
- **Ant paths:** each ant leaves from its own spot on the nest's top edge (up to ±38 px from the centre) and comes back to it. On the way out it heads off its block: it aims at the point on the belt where it would meet the block running straight, a random 25–100 % of the way there from the block, so some ants chase their block and others cut across to meet it. Both come from the level's seeded random numbers, so a recorded play still replays the same.

## 3.6 Controls <Badge type="tip" text="Live" />

| Input | Action |
|---|---|
| Swipe on the picture | Free the sand under the finger |
| Pause button | Pause panel: close (✕, resume), music / sound / vibration switches (kept in the browser), Restart, Home (the site's landing page; level 1's start screen elsewhere), cheat to jump to any level. Vibration buzzes when a nest fills, on a win and on a loss (phones that support it) |
| ▶▶ x2 | Toggle double speed |
| Boosters | A row of three under the HUD, above the picture frame, each with 1 use per level (badge; greyed when used up). A booster that would do nothing (nothing to wake, swap or blow) only bounces and keeps its use |
| Activate | Tap it, then tap a nest waiting behind the front row (on screen): ants work for that nest too, from where it stands, until it is full. The game holds still while you pick; tap anywhere else (or the booster) to cancel. A woken nest looks like a front nest |
| Shuffle | The nests trade places at random across all columns and rows (each keeps the blocks it has). Nests with an ant on its way stay put; a woken nest stays woken wherever it lands |
| Fan | Every block on the conveyor flies into a nest of its colour that still has room, upper rows first (nearest column within a row), woken or not. Ants on their way to those blocks go back |
| Keys N / P / R | Next / previous level, restart (desktop testing) |

## 3.7 Levels <Badge type="tip" text="Live" />

Ten original pictures. Difficulty rises through picture size, number of colours and nest size (`chunk`, in blocks before the ×2 nest scale). Nine of them were changed in the Level Editor (pictures, and nests for three); the game plays those copies from `src/game/level-edits.json`. Bot result: the test bot (`playBot`) on this build.

| # | Picture | Size (cells) | Colours (with outline) | Chunk | Nests | Edited | Bot |
|---|---|---|---|---|---|---|---|
| 1 | Cherries | 14 | 5 | 3–5 | set in the editor | yes | win |
| 2 | Ice Cream | 16 | 5 | 3–6 | rows | yes | win |
| 3 | Goldfish | 18 | 5 | 4–6 | onion | yes | win |
| 4 | Cupcake | 18 | 7 | 4–7 | rows | yes | win |
| 5 | Little Owl | 20 | 5 | 5–8 | rows, seed 5 | no | win |
| 6 | Hot Air Balloon | 20 | 5 | 5–8 | rows, seed 3 | yes | win |
| 7 | Cactus Pot | 20 | 6 | 5–8 | rows, seed 1 | yes | win |
| 8 | Garden Snail | 22 | 7 | 5–9 | rows | yes | stuck |
| 9 | Rocket | 22 | 5 | 6–9 | set in the editor | yes | stuck |
| 10 | Penguin | 22 | 7 | 6–9 | set in the editor | yes | stuck |

- Every level was cleared by a test bot with the order and seed above.
- **Design rule:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.
