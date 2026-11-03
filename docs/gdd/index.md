# Game Design Document

**Colony Flow Sand** · Game Design Document · tracks build `latest` (see [Changelog](./changelog))

This document describes what Colony Flow Sand is and how it plays. Every number in it (timings, sizes, colours) comes from the current code. If the two disagree, the code is right and this document has a bug.

| | |
|---|---|
| **Title** | Colony Flow Sand |
| **Genre** | Casual colour-sort puzzle |
| **Platform** | Web (mobile portrait first) |
| **Engine** | Phaser 4, TypeScript, Vite; three.js for the 3D ants, nests and blocks |
| **Pitch** | Swipe a sand picture apart and feed the colours to hungry ant colonies, without letting the conveyor between them overflow. |
| **Target player** | Casual mobile players who like calm, tactile puzzles: short sessions, one finger, satisfying sand physics, light planning about which colour to release next. |

## Contents

| Part | Chapters |
|---|---|
| **I. Gameplay** | [1. Core gameplay](./core-gameplay) (overview, then one table per screen zone: sand board & funnel, conveyor, nests & ants, HUD & boosters, result screens) · [2. User Flow & UI](./user-flow-ui) (the flow between screens and every screen, live or to build in Unity) · [3. Booster](./booster) (Activate, Shuffle, Fan: states, rules, purchase) · [4. Levels](./levels) |
| **II. Production** | [5. Roadmap & open questions](./roadmap) · [6. Changelog](./changelog) |

## How to read this document

Each feature carries a status:

| Badge | Meaning |
|---|---|
| <Badge type="tip" text="Live" /> | In the current build and playable at [the demo](https://tuandds.github.io/colony-flow-sand/demo/). |
| <Badge type="warning" text="Coming soon" /> | Designed or planned, **not in the game yet**. Details may change before it ships. |

Coordinates and sizes are in **world pixels** on the 1080 × 1920 portrait game canvas, scaled to fit the screen.

## One-paragraph summary

A picture made of coloured sand sits in a frame. The player swipes the sand to set it free; it falls, runs down a funnel into a hole and is pressed into small coloured blocks that come out of a gate onto a conveyor. Ant colonies below wait for blocks of their own colour: their ants walk out, grab a matching block and carry it home. Fill every nest to clear the level; let the conveyor overflow and the level is lost.
