# Demo Videos

The game can play itself for marketing clips. A hand swipes the sand as a player would: every swipe really frees the sand under the fingertip, so what the clip shows is real play. The clips show gameplay only: x2 is on from the start, no booster is used, no level is played to the win, and the conveyor never fills up (no Out of Space).

Each reel is a few short shots of different levels; between shots the next level slides in from the right and pushes the last one out to the left. The reels differ in their levels and in how the hand swipes. Every reel runs a set length from the tap that starts it, and its last 3 seconds are the end card: the last frame blurs and dims, the Sugar Drop logo pops in, and a green **PLAY NOW** button keeps growing and shrinking.

## The reels

Add `?demo=<reel>` to the game's address, for example [demo/?demo=drops30](https://tuandds.github.io/colony-flow-sand/demo/?demo=drops30) (on the dev server: http://localhost:8080/?demo=drops30).

| Reel | Length | Levels, in order | Swipes |
|---|---|---|---|
| `drops30` | 30 s | 1, 4, 7, 9 | Mostly straight down from the middle to the bottom, with diagonals and zigzags |
| `sweeps30` | 30 s | 2, 5, 8, 10 | Mostly along the bottom, left to right and right to left, with some up and down |
| `zigzag30` | 30 s | 3, 6, 9, 1 | Mostly zigzags down to the bottom, with up, down and diagonal strokes |
| `diagonals30` | 30 s | 4, 10, 2, 7 | Mostly diagonals down from the left and from the right, with sweeps and rises |
| `rises30` | 30 s | 5, 8, 3, 6 | Mostly up from the bottom, with sweeps, drops and zigzags |
| `mix60` | 60 s | 1, 3, 5, 7, 9, 2, 4, 6 | Every kind of stroke in turn |
| `tour60` | 60 s | All ten, from 10 down to 1 | Every kind of stroke, in a different turn from `mix60` |

The kinds of stroke are: down from the middle to the bottom, diagonally down to the bottom from the left or from the right, up from the bottom, along the bottom left to right or right to left, and a zigzag down to the bottom. Every stroke reaches the bottom of the sand under it, so the sand it frees runs out at once. Each one is placed over the sand the front nests want, and the hand waits while the conveyor is busy. A shot stops swiping with about a third of its picture left.

A reel does not save progress or change the levels a player has unlocked. Each run differs a little (the strokes are placed at random), so record a few takes, or record frame by frame (below).

## Recording

1. Open the reel's address in Chrome, in a portrait window (9:16; the game fills it at 1080 × 1920 inside). The device toolbar (F12, then the phone icon) with a 1080 × 1920 custom size works well.
2. Wait for the level to show **Tap to play**, start the screen recorder, then tap once: the reel begins.
3. Stop recording once the end card has shown for 3 seconds (30 or 60 seconds after the tap). Trim the first tap off the start.

Music and sound play as in the game. For a silent clip, turn them off in the pause panel of a normal game first: the switches are remembered.

### Frame by frame

Add `&capture` (for example `?demo=drops30&capture`) to record without dropped frames: the reel starts at once (no **Tap to play**), the game loop stops, and each call of `window.__capture.step()` in the page moves the game on exactly 1/30 s, however long drawing takes; `window.__capture.frames` is the reel's frame count. A recorder (for example headless Chrome driven over the DevTools protocol) grabs a 1080 × 1920 screenshot after each step and joins them into a 30 fps video. Such clips have no sound.

## Making a reel

The reels are in `DEMO_SCENES` in `src/scenes/demo.ts`. Each has a start level (0-based: level 1 is `0`), a length in seconds (end card included), the kinds of stroke the hand takes in turn (`strokes`: `down`, `diagL`, `diagR`, `up`, `sweepR`, `sweepL`, `zigzag`; a kind listed twice comes twice as often; all of them by default) and a list of steps run in order. If the steps run out before the end card, the hand keeps swiping; if they run long, the end card cuts them off.

| Step | What it does |
|---|---|
| `{ speed: true }` | Turn x2 on (`false`: off); it stays on across cuts |
| `{ wait: s }` | Wait `s` seconds |
| `{ swipe: 'varied' }` | One stroke of the reel's next kind, now |
| `{ auto: s }` | Keep swiping for `s` seconds (stops early with 30% of the picture left) |
| `{ cut: n, ff: s }` | Slide to level `n` (0-based), played on for `s` seconds behind the cut so the shot starts mid-level |
| `{ hide: true }` | The hand slides off the right edge |

A shot that is fast-forwarded too far (`ff`) can start with less than 30% of the picture left and end at once; use a smaller `ff` for small pictures (levels 1 and 2). The script also has steps for tapping boosters and buttons (`tap`, `until`), which these reels do not use.
