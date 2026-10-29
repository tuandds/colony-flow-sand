# 4. Roadmap & open questions

## 4.1 What exists today <Badge type="tip" text="Live" />

- Swipe-to-free sand pictures with falling-sand physics, funnel, hole and conveyor
- Ant colonies with 3D Colony Flow nests, ants and blocks
- 10 original levels with rising difficulty, editable in the Level Editor; 7 are cleared by the test bot; settings with a level cheat, x2 speed
- Level editor: image import to grain-level sand in the game's colours, nests from a recorded winning play, Level Bank and Organizer (chapter sets), played with `?custom=1`; the game's own levels are in its Level Bank and edits reach the game
- Phaser 4 + TypeScript port of the original HTML prototype

## 4.2 Roadmap <Badge type="warning" text="Coming soon" />

### M1: Playable levels
| Item | Chapter |
|---|---|
| Playtest the 10 levels with people and tune nest sizes | [Rules](./rules#_3-7-levels) |
| More levels beyond 10 | [Rules](./rules#_3-7-levels) |

### M2: Boosters
| Item | Chapter |
|---|---|
| ~~Activate, Shuffle and Fan boosters~~ (done) | [Rules](./rules) |
| Earn or buy more booster uses | [Core loop](./core-loop) |

## 4.3 Known issues {#known-issues}

| Issue | Impact | Planned fix |
|---|---|---|
| Built-in level solvability depends on the nest order and seed; changing a picture can make it unwinnable | A new picture needs a bot or human test before it ships | Rebuild the built-in levels' nests with the editor's recorded play |
| Garden Snail, Rocket and Penguin were edited without a recorded win; the test bot gets stuck on them | They may not be winnable | Run Auto-generate nests for them in the editor |
| The editor's check is a bot that digs from the bottom; it is not a human playtest | A level can still feel hard or unfair to people | Playtest editor levels with people |
| The 3D layer is copied into Phaser every frame | Extra GPU upload on low-end phones | Lower its resolution or move to a Phaser-native renderer later |

## 4.4 Open questions {#open-questions}

| Question | Options | Current lean |
|---|---|---|
| How to keep big pictures playable | Bigger blocks per level · 5 columns · bigger conveyor | Keep pictures at 22 × 22 or less for now |
