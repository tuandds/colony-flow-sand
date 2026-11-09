// Sand pictures for the levels. Each level is an N x N grid of colour keys, given either as
// rows of characters ('.' = empty) or painted with simple shapes. Empty cells hold no sand,
// so pictures can have any outline.
import { FRAME_N, PIC, SUB, frameGrains } from './layout';
import EDITS from './level-edits.json';

type Grid = (string | null)[][];
type Test = (x: number, y: number) => boolean;

interface Painter {
    rect(x0: number, y0: number, x1: number, y1: number, k: string): void;
    circle(cx: number, cy: number, r: number, k: string): void;
    ellipse(cx: number, cy: number, rx: number, ry: number, k: string, clip?: Test): void;
    tri(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, k: string): void;
    /** Repaint only cells that already hold sand (details inside a silhouette). */
    inside(test: Test, k: string): void;
    /** Thick straight line from (x0, y0) to (x1, y1), w cells either side of it. */
    line(x0: number, y0: number, x1: number, y1: number, w: number, k: string): void;
    /** Dark outline: every empty cell touching the picture (4-neighbour) gets colour k. */
    outline(k: string): void;
}

export interface LevelDef {
    /** Level editor id; the built-in levels are `builtin-<index>` (see gameLevels). */
    id?: string;
    /** Last save in the level editor (ms). */
    updated?: number;
    name: string;
    n: number;
    /** Nest size range, in 5-unit blocks (scaled by NEST_SCALE). */
    chunk: [number, number];
    colors: Record<string, string>;
    rows?: string[];
    paint?: (p: Painter) => void;
    /** How the nest order is estimated; see Sim.start. */
    order?: 'rows' | 'onion';
    seed?: number;
    /** Seeds the nest layout instead of the level number (custom levels, so their nests don't
     * change when they move in the list). */
    salt?: number;
    /** Nests from a recorded play (level editor), each column front to back as [colour, blocks];
     * used instead of `order` when they hold exactly the picture's blocks. */
    nests?: [string, number][][];
    /** Grain-level picture (level editor): one key per sand grain, see encodeSand. When set it
     * replaces `rows` / `paint`, and its size must be n * SUB. */
    sand?: Sand;
    /** Number of nest columns (default 4). */
    cols?: number;
    /** Frozen areas on the picture (see Frozen). */
    frozen?: Frozen[];
}

/**
 * A frozen area (obstacle): a rectangle or a circle (inscribed in the rectangle) on the picture,
 * in grains of the full frame picture (frameGrains(FRAME_N), as the level editor keeps it: x from
 * its left, y from its top). Its sand can't be swiped and it stops falling sand. Every nest that
 * is removed takes 1 off `count`; at 0 the ice breaks and its sand is like the rest.
 */
export interface Frozen { shape: 'rect' | 'circle'; x: number; y: number; w: number; h: number; count: number }

/** A sand picture at grain resolution: `size` grains tall and `w` wide (default `size`; the
 * level editor uses the whole frame, see frameGrains; a picture as wide as the frame and taller
 * than it is a scroll painting, see Sim.scroll), `data` run-length encoded row by row
 * ('.' = empty, each key followed by its run length when longer than 1). */
export interface Sand { size: number; w?: number; data: string }

export interface Level {
    name: string;
    n: number;
    chunk: [number, number];
    colors: Record<string, string>;
    grid: Grid;
    order?: 'rows' | 'onion';
    seed?: number;
    salt?: number;
    nests?: [string, number][][];
    sand?: Sand;
    cols?: number;
    frozen?: Frozen[];
}

