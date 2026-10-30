// Screen layout and tuning, in game pixels (the game is 1080 x 1920, scaled to fit).

export const W = 1080, H = 1920;
/** Bumped when the board, funnel, conveyor or picture scale change, the funnel's or ants' rules change,
 * or the whole-block trim takes different grains: recorded swipes from an older version no longer
 * replay, so the level editor asks for new ones. */
export const LAYOUT_VERSION = 12;

// Laid out like Sand Drop: Color Sort Puzzle: a HUD row, the boosters under it, a big picture
// frame nearly as wide as the screen, then the funnel, the conveyor and the nests.
/** Inner edge of the board frame; sand never goes outside it. Its width makes the frame 188 grains
 * wide (frameGrains), so a full frame, 188 x 176 grains, is exactly 517 blocks. */
export const INNER = { x: 105, y: 330, w: 870, h: 820 };
export const BOARD = { x: INNER.x - 23, y: INNER.y - 25, w: INNER.w + 46, h: INNER.h + 54 };
/** The FRAME_N-cell picture square: as tall as the frame's inside, centred across it. */
export const PIC = { x: 540 - 407, y: INNER.y + 3, size: 814 };
/** Top of the funnel: as wide as the sand frame. */
export const FRAME = { x: INNER.x, y: INNER.y + INNER.h + 14, w: INNER.w, bottom: INNER.y + INNER.h + 34 };
export const MOUTH = { x: 540, y: FRAME.y + 120 };

// Sand that has left the board piles up in the funnel and trickles into the hole at MOUTH_RATE.
// Each funnel cell holds one falling clump (up to GRAINS_PER_PARTICLE grains).
export const FUNNEL = { x0: FRAME.x + 1, top: FRAME.y + 18, cell: 6, cols: Math.floor(FRAME.w / 6), rows: Math.ceil((MOUTH.y + 4 - FRAME.y - 18) / 6) };
export const FUNNEL_HZ = 40, MOUTH_RATE = 90; // sim steps per second, clumps into the hole per second
/** The picture frame art (img/frame.png, 1844 x 2260): its light blue inside is 1750 px wide from
 * x 44 and its straight sides end at y 1745 (inside top at 43), so it is drawn scaled to fit INNER;
 * its funnel then curves in under the frame. */
export const FRAME_ART = { x: 44, y: 43, w: 1750, h: 1702, imgW: 1844, imgH: 2260 };
// half the funnel's inside width at screen y, measured from the frame art (its sides curve in)
const FUNNEL_SIDES: [number, number][] = [
    [1150, 342], [1160, 310], [1170, 284], [1180, 261], [1190, 239], [1200, 218], [1210, 198], [1220, 180],
    [1230, 161], [1240, 143], [1250, 126], [1260, 110], [1270, 93], [1280, 77], [1290, 63],
];
// how far the frame art's rim reaches into INNER on each side at screen y: its rounded top
// corners, and at the bottom where its rim curves in toward the funnel (measured from the art)
const RIM_IN: [number, number][] = [
    [330, 24.4], [332, 15.9], [334, 11.9], [336, 9.4], [338, 7], [340, 5.5], [342, 4], [344, 3], [345, 2],
    [347, 1.5], [349, 1], [351, 0.5], [353, 0], [1114, 0], [1119, 0.5], [1124, 1.5], [1128, 4.5], [1133, 8.5],
    [1138, 16.9], [1143, 68.6], [1148, 90.5], [1152, 107.4],
];
/** Whether screen point (x, y) of the picture area is inside the frame art's light blue: sand
 * outside it (the rounded corners) would show over the rim. */
export function insideFrame(x: number, y: number) {
    const t = RIM_IN;
    let i = 0;
    while (i < t.length - 2 && y > t[i + 1][0]) i++;
    const [y0, a] = t[i], [y1, b] = t[i + 1], inset = y <= y0 ? a : y >= y1 ? b : a + ((b - a) * (y - y0)) / (y1 - y0);
    return x - INNER.x >= inset && INNER.x + INNER.w - x >= inset;
}

/** Whether grain (c, r) of the full frame picture (frameGrains(FRAME_N), as the level editor keeps
 * it) lies inside the frame's rounded inside; the game cuts the grains that don't. */
export function grainInFrame(c: number, r: number) {
    const { pad, gs } = frameGrains(FRAME_N);
    return insideFrame(PIC.x + (c - pad + 0.5) * gs, PIC.y + (r + 0.5) * gs);
}

export function funnelHalf(y: number) {
    const t = FUNNEL_SIDES, i = Math.max(0, Math.min(t.length - 2, Math.floor((y - t[0][0]) / 10)));
    const [y0, h0] = t[i], [y1, h1] = t[i + 1];
    return h0 + ((h1 - h0) * (y - y0)) / (y1 - y0);
}
export const FMASK = new Uint8Array(FUNNEL.cols * FUNNEL.rows);
for (let j = 0; j < FUNNEL.rows; j++) for (let i = 0; i < FUNNEL.cols; i++) {
    const cx = FUNNEL.x0 + (i + 0.5) * FUNNEL.cell, cy = FUNNEL.top + (j + 0.5) * FUNNEL.cell;
    if (Math.abs(cx - MOUTH.x) <= funnelHalf(cy) - FUNNEL.cell * 0.6) FMASK[j * FUNNEL.cols + i] = 1;
}
export const FMASK_COUNT = FMASK.reduce((a, b) => a + b, 0);

export const BELT = { cxL: 236, cxR: 844, cy: MOUTH.y + 120, r: 62, band: 76 };
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
/** Activate (wake a waiting nest), Shuffle (nests trade places), Fan (blow the belt's blocks into nests). */
export const BOOSTER_IMAGES = ['bst_claw', 'bst_shuffle', 'bst_flower'];
/** Boosters: a row under the HUD, above the picture frame (as in Sand Drop). */
export const BOOSTER_POS = BOOSTER_IMAGES.map((_, i) => ({ x: 540 + (i - (BOOSTER_IMAGES.length - 1) / 2) * 190, y: 226 }));
export const PAUSE_BTN = { x: 36, y: 40, w: 104, h: 108 };
export const SPEED_BTN = { x: 852, y: 44, w: 190, h: 104 };

export const ANT_SPEED = 420; // px/s, matched to Colony Flow
export const DRAIN_RATE = 260; // picture cells per second
export const SUB = 8; // sand grains per picture cell, per side
/** Every level's frame is FRAME_N cells tall, so sand cells are the same size in every level;
 * a smaller picture sits centred in the frame. */
export const FRAME_N = 22;
export const GRAINS_PER_UNIT = SUB * SUB;
export const GRAINS_PER_PARTICLE = 6;
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
