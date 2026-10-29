# 5. Changelog

Every published version stays playable at its own URL. The [landing page](https://tuandds.github.io/colony-flow-sand/) lists them all.

## latest (main) <Badge type="tip" text="Live" />

- **Background zoomed in:** the wooden planks are about 2.6 times wider (about 140 px, was 54), like the reference.
- **Boosters unlock one by one:** Activate at level 3, Shuffle at level 6, Fan at level 9 (the Fan was at level 5).
- **Fan unlocks at level 5:** in levels 1–4 the third booster is a grey button with a padlock; tapping it shows "Unlocks at Level 5".
- **Booster buttons like Sand Drop:** green square buttons with new pictures (magnet for Activate, arrows for Shuffle, ball cannon for Fan), a red badge with the uses left and a green plus when none are left; Activate gets a yellow frame while it waits for a nest. The falling fan is unchanged.
- **Fan animation:** using the Fan dims the screen and drops the ball cannon into the middle; it sucks the conveyor's blocks into its mouth one by one, then shoots them one at a time, 0.2 s apart and 1.5 times their size in flight, into their nests. The game holds still until the last block is in its nest; the rules are unchanged.
- **x2 speed:** the x2 button always shows the speed the game runs at, and stopping Auto Play goes back to normal speed.
- **Background:** the page background is Food Hunt's light wooden planks (it was Colony Flow's picnic cloth).
- **Boosters work:** three boosters, 1 use each per level. **Activate** wakes a nest waiting behind the front row (tap the booster, then the nest), so ants fill it too. **Shuffle** makes the nests trade places. **Fan** blows every block on the conveyor into a nest of its colour, upper rows first. Activate uses the claw icon; the add-slot icon is gone. Without boosters the rules play out exactly as before (the test bot's results are unchanged).
- **Win screen like Colony Flow's:** "Level N" over "Victory!", Colony Flow's two cheering ants (yellow and pink, put together from their `win_char` parts) jumping in turn either side of a pile of coins in the glow, and confetti raining down (paper strips that flip as they fall, white and yellow stars, shapes and curly streamers). The Next button is replaced by Colony Flow's two reward buttons, a yellow one with an ad badge (80 coins) and a green one (40); there are no coins yet, so both just go on to the next level.
- **Ant paths:** ants no longer all chase their block along the belt. Each leaves from its own spot on the nest and heads off its block by its own amount, from chasing it to cutting across to where they meet, so the paths vary. This changes the timing, so recorded wins in the Level Editor need to be made again (not re-checked with the test bot).
- **Sand Drop layout:** the screen is laid out like Sand Drop: Color Sort Puzzle. The picture frame is bigger and nearly as wide as the screen (inside 864 × 820 px, was 824 × 744), so sand cells are bigger (37 px, was 33.5); the boosters sit in a row under the level title instead of a tray at the bottom; the x2 button uses Colony Flow's speed button (grey off, green on) with its fast-forward icon; the funnel, conveyor (832 px wide, was 704) and nests moved down, and the nest columns are 172 px apart; the third nest row shows down to its number, as before. Recorded wins in the Level Editor need to be made again. The test bot still clears every built-in level.
- **Nest rows:** the nests waiting behind the front row sit 28 px lower, so they no longer touch the front nests' white outline.
- **Pause panel:** the pause button opens a panel made from the team's settings art (`public/assets/settings`): board with a red close button, music, sound and vibration switches (remembered), green Restart and red Home buttons, and the level cheat underneath. Vibration buzzes on a filled nest, a win and a loss.
- **Blue frame and conveyor:** after the team's reference screen, the picture frame and the funnel have a white rim around a periwinkle inside, and the conveyor is slate blue with white rims (they were tan and brown). The page background is unchanged.
- **Same sand scale in every level:** the frame is always 22 cells tall, so sand cells and grains are the same size in every level; smaller pictures (Cherries, Ice Cream and others) now sit centred in the frame instead of being blown up. In the Level Editor, picture size (12–22) sets how big the picture is in the frame. Recorded editor wins need to be made again; the bot still clears the same levels as before.

[Play latest](https://tuandds.github.io/colony-flow-sand/demo/)

## v1.0.1

- **Edited levels:** nine built-in levels were changed in the Level Editor (pictures; Cherries, Rocket and Penguin also got nests set by hand). Garden Snail, Rocket and Penguin have no recorded win yet, and the test bot gets stuck on them. The eyes of Goldfish, Little Owl, Garden Snail and Penguin use the outline colour (Little Owl: nest seed 5).
- **Levels:** 10 new original pictures (Cherries, Ice Cream, Goldfish, Cupcake, Little Owl, Hot Air Balloon, Cactus Pot, Garden Snail, Rocket, Penguin) with a dark outline and rising difficulty. Each one was cleared by a test bot when it was added; the old large levels 4 and 5 are gone.
- **Level Editor** (`/demo/editor.html`), laid out like the team's level editor template, with Editor and Organizer modes. Import an image to get a sand picture made grain by grain in the editor's sand colours, closest by eye (CIELAB), keeping small distinct details. Paint with brush, fill and replace tools. Nests are generated from a recorded winning play and checked by replaying it; you can also edit them by hand. The Level Bank has search, filters, version history and backups; the Organizer handles chapter sets, play, Auto Play and checks for a whole set, and CSV/JSON export. Levels are saved in the browser and played with `?custom=1`. See the [guide](/guide/level-editor).
- **Editor pictures fill the frame:** custom pictures cover the frame's whole inside (wider than the built-in square pictures), and the Sand Editor shows exactly that area, so a picture that touches the edge in the editor touches the frame in the game. The generator can fit the image or fill the frame.
- **Win screen like Colony Flow:** "Victory!" pops in letter by letter over glow and turning rays, and a big green Next button pulses (Colony Flow's win art, animated with tweens).
- **Colour Bank like the template:** an Active Palette per level (tap or drag colours in, keys 1–0, eraser), a Bank you can reorder, add to and edit (name, colour, delete) with long-press, and an option to build a picture from the Active Palette only.
- **Colour Bank colours:** the Bank adds the template's colours the game lacked, purples included, and drops colours that looked alike (24 colours); a Bank saved earlier is updated once, keeping your own colours.
- **Funnel order:** sand in the funnel now goes down the hole oldest first. Before, the hole always took the bottom row from the left, so newer sand falling into those cells jumped ahead while older sand lying further along waited (up to 8 s). Recorded wins in the Level Editor were made under the old rules: run Auto-generate nests again for those levels. The built-in levels still win with the test bot.
- **Game levels in the Level Editor:** the 10 built-in levels are in the Level Bank (chapter set "Game"), looking and playing exactly as in the game. When you save a change to one, the game plays the changed version: at once in the same browser, and on the dev server the editor also writes it to `src/game/level-edits.json` so it can be committed and published.
- **Nest Editor drag and drop:** drag a nest onto another to swap them, or onto a column's ＋ to move it there.
- **Nest columns per level:** a level can have 2 to 6 nest columns (default 4, as in every built-in level); the Nest Editor has a picker for it.
- **Rules:** the sand, funnel and particle randomness now comes from a generator seeded per level, and ants walk from a nest's front slot rather than its sliding position, so the same swipes always play out the same. The built-in levels were re-checked with the test bot; Rocket now uses seed 1.
- **Funnel:** the funnel is as wide as the sand frame, so sand falls straight into it from anywhere along the board; sand on its gentle walls slides toward the hole. Little Owl now uses nest seed 6.
- **Conveyor capacity:** the conveyor holds 30 blocks (was 24). The test bot still clears every level.
- **Screen layout:** the sand board is taller (inside 824 × 744 px, same width), so built-in pictures are bigger; the conveyor is slimmer with smaller blocks (32 px), and the nests sit lower so the third row shows about two thirds above the tray. Penguin got a new nest seed (6) so the test bot still clears every level. Level editor pictures made for the old frame are re-centred and need their nests generated again.
- **Losing:** the level is lost only when the conveyor is full and no block on it can go into a nest any more; before, a full belt with one more block waiting in the hole lost even while ants could still take blocks. The end panel now says "No block on the belt fits a nest".
- **Block sound:** a new block landing on the belt now plays a short, soft cube sound (`cube_break_1`) instead of the long, loud box drop, which piled up into a shrill noise.
- **Conveyor bar:** the bar in the middle of the conveyor now fills with how full the belt is (green, yellow from 60 %, red from 85 %); before, the fill was drawn under the white bar and only the % showed.
- **Nest numbers:** nests waiting behind the front row show their number without the dark stroke: white on darker tiles, a darker shade of the nest colour on light ones.
- **Nests:** the nests now use Colony Flow's lidded nest box (`Box_v2_T` + `Box_v2_B`), with the white outline hugging its shape.

[Play v1.0.1](https://tuandds.github.io/colony-flow-sand/v1.0.1/demo/) · [Docs v1.0.1](https://tuandds.github.io/colony-flow-sand/v1.0.1/docs/)

## v1.0.0

- **Sand:** swipe the picture to set sand free; loose sand falls, slides off slopes and past the picture edges, and leaves through the bottom of the board. Every colour fits whole blocks exactly, so no sand is left over.
- **Funnel and hole:** sand piles up in the funnel and trickles into the hole; a finished block waiting in the hole plugs it until it drops onto the conveyor.
- **Conveyor:** 24 slots; the bar in the middle shows how full it is, and overflowing it loses the level.
- **Nests and ants:** Colony Flow's 3D nests, ants and blocks; ants carry matching blocks home, full nests pop and the column slides up. Front-row nests have a white outline, queued nests are lower and paler.
- **Levels:** 10 levels; levels 1–5 use Colony Flow pictures. Levels 4 and 5 are very large and not yet winnable in practice (see [Known issues](./roadmap#known-issues)).
- **UI:** settings with Resume, Restart and a cheat to jump to any level; x2 speed; boosters are shown but do nothing yet.
- **Start-up:** the game no longer waits forever if the web font is slow, shows an error instead of hanging, and shows the nests on the start screen.
- **Game Design Document:** overview, core loop, rules with the numbers from the code, roadmap and known issues.

[Play v1.0.0](https://tuandds.github.io/colony-flow-sand/v1.0.0/demo/) · [Docs v1.0.0](https://tuandds.github.io/colony-flow-sand/v1.0.0/docs/)

## Document history

| Date | Change |
|---|---|
| 2026-10-27 | GDD created |
| 2026-10-27 | Released v1.0.0 |
| 2026-10-28 | Released v1.0.1 |
