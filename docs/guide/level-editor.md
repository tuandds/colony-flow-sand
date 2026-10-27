# Level Editor

The level editor runs in the browser: [open the Level Editor](https://tuandds.github.io/colony-flow-sand/demo/editor.html) (or the **Level Editor** button on the landing page). On the dev server: http://localhost:8080/editor.html. Its labels are in Vietnamese.

It turns an image into a sand picture made of the game's own colours, then builds nests that the test bot can beat. It uses the game's own code (`src/game/levels.ts`, `src/game/sim.ts`, `src/game/bot.ts`), so what it shows is what the game plays.

## Toolbar

| Button | What it does |
|---|---|
| 🏠 | Open the game |
| ▶ | Play the current level in a phone frame (`index.html?custom=preview`) |
| 💾 | Save the level list in the browser (`Ctrl+S`) |
| ⬇ | Download the current level as JSON |

## 1. Import image

- Drop an image on the box, click it to choose a file, or paste one (`Ctrl+V`).
- **Grid size** (10–24): picture cells per side. Each cell is one block of sand.
- **Max colours** (2–9, the outline not included).
- **Remove background**: pixels this close (CIELAB distance) to the colour in the image's corners become empty. Transparent pixels are always empty.
- **Dark outline**: adds the dark rim the built-in pictures have.
- **Remove specks**: a single cell with no neighbour of its colour takes its neighbours' colour.

How the picture is made: every pixel picks the nearest colour in the palette (the colours of the 10 built-in pictures, compared in CIELAB so "near" means "looks alike"). Each cell takes the colour most of its pixels picked, or is left empty when most pixels are empty. If there are too many colours, the rarest one is dropped and its cells take their next most common colour, until the limit is met.

Paint tools: ✏️ paint (`B`), 🧽 erase (`E`), 🪣 fill (`G`), 💧 pick (`I`), right-click erases, `Ctrl+Z` undoes. Swatches with a dashed ring are used in the picture.

## 2. Sand picture

- Shows the picture on the game's beige board, with the number of blocks per colour.
- **Checks:** no sand, more than 9 colours, more than 330 blocks, and colours that run from the top of the picture to the bottom (the design rule in [Rules § 3.7](/gdd/rules#_3-7-levels)).
- **Difficulty** sets the nest size range, from very easy (6–10 blocks) to very hard (12–18).

## 3. Nests

**🤖 Auto-generate nests** looks for nests the level can be won with. It runs up to 4 attempts at once in web workers, and keeps the first one that wins twice in a row:

1. **Recorded play** (8 tries): the bot plays the picture from the bottom up, waiting while the belt is busy. Whenever a column has no nest, a nest opens there for the colour most common on the belt. A nest closes early when the belt gets crowded or its colour runs out. The nests it built are saved with the level (`nests`). The check then replays the same swipes against those nests, which proves a winning set of swipes exists.
2. **Fixed orders**: `rows` (bottom-up) and `onion` (outside-in) with seeds 0–5, played by the test bot.
3. If nothing wins, the same again with nests one step smaller.

The log shows each attempt. A failed attempt shows what the front nests still needed and what was on the belt. The four columns show the nests (front nest outlined). Changing the order or seed by hand, the difficulty, or the picture removes the ✓.

## 4. Level Bank

- New, duplicate, move up/down, delete.
- **Save** keeps the list in the browser (`localStorage`, key `cf_custom_levels`).
- **Play all** opens the game with `?custom=1`, which plays this list instead of the built-in levels.
- **Export / Import** JSON: the whole list, or one level from ⬇.
- **Copy TS** copies the current level as a `LevelDef` to paste into `LEVELS` in `src/game/levels.ts`. Its `salt` keeps the nests the same at any position in the list.

## Level format

A custom level is a `LevelDef` with `rows` (one character per cell, `.` = empty), `colors` (character → hex), `chunk`, `order`, `seed`, `salt` and, when a recorded play found it, `nests` (each column front to back as `[colour, blocks]`). The game uses `nests` only when they hold exactly the picture's blocks; otherwise it falls back to `order` and `seed`.
