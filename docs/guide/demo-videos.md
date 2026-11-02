# Demo Videos

The game can play itself for marketing clips. A hand swipes the sand and taps the boosters, as a player would: every swipe really frees the sand under the fingertip, so what the clip shows is real play. Each reel is short shots of different levels; between shots the next level slides in from the right and pushes the last one out to the left. No reel plays a level to the win, and none lets the conveyor fill up (no Out of Space).

Every reel runs a set length from the tap that starts it. Its last 3 seconds are the end card: the last frame blurs and dims, the Sugar Drop logo pops in, and a green **PLAY NOW** button keeps growing and shrinking.

## The reels

Add `?demo=<reel>` to the game's address, for example [demo/?demo=play30](https://tuandds.github.io/colony-flow-sand/demo/?demo=play30) (on the dev server: http://localhost:8080/?demo=play30).

| Reel | Length | What it shows |
|---|---|---|
| `play30` | 30 s | Level 1 from the first swipes, then levels 5, 9 (x2) and 7 |
| `speed30` | 30 s | Quick shots of seven levels at x2 (3, 10, 1, 7, 8, 6, 4) |
| `fan30` | 30 s | The Fan twice: the conveyor fills with blocks (levels 9 and 10), the ball cannon blows them into their nests |
| `boost30` | 30 s | Activate (the claw) wakes a waiting nest and Shuffle swaps the nests, on levels 6 and 8 |
| `play60` | 60 s | Seven levels, about seven seconds each (1, 3, 10, 5, 7, 2, 8), x2 from the third |
| `boosters60` | 60 s | Every booster: the Fan (level 9), the claw and Shuffle (level 6), the claw (level 8), the Fan again (level 10) |
| `montage60` | 60 s | All ten levels, about five seconds each, at x2 |

The hand's strokes take turns: down from the middle to the bottom, diagonally down from the left and from the right, up from the bottom, along the bottom left to right and right to left, and a zigzag down to the bottom. Every stroke reaches the bottom of the sand under it, so the sand it frees runs out at once. Each one is placed over the sand the front nests want, and the hand waits while the conveyor is busy. Shots stop with about a third of the picture left.

A reel does not save progress or change the levels a player has unlocked. Each run differs a little (the strokes are placed at random), so record a few takes and keep the best.

## Recording

1. Open the reel's address in Chrome, in a portrait window (9:16; the game fills it at 1080 × 1920 inside). The device toolbar (F12, then the phone icon) with a 1080 × 1920 custom size works well.
2. Wait for the level to show **Tap to play**, start the screen recorder, then tap once: the reel begins.
3. Stop recording once the end card has shown for 3 seconds (30 or 60 seconds after the tap). Trim the first tap off the start.

Music and sound play as in the game. For a silent clip, turn them off in the pause panel of a normal game first: the switches are remembered.

### Frame by frame

Add `&capture` (for example `?demo=play30&capture`) to record without dropped frames: the reel starts at once (no **Tap to play**), the game loop stops, and each call of `window.__capture.step()` in the page moves the game on exactly 1/30 s, however long drawing takes; `window.__capture.frames` is the reel's frame count. A recorder (for example headless Chrome driven over the DevTools protocol) grabs a 1080 × 1920 screenshot after each step and joins them into a 30 fps video. Such clips have no sound.

## Making a reel

The reels are in `DEMO_SCENES` in `src/scenes/demo.ts`. Each has a start level (0-based), a length in seconds (end card included) and a list of steps run in order. If the steps run out before the end card, the hand keeps swiping; if they run long, the end card cuts them off.

| Step | What it does |
|---|---|
| `{ wait: s }` | Wait `s` seconds |
| `{ swipe: 'varied' }` | One stroke now (`'auto'`: where the test bot would; `'jam'`: over colours no nest wants; or a list of screen points) |
| `{ auto: s }` | Keep swiping for `s` seconds (stops early with 30% of the picture left, unless `finish: true`); `mode: 'jam'` fills the conveyor up to `belt` blocks |
| `{ cut: n, ff: s }` | Slide to level `n` (0-based), played on for `s` seconds behind the cut so the shot starts mid-level; `ffMode: 'jam'` with `ffBelt: k` plays on until `k` blocks are on the conveyor or on their way |
| `{ speed: true }` | Turn x2 on (`false`: off) |
| `{ tap: name }` | Tap a booster (`'booster:0'` claw, `'booster:1'` Shuffle, `'booster:2'` Fan) or a nest (`'nest:column,row'`, 0-based, row 1 is the first waiting row) |
| `{ until: 'calm', max: s }` | Wait until no booster is at work (the Fan's cannon, Shuffle); also `'belt'` (the conveyor holds `belt` blocks), `'win'`, `'lose'`, `'end'`; at most `s` seconds |
| `{ hide: true }` | The hand slides off the right edge |

Boosters unlock at levels 3, 6 and 9 (0-based 2, 5 and 8), so taps on a booster only work from those levels on. A shot that is fast-forwarded too far (`ff`) can start with less than 30% of the picture left and end at once; use a smaller `ff` for small pictures.
