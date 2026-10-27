// Screen layout and tuning, in game pixels (the game is 1080 x 1920, scaled to fit).

export const W = 1080, H = 1920;

export const BOARD = { x: 105, y: 172, w: 870, h: 723 };
/** Inner edge of the board frame; sand never goes outside it. */
export const INNER = { x: 128, y: 197, w: 824, h: 669 };
export const PIC = { x: 210, y: 200, size: 660 };
export const FRAME = { x: 300, y: 880, w: 480, bottom: 900 };
export const MOUTH = { x: 540, y: 990, half: 46 };

// Sand that has left the board piles up in the funnel and trickles into the hole at MOUTH_RATE.
// Each funnel cell holds one falling clump (up to GRAINS_PER_PARTICLE grains).
export const FUNNEL = { x0: 300, top: 898, cell: 6, cols: 80, rows: 16 };
export const FUNNEL_HZ = 40, MOUTH_RATE = 90; // sim steps per second, clumps into the hole per second
export const funnelHalf = (y: number) => 240 + ((MOUTH.half - 240) * (y - FRAME.y)) / (MOUTH.y - FRAME.y);
export const FMASK = new Uint8Array(FUNNEL.cols * FUNNEL.rows);
for (let j = 0; j < FUNNEL.rows; j++) for (let i = 0; i < FUNNEL.cols; i++) {
    const cx = FUNNEL.x0 + (i + 0.5) * FUNNEL.cell, cy = FUNNEL.top + (j + 0.5) * FUNNEL.cell;
    if (Math.abs(cx - MOUTH.x) <= funnelHalf(cy) - FUNNEL.cell * 0.6) FMASK[j * FUNNEL.cols + i] = 1;
}
export const FMASK_COUNT = FMASK.reduce((a, b) => a + b, 0);

export const BELT = { cxL: 300, cxR: 780, cy: 1135, r: 80, band: 96 };
export const BELT_LEN = 2 * (BELT.cxR - BELT.cxL) + 2 * Math.PI * BELT.r;
export const SLOTS = 24;
export const SLOT_GAP = BELT_LEN / SLOTS;
export const BELT_SPEED = 300;
export const DROP_S = MOUTH.x - BELT.cxL;
export const BLOCK = 50;

export const COLS = 4;
export const COL_X = [0, 1, 2, 3].map((i) => 540 + (i - 1.5) * 174);
export const ROW_GAP = 146;
export const ROW_TOP = 1368; // three rows show above the tray, the rest wait below it
export const TILE = 126;
export const TRAY_Y = 1712;
export const BOOSTER_IMAGES = ['bst_add', 'bst_shuffle', 'bst_claw', 'bst_flower'];
export const BOOSTER_POS = BOOSTER_IMAGES.map((_, i) => ({ x: 186 + i * 236, y: 1790 }));
export const PAUSE_BTN = { x: 36, y: 40, w: 104, h: 108 };
export const SPEED_BTN = { x: 852, y: 44, w: 190, h: 104 };

export const ANT_SPEED = 420; // px/s, matched to Colony Flow
export const DRAIN_RATE = 260; // picture cells per second
export const SUB = 8; // sand grains per picture cell, per side
export const GRAINS_PER_UNIT = SUB * SUB;
export const GRAINS_PER_PARTICLE = 6;
export const UNITS_PER_BLOCK = 1; // units of sand (one picture cell each) that compress into a block
// level nest sizes were tuned for 5-unit blocks; scale them so nests ask for the same amount of sand
export const NEST_SCALE = 2 / UNITS_PER_BLOCK;
export const BLOCK_GRAINS = UNITS_PER_BLOCK * GRAINS_PER_UNIT;
export const SIM_HZ = 110; // falling-sand steps per second

export function nestPos(ci: number, ri: number): [number, number] {
    return [COL_X[ci], ROW_TOP + ROW_GAP * ri];
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
