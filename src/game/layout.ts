// Screen layout and tuning, in game pixels (the game is 1080 x 1920, scaled to fit).

export const W = 1080, H = 1920;
/** Bumped when the board, funnel, conveyor or picture scale change, the funnel's or ants' rules change,
 * or the whole-block trim takes different grains: recorded swipes from an older version no longer
 * replay, so the level editor asks for new ones. */
export const LAYOUT_VERSION = 13;

// Laid out like the Sugar Drop prototype: a HUD row, big boosters under it with the x2 button
// beside them, the picture frame with its funnel ending in a gate on the conveyor, then the nests.
/** The FRAME_N-cell picture square: as tall as the frame's inside, centred across it. */
export const PIC = { x: 540 - 385, y: 333, size: 770 };
/** Inner edge of the board frame; sand never goes outside it. Its width makes the frame 188 grains
 * wide (frameGrains: 6 grains either side of the picture square), so a full frame, 188 x 176
 * grains, is exactly 517 blocks. */
export const INNER = { x: 540 - 412, y: PIC.y - 3, w: 824, h: PIC.size + 6 };
/** Top of the funnel: as wide as the sand frame, right under it (the frame art's light blue runs on
 * into the funnel, so sand leaving the board drops straight in). */
export const FRAME = { x: INNER.x, y: INNER.y + INNER.h, w: INNER.w };
/** The hole at the bottom of the funnel: at the top of the gate (GATE), where the spout meets it. */
export const MOUTH = { x: 540, y: FRAME.y + 159 };

// The funnel is part of the sand grid (Sim): sand leaving the board falls on into it, piles up
// against its curved sides and goes down the hole at MOUTH_RATE grains a second.
export const MOUTH_RATE = 540;
/** The picture frame art (img/frame.png, 1844 x 2260): its light blue inside is 1750 px wide from
 * x 44 and its straight sides end at y 1745 (inside top at 43), so it is drawn scaled to fit INNER;
 * its funnel then curves in under the frame. */
export const FRAME_ART = { x: 44, y: 43, w: 1750, h: 1702, imgW: 1844, imgH: 2260 };
// the frame art is drawn with its inside's straight part on INNER (a few per cent taller than wide)
const ART_KX = INNER.w / FRAME_ART.w, ART_KY = INNER.h / FRAME_ART.h;
const artY = (y: number) => FRAME_ART.y + (y - INNER.y) / ART_KY;
/** Linear lookup in a [art y, value] table (clamped at its ends). */
function lookup(t: [number, number][], ay: number) {
    let i = 0;
    while (i < t.length - 2 && ay > t[i + 1][0]) i++;
    const [y0, a] = t[i], [y1, b] = t[i + 1];
    return ay <= y0 ? a : ay >= y1 ? b : a + ((b - a) * (ay - y0)) / (y1 - y0);
}
// half the funnel's inside width at art y, measured from the frame art (its sides curve in)
const FUNNEL_SIDES: [number, number][] = [
    [1745, 688], [1770, 614], [1795, 552.5], [1820, 497.5], [1845, 447], [1870, 399], [1895, 353.5], [1920, 309],
    [1945, 267], [1970, 225.5], [1995, 186], [2020, 148], [2045, 115], [2070, 93], [2095, 79.5], [2120, 71], [2145, 66.5],
];
// how far the frame art's rim reaches into its inside on each side at art y: its rounded top
// corners, and at the bottom where its rim curves in toward the funnel
const RIM_IN: [number, number][] = [
    [43, 49], [47, 32], [51, 24], [55, 19], [59, 14], [63, 11], [67, 8], [71, 6], [75, 4], [79, 3], [83, 2], [87, 1],
    [91, 0], [1678, 0], [1686, 2], [1694, 5], [1702, 10], [1710, 17], [1718, 29], [1726, 113], [1734, 158], [1742, 189], [1745, 200],
];
/** Whether screen point (x, y) of the picture area is inside the frame art's light blue: sand
 * outside it (the rounded corners) would show over the rim. */
export function insideFrame(x: number, y: number) {
    const inset = lookup(RIM_IN, artY(y)) * ART_KX;
    return x - INNER.x >= inset && INNER.x + INNER.w - x >= inset;
}

/** Whether grain (c, r) of the full frame picture (frameGrains(FRAME_N), as the level editor keeps
 * it) lies inside the frame's rounded inside; the game cuts the grains that don't. */
export function grainInFrame(c: number, r: number) {
    const { pad, gs } = frameGrains(FRAME_N);
    return insideFrame(PIC.x + (c - pad + 0.5) * gs, PIC.y + (r + 0.5) * gs);
}

export function funnelHalf(y: number) {
    return lookup(FUNNEL_SIDES, artY(y)) * ART_KX;
}

