# Game Design Document

**Colony Flow Sand** · Game Design Document · tracks build `latest` (see [Changelog](./changelog))

This document describes what Colony Flow Sand is, how it plays, and why it is built the way it is. Every number in it (timings, formulas, sizes, colours) comes from the current code. If the two disagree, the code is right and this document has a bug.

## How to read this document

Each feature carries a status:

| Badge | Meaning |
|---|---|
| <Badge type="tip" text="Live" /> | In the current build and playable at [the demo](https://tuandds.github.io/colony-flow-sand/demo/). |
| <Badge type="warning" text="Coming soon" /> | Designed or planned, **not in the game yet**. Details may change before it ships. |

Coordinates and sizes are in **world pixels** on the 1080 × 1920 portrait game canvas, scaled to fit the screen.

## Contents

| Part | Chapters |
|---|---|
| **I. Vision** | [1. Overview](./overview) |
| **II. Gameplay** | [2. Core loop](./core-loop) · [3. Rules & mechanics](./rules) |
| **III. Production** | [4. Roadmap & open questions](./roadmap) · [5. Changelog](./changelog) |

## One-paragraph summary

A picture made of coloured sand sits in a frame. The player swipes the sand to set it free; it falls, runs down a funnel into a hole and is pressed into small coloured blocks that ride a conveyor. Ant colonies below wait for blocks of their own colour: their ants walk out, grab a matching block and carry it home. Fill every nest to clear the level; let the conveyor overflow and the level is lost.
