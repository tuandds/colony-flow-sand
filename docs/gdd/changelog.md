# 5. Changelog

Every published version stays playable at its own URL. The [landing page](https://tuandds.github.io/colony-flow-sand/) lists them all.

## latest (main) <Badge type="tip" text="Live" />

- **Levels:** 10 new original pictures (Cherries, Ice Cream, Goldfish, Cupcake, Little Owl, Hot Air Balloon, Cactus Pot, Garden Snail, Rocket, Penguin) with a dark outline and rising difficulty. Each one was cleared by a test bot; the old large levels 4 and 5 are gone.
- **Level Editor** (`/demo/editor.html`), laid out like the team's level editor template, with Editor and Organizer modes. Import an image to get a sand picture made grain by grain in the game's 21 sand colours, closest by eye (CIELAB), keeping small distinct details. Paint with brush, fill and replace tools. Nests are generated from a recorded winning play and checked by replaying it; you can also edit them by hand. The Level Bank has search, filters, version history and backups; the Organizer handles chapter sets, play, Auto Play and checks for a whole set, and CSV/JSON export. Levels are saved in the browser and played with `?custom=1`. See the [guide](/guide/level-editor).
- **Editor pictures fill the frame:** custom pictures cover the frame's whole inside (wider than the built-in square pictures), and the Sand Editor shows exactly that area, so a picture that touches the edge in the editor touches the frame in the game. The generator can fit the image or fill the frame.
- **Nest Editor drag and drop:** drag a nest onto another to swap them, or onto a column's ＋ to move it there.
- **Nest columns per level:** a level can have 2 to 6 nest columns (default 4, as in every built-in level); the Nest Editor has a picker for it.
- **Rules:** the sand, funnel and particle randomness now comes from a generator seeded per level, and ants walk from a nest's front slot rather than its sliding position, so the same swipes always play out the same. The built-in levels were re-checked with the test bot; Rocket now uses seed 1.
- **Funnel:** the funnel is as wide as the sand frame, so sand falls straight into it from anywhere along the board; sand on its gentle walls slides toward the hole. Little Owl now uses nest seed 6.
- **Conveyor capacity:** the conveyor holds 30 blocks (was 24). The test bot still clears every level.
- **Screen layout:** the sand board is taller (inside 824 × 744 px, same width), so built-in pictures are bigger; the conveyor is slimmer with smaller blocks (27 px), and the nests sit lower so the third row shows about two thirds above the tray. Penguin got a new nest seed (6) so the test bot still clears every level. Level editor pictures made for the old frame are re-centred and need their nests generated again.
- **Losing:** the level is lost only when the conveyor is full and no block on it can go into a nest any more; before, a full belt with one more block waiting in the hole lost even while ants could still take blocks. The end panel now says "No block on the belt fits a nest".
- **Block sound:** a new block landing on the belt now plays a short, soft cube sound (`cube_break_1`) instead of the long, loud box drop, which piled up into a shrill noise.
- **Conveyor bar:** the bar in the middle of the conveyor now fills with how full the belt is (green, yellow from 60 %, red from 85 %); before, the fill was drawn under the white bar and only the % showed.
- **Nest numbers:** nests waiting behind the front row show their number without the dark stroke: white on darker tiles, a darker shade of the nest colour on light ones.
- **Nests:** the nests now use Colony Flow's lidded nest box (`Box_v2_T` + `Box_v2_B`), with the white outline hugging its shape.

[Play latest](https://tuandds.github.io/colony-flow-sand/demo/)

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