function painter(g: Grid): Painter {
    const n = g.length;
    const each = (test: Test, k: string) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (test(x + 0.5, y + 0.5)) g[y][x] = k;
    };
    const sign = (ax: number, ay: number, bx: number, by: number, px: number, py: number) => (px - bx) * (ay - by) - (ax - bx) * (py - by);
    return {
        rect: (x0, y0, x1, y1, k) => each((x, y) => x >= x0 && x < x1 && y >= y0 && y < y1, k),
        circle: (cx, cy, r, k) => each((x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r, k),
        ellipse: (cx, cy, rx, ry, k, clip) => each((x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 && (!clip || clip(x, y)), k),
        tri: (ax, ay, bx, by, cx, cy, k) =>
            each((x, y) => {
                const d1 = sign(x, y, ax, ay, bx, by), d2 = sign(x, y, bx, by, cx, cy), d3 = sign(x, y, cx, cy, ax, ay);
                const neg = d1 < 0 || d2 < 0 || d3 < 0, pos = d1 > 0 || d2 > 0 || d3 > 0;
                return !(neg && pos);
            }, k),
        inside: (test, k) => each((x, y) => !!g[(y - 0.5) | 0][(x - 0.5) | 0] && test(x, y), k),
        line: (x0, y0, x1, y1, w, k) =>
            each((x, y) => {
                const dx = x1 - x0, dy = y1 - y0, len2 = dx * dx + dy * dy || 1;
                const t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / len2));
                return Math.hypot(x - (x0 + t * dx), y - (y0 + t * dy)) <= w;
            }, k),
        outline: (k) => {
            const edge: [number, number][] = [];
            for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
                if (g[y][x]) continue;
                if ((y > 0 && g[y - 1][x]) || (y < n - 1 && g[y + 1][x]) || (x > 0 && g[y][x - 1]) || (x < n - 1 && g[y][x + 1])) edge.push([x, y]);
            }
            for (const [x, y] of edge) g[y][x] = k;
        },
    };
}

