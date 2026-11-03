// Screen layout and tuning, in game pixels (the game is 1080 x 1920, scaled to fit).

export const W = 1080, H = 1920;
/** Bumped when the board, funnel, conveyor or picture scale change, the funnel's or ants' rules change,
 * or the whole-block trim takes different grains: recorded swipes from an older version no longer
 * replay, so the level editor asks for new ones. */
export const LAYOUT_VERSION = 16;

// Laid out like the Sugar Drop prototype: a HUD row, big boosters under it with the x2 button
// beside them, the picture frame with its funnel ending in a gate on the conveyor, then the nests.
/** The FRAME_N-cell picture square: as tall as the frame's inside, centred across it. */
export const PIC = { x: 540 - 385, y: 333, size: 770 };
/** Inner edge of the board frame; sand never goes outside it. Its width makes the frame 136 grains
 * wide (frameGrains: 4 grains either side of the picture square), so a full frame, 136 x 128
 * grains, is exactly 272 blocks. */
export const INNER = { x: 540 - 412, y: PIC.y - 3, w: 824, h: PIC.size + 6 };
/** Top of the funnel: as wide as the sand frame, right under it (the frame art's light blue runs on
 * into the funnel, so sand leaving the board drops straight in). */
export const FRAME = { x: INNER.x, y: INNER.y + INNER.h, w: INNER.w };
/** The hole at the bottom of the funnel: where the frame art's spout ends, over its gate. */
export const MOUTH = { x: 540, y: FRAME.y + 183 };

// The funnel is part of the sand grid (Sim): sand leaving the board falls on into it, piles up
// against its curved sides and goes down the hole at MOUTH_RATE grains a second.
export const MOUTH_RATE = 540;
/** The picture frame art (img/frame.png, 1627 x 2000): its inside is 1521 px wide from x 52; a
 * grey band runs along its top (art y 52 to 92) and the light blue under it starts at y 92 with
 * rounded corners of its own. The board, INNER, is drawn on the light blue from y 92 down to
 * y 1484, where its bottom corners have just begun to round (so the art is about 3 % taller than
 * wide on screen); the funnel then curves in under the frame to the spout (art y 1813), and the
 * art's gate is under the spout, just above the conveyor. */
export const FRAME_ART = { x: 52, y: 92, w: 1521, h: 1392, imgW: 1627, imgH: 2000 };
// the frame art is drawn with its inside's board part on INNER
const ART_KX = INNER.w / FRAME_ART.w, ART_KY = INNER.h / FRAME_ART.h;
/** Where blocks come out: the opening of the gate at the bottom of the frame art (art y 1935, under
 * the spout); a finished block waits there and drops from there onto the belt. */
export const GATE_OUT = { x: 540, y: Math.round(INNER.y + (1935 - FRAME_ART.y) * ART_KY) };
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
    [1484, 751], [1496, 743.5], [1508, 731], [1520, 647], [1532, 590.5], [1544, 548.5], [1556, 512.5], [1568, 480.5],
    [1580, 450.5], [1592, 421.5], [1604, 394.5], [1616, 368.5], [1628, 343.5], [1640, 319.5], [1652, 295.5], [1664, 272.5],
    [1676, 250.5], [1688, 229], [1700, 208.5], [1712, 187.5], [1724, 168], [1736, 149], [1748, 130.5], [1760, 114],
    [1772, 99.5], [1784, 87.5], [1796, 79.5], [1808, 72.5], [1813, 67],
];
// how far the frame art's rim reaches into its inside on each side at art y: the rounded top
// corners of the light blue under the grey band, and at the bottom where its corners begin to
// round toward the funnel
const RIM_IN: [number, number][] = [
    [92, 39], [93, 36], [94, 33], [96, 29], [98, 25], [100, 22], [102, 20], [104, 17], [106, 15], [108, 13], [110, 12],
    [113, 10], [116, 8], [120, 6], [125, 4], [130, 2], [135, 0], [1443, 0], [1454, 1.5], [1466, 4], [1474, 6], [1480, 8], [1484, 9],
];
/** Whether screen point (x, y) of the picture area is inside the frame art's light blue: sand
 * outside it (the rounded corners) would show over the rim. */
