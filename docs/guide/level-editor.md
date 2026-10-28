# Level Editor

The level editor runs in the browser: [open the Level Editor](https://tuandds.github.io/colony-flow-sand/demo/editor.html) (or the **Level Editor** button on the landing page). On the dev server: http://localhost:8080/editor.html. Its labels are in Vietnamese. It follows the team's level editor template: an **Editor** mode with four panels and an **Organizer** mode for chapter sets.

It turns an image into a sand picture, grain by grain, in the game's own colours, then builds nests that a recorded play wins. It uses the game's own code (`src/game/levels.ts`, `src/game/sim.ts`, `src/game/bot.ts`), so what it shows is what the game plays.

## Toolbar

| Button | What it does |
|---|---|
| Editor / Organizer | Switch mode |
| 🏠 | Open the game |
| ▶ | Play the current level in the floating phone panel (`index.html?custom=preview`) |
| 🤖 | **Auto Play**: replay the recorded winning game in the phone panel (the test bot plays when there is no recording) |
| 💾 | Save the Level Bank and chapter sets in the browser (`Ctrl+S`) |
| ⬆ / ⬇ | Import JSON (one level, a list or an export) / download the current level |
| 🕘 | Level Bank backups: the last 15 saves, restorable |

The phone panel can be dragged by its title bar, resized from its corner, reloaded or opened in its own window. Each panel can be collapsed (–) and resized by dragging the bar between panels; double-click a bar to reset it.

## 1. Colour Bank

- **Active Palette**: the level's own colours, plus the eraser. Every colour in the picture is always in it. Tap or drag a Bank colour into the box to add one; drag one back onto the Bank to take it off (only if the picture doesn't use it). Keys `1`–`0` pick the first ten. Long-press or right-click a colour to edit it.
- **Bank** ("every colour a single-word key"): starts as 24 sand colours (`BANK_COLOURS` in `src/game/levels.ts`): colours of the built-in pictures and of the team template's bank (purple, orchid, lilac, royal, aqua and more), with colours that look alike removed (CIELAB distance under about 20). A Bank saved before gets the new colours added and the removed ones dropped, once; colours you changed or added stay. Pictures that use a removed colour still draw it. Each row has a handle (⠿, drag to reorder), a swatch and its name. Tap a colour to paint with it; long-press or right-click to edit it.
- **Edit colour**: change the name (one word, no spaces, unique) or the colour, take it off this level's Active Palette, or delete it. A colour a picture uses can't be deleted. A changed colour changes that sand in every level using it, from its next save.
- **＋ Add colour** adds a colour to the Bank (up to 52); **↺** resets the Bank to the 24 default colours. The Bank is kept in the browser (`cf_editor_bank`); each level saves its own colours, so the game shows them as they were when it was saved.

## 2. Sand Editor

- A summary line (`colours › blocks › grains`) and notes: no sand, more than 12 colours, more than 420 blocks, colours with fewer than 64 grains (they make no block and are cut), and whether the nests are checked.
- **Counts**: blocks and grains per colour, after the game's exact-fit trim.
- **🖼️ Create sand picture from an image…** opens the generator (below). You can also drop an image anywhere on the editor or paste one (`Ctrl+V`).
- The picture is drawn as sand, one pixel per grain, with the in-game grain shading, inside a copy of the game's frame. The canvas is exactly the frame's inside: a picture that touches its edge here touches the frame in the game. At size 20 that is 178 × 160 grains (the frame is a little wider than tall). Every 8 × 8 grains is one cell (faint grid); every 64 grains of a colour make one block.
- Tools: ✏️ paint (`B`), 🧽 erase (`E`), 🪣 fill a region (`G`), 🔁 replace a whole colour (`R`), 💧 pick (`I`); right-click erases; brush size 2–24 grains (`[` `]`); `Ctrl+Z` / `Ctrl+Shift+Z` undo and redo.
- **Settings**: name, difficulty (nest size, from very easy 6–10 blocks to very hard 12–18), status (WIP / REVIEW / LIVE) and a WIP comment (500 characters), saved with the level.

### Generator