// Ten original pictures in the style of sand-sort puzzle levels: bold dark outline, few flat
// colours, getting bigger and more layered (colours inside colours) as the levels go on.
export const OUTLINE = '#3a2a3a';
const LEVELS: LevelDef[] = [
    {
        name: 'Cherries', n: 14, chunk: [3, 5],
        colors: { r: '#e8344a', w: '#ffd6dc', g: '#5a8f2e', l: '#7cc957', k: OUTLINE },
        paint(p) {
            p.line(4.5, 8, 7.5, 2.5, 0.6, 'g'); p.line(9.5, 8, 7.5, 2.5, 0.6, 'g');
            p.ellipse(9.8, 2.6, 2, 1, 'l');
            p.circle(4.3, 9.6, 2.9, 'r'); p.circle(9.7, 9.9, 2.9, 'r');
            p.rect(3, 8, 4, 9, 'w'); p.rect(8.4, 8.3, 9.4, 9.3, 'w');
            p.outline('k');
        },
    },
    {
        name: 'Ice Cream', n: 16, chunk: [3, 6],
        colors: { c: '#e7b06a', d: '#c88a46', p: '#f59ac2', r: '#e8344a', k: OUTLINE },
        paint(p) {
            p.tri(4, 8.5, 12, 8.5, 8, 15.6, 'c');
            p.inside((x, y) => y > 9 && Math.floor(x + y) % 3 === 0, 'd');
            p.circle(8, 6.4, 4.1, 'p'); p.ellipse(8, 8.6, 4.4, 1.3, 'p');
            p.circle(8, 2, 1.3, 'r');
            p.outline('k');
        },
    },
    {
        name: 'Goldfish', n: 18, chunk: [4, 6], order: 'onion',
        colors: { o: '#ff8c42', y: '#ffc145', b: '#ffe0b8', w: '#ffffff', k: OUTLINE },
        paint(p) {
            p.tri(12.5, 9, 16.8, 4.8, 16.8, 13.2, 'y');
            p.tri(6, 5.6, 11, 5.6, 8.8, 2.8, 'y');
            p.ellipse(8, 9, 6.2, 4.2, 'o');
            p.ellipse(8.4, 11.6, 3.8, 1.3, 'b');
            p.circle(4.8, 8.2, 1.5, 'w'); p.rect(4.3, 7.7, 5.3, 8.7, 'k');
            p.outline('k');
        },
    },
    {
        name: 'Cupcake', n: 18, chunk: [4, 7],
        colors: { b: '#6fb6ff', n: '#4a8fe0', p: '#ff9ec9', y: '#ffe066', g: '#7ad36b', r: '#e8344a', k: OUTLINE },
        paint(p) {
            p.tri(3.6, 10.5, 5, 16.4, 5, 10.5, 'b'); p.tri(14.4, 10.5, 13, 16.4, 13, 10.5, 'b');
            p.rect(5, 10.5, 13, 16.4, 'b');
            p.inside((x, y) => y > 10.5 && Math.floor(x) % 2 === 0, 'n');
            p.circle(5.6, 9.2, 2.6, 'p'); p.circle(9, 7.6, 3.4, 'p'); p.circle(12.4, 9.2, 2.6, 'p');
            p.ellipse(9, 10.2, 5.6, 1.5, 'p');
            p.rect(6, 8, 7, 9, 'y'); p.rect(10.5, 6, 11.5, 7, 'g'); p.rect(12, 9, 13, 10, 'y'); p.rect(8, 9, 9, 10, 'g');
            p.circle(9, 3.6, 1.4, 'r');
            p.outline('k');
        },
    },
    {
        name: 'Little Owl', n: 20, chunk: [5, 8], seed: 5,
        colors: { b: '#8b5a3c', c: '#f1d6b0', w: '#ffffff', y: '#ffb238', k: OUTLINE },
        paint(p) {
            p.tri(4.6, 7, 7, 2.6, 8.4, 6.4, 'b'); p.tri(15.4, 7, 13, 2.6, 11.6, 6.4, 'b');
            p.ellipse(10, 11, 6.4, 7, 'b');
            p.ellipse(10, 13.6, 4, 4.2, 'c');
            p.circle(7.4, 8.8, 2.3, 'w'); p.circle(12.6, 8.8, 2.3, 'w');
            p.rect(7, 8.5, 8.5, 10, 'k'); p.rect(11.5, 8.5, 13, 10, 'k');
            p.tri(8.8, 10.6, 11.2, 10.6, 10, 12.8, 'y');
            p.rect(7, 17.6, 9, 18.6, 'y'); p.rect(11, 17.6, 13, 18.6, 'y');
            p.outline('k');
        },
    },
    {
        name: 'Hot Air Balloon', n: 20, chunk: [5, 8], seed: 3,
        colors: { r: '#ef5350', y: '#ffd54f', b: '#5c9ded', h: '#9c6b3c', d: '#7a4f2a', k: OUTLINE },
        paint(p) {
            p.ellipse(10, 7.6, 6.6, 7, 'r', (_x, y) => y < 13.4);
            p.tri(4.6, 11, 15.4, 11, 10, 15, 'r');
            p.inside((x, y) => y < 14 && Math.abs(x - 10) < 1.6, 'y');
            p.inside((x, y) => y < 14 && Math.abs(Math.abs(x - 10) - 4.3) < 1.1, 'b');
            p.line(7, 14, 8.4, 16.2, 0.4, 'h'); p.line(13, 14, 11.6, 16.2, 0.4, 'h');
            p.rect(7.8, 16.2, 12.2, 19, 'h'); p.rect(7.8, 17.2, 12.2, 18, 'd');
            p.outline('k');
        },
    },
    {
        name: 'Cactus Pot', n: 20, chunk: [5, 8], seed: 1,
        colors: { g: '#4f9e3a', l: '#8fd36a', p: '#ff7eb3', t: '#d9774a', u: '#b9552e', k: OUTLINE },
        paint(p) {
            p.rect(8, 4.6, 12, 13, 'g'); p.circle(10, 4.8, 2, 'g');
            p.rect(4.6, 8, 8, 9.6, 'g'); p.rect(4.6, 5.4, 6.2, 9.6, 'g'); p.circle(5.4, 5.4, 0.8, 'g');
            p.rect(12, 10, 15.4, 11.6, 'g'); p.rect(13.8, 7.4, 15.4, 11.6, 'g'); p.circle(14.6, 7.4, 0.8, 'g');
            p.inside((x, y) => y < 13 && Math.floor(x * 1.7 + y * 2.3) % 5 === 0, 'l');
            p.circle(10, 2.4, 1.4, 'p');
            p.rect(5.4, 13, 14.6, 14.6, 'u');
            p.tri(6, 14.6, 14, 14.6, 13, 19, 't'); p.tri(6, 14.6, 7, 19, 13, 19, 't');
            p.outline('k');
        },
    },
    {
        name: 'Garden Snail', n: 22, chunk: [5, 9],
        colors: { s: '#e39b4a', d: '#b8662a', y: '#c8e06a', g: '#62b84a', k: OUTLINE },
        paint(p) {
            p.rect(1, 18.6, 21, 21, 'g');
            p.rect(3, 15, 19, 17.6, 'y'); p.circle(17.6, 13.8, 2.1, 'y');
            p.line(17, 12.4, 15.8, 8.6, 0.45, 'y'); p.line(18.4, 12.4, 19.8, 9, 0.45, 'y');
            p.circle(15.8, 8.4, 0.8, 'k'); p.circle(19.8, 8.8, 0.8, 'k');
            p.circle(10, 10.4, 5.6, 's');
            p.inside((x, y) => { const d = Math.hypot(x - 10.3, y - 10.6); return y < 15 && ((d > 2.1 && d < 3.3) || d < 1); }, 'd');
            p.outline('k');
        },
    },
    {
        name: 'Rocket', n: 22, chunk: [6, 9], order: 'onion', seed: 1, // the window sits inside the hull
        colors: { w: '#eef1f6', s: '#c3ccd8', r: '#ef5350', b: '#5bc0f5', o: '#ff8c42', y: '#ffd54f', k: OUTLINE },
        paint(p) {
            p.tri(8.6, 15, 13.4, 15, 11, 21, 'o'); p.tri(9.8, 15, 12.2, 15, 11, 19.2, 'y');
            p.tri(7.4, 10.6, 7.4, 16, 4.4, 16.6, 'r'); p.tri(14.6, 10.6, 14.6, 16, 17.6, 16.6, 'r');
            p.ellipse(11, 9, 3.8, 7.4, 'w'); p.rect(7.2, 9, 14.8, 15.4, 'w');
            p.inside((_x, y) => y < 5, 'r');
            // red band and a grey lower hull, so the white hull is not one big block of sand
            p.inside((x, y) => y > 11.6 && y < 13 && x > 7 && x < 15, 'r');
            p.inside((x, y) => y >= 13 && x > 7 && x < 15, 's');
            p.circle(11, 8.8, 1.9, 'b');
            p.outline('k');
        },
    },
    {
        name: 'Penguin', n: 22, chunk: [6, 9], seed: 6,
        colors: { d: '#34405e', n: '#4a78c8', c: '#d9ecff', y: '#ffd04a', w: '#ffffff', o: '#ff9f2e', r: '#e5484d', s: '#ffd1dc', k: OUTLINE },
        paint(p) {
            // a penguin in a red scarf; each colour sits in one area so its nests can fill
            p.ellipse(11, 12.5, 6.4, 7.1, 'n');
            p.circle(11, 6.2, 4.4, 'd');
            p.inside((_x, y) => y < 9.6, 'd');
            p.tri(5.6, 9.4, 2.8, 14.6, 6.6, 14.6, 'n'); p.tri(16.4, 9.4, 19.2, 14.6, 15.4, 14.6, 'n');
            p.ellipse(11, 14.8, 5.1, 5.2, 'w');
            p.ellipse(9.3, 6.4, 1.6, 1.9, 'c'); p.ellipse(12.7, 6.4, 1.6, 1.9, 'c');
            p.circle(9.5, 6.2, 0.8, 'k'); p.circle(12.5, 6.2, 0.8, 'k');
            p.circle(7.3, 8.1, 0.8, 's'); p.circle(14.7, 8.1, 0.8, 's');
            p.tri(9.7, 7.7, 12.3, 7.7, 11, 9.3, 'o');
            p.inside((x, y) => y > 9.5 && y < 10.8 && Math.abs(x - 11) < 5.7, 'r');
            p.rect(13, 10.8, 14.5, 13.8, 'r');
            p.ellipse(8.4, 20.2, 2, 0.8, 'y'); p.ellipse(13.6, 20.2, 2, 0.8, 'y');
            p.outline('k');
        },
    },
];

