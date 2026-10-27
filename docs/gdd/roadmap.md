# 4. Roadmap & open questions

## 4.1 What exists today <Badge type="tip" text="Live" />

- Swipe-to-free sand pictures with falling-sand physics, funnel, hole and conveyor
- Ant colonies with 3D Colony Flow nests, ants and blocks
- 10 levels (levels 1–5 use Colony Flow pictures), settings with a level cheat, x2 speed
- Phaser 4 + TypeScript port of the original HTML prototype

## 4.2 Roadmap <Badge type="warning" text="Coming soon" />

### M1: Playable levels
| Item | Chapter |
|---|---|
| Make the large levels 4 and 5 playable (bigger blocks or a 5th nest column) | [Rules](./rules) |
| Pictures for levels 6–10 from Colony Flow | [Overview](./overview) |

### M2: Boosters
| Item | Chapter |
|---|---|
| Add slot, shuffle, claw and flower boosters | [Core loop](./core-loop) |

## 4.3 Known issues {#known-issues}

| Issue | Impact | Planned fix |
|---|---|---|
| Levels 4 and 5 have 484–637 blocks; a test player cannot clear them | Those levels are not winnable in practice | Bigger blocks or 5 nest columns for large pictures |
| The 3D layer is copied into Phaser every frame | Extra GPU upload on low-end phones | Lower its resolution or move to a Phaser-native renderer later |
| Boosters do nothing | Visual only | M2 |

## 4.4 Open questions {#open-questions}

| Question | Options | Current lean |
|---|---|---|
| How to keep big pictures playable | Bigger blocks per level · 5 columns · bigger conveyor | Undecided |
