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
| Screen layout | like the Sugar Drop prototype: HUD row (settings left, level in the middle), the three boosters (126 px) under it with the x2 button beside them, the picture frame, its funnel ending in a gate just above the conveyor, then the conveyor (track 674 px straight with round ends of radius 50, centred at y 1492) and the nests |
| Board frame | inside 824 × 776 px at (128, 330); the corners are rounded like the frame art's (the top corners of the light blue under the art's grey top band, and its bottom corners where they begin to curve into the funnel), and no sand goes there; the grey band is above the sand. The frame art includes the funnel's spout and its gate, just above the conveyor |
| Picture scale | the same in every level: the frame is 22 cells (176 grains) tall, so a cell is 35 px and a grain about 4.4 px; a smaller picture sits centred in the frame |
| Picture area | 22 cells: 814 × 814 px at (133, 333); level editor pictures can use the whole frame (188 × 176 grains, exactly 517 blocks) |
| Swipe radius | max(1.1 × cell size, 34 px) = 41 px |

- Sand is **fixed** until swiped. Swiped sand becomes **loose** and is drawn 22 % brighter.
- Loose sand falls with gravity 0.09 grains/step² up to 3.5 grains/step, at 110 steps per second. Blocked below, it slides down-left or down-right; on gentle slopes it creeps sideways toward a drop within 2 grains, with friction 0.82 bleeding off momentum.
- Loose sand on the picture's edges can slide past the picture and fall until the board frame stops it.
- Small or thin islands of fixed sand (≤ 48 grains, or narrower than 4 grains) come loose by themselves every 0.5 s.
- **The picture plays as drawn:** no grain is added, removed or recoloured when a level loads (only sand in the frame's rounded corners is cut, as the Level Editor shows). Every 64 grains of a colour make a block, and a colour's leftover grains (fewer than 64) make its last block when its last grain goes down the hole, so each colour makes its grains ÷ 64 blocks, rounded up, and no sand is ever left over.
- **Nests that are a little off:** nests set in the Level Editor are used as they are when they hold exactly the picture's blocks; when a colour's block count is off by a little (up to 5% of the blocks), the nests are resized: missing blocks go to that colour's smallest nests, extra ones come off its largest.

## 3.3 Funnel and hole <Badge type="tip" text="Live" />

- The board and the funnel under it are **one sand pile**: the same grains, with the same rules, fall from the board straight on into the funnel, so there is no floor between them.
- The funnel is as wide as the sand frame at the top (824 px) and curves in, as the frame art's does, to the hole (about 75 px) 183 px lower, where the frame art's spout ends over its gate. Its curved sides, and the curved rim of the board's bottom corners, are walls: loose sand resting directly on them keeps sliding toward the hole (they are gentler than sand's own slope), and sand on top of it piles up and follows.
- **First down, first out.** Grains are numbered as they come down into the funnel, and the funnel's grains move oldest first: a gap near the hole is filled by the sand that has waited longest (often beside it on the side), not by newer sand straight above. The hole also takes the oldest grains in its row first. Sand comes out within about 3 blocks of the order it came down in.
- The hole is the funnel's bottom row. It takes 540 grains per second, but **only while no finished block is waiting in it**. A waiting block plugs the hole until it drops onto the conveyor.
- Each colour is pressed on its own: a colour's sand waits under the hole until it has 64 grains (or until its last grain is down: then what is left makes its last block), so a colour that comes in small amounts can make its block after a colour that came later.
- When the hole is plugged or slower than the sand coming in, the funnel fills up and the sand piles back up into the board.

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
- An ant leaves an active nest every 0.12 s while that nest still needs blocks and a matching block is on the belt. Ants walk at 420 px/s, are 74 px long and carry 26 px cubes; they are glossy, and black ants are drawn a near-black that still shows their shape.
- **Ant paths:** each ant leaves from its own spot on the nest's top edge (up to ±38 px from the centre) and comes back to it. On the way out it heads off its block: it aims at the point on the belt where it would meet the block running straight, a random 25–100 % of the way there from the block, so some ants chase their block and others cut across to meet it. Both come from the level's seeded random numbers, so a recorded play still replays the same.

## 3.6 Controls <Badge type="tip" text="Live" />

| Input | Action |
|---|---|
| Swipe on the picture | Free the sand under the finger |
| Pause button | Pause panel: close (✕, resume), music / sound / vibration switches (kept in the browser), Restart, Home (the site's landing page; level 1's start screen elsewhere), cheat to jump to any level. Vibration buzzes when a nest fills, on a win and on a loss (phones that support it) |
| ▶▶ x2 | Toggle double speed. Once all the sand has fallen off the picture frame, x2 turns on by itself and the button hides until the next level, which starts at the speed the player had set |
| Boosters | A row of three under the HUD, above the picture frame: green square buttons with a magnet (Activate), arrows (Shuffle) and a ball cannon (Fan). Each has 1 use per level, shown on a red badge; a green plus replaces it when none are left. The boosters unlock one by one: Activate at level 3, Shuffle at level 6, Fan at level 9. Before that a booster's button is grey with a padlock and its level under it, and tapping it shows "Unlocks at Level N" for a moment. A booster that would do nothing (nothing to wake, swap or blow) only bounces and keeps its use |
| Activate | Tap it, then tap a nest waiting in the second or third row: ants work for that nest too, from where it stands, until it is full. The game holds still while you pick; tap anywhere else (or the booster) to cancel. A woken nest looks like a front nest |
| Shuffle | The game holds still and the nests pulse; after 0.5 s they trade places at random across all columns and rows (each keeps the blocks it has), sliding to their new places in about 0.5 s, then play goes on. Nests with an ant on its way stay put; a woken nest stays woken wherever it lands |
| Fan | The screen dims (blocks, nests and ants stay lit) and the ball cannon (the Fan's picture) drops into the middle. It sucks the conveyor's blocks into its mouth one by one, nearest first, with air streaks rushing in, then shoots them out one at a time from the middle of its mouth (blocks are drawn in front of the cannon), 0.2 s apart and 1.5 times their size in flight, straight down into a nest of its colour that still has room, upper rows first (nearest column within a row), woken or not; it kicks back with each shot and flies off when the last block lands. The game holds still from the tap until the last block is in its nest. Ants on their way to those blocks go back |
| Keys N / P / R | Next / previous level, restart (desktop testing) |

## 3.7 Levels <Badge type="tip" text="Live" />

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

- **Design rule:** keep each colour in one area of the picture. A colour that runs from top to bottom (for example one body colour around the whole picture) makes nests that cannot fill until the very end, and the conveyor overflows.
