# 1. Overview

| | |
|---|---|
| **Title** | Colony Flow Sand |
| **Genre** | Casual colour-sort puzzle |
| **Platform** | Web (mobile portrait first) |
| **Engine** | Phaser 4, TypeScript, Vite; three.js for the 3D ants, nests and blocks |

## 1.1 Pitch

Swipe a sand picture apart and feed the colours to hungry ant colonies, without letting the conveyor between them overflow.

## 1.2 Target player

Casual mobile players who like calm, tactile puzzles: short sessions, one finger, satisfying sand physics, light planning about which colour to release next.

## 1.3 Look and feel <Badge type="tip" text="Live" />

- Colony Flow art: beige board, checker background, blue booster tray, Lilita One font.
- The nests, ants and sand blocks are Colony Flow's 3D models (the lidded nest box `Box_v2_T` + `Box_v2_B`, `Ant_VAT_Mesh`, `Cube_v3.1`), rendered live with three.js and shown inside the Phaser scene.
- The sand is fine: every picture cell is split into 8 × 8 grains with a little colour noise each.
- Pictures are original pixel art in a bold style: flat colours with a dark outline around each picture.