/**
 * The 30 standard sand colours: the colours of Cube Blast's voxel materials (VoxelMaterials.json,
 * the `Voxel_*` materials), each the middle tone (key 0.5) of the material's shading ramp, since
 * Voxel.shader colours the cubes from that ramp only. `key` is the one-letter key used in a
 * picture's grain data. Pictures in other colours are moved onto these (standardColours).
 */
export const SAND_PALETTE: { key: string; name: string; hex: string }[] = [
    { key: 'u', name: 'black', hex: '#414141' }, { key: 'b', name: 'blue', hex: '#7023ff' }, { key: 'c', name: 'brown', hex: '#8e4e2c' },
    { key: 'r', name: 'cyan', hex: '#00c7ff' }, { key: 'e', name: 'darkblue', hex: '#083b7b' }, { key: 'g', name: 'darkgreen', hex: '#006a15' },
    { key: 'h', name: 'green', hex: '#1fa125' }, { key: 'i', name: 'lavender', hex: '#b375ff' }, { key: 'j', name: 'lightgreen', hex: '#87e542' },
    { key: 'f', name: 'lightorange', hex: '#ffa677' }, { key: 'l', name: 'lightpink', hex: '#ff8f93' }, { key: 'v', name: 'lightyellow', hex: '#ede12c' },
    { key: 'n', name: 'lime', hex: '#50ee1c' }, { key: 'o', name: 'magenta', hex: '#ff00f5' }, { key: 'p', name: 'maroon', hex: '#820a0d' },
    { key: 'z', name: 'navy', hex: '#0044ff' }, { key: 's', name: 'olive', hex: '#95770b' }, { key: 'q', name: 'olivegreen', hex: '#628c18' },
    { key: 't', name: 'orange', hex: '#eebd63' }, { key: 'w', name: 'orangered', hex: '#fd9912' }, { key: 'm', name: 'pink', hex: '#ff83c3' },
    { key: 'x', name: 'purple', hex: '#7623bc' }, { key: 'k', name: 'red', hex: '#ff0039' }, { key: 'A', name: 'skyblue', hex: '#008bff' },
    { key: 'B', name: 'springgreen', hex: '#28e7ad' }, { key: 'C', name: 'teal', hex: '#0f91b7' }, { key: 'D', name: 'turquoise', hex: '#00fff2' },
    { key: 'a', name: 'white', hex: '#ebf5f5' }, { key: 'd', name: 'yellow', hex: '#ffd400' }, { key: 'y', name: 'yellowgreen', hex: '#aef316' },
];
const STD = new Map(SAND_PALETTE.map((c) => [c.key, c.hex.toLowerCase()]));

