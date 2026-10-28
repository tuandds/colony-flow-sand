// Sand pictures for the levels. Each level is an N x N grid of colour keys, given either as
// rows of characters ('.' = empty) or painted with simple shapes. Empty cells hold no sand,
// so pictures can have any outline.
import { SUB, frameGrains } from './layout';
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
}

/** A sand picture at grain resolution: `size` grains tall and `w` wide (default `size`; the
 * level editor uses the whole frame, see frameGrains), `data` run-length encoded row by row
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
 * Every sand colour custom pictures can use: the colours of the built-in pictures, then the
 * team template's colour bank colours (keys v to E). `key` is the one-letter key used in a
 * picture's grain data; it never changes, so saved pictures keep their colours. `retired`
 * colours looked too much like another one (CIELAB distance under about 20): they are left
 * out of the Colour Bank, but pictures that use them still draw.
 */
export const SAND_PALETTE: { key: string; name: string; hex: string; retired?: true }[] = [
    { key: 'a', name: 'white', hex: '#ffffff' }, { key: 'b', name: 'silver', hex: '#c3ccd8' },
    { key: 'c', name: 'cream', hex: '#ffe0b8' }, { key: 'd', name: 'yellow', hex: '#ffe066' },
    { key: 'e', name: 'gold', hex: '#ffc145', retired: true }, { key: 'f', name: 'orange', hex: '#ff8c42' },
    { key: 'g', name: 'tan', hex: '#e7b06a' }, { key: 'h', name: 'caramel', hex: '#c88a46', retired: true },
    { key: 'i', name: 'rust', hex: '#d9774a', retired: true }, { key: 'j', name: 'brown', hex: '#8b5a3c' },
    { key: 'k', name: 'red', hex: '#e8344a' }, { key: 'l', name: 'blush', hex: '#ffd6dc', retired: true },
    { key: 'm', name: 'pink', hex: '#f59ac2' }, { key: 'n', name: 'rose', hex: '#ff7eb3', retired: true },
    { key: 'o', name: 'lime', hex: '#c8e06a' }, { key: 'p', name: 'green', hex: '#7cc957' },
    { key: 'q', name: 'forest', hex: '#5a8f2e' }, { key: 'r', name: 'sky', hex: '#5bc0f5' },
    { key: 's', name: 'blue', hex: '#4a8fe0' }, { key: 't', name: 'navy', hex: '#34405e', retired: true },
    { key: 'u', name: 'ink', hex: OUTLINE },
    { key: 'v', name: 'lemon', hex: '#fcfc10' }, { key: 'w', name: 'lilac', hex: '#fccefd' },
    { key: 'x', name: 'cerise', hex: '#f2447b' }, { key: 'y', name: 'chartreuse', hex: '#b7fd33' },
    { key: 'z', name: 'royal', hex: '#3657f9' }, { key: 'A', name: 'purple', hex: '#aa44f6' },
    { key: 'C', name: 'emerald', hex: '#44f245' }, { key: 'E', name: 'aqua', hex: '#75fefd' },
    { key: 'F', name: 'orchid', hex: '#db7afa' },
    // the built-in pictures' own shades, so the level editor's copies of them look and play the
    // same (see builtinDefs); not in the Colour Bank
    { key: 'B', name: 'sky2', hex: '#6fb6ff', retired: true }, { key: 'D', name: 'green2', hex: '#7ad36b', retired: true },
    { key: 'G', name: 'gold2', hex: '#ffb238', retired: true }, { key: 'H', name: 'red2', hex: '#ef5350', retired: true },
    { key: 'I', name: 'yellow2', hex: '#ffd54f', retired: true }, { key: 'J', name: 'brown2', hex: '#9c6b3c', retired: true },
    { key: 'K', name: 'brown3', hex: '#7a4f2a', retired: true }, { key: 'L', name: 'forest2', hex: '#4f9e3a', retired: true },
    { key: 'M', name: 'green3', hex: '#8fd36a', retired: true }, { key: 'N', name: 'rust2', hex: '#b9552e', retired: true },
    { key: 'O', name: 'caramel2', hex: '#e39b4a', retired: true }, { key: 'P', name: 'rust3', hex: '#b8662a', retired: true },
    { key: 'Q', name: 'green4', hex: '#62b84a', retired: true }, { key: 'R', name: 'blue2', hex: '#4a78c8', retired: true },
    { key: 'S', name: 'silver2', hex: '#d9ecff', retired: true }, { key: 'T', name: 'gold3', hex: '#ffd04a', retired: true },
    { key: 'U', name: 'orange2', hex: '#ff9f2e', retired: true }, { key: 'V', name: 'red3', hex: '#e5484d', retired: true },
];

