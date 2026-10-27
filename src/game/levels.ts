// Sand pictures for the levels. Each level is an N x N grid of colour keys, given either as
// rows of characters ('.' = empty) or painted with simple shapes. Empty cells hold no sand,
// so pictures can have any outline.

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

interface LevelDef {
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
}

export interface Level {
    name: string;
    n: number;
    chunk: [number, number];
    colors: Record<string, string>;
    grid: Grid;
    order?: 'rows' | 'onion';
    seed?: number;
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
const OUTLINE = '#3a2a3a';
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
        colors: { o: '#ff8c42', y: '#ffc145', b: '#ffe0b8', w: '#ffffff', e: '#2b2b3a', k: OUTLINE },
        paint(p) {
            p.tri(12.5, 9, 16.8, 4.8, 16.8, 13.2, 'y');
            p.tri(6, 5.6, 11, 5.6, 8.8, 2.8, 'y');
            p.ellipse(8, 9, 6.2, 4.2, 'o');
            p.ellipse(8.4, 11.6, 3.8, 1.3, 'b');
            p.circle(4.8, 8.2, 1.5, 'w'); p.rect(4.3, 7.7, 5.3, 8.7, 'e');
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
        name: 'Little Owl', n: 20, chunk: [5, 8], seed: 3,
        colors: { b: '#8b5a3c', c: '#f1d6b0', w: '#ffffff', e: '#2b2b3a', y: '#ffb238', k: OUTLINE },
        paint(p) {
            p.tri(4.6, 7, 7, 2.6, 8.4, 6.4, 'b'); p.tri(15.4, 7, 13, 2.6, 11.6, 6.4, 'b');
            p.ellipse(10, 11, 6.4, 7, 'b');
            p.ellipse(10, 13.6, 4, 4.2, 'c');
            p.circle(7.4, 8.8, 2.3, 'w'); p.circle(12.6, 8.8, 2.3, 'w');
            p.rect(7, 8.5, 8.5, 10, 'e'); p.rect(11.5, 8.5, 13, 10, 'e');
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
        colors: { s: '#e39b4a', d: '#b8662a', y: '#c8e06a', e: '#2b2b3a', g: '#62b84a', k: OUTLINE },
        paint(p) {
            p.rect(1, 18.6, 21, 21, 'g');
            p.rect(3, 15, 19, 17.6, 'y'); p.circle(17.6, 13.8, 2.1, 'y');
            p.line(17, 12.4, 15.8, 8.6, 0.45, 'y'); p.line(18.4, 12.4, 19.8, 9, 0.45, 'y');
            p.circle(15.8, 8.4, 0.8, 'e'); p.circle(19.8, 8.8, 0.8, 'e');
            p.circle(10, 10.4, 5.6, 's');
            p.inside((x, y) => { const d = Math.hypot(x - 10.3, y - 10.6); return y < 15 && ((d > 2.1 && d < 3.3) || d < 1); }, 'd');
            p.outline('k');
        },
    },
    {
        name: 'Rocket', n: 22, chunk: [6, 9], order: 'onion', // the window sits inside the hull
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
        name: 'Penguin', n: 22, chunk: [6, 9], seed: 3,
        colors: { d: '#34405e', n: '#4a78c8', c: '#d9ecff', y: '#ffd04a', w: '#ffffff', o: '#ff9f2e', e: '#1d1d28', r: '#e5484d', s: '#ffd1dc', k: OUTLINE },
        paint(p) {
            // a penguin in a red scarf; each colour sits in one area so its nests can fill
            p.ellipse(11, 12.5, 6.4, 7.1, 'n');
            p.circle(11, 6.2, 4.4, 'd');
            p.inside((_x, y) => y < 9.6, 'd');
            p.tri(5.6, 9.4, 2.8, 14.6, 6.6, 14.6, 'n'); p.tri(16.4, 9.4, 19.2, 14.6, 15.4, 14.6, 'n');
            p.ellipse(11, 14.8, 5.1, 5.2, 'w');
            p.ellipse(9.3, 6.4, 1.6, 1.9, 'c'); p.ellipse(12.7, 6.4, 1.6, 1.9, 'c');
            p.circle(9.5, 6.2, 0.8, 'e'); p.circle(12.5, 6.2, 0.8, 'e');
            p.circle(7.3, 8.1, 0.8, 's'); p.circle(14.7, 8.1, 0.8, 's');
            p.tri(9.7, 7.7, 12.3, 7.7, 11, 9.3, 'o');
            p.inside((x, y) => y > 9.5 && y < 10.8 && Math.abs(x - 11) < 5.7, 'r');
            p.rect(13, 10.8, 14.5, 13.8, 'r');
            p.ellipse(8.4, 20.2, 2, 0.8, 'y'); p.ellipse(13.6, 20.2, 2, 0.8, 'y');
            p.outline('k');
        },
    },
];

export const LEVEL_COUNT = LEVELS.length;

export function buildLevel(i: number): Level {
    const L = LEVELS[i];
    const g: Grid = [];
    for (let y = 0; y < L.n; y++) g.push(new Array(L.n).fill(null));
    if (L.rows) L.rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') g[y][x] = ch; }));
    else L.paint?.(painter(g));
    return { name: L.name, n: L.n, chunk: L.chunk, colors: L.colors, grid: g, order: L.order, seed: L.seed };
}