/** The Colour Bank's colours: the 30 standard colours. */
export const BANK_COLOURS = SAND_PALETTE.map(({ key, name, hex }) => ({ key, name, hex }));

function hexLab(hex: string): [number, number, number] {
    const v = parseInt(hex.slice(1), 16), lin = (c: number) => { c /= 255; return c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92; };
    const r = lin((v >> 16) & 255), g = lin((v >> 8) & 255), b = lin(v & 255);
    const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    const x = f((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047), y = f(r * 0.2126 + g * 0.7152 + b * 0.0722), z = f((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
/** CIEDE2000 colour difference: closer to what the eye sees than a plain CIELAB distance, which
 * makes saturation count too much (a pale lime went to yellow by it). */
function deltaE(p: [number, number, number], q: [number, number, number]) {
    const rad = Math.PI / 180, [L1, a1, b1] = p, [L2, a2, b2] = q;
    const C7 = (c: number) => Math.sqrt(c ** 7 / (c ** 7 + 25 ** 7));
    const G = 0.5 * (1 - C7((Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2));
    const A1 = (1 + G) * a1, A2 = (1 + G) * a2, c1 = Math.hypot(A1, b1), c2 = Math.hypot(A2, b2);
    const h1 = (Math.atan2(b1, A1) / rad + 360) % 360, h2 = (Math.atan2(b2, A2) / rad + 360) % 360;
    let dh = h2 - h1;
    if (c1 * c2 === 0) dh = 0; else if (dh > 180) dh -= 360; else if (dh < -180) dh += 360;
    const dH = 2 * Math.sqrt(c1 * c2) * Math.sin((dh / 2) * rad), L = (L1 + L2) / 2, C = (c1 + c2) / 2;
    const h = c1 * c2 === 0 ? h1 + h2 : Math.abs(h1 - h2) <= 180 ? (h1 + h2) / 2 : (h1 + h2 + (h1 + h2 < 360 ? 360 : -360)) / 2;
    const T = 1 - 0.17 * Math.cos((h - 30) * rad) + 0.24 * Math.cos(2 * h * rad) + 0.32 * Math.cos((3 * h + 6) * rad) - 0.2 * Math.cos((4 * h - 63) * rad);
    const SL = 1 + (0.015 * (L - 50) ** 2) / Math.sqrt(20 + (L - 50) ** 2), SC = 1 + 0.045 * C, SH = 1 + 0.015 * C * T;
    const RT = -Math.sin(60 * Math.exp(-(((h - 275) / 25) ** 2)) * rad) * 2 * C7(C);
    const x = (L2 - L1) / SL, y = (c2 - c1) / SC, z = dH / SH;
    return Math.sqrt(x * x + y * y + z * z + RT * y * z);
}
/** Where a level's colours go among the standard colours: each to the nearest (CIEDE2000),
 * nearest pairs first, and never two of its colours onto one, so its blocks stay the same.
 * Null when the level already uses only standard colours. */
function standardMap(colors: Record<string, string>): Map<string, string> | null {
    const keys = Object.keys(colors).filter((k) => typeof colors[k] === 'string');
    if (keys.every((k) => STD.get(k) === colors[k].toLowerCase())) return null;
    const pairs: [number, string, string][] = [];
    for (const k of keys) {
        const a = hexLab(colors[k]);
        for (const c of SAND_PALETTE) pairs.push([deltaE(a, hexLab(c.hex)), k, c.key]);
    }
    pairs.sort((p, q) => p[0] - q[0]);
    const to = new Map<string, string>(), used = new Set<string>();
    for (const [, k, n] of pairs) if (!to.has(k) && !used.has(n)) { to.set(k, n); used.add(n); }
    return to;
}
/** A level in the standard colours: its grains, rows, nests and palette moved onto them. */
export function standardColours<T extends LevelDef & { palette?: string[] }>(L: T): T {
    const to = standardMap(L.colors);
    if (!to) return L;
    const map = (k: string) => to.get(k) ?? k;
    const out: T = { ...L, colors: Object.fromEntries([...to.values()].map((n) => [n, STD.get(n)!])) };
    if (L.sand) out.sand = { ...L.sand, data: L.sand.data.replace(/[^0-9.]/g, map) };
    if (L.rows) out.rows = L.rows.map((r) => r.replace(/[^.]/g, map));
    if (L.nests) out.nests = L.nests.map((col) => col.map(([k, n]) => [map(k), n] as [string, number]));
    // other palette keys named old colours, so only the picture's own colours stay in it
    if (L.palette) out.palette = [...new Set(L.palette.filter((k) => to.has(k)).map(map))];
    return out;
}

/** Run-length encode one key per grain ('.' = empty), `size` rows of `w` grains. */
export function encodeSand(size: number, keys: string[], w = size): Sand {
    let data = '';
    for (let i = 0; i < keys.length;) {
        let j = i + 1;
        while (j < keys.length && keys[j] === keys[i]) j++;
        data += keys[i] + (j - i > 1 ? j - i : '');
        i = j;
    }
    return w === size ? { size, data } : { size, w, data };
}

export function decodeSand(s: Sand): string[] {
    const out: string[] = [];
    for (const m of s.data.matchAll(/([^0-9])(\d*)/g)) {
        const n = m[2] ? parseInt(m[2], 10) : 1;
        for (let i = 0; i < n; i++) out.push(m[1]);
    }
    out.length = s.size * (s.w ?? s.size);
    return Array.from(out, (k) => k ?? '.');
}

/**
 * A picture made for an older frame, brought to the current one (frameGrains(FRAME_N)):
 * - 186 x 176 (the first grain frame): its outer columns are doubled to make 188 x 176;
 * - 188 x 176 (22 cells, grains of about 4.4 px): resampled to the current grains by where they
 *   sit on screen, each new grain taking the colour that covers most of it (sampled 4 x 4).
 * Frozen areas are moved and scaled the same way (`frozen`). Other sizes come back as they are.
 */
export function toCurrentFrame(keys: string[], w: number, h: number) {
    const F = frameGrains(FRAME_N), same = (f: Frozen) => f;
    if (w === 186 && h === 176) {
        const out: string[] = [];
        for (let y = 0; y < h; y++) { const row = keys.slice(y * w, y * w + w); out.push(row[0], ...row, row[w - 1]); }
        keys = out; w = 188;
    }
    if (w !== 188 || h !== 176 || (F.w === 188 && F.h === 176)) return { keys, w, h, frozen: same };
    // both frames start at the picture square's top; across, each reaches `pad` grains past it
    const O = { gs: PIC.size / h, pad: (w - h) / 2 }, ox = (x: number, g: { gs: number; pad: number }) => (x - g.pad) * g.gs;
    const out = new Array<string>(F.w * F.h), n = new Map<string, number>(), S = 4;
    for (let y = 0; y < F.h; y++) for (let x = 0; x < F.w; x++) {
        n.clear();
        let best = '.', bn = 0;
        for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
            const px = ox(x + (sx + 0.5) / S, F), py = (y + (sy + 0.5) / S) * F.gs;
            const cx = Math.floor(px / O.gs + O.pad), cy = Math.floor(py / O.gs);
            const k = cx >= 0 && cy >= 0 && cx < w && cy < h ? keys[cy * w + cx] : '.';
            const c = (n.get(k) ?? 0) + 1; n.set(k, c);
            if (c > bn) { bn = c; best = k; }
        }
        out[y * F.w + x] = best;
    }
    const k = O.gs / F.gs;
    const frozen = (f: Frozen): Frozen => {
        const x = Math.round(((f.x - O.pad) * O.gs) / F.gs + F.pad), y = Math.round(f.y * k);
        return { ...f, x, y, w: Math.max(2, Math.round(f.w * k)), h: Math.max(2, Math.round(f.h * k)) };
    };
    return { keys: out, w: F.w, h: F.h, frozen };
}

/** Where the level editor keeps its levels; the game plays them with ?custom=1. */
export const CUSTOM_KEY = 'cf_custom_levels';
/** The single level the editor's play button opens (?custom=preview). */
export const PREVIEW_KEY = 'cf_custom_preview';

/** Id of the level editor's copy of built-in level i. */
export const builtinId = (i: number) => 'builtin-' + i;

/**
 * The built-in levels as the level editor keeps them: grain pictures in the Colour Bank's keys
 * (matched by colour) filling the FRAME_N frame, the picture centred in it as the game shows it,
 * with `salt` set to the level's number so the game makes the same nests as for the original.
 */
export function builtinDefs(): LevelDef[] {
    return LEVELS.map((L, i) => {
        // the cell pictures were made for the 22-cell frame (188 x 176 grains): drawn there, then
        // brought to the current grains
        const W0 = 188, H0 = 176, old = new Array<string>(W0 * H0).fill('.');
        const g = buildDef(L).grid, s = L.n * SUB, x0 = Math.floor((W0 - s) / 2), y0 = Math.floor((H0 - s) / 2);
        for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
            const c = g[(y / SUB) | 0][(x / SUB) | 0];
            if (c) old[(y + y0) * W0 + x + x0] = c;
        }
        const { keys, w, h } = toCurrentFrame(old, W0, H0);
        const colors: Record<string, string> = {};
        // buildDef's grid is already in the standard colours
        for (const k of new Set(keys)) if (k !== '.') colors[k] = STD.get(k) ?? L.colors[k];
        const { paint: _p, rows: _r, ...rest } = L;
        return standardColours({ ...rest, id: builtinId(i), n: FRAME_N, colors, sand: encodeSand(h, keys, w), salt: L.salt ?? i });
    });
}

/** The order the game plays the built-in levels in, by index (`builtin-<i>`): the Level Bank's order,
 * 21 levels. Levels 10 to 20 have no drawing in LEVELS: they live only in src/game/level-edits.json
 * (as does builtin-1's picture now). builtin-17 (level 19) is a scroll painting. */
const GAME_ORDER = [0, 12, 10, 11, 13, 14, 3, 4, 6, 15, 5, 7, 8, 9, 2, 20, 16, 19, 17, 1, 18];
/** The game's level ids, in the order it plays them. */
export const gameLevelIds = () => GAME_ORDER.map(builtinId);

/** A game level's name, `level_<n>` with n its place in the game (from 1), whatever name a saved
 * copy carries; null for a level that is not one of the game's. */
export function gameLevelName(id: string | undefined) {
    const m = /^builtin-(\d+)$/.exec(id ?? ''), k = m ? GAME_ORDER.indexOf(+m[1]) : -1;
    return k < 0 ? null : `level_${k + 1}`;
}

/**
 * The game's levels, in GAME_ORDER: each built-in level, unless the level editor has a saved copy
 * of it (`builtin-<i>`). Copies come from this browser's Level Bank and from
 * src/game/level-edits.json (which the editor writes on the dev server); the newer one wins.
 */
export function gameLevels(): LevelDef[] {
    const saved = loadCustomLevels(CUSTOM_KEY), file = EDITS as unknown as LevelDef[];
    return GAME_ORDER.flatMap((i) => {
        const L = LEVELS[i] as LevelDef | undefined, id = builtinId(i), a = saved.find((x) => x.id === id), b = file.find((x) => x.id === id);
        const def = (a && b ? ((a.updated ?? 0) >= (b.updated ?? 0) ? a : b) : a ?? b) ?? L;
        return def ? [{ ...def, name: gameLevelName(id)! }] : [];
    });
}

let active: LevelDef[] = LEVELS;

/** Play another list of levels (custom levels from the editor); an empty list keeps the built-in ones. */
export function useLevels(defs: LevelDef[]) { active = defs.length ? defs : LEVELS; }
export function levelCount() { return active.length; }

/** The custom level list saved under a storage key, or [] when there is none. */
export function loadCustomLevels(key: string): LevelDef[] {
    try {
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(list) ? list.filter((L) => L && (Array.isArray(L.rows) || L.sand) && L.colors) : [];
    } catch { return []; }
}

export function buildLevel(i: number): Level { return buildDef(active[i]); }

function buildDef(def: LevelDef): Level {
    // every level plays in the standard colours; painted levels are moved onto them below
    const to = standardMap(def.colors), L = standardColours(def);
    const g: Grid = [];
    // the cell grid of the older cell pictures; a grain-zoomed level's n is not a whole number
    const cells = Math.ceil(L.n);
    for (let y = 0; y < cells; y++) g.push(new Array(cells).fill(null));
    if (L.sand) { /* the sim reads the grains itself */ } else if (L.rows) L.rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') g[y][x] = ch; }));
    else {
        L.paint?.(painter(g));
        if (to) for (const row of g) row.forEach((c, x) => { if (c) row[x] = to.get(c) ?? c; });
    }
    return { name: L.name, n: L.n, chunk: L.chunk, colors: L.colors, grid: g, order: L.order, seed: L.seed, salt: L.salt, nests: L.nests, sand: L.sand, cols: L.cols, frozen: L.frozen };
}
