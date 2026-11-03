---
pageClass: gdd-wide
---

# 5. Level design rules

| Date | Detail | Publisher |
|---|---|---|
| 2026-11-03 | Document created: rules for drawing, colouring and building levels, adapted from the voxel level guide (Cube Blast, "Procedural Generated Level GUIDE") and colour harmony (complementary, split-complementary, triadic), measured against the 10 current levels | Tuan Dinh Duc |

These rules are for making a level in the Level Editor: the picture, its colours, its nests and its obstacles. Every number comes from the current code or from measuring the 10 current levels. Rules marked **must** are needed for a level to work; the others are guidance that sets how a level reads and plays.

## 1. From the voxel guide to this game

The voxel guide builds a 3D model whose outer art hides coloured inner shells, cleared by shooters with set ammunition. Here a 2D sand picture is fully visible from the start, and its colours reach the nests in the order the player frees the sand. What carries over:

| Voxel guide (Cube Blast) | This game |
|---|---|
| A 3D model, up to 30 × 30 × 30 blocks | A sand picture, up to 136 × 128 grains (16 cells of 8 × 8 grains tall); a full frame is 272 blocks |
| Exterior art over inner colour shells, revealed by shooting | The whole picture shows from the start. The "reveal" is the order colours reach the hole: swiped sand falls straight down, and the funnel lets the first sand down out first |
| Shooters of 20–40 shots in 3 banks | Nests of `chunk × 2` blocks in 2–6 columns (4 by default); only the front nest of a column takes blocks |
| The tray / conveyor | The conveyor: 36 slots; full with no block wanted = lost |
| Six-neighbour connectivity: no floating voxels | Sand islands must hold together: 40 grains or fewer, or thinner than 3 grains, fall by themselves |
| Exact ammunition per colour | Nests hold exactly the picture's blocks of each colour (64 grains a block) |
| Validation: an exact winning replay and three play styles | The Level Editor's **Tự sinh tổ kiến**: the bot plays and must win twice (✓), then a playtest |
| A unique subject, kept in subjects.json | A unique subject, kept in the [Levels](./levels) table |