Settings: only the Active Palette's colours (optional), picture size (12–24 cells: the frame is that many cells tall, 96–192 grains, and about 1.11 times as wide), how the image sits in the frame (fit the whole image, or fill the frame and crop), most colours (2–12, the outline not counted), background removal (grains this close in CIELAB to the image's corner colour become empty; transparent pixels are always empty), speckle smoothing (passes of a 3 × 3 majority filter), and an optional dark outline 4 grains wide (off by default, so the picture keeps the image's own edge).

How it works: every grain takes the nearest palette colour in CIELAB, so "near" means "looks alike". While there are too many colours, it drops the colour whose loss changes the picture least, so a small but distinct detail (a red roof, a sun) is kept. Loose specks smaller than 64 grains are removed, because the game would let them fall at once. The preview shows the result as sand with its block counts; **Apply** replaces the picture.

## 3. Nest Editor

- **Nest columns**: 2 to 6 (default 4). The game spreads the columns around the screen centre, closer together past 4. Changing the count drops the current nests, so generate them again.
- A summary line (`nests › blocks in nests / blocks in the picture`) and a chip per colour showing whether the nests hold exactly the picture's blocks.
- **🤖 Auto-generate nests** finds nests the level can be won with. It runs up to 4 attempts at once in web workers and keeps the first one that wins twice:
  1. **Recorded play** (8 tries). The bot plays the picture from the bottom up, digging colours an open nest wants first and waiting while the belt is busy. Each column always has a nest. When one is done, the next opens at once for the colour most common on the belt, or about to arrive, or lowest in the picture. A nest that already holds most of its minimum size closes early when the belt gets crowded. The nests and the swipes are saved with the level (`nests`, `moves`). The check replays the same swipes against those nests. The game's rules use a seeded random generator, so the replay plays out exactly like the recording, which proves a winning set of swipes exists.
  2. **Fixed orders**: `rows` (bottom-up) and `onion` (outside-in) with seeds 0–5, played by the test bot.
  3. If nothing wins, the same again with nests one step smaller.
- The log shows each attempt; a failed one says whether it failed while recording or while replaying, what the front nests still needed and what was on the belt.
- **Edit nests by hand**: click a nest to change its colour or size, move it up/down or to another column, or delete it; ＋ adds a nest to a column. Drag a nest onto another nest to swap the two, or onto a column's ＋ to move it to the end of that column. Hand edits remove the ✓ and the recorded swipes.
- **Advanced**: the fixed order and seed, and a button that drops recorded or hand-made nests.

## 4. Level Bank

- Chips filter the list by chapter set (ALL = the whole bank).
- **＋ New Level**, **＋ Chapter Set**, search by name, filters (status, difficulty, check) and undo for bank actions.
- Each row: number, drag handle (drag to reorder), preview, name, status, colours, blocks, check (✓ checked, ! changed since, – not checked), difficulty, version history (the last 10 saved versions of that level), duplicate, delete.
- **Save** keeps everything in the browser (`localStorage`: `cf_custom_levels`, `cf_custom_chapters`, plus history and backups). **Play all** opens the game with `?custom=1`, which plays the bank instead of the built-in levels.
- **Export / Import** JSON; **Copy TS** copies the current level as a `LevelDef` to paste into `LEVELS` in `src/game/levels.ts`.

## Organizer

- **Chapter Sets** (left): new, rename (with a description), duplicate, delete, and import a set from JSON (its levels are added to the bank). "All levels" shows the bank itself.
- **Chapter Builder** (right): the set's levels as a table with order, name (click to open in the Editor), preview, blocks, nests, colours, status, difficulty, nest check, Auto Play result and check result. Drag rows to reorder; status and difficulty can be changed in place.
- Buttons: select levels / select all / delete selected (from the set; in "All levels" they are deleted from the bank), add levels, undo, save, **Play chapter** (the set's levels in order in the phone panel), **Auto Play set** (replays every level's recorded win in the workers, or lets the bot play), **Check set** (no sand, nests that don't fit, unchecked nests, too many colours, too large, no name), export CSV and JSON, edit set, delete set.

## Level format

A custom level is a `LevelDef` with `sand` (`size` grains tall = `n × 8`, `w` grains wide = the frame's width, see `frameGrains` in `src/game/layout.ts`; `data` run-length encoded row by row: a colour key followed by its run length, `.` = empty), `colors` (key → hex, from `SAND_PALETTE`), `chunk`, `order`, `seed`, `salt`, `cols` (nest columns, 2–6, default 4) and, when a recorded play found them, `nests` (each column front to back as `[colour, blocks]`) and `moves` (the winning swipes as `[time, points]`). The editor also stores `id`, `status`, `comment`, `verified` and `updated`; the game ignores them. The game uses `nests` only when they hold exactly the picture's blocks; otherwise it falls back to `order` and `seed`. Levels from the first editor version (cell pictures in `rows`) are converted to grains when opened and need their nests generated again.