// built-in shades that look the same as a sand colour (CIELAB distance under 6) use that colour
const SAME_AS: Record<string, string> = { '#ff9ec9': 'm', '#f1d6b0': 'c', '#5c9ded': 's', '#eef1f6': 'a', '#ffd1dc': 'l' };

/** The Colour Bank's default colours: the sand colours that are not retired. */
export const BANK_COLOURS = SAND_PALETTE.filter((c) => !c.retired).map(({ key, name, hex }) => ({ key, name, hex }));

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

/** Where the level editor keeps its levels; the game plays them with ?custom=1. */
export const CUSTOM_KEY = 'cf_custom_levels';
/** The single level the editor's play button opens (?custom=preview). */
export const PREVIEW_KEY = 'cf_custom_preview';

/** Id of the level editor's copy of built-in level i. */
export const builtinId = (i: number) => 'builtin-' + i;

/**
 * The built-in levels as the level editor keeps them: grain pictures in the Colour Bank's keys
 * (matched by colour), as wide as the frame, with `salt` set to the level's number so the game
 * makes the same nests as for the original.
 */
export function builtinDefs(): LevelDef[] {
    return LEVELS.map((L, i) => {
        const { w, h, pad } = frameGrains(L.n), keys = new Array<string>(w * h).fill('.');
        const g = buildDef(L).grid;
        const keyOf = (c: string) => { const hex = L.colors[c].toLowerCase(); return SAME_AS[hex] ?? SAND_PALETTE.find((p) => p.hex.toLowerCase() === hex)?.key ?? c; };
        for (let y = 0; y < h; y++) for (let x = 0; x < h; x++) {
            const c = g[(y / SUB) | 0][(x / SUB) | 0];
            if (c) keys[y * w + x + pad] = keyOf(c);
        }
        const colors: Record<string, string> = {};
        for (const k of new Set(keys)) if (k !== '.') colors[k] = SAND_PALETTE.find((p) => p.key === k)?.hex ?? L.colors[k];
        const { paint: _p, rows: _r, ...rest } = L;
        return { ...rest, id: builtinId(i), colors, sand: encodeSand(h, keys, w), salt: L.salt ?? i };
    });
}

/**
 * The game's levels: each built-in level, unless the level editor has a saved copy of it
 * (`builtin-<i>`). Copies come from this browser's Level Bank and from src/game/level-edits.json
 * (which the editor writes on the dev server); the newer one wins.
 */
export function gameLevels(): LevelDef[] {
    const saved = loadCustomLevels(CUSTOM_KEY), file = EDITS as LevelDef[];
    return LEVELS.map((L, i) => {
        const id = builtinId(i), a = saved.find((x) => x.id === id), b = file.find((x) => x.id === id);
        return (a && b ? ((a.updated ?? 0) >= (b.updated ?? 0) ? a : b) : a ?? b) ?? L;
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

function buildDef(L: LevelDef): Level {
    const g: Grid = [];
    for (let y = 0; y < L.n; y++) g.push(new Array(L.n).fill(null));
    if (L.sand) { /* the sim reads the grains itself */ } else if (L.rows) L.rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') g[y][x] = ch; }));
    else L.paint?.(painter(g));
    return { name: L.name, n: L.n, chunk: L.chunk, colors: L.colors, grid: g, order: L.order, seed: L.seed, salt: L.salt, nests: L.nests, sand: L.sand, cols: L.cols };
}