What does not carry over: hidden inner shells (nothing is hidden here except under [Frozen](./core-gameplay#obstacle-frozen)), the 30-block size, and shooter ammunition rules.

## 2. The brief

Before drawing, write down:

- **Subject:** one clear thing or one small scene. It **must** not repeat a subject already in the game (a recolour or a new pose is not a new subject). Current subjects: strawberry, mushroom, donut, bee, tulips in a pot, whale, chick, clownfish, octopus, ladybug on a leaf, cherries, ice cream, rocket, sleeping cat with flowers, black cat peeking, sailboat, sea turtle, panda, cottage with garden, toucan (see [Levels](./levels)).
- **Silhouette and 2–3 recognition features:** what makes it readable at game size (the cherries' twin stems, the toucan's beak).
- **Palette:** a harmony (see [3.2](#_3-2-picking-a-palette)) plus neutrals, 3–6 colours in all.
- **Difficulty target** (see [7](#_7-difficulty)) and **release plan:** which colours the player can free early, which come late.

Make and save levels in the Level Editor. Edit an existing level only when asked; a new level gets a new slot.

## 3. Colours

Every colour in the picture becomes blocks and nests. Colours come only from the 30 standard colours (Colour Bank).

### 3.1 The 30 colours on the colour wheel

Placed on the 12-part wheel of the reference images by hue (CIELAB: L* is lightness, 0 black to 100 white):

| Wheel | Light (L* > 75) | Mid | Dark (L* < 40) |
|---|---|---|---|
| Red | | red, lightpink | maroon |
| Vermilion / Orange | lightorange | orangered, brown | |
| Amber | yellow, orange | olive | |
| Yellow | lightyellow | | |
| Chartreuse | yellowgreen, lightgreen | olivegreen | |
| Green | lime | green | darkgreen |
| Teal | turquoise, springgreen | | |
| Blue | cyan | skyblue, teal, navy | darkblue |
| Violet / Purple | | blue, lavender | purple |
| Magenta | | magenta, pink | |
| Neutral | white | | black |

Names follow the voxel materials, not their look: **blue** is a violet blue, **orange** a golden yellow, **orangered** the true orange.

### 3.2 Picking a palette

Pick the picture's main colours with one harmony, then add neutrals:

| Harmony | What it is | Examples in the standard colours |
|---|---|---|
| Complementary | 2 colours opposite on the wheel: the strongest contrast | red + green · orangered + navy · yellow + purple · yellowgreen + magenta · lightorange + teal · orange + lavender |
| Split-complementary | 1 colour + the 2 beside its opposite: strong but softer | red + yellowgreen + turquoise · orangered + teal + purple · yellow + purple + magenta · green + magenta + lightorange · navy + lightorange + yellow |
| Triadic | 3 colours evenly spaced: balanced and lively | red + yellow + navy · orangered + green + purple · lightorange + yellowgreen + blue · orange + teal + magenta |

- **No outline:** pictures have no black outline; an outline would spend one of the level's few colours. Every colour is part of the subject.
- **Neutrals** don't count in the harmony: **black** only where the subject is black (stripes, spots, eyes), **white** for highlights, spots, bellies.
- One **light/dark pair** of the same hue may be used for shading (navy + skyblue, green + darkgreen) when they pass 3.3.
- **Count:** 3–6 colours in all. Levels 1–10 use 3 (4 on levels 5 and 10); the full-frame levels 4–6. More than 6 makes too many nest colours for 4 columns.

### 3.3 Contrast (must)

Measured with CIEDE2000 (ΔE₀₀, the distance the eye sees) and the lightness difference ΔL*:

- **Never in one level** (ΔE₀₀ under 12, they read as one colour as small blocks on the belt): lightgreen + lime (5), lightgreen + yellowgreen (7), lightyellow + yellow (8), blue + purple (9), blue + navy (9), lime + yellowgreen (9), green + olivegreen (10), orange + yellow (11).
- **ΔE₀₀ 12–20:** together only when ΔL* is 15 or more and they don't touch in the picture (orange + orangered, navy + purple, springgreen + turquoise, skyblue + teal, lightpink + pink, cyan + teal, darkblue + navy and the like).
- **Neighbouring areas:** ΔE₀₀ 20 or more, or ΔL* 20 or more, so the edge where one colour ends is clear when swiping (there is no outline to separate them).
- **Against the game's own colours:** on a picture that leaves the frame showing, **cyan** and **white** (ΔE₀₀ 17 and 18 from the frame's light blue) go only inside the picture, never on its edge (a white belly inside a navy whale, not a white spout against the frame). **Lavender** and **skyblue** blocks blend into the belt (ΔE₀₀ 15 and 19 from its slate); use them for small amounts or next to strong colours.

### 3.4 Amount of each colour

- Each colour should make at least one full nest: `chunk[0] × 2` blocks or more (8 blocks, 512 grains, for chunk 4–6). A smaller colour leaves one small nest; allow it once per level, on purpose.
- **Background:** in full-frame scenes it is the largest colour (40–50 % of the blocks today). Keep it at **50 % or less**; past that, split it into two tones (sky and ground, near and far water).

## 4. Drawing the picture

### 4.1 Size and composition

- Two formats: a **subject on the empty frame** (levels 1–12: about 3,100–7,900 grains, 50–125 blocks, 18–45 % of the frame) or a **full-frame scene** (levels 13–20: about 268 blocks, 98 %).
- **Size curve:** levels 1–10 rise from about 3,100 to 7,900 grains (they were 6,000–15,000 before grains grew 1.375 times). A subject near the top of the range fills most of the frame, so it must be roughly as wide as it is tall (a tall, thin subject cannot: make it a group, as the three tulips of level 5).
- Centre the subject; leave the bottom of the frame's rounded corners empty (sand is cut there).
- Build the big shapes first, then the features; exaggerate the recognition features.
- **Parts of one colour merge** where they touch (there is no outline between them): leave a gap of at least 4 grains between parts that must read apart (tentacles, legs, petals), or put another colour between them.
- For a scene: a ground band, one focal subject, supporting shapes, and clear gaps (a path, sky, water) so the subject's outline stays readable.

### 4.2 Sizes (must)

At game size a grain is about 6 px and a cell (8 grains) about 48 px.

| What | Minimum | Why |
|---|---|---|
| Any piece of sand | 41 grains, 3 grains thick | Smaller islands (40 grains or fewer, or thinner than 3) come loose by themselves every 0.5 s; the image converter drops pieces under 41 |
| A readable detail (eye, window, stripe) | 1 cell (8 grains) across | Smaller shapes don't read at game size |
| A patch of one colour | more than 6 grains | The converter turns smaller patches into the colour round them |
| Empty holes inside the picture | none | The frame's light blue shows through as pale dots (the converter fills holes of 6 grains or fewer) |

Repeating details (fence posts, stripes, windows) get even spacing. No random speckle: grain, texture and shading come from the game's sand rendering, not from mixed colours.

## 5. Release order (this game's "reveal")

Sand stays put until swiped; freed sand falls straight down, runs into the funnel and comes out in the order it went down. A front nest takes only its colour, and anything else waits on the belt. So what matters is **where each colour sits vertically**:

- **Compact areas:** give each colour one or two compact areas. A colour spread over the whole height can only finish its nests near the end, and the belt fills with it meanwhile. (Today most colours span 80–97 % of the picture's height; that is the main reason the full-frame levels are hard.)
- **Stack, don't scatter:** contrasting colours stacked from bottom to top let the player choose which to free next; colours mixed into thin layers force mixed blocks onto the belt.
- **Early colours at the bottom:** the colours of the front nests should be reachable at or near the bottom of the picture, so the level can start smoothly.
- **Background:** it comes down all through the level; spread its nests over all columns.

## 6. Nests

- **Exact (must):** the nests of each colour hold exactly its blocks. The editor checks this, and the game falls back to building its own nests when they don't fit.
- **Size:** `chunk × 2` blocks a nest: chunk 3–5 makes nests of 6–10 blocks, 4–6 makes 8–12, 5–8 makes 10–16.
- **Columns:** 4 (2–6 allowed). Keep column lengths within one nest of each other and their block totals within about 10 %.
- **Spread:** spread each colour over the columns; avoid three nests of one colour in a row in a column; the front row should want colours from the bottom of the picture.
- **Check (must):** use **Tự sinh tổ kiến** in the Level Editor. The bot plays the picture and records its swipes; the level gets a ✓ when the bot wins twice. Hand edits to nests remove the ✓: generate or check again.
- **Belt room:** watch the fill gauge in a playtest. A level that needs the belt over about 2/3 full for long stretches leaves little room for mistakes; keep that for hard levels.

## 7. Difficulty

| Lever | Easy | Normal | Hard |
|---|---|---|---|
| Picture | Subject on the empty frame (3,000–5,000 grains, ~50–80 blocks) | Subject (6,000–8,000 grains) or full frame | Full frame (~270 blocks) |
| Colours | 3 | 4 | 5–6 |
| Chunk (nest size) | 3–5 | 4–6 | 5–8 |
| Colour spread (height each colour spans) | Compact, under ½ | Up to ¾ | Spread or layered |
| Frozen | — | 0–1 | 1–2 |

## 8. Obstacles: Frozen

- **Winnable (must):** the count must be at most the number of nests that can be finished **without** the sand under the ice; otherwise the game locks.
- **Place it** over colours that also exist outside the ice, on a broad area at least 3 × 3 cells; not over the only patch of a colour.
- **Counts:** 5–25; one or two areas a level.
- Keep the subject's main recognition feature readable: the ice shows the picture through it, but softened.

## 9. Before a level goes LIVE

- [ ] Subject is new, and the brief matches the result.
- [ ] 3–6 colours, all standard, no outline; no pair under ΔE₀₀ 12; neighbours contrast; no white or cyan on the edge (3.3).
- [ ] Sizes in 4.2 hold: no specks, holes, or thin pieces that fall by themselves.
- [ ] Background at 50 % of the blocks or less; each colour at least one full nest (or one deliberate exception).
- [ ] Nests exact; ✓ from **Tự sinh tổ kiến** after the last edit.
- [ ] Frozen counts are winnable (8).
- [ ] Playtested in the editor's iPhone playtest: the picture reads, the belt has room.
- [ ] Status WIP → REVIEW → LIVE; [Levels](./levels) table and [Changelog](./changelog) updated.

## 10. Current levels against these rules

Measured on 2026-11-03, at the current grain size (block counts about half of what they were with the smaller grains). Levels 1–10 follow these rules (from colony-flow-levels (7).json); 11–20 are the earlier set.

| Level | Colours | Blocks | Largest colour | Closest pair (ΔE₀₀) | Notes |
|---|---|---|---|---|---|
| level_1 Strawberry | 3 | 49 | 60 % | green / yellow (37) |  |
| level_2 Mushroom | 3 | 52 | 55 % | white / orange (28) |  |
| level_3 Donut | 3 | 64 | 60 % | orange / pink (49) |  |
| level_4 Bee | 3 | 67 | 54 % | white / yellow (32) |  |
| level_5 Tulips | 4 | 87 | 47 % | brown / orangered (33) |  |
| level_6 Whale | 3 | 61 | **68 %** | navy / teal (27) | Navy over the 55 % guide |
| level_7 Chick | 3 | 78 | 50 % | yellow / orangered (21) |  |
| level_8 Clownfish | 3 | 102 | 50 % | orangered / white (35) | A little white reaches the edge (24 grains) |
| level_9 Octopus | **4** | 111 | **72 %** | magenta / purple (27) | A 4th colour (skyblue mouth, 3 blocks: one small nest); magenta over the guide |
| level_10 Ladybug | 4 | 126 | 49 % | black / red (38) |  |
| level_11 | 3 | 57 | 47 % | black / olivegreen (35) |  |
| level_12 | 3 | 56 | 53 % (black) | black / pink (50) | Outline-heavy: the outline is over half the blocks |
| level_13 | 4 | 268 | 50 % | lightyellow / white (31) | Colours span 49–95 % of the height |
| level_14 | 4 | 268 | 40 % | yellow / yellowgreen (22) | Colours span 62–97 % |
| level_15 | 6 | 268 | 26 % | yellow / yellowgreen (22) |  |
| level_16 | 4 | 267 | 43 % | lightorange / white (30) |  |
| level_17 | 4 | 268 | 46 % | cyan / white (25) | Colours span 78–97 % |
| level_18 | 4 | 267 | 49 % | yellowgreen / yellow (22) |  |
| level_19 | 4 | 268 | 30 % | pink / white (22) |  |
| level_20 | 6 | 269 | 22 % | yellowgreen / lightyellow (**14**) | Under 15: next to each other they may be hard to tell apart |

All 20 hold the "must" rules on sizes, specks, holes and exact nests. The full-frame levels spread most colours over most of the picture's height, which makes them harder than their colour count suggests (see 5).
