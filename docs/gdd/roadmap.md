# 4. Roadmap & open questions

## 4.1 What exists today <Badge type="tip" text="Live" />

- Swipe-to-free sand pictures with falling-sand physics, funnel, hole and conveyor
- Ant colonies with 3D Colony Flow nests, ants and blocks
- 10 original levels with rising difficulty, all cleared by a test bot; settings with a level cheat, x2 speed
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
| Add slot, shuffle, claw and flower boosters | [Core loop](./core-loop) |

## 4.3 Known issues {#known-issues}

| Issue | Impact | Planned fix |
|---|---|---|
| Level solvability depends on the nest order and seed; changing a picture can make it unwinnable | A new picture needs a bot or human test before it ships | Generate nests from a simulated play instead of a fixed order |
| The 3D layer is copied into Phaser every frame | Extra GPU upload on low-end phones | Lower its resolution or move to a Phaser-native renderer later |
| Boosters do nothing | Visual only | M2 |

## 4.4 Open questions {#open-questions}

| Question | Options | Current lean |
|---|---|---|
| How to keep big pictures playable | Bigger blocks per level · 5 columns · bigger conveyor | Keep pictures at 22 × 22 or less for now |