export const BELT = { cxL: 236, cxR: 844, cy: 1404, r: 62, band: 76 };
/** The gate where the funnel's spout meets the belt (img/box_gate.png, 320 x 124), drawn this wide. */
export const GATE = { x: 540, y: BELT.cy - BELT.r - BELT.band / 2 - 8, w: 150 };
export const BELT_LEN = 2 * (BELT.cxR - BELT.cxL) + 2 * Math.PI * BELT.r;
export const SLOTS = 30;
export const SLOT_GAP = BELT_LEN / SLOTS;
export const BELT_SPEED = 300;
export const DROP_S = MOUTH.x - BELT.cxL;
export const BLOCK = 32; // block cubes on the conveyor, px

/** Nest columns: 4 by default; a level can ask for MIN_COLS to MAX_COLS (level editor). */
export const COLS = 4, MIN_COLS = 2, MAX_COLS = 6;
/** Centre x of column ci of n, spread around the screen centre (closer together past 4). */
export function colX(ci: number, n = COLS) {
    return 540 + (ci - (n - 1) / 2) * Math.min(172, 940 / n);
}
export const ROW_GAP = 130;
/** Extra space below the front row, so the queued nests clear its white outline. */
export const FRONT_GAP = 28;
export const ROW_TOP = BELT.cy + 190; // two rows show, the third down to its number, the rest wait below the screen
export const TILE = 126;
/** The nest box art (Sugar Drop kit) in a few colours, with the colour of its top face; a nest
 * takes the art nearest its colour, recoloured to it. */
export const NEST_BOXES: [string, [number, number, number]][] = [
    ['nest_box_red', [227, 52, 55]], ['nest_box_blue', [52, 121, 243]], ['nest_box_sky', [43, 188, 241]],
    ['nest_box_orange', [255, 137, 43]], ['nest_box_pink', [232, 55, 135]], ['nest_box_purple', [159, 51, 235]],
];
/** Activate (wake a waiting nest), Shuffle (nests trade places), Fan (blow the belt's blocks into nests). */
export const BOOSTER_IMAGES = ['bst_claw', 'bst_shuffle', 'bst_flower'];
/** Boosters: a row under the HUD, above the picture frame (as in Sand Drop). */
/** Booster buttons: BOOSTER_SIZE wide, in a row under the HUD with the x2 button beside them. */
export const BOOSTER_SIZE = 126;
export const BOOSTER_POS = BOOSTER_IMAGES.map((_, i) => ({ x: 380 + i * 160, y: 232 }));
export const PAUSE_BTN = { x: 36, y: 40, w: 104, h: 108 };
export const SPEED_BTN = { x: 850, y: 196, w: 140, h: 72 };

export const ANT_SPEED = 420; // px/s, matched to Colony Flow
export const SUB = 8; // sand grains per picture cell, per side
/** Every level's frame is FRAME_N cells tall, so sand cells are the same size in every level;
 * a smaller picture sits centred in the frame. */
export const FRAME_N = 22;
export const GRAINS_PER_UNIT = SUB * SUB;
export const UNITS_PER_BLOCK = 1; // units of sand (one picture cell each) that compress into a block
// level nest sizes were tuned for 5-unit blocks; scale them so nests ask for the same amount of sand
export const NEST_SCALE = 2 / UNITS_PER_BLOCK;
export const BLOCK_GRAINS = UNITS_PER_BLOCK * GRAINS_PER_UNIT;
export const SIM_HZ = 110; // falling-sand steps per second

/**
 * The sand area of an n-cell picture, in grains: the picture is n * SUB grains tall and the
 * simulated area reaches the frame on both sides (`pad` grains beyond the picture square), so
 * a level editor picture that is `w` grains wide fills the frame from side to side.
 */
export function frameGrains(n: number) {
    const h = n * SUB, gs = PIC.size / h, pad = Math.floor((PIC.x - INNER.x) / gs);
    return { w: h + 2 * pad, h, pad, gs };
}

export function nestPos(ci: number, ri: number, n = COLS): [number, number] {
    return [colX(ci, n), ROW_TOP + ROW_GAP * ri + (ri > 0 ? FRONT_GAP : 0)];
}

export function beltPoint(s: number): [number, number] {
    const straight = BELT.cxR - BELT.cxL, arc = Math.PI * BELT.r;
    const top = BELT.cy - BELT.r, bot = BELT.cy + BELT.r;
    if (s < straight) return [BELT.cxL + s, top];
    s -= straight;
    if (s < arc) { const a = -Math.PI / 2 + s / BELT.r; return [BELT.cxR + Math.cos(a) * BELT.r, BELT.cy + Math.sin(a) * BELT.r]; }
    s -= arc;
    if (s < straight) return [BELT.cxR - s, bot];
    s -= straight;
    const a = Math.PI / 2 + s / BELT.r;
    return [BELT.cxL + Math.cos(a) * BELT.r, BELT.cy + Math.sin(a) * BELT.r];
}