export function insideFrame(x: number, y: number) {
    const inset = lookup(RIM_IN, artY(y)) * ART_KX;
    return x - INNER.x >= inset && INNER.x + INNER.w - x >= inset;
}

/** Whether grain (c, r) of the full frame picture (frameGrains(n), as the level editor keeps it)
 * lies inside the frame's rounded inside; the game cuts the grains that don't. Across, the frame's
 * grains are stretched to fill its inside exactly (see Sim.gsx). */
export function grainInFrame(c: number, r: number, n = FRAME_N) {
    const { w, gs } = frameGrains(n);
    return insideFrame(INNER.x + ((c + 0.5) * INNER.w) / w, PIC.y + (r + 0.5) * gs);
}

export function funnelHalf(y: number) {
    return lookup(FUNNEL_SIDES, artY(y)) * ART_KX;
}

/** The conveyor's track (its straight runs from cxL to cxR, round ends of radius r) and its band:
 * under the frame's gate with a small gap, as in the Sugar Drop layout. */
export const BELT = { cxL: 203, cxR: 877, cy: 1492, r: 50, band: 52 };
export const BELT_LEN = 2 * (BELT.cxR - BELT.cxL) + 2 * Math.PI * BELT.r;
export const SLOTS = 36;
export const SLOT_GAP = BELT_LEN / SLOTS;
export const BELT_SPEED = 300;
export const DROP_S = MOUTH.x - BELT.cxL;
export const BLOCK = 32; // block cubes on the conveyor, px

/** Nest columns: 4 by default; a level can ask for MIN_COLS to MAX_COLS (level editor). */
export const COLS = 4, MIN_COLS = 2, MAX_COLS = 6;
/** Distance between the centres of two neighbouring nest columns, for a level of n columns. */
export const colGap = (n = COLS) => Math.min(172, 940 / n);
/** Centre x of column ci of n, spread around the screen centre (closer together past 4). */
export function colX(ci: number, n = COLS) {
    return 540 + (ci - (n - 1) / 2) * colGap(n);
}
export const ROW_GAP = 130;
/** Extra space below the front row, so the queued nests clear its white outline. */
export const FRONT_GAP = 28;
export const ROW_TOP = BELT.cy + 166; // two rows show, the third down to its number, the rest wait below the screen
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
export const BOOSTER_POS = BOOSTER_IMAGES.map((_, i) => ({ x: 380 + i * 160, y: 209 }));
export const PAUSE_BTN = { x: 36, y: 40, w: 104, h: 108 };
export const SPEED_BTN = { x: 850, y: 173, w: 140, h: 72 };

export const ANT_SPEED = 420; // px/s, matched to Colony Flow
export const SUB = 8; // sand grains per picture cell, per side
/** Every level's frame is FRAME_N cells tall, so sand cells are the same size in every level;
 * a smaller picture sits centred in the frame. It was 22 (188 x 176 grains of about 4.4 px); at 16
 * a grain is about 6 px, 1.375 times as big, and a frame holds about half as many (136 x 128). */
export const FRAME_N = 16;
/** Grain size the sand's motion was tuned at (FRAME_N 22), in px; speeds and sizes in grains are
 * scaled by GRAIN_K so sand moves and breaks up the same on screen at any grain size. */
export const TUNED_GRAIN_PX = 770 / 176;
export const GRAIN_K = TUNED_GRAIN_PX / (770 / (FRAME_N * 8));
/** Grain zoom a level may use, from 1 (the normal frame, FRAME_N cells tall) to MAX_ZOOM: its grains
 * are that many times as big, so the same grains make a bigger picture (the frame then holds fewer).
 * A zoomed frame is a whole number of grains tall, so the zoom is FRAME_N * 8 / its height. */
export const MAX_ZOOM = 2;
/** The frame (in cells, n of frameGrains) of a grain zoom: a whole number of grains tall. */
export const zoomFrameN = (z: number) => Math.round((FRAME_N * 8) / z) / 8;
/** The grain zoom whose frame is w x h grains, or null when w x h is no zoomed frame. */
export function frameZoom(w: number, h: number) {
    const H = FRAME_N * 8;
    if (!Number.isInteger(h) || h > H || h < Math.ceil(H / MAX_ZOOM) || frameGrains(h / 8).w !== w) return null;
    return H / h;
}
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
