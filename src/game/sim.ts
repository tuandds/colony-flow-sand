// The whole game state and rules, independent of Phaser: sand picture, funnel, conveyor,
// nests and ants. The scene calls update() every frame and reads the fields to draw them.
import {
    ANT_SPEED, BELT_LEN, BELT_SPEED, BLOCK_GRAINS, COLS, DROP_S, MOUTH, MOUTH_RATE, NEST_SCALE, PIC, SIM_HZ, SLOTS,
    FRAME_N, MAX_COLS, MIN_COLS, SLOT_GAP, SUB, TILE, beltPoint, colX, frameGrains, funnelHalf, grainInFrame, nestPos,
} from './layout';
import { Level, buildLevel, decodeSand, widenOldFrame } from './levels';
import { hash, mulberry32, packColor } from './util';

export type Sfx = 'pop' | 'drop' | 'pick' | 'nest' | 'lose' | 'win' | 'click' | 'add';

export interface Nest {
    color: string; need: number; got: number; inflight: number; cool: number; pop: number;
    dx: number | null; dy: number | null; bump: number;
    /** Woken by the Activate booster: works like a front nest from where it stands. */
    on?: boolean;
}
export interface Block { k: string; claimed: Ant | null; drop: number }
export interface Ant {
    x: number; y: number; slot: number; block: Block; nest: Nest; col: number;
    carry: string | null; ang: number; t: number;
    /** How far ahead of its block the ant aims (0 = chase it, 1 = run to where they meet). */
    lead: number;
    /** Where on the nest's top edge the ant leaves from and comes back to (px from its centre). */
    ox: number;
}
/** Fan booster: seconds between two blocks leaving the cannon, and each block's flight time. */
export const FAN_SHOT_GAP = 0.2, FAN_FLIGHT = 0.5;
/** A block the Fan booster blew off the belt, flying into a nest. */
export interface Flyer { k: string; sx: number; sy: number; nest: Nest; t: number; dur: number }
export interface Spark { x: number; y: number; vx: number; vy: number; life: number; t: number; color: number; s: number }

/** Test-only: force a nest order/seed for a level (used to search solvable layouts). */
export const levelOverride: { order?: 'rows' | 'onion'; seed?: number } = {};

const GRAVITY = 0.09, MAX_FALL = 3.5, FRICTION = 0.82;
const SMALL_ISLAND = 48, THIN_ISLAND = 4;

export class Sim {
    levelIndex: number;
    L!: Level;
    /** The grain grid is G wide; its top G rows are the board (the picture square, padded above),
     * the rows below down to GH are the funnel, whose bottom row is the hole. */
    n = 0; G = 0; GH = 0;
    keys: (string | null)[] = [];
    // per grain: colour key index, packed colour, loose flag, velocity
    key!: Uint8Array; rgb!: Uint32Array; loose!: Uint8Array; vx!: Float32Array; vy!: Float32Array;
    /** Funnel grains: when each came down into the funnel (a running count), so the sand that came
     * down first moves first and leaves first. */
    seq!: Uint32Array; seqN = 0;
    /** The step each grain last moved in, so a grain moved once is not moved again that step. */
    private stepOf!: Uint32Array; stepN = 0;
    /** Cells outside the frame art's light blue inside: the board's rounded corners and the
     * funnel's curved sides. No sand starts there or moves in. */
    wall!: Uint8Array;
    colors: Record<string, string> = {};
    total = 0; drained = 0;
    /** Grains still on the board (the picture frame); 0 once all its sand has fallen. */
    left = 0;
    cell = 0; gs = 0; ox = 0; oy = 0;
    picDirty = true;
    /** Grains the hole may still take this step (MOUTH_RATE a second, carried over). */
    exitCarry = 0;
    hopper: Record<string, number> = {};
    pipe: string[] = []; dropping: Block[] = [];
    slots: (Block | null)[] = []; beltOff = 0;
    cols: Nest[][] = []; ants: Ant[] = []; fx: Spark[] = []; flyers: Flyer[] = [];
    /** Number of nest columns in this level. */
    ncols = COLS;
    simT = 0; simFlip = 0; sweepT = 0; stuckT = 0;
    state: 'play' | 'win' | 'lose' = 'play'; endT = 0; time = 0;
    /** Random numbers for the rules (sand and funnel), restarted with every level so the
     * same swipes at the same moments always play out the same (the level editor's replays).
     * Looks-only randomness (sparks, ant gait) uses Math.random. */
    rand: () => number = Math.random;
    private lastBrush: [number, number] | null = null;

    constructor(levelIndex: number, private sfx: (name: Sfx, vol?: number) => void) {
        this.levelIndex = levelIndex;
        this.start(levelIndex);
    }

    start(i: number) {
        this.levelIndex = i;
        const L = (this.L = buildLevel(i));
        this.n = L.n;
        // Each picture cell is split into SUB x SUB sand grains that are simulated one by one.
        // The frame is always FRAME_N cells tall, so grains are the same size in every level. The
        // simulated area reaches the board's inner frame on both sides (and is padded above), so
        // loose sand on the picture's edges can still slide off and fall until the frame stops it.
        const { h: PG, gs, pad } = frameGrains(FRAME_N), top = 2 * pad;
        const G = (this.G = PG + 2 * pad);
        // the funnel's rows: from under the board down to the hole
        const oy = PIC.y - top * gs, GH = (this.GH = G + Math.round((MOUTH.y - (oy + G * gs)) / gs));
        const keys = (this.keys = [null, ...Object.keys(L.colors)]);
        const key = new Uint8Array(G * GH), rgb = new Uint32Array(G * GH);
        // grain-level pictures (level editor) give every grain; the others one key per cell of an
        // n-cell square. Either way the picture sits centred in the frame (anything outside the
        // frame is cut off).
        const wide = L.sand ? widenOldFrame(decodeSand(L.sand), L.sand.w ?? L.sand.size, L.sand.size) : null;
        const grains = wide ? wide.keys : null;
        const SH = grains ? L.sand!.size : L.n * SUB, SW = wide ? wide.w : SH;
        const x0 = Math.floor((G - SW) / 2), y0 = top + Math.floor((PG - SH) / 2);
        for (let gy = 0; gy < SH; gy++) for (let gx = 0; gx < SW; gx++) {
            const k = grains ? grains[gy * SW + gx] : L.grid[(gy / SUB) | 0][(gx / SUB) | 0];
            const x = gx + x0, y = gy + y0;
            if (k && k !== '.' && x >= 0 && x < G && y >= top && y < top + PG) key[y * G + x] = Math.max(0, keys.indexOf(k));
        }
        // the frame's corners are rounded: sand there is cut off, and they stay empty; the funnel
        // under the board curves in to the hole
        const wall = (this.wall = new Uint8Array(G * GH));
        for (let y = top; y < G; y++) for (let x = 0; x < G; x++) {
            if (!grainInFrame(x, y - top)) { wall[y * G + x] = 1; key[y * G + x] = 0; }
        }
        for (let y = G; y < GH; y++) for (let x = 0; x < G; x++) {
            if (Math.abs(PIC.x + (x - pad + 0.5) * gs - MOUTH.x) > funnelHalf(oy + (y + 0.5) * gs)) wall[y * G + x] = 1;
        }
        // the picture is the board's sand only (the funnel starts empty)
        fitWholeBlocks(key.subarray(0, G * G), G, keys.length, top, wall.subarray(0, G * G));
        for (let p = 0; p < key.length; p++) {
            if (key[p]) rgb[p] = packColor(L.colors[keys[key[p]]!], (hash(p % G, (p / G) | 0, 7) - 0.5) * 0.16);
        }
        let total = 0;
        for (const v of key) if (v) total++;

        this.key = key; this.rgb = rgb;
        this.loose = new Uint8Array(G * GH);
        this.seq = new Uint32Array(G * GH); this.seqN = 0; this.stepOf = new Uint32Array(G * GH); this.stepN = 0;
        this.vx = new Float32Array(G * GH); this.vy = new Float32Array(G * GH);
        this.colors = L.colors; this.total = total; this.drained = 0; this.left = total;
        this.cell = PIC.size / FRAME_N; this.gs = gs; this.ox = PIC.x - pad * gs; this.oy = oy;
        this.picDirty = true;
        this.exitCarry = 0;
        this.hopper = {}; this.pipe = []; this.dropping = [];
        this.slots = new Array(SLOTS).fill(null); this.beltOff = 0;
        this.ncols = Math.max(MIN_COLS, Math.min(MAX_COLS, L.cols ?? COLS));
        this.cols = this.makeNests(i, L, key, keys);
        this.ants = []; this.fx = []; this.flyers = [];
        this.simT = 0; this.simFlip = 0; this.sweepT = 0; this.stuckT = 0;
        this.state = 'play'; this.endT = 0; this.time = 0;
        this.rand = mulberry32(0x5eed + i);
        this.lastBrush = null;
    }

    // Natural release order, cut into nests. Two ways to estimate it:
    //  'rows'  - the player digs from the bottom up, so walk the grains bottom row first;
    //  'onion' - the player digs from the outside in, so peel by distance to empty space.
    // Each level picks the order and a seed that a test player could actually solve
    // (nests never change column, so a bad order can leave a needed colour stuck).
    private makeNests(i: number, L: Level, key: Uint8Array, keys: (string | null)[]): Nest[][] {
        const G = this.G;
        const orderMode = levelOverride.order || L.order || 'rows', seed = levelOverride.seed ?? L.seed ?? 0;
        const rng = mulberry32(1234 + (L.salt ?? i) * 977 + seed * 7919);
        const blockSeq: string[] = [], acc = new Array(keys.length).fill(0), left: Record<string, number> = {};
        const order: number[] = [];
        if (orderMode === 'onion') {
            // the board only: its bottom edge is not open to the funnel for this estimate
            const N = G * G, dist = new Int32Array(N).fill(-1), bfs: number[] = [];
            for (let p = 0; p < N; p++) if (!key[p]) { dist[p] = 0; bfs.push(p); }
            for (let h = 0; h < bfs.length; h++) {
                const p = bfs[h], x = p % G;
                for (const q of [x > 0 ? p - 1 : -1, x < G - 1 ? p + 1 : -1, p - G, p + G]) {
                    if (q < 0 || q >= N || dist[q] >= 0) continue;
                    dist[q] = dist[p] + 1; bfs.push(q);
                }
            }
            for (let p = 0; p < N; p++) if (key[p]) order.push(p);
            order.sort((a, b) => dist[a] - dist[b] || b - a);
        } else {
            for (let p = key.length - 1; p >= 0; p--) if (key[p]) order.push(p);
        }
        for (const p of order) {
            const c = key[p];
            if (++acc[c] === BLOCK_GRAINS) { acc[c] = 0; blockSeq.push(keys[c]!); }
        }
        // nests from the level editor (a recorded play, or set by hand) are used as they are when
        // they hold exactly the picture's blocks. When a colour's block count is off by a little
        // (the whole-block trim moves a few grains between colours), its nests are resized to fit:
        // missing blocks go to its smallest nests, extra ones come off its largest.
        const n = this.ncols;
        if (L.nests && L.nests.length === n) {
            const want: Record<string, number> = {};
            for (const k of blockSeq) want[k] = (want[k] || 0) + 1;
            for (const col of L.nests) for (const [k, n] of col) want[k] = (want[k] || 0) - n;
            const off = Object.values(want).reduce((a, v) => a + Math.abs(v), 0), total = blockSeq.length;
            if (off <= Math.max(2, total * 0.05)) {
                const cols = L.nests.map((col) => col.map(([k, need]) => [k, need] as [string, number]));
                for (const [k, d0] of Object.entries(want)) {
                    let d = d0;
                    const mine = cols.flat().filter((nest) => nest[0] === k);
                    for (; d > 0; d--) {
                        if (!mine.length) { const ci = cols.reduce((b, c, i) => (c.length < cols[b].length ? i : b), 0); const nest: [string, number] = [k, 0]; cols[ci].push(nest); mine.push(nest); }
                        mine.reduce((a, b) => (b[1] < a[1] ? b : a))[1]++;
                    }
                    for (; d < 0 && mine.length; d++) mine.reduce((a, b) => (b[1] > a[1] ? b : a))[1]--;
                }
                return cols.map((col) => col.filter(([, need]) => need > 0)).map((col, ci) => col.map(([color, need], ri) => {
                    const [dx, dy] = nestPos(ci, ri, n);
                    return { color, need, got: 0, inflight: 0, cool: 0, pop: 0, dx, dy, bump: 0 };
                }));
            }
        }
        for (const k of blockSeq) left[k] = (left[k] || 0) + 1;
        const open: Record<string, { color: string; need: number; have: number; first: number } | null> = {};
        const chunks: { color: string; need: number; have: number; first: number }[] = [];
        const chunkLo = Math.round(L.chunk[0] * NEST_SCALE), chunkHi = Math.round(L.chunk[1] * NEST_SCALE);
        const pickSize = (k: string) => {
            let c = chunkLo + Math.floor(rng() * (chunkHi - chunkLo + 1));
            if (left[k] - c < chunkLo) c = left[k];
            left[k] -= c;
            return c;
        };
        blockSeq.forEach((k, idx) => {
            if (!open[k]) { open[k] = { color: k, need: pickSize(k), have: 0, first: idx }; chunks.push(open[k]!); }
            if (++open[k]!.have >= open[k]!.need) open[k] = null;
        });
        chunks.sort((a, b) => a.first - b.first);
        // Nests never change column, so deal each one (in release order) to the column with the
        // least sand still queued; the columns then drain evenly instead of one running long.
        const cols: Nest[][] = Array.from({ length: n }, () => []);
        const load = new Array(n).fill(0);
        for (const c of chunks) {
            let ci = 0;
            for (let j = 1; j < n; j++) if (load[j] < load[ci]) ci = j;
            load[ci] += c.need;
            // nests start in place so they already show before the first update
            const [dx, dy] = nestPos(ci, cols[ci].length, n);
            cols[ci].push({ color: c.color, need: c.need, got: 0, inflight: 0, cool: 0, pop: 0, dx, dy, bump: 0 });
        }
        return cols;
    }

    // ---------- swiping ----------
    /** Swiping frees the sand under the finger; freed (loose) sand then falls. */
    private brush(px: number, py: number) {
        const G = this.G, gs = this.gs, r = Math.max(this.cell * 1.1, 34), { key, loose } = this;
        const x0 = Math.max(0, Math.floor((px - r - this.ox) / gs)), x1 = Math.min(G - 1, Math.floor((px + r - this.ox) / gs));
        const y0 = Math.max(0, Math.floor((py - r - this.oy) / gs)), y1 = Math.min(this.GH - 1, Math.floor((py + r - this.oy) / gs));
        if (x0 > x1 || y0 > y1) return;
        let added = 0;
        for (let y = y1; y >= y0; y--) for (let x = x0; x <= x1; x++) {
            const cx = this.ox + (x + 0.5) * gs, cy = this.oy + (y + 0.5) * gs;
            if ((cx - px) ** 2 + (cy - py) ** 2 > r * r) continue;
            const p = y * G + x;
            if (!key[p] || loose[p]) continue;
            loose[p] = 1; added++;
        }
        if (added) { this.picDirty = true; this.sfx('pop', 0.6); }
    }
    swipeTo(px: number, py: number) {
        if (!this.lastBrush) { this.brush(px, py); this.lastBrush = [px, py]; return; }
        const [lx, ly] = this.lastBrush, d = Math.hypot(px - lx, py - ly), step = Math.max(8, this.cell * 0.4);
        const k = Math.max(1, Math.ceil(d / step));
        for (let i = 1; i <= k; i++) this.brush(lx + ((px - lx) * i) / k, ly + ((py - ly) * i) / k);
        this.lastBrush = [px, py];
    }
    endSwipe() { this.lastBrush = null; }

    // Falling-sand step, over the board and the funnel under it as one: sand is fixed in place
    // until swiped. Loose grains speed up as they fall, and when something is in the way they
    // slide down-left or down-right, carrying sideways momentum down a slope until friction stops
    // them; grains resting on the frame's curved rim or the funnel's sides slide on toward the
    // hole. In the funnel it is first down, first out: grains are numbered as they come down into
    // it and move oldest first, so a gap near the hole goes to the sand that has waited longest
    // (often beside it on the side) rather than to newer sand straight above, and the hole (the
    // funnel's bottom row) takes its oldest grains first, MOUTH_RATE a second, while no finished
    // block waits in it. The board's rows are scanned bottom-up, alternating x direction.
    private simStep() {
        const { key, rgb, loose, vx, vy, seq, stepOf, G, GH, wall } = this;
        const flip = (this.simFlip ^= 1), step = ++this.stepN;
        const free = (q: number) => !key[q] && !wall[q];
        const board = G * G, bottom = (GH - 1) * G;
        let moved = false;
        // the hole: a finished block still sitting in it plugs it, and the sand above waits
        this.exitCarry = Math.min(this.exitCarry + MOUTH_RATE / SIM_HZ, (MOUTH_RATE / SIM_HZ) * 2);
        if (this.exitCarry >= 1 && !this.pipe.length) {
            const out: number[] = [];
            for (let p = bottom; p < bottom + G; p++) if (key[p]) out.push(p);
            out.sort((a, b) => seq[a] - seq[b]);
            for (const p of out) {
                if (this.exitCarry < 1 || this.pipe.length) break;
                this.addToHopper(this.keys[key[p]]!, 1);
                key[p] = 0; loose[p] = 0; vx[p] = 0; vy[p] = 0;
                this.exitCarry--; moved = true;
            }
        }
        const move = (p: number, q: number) => {
            key[q] = key[p]; rgb[q] = rgb[p]; loose[q] = 1; vx[q] = vx[p]; vy[q] = vy[p]; seq[q] = seq[p]; stepOf[q] = step;
            key[p] = 0; loose[p] = 0; vx[p] = 0; vy[p] = 0;
            // into the funnel: it takes its place in the queue for the hole
            if (p < board && q >= board) { this.left--; seq[q] = ++this.seqN; }
        };
        const grain = (p: number) => {
            vy[p] = Math.min(MAX_FALL, vy[p] + GRAVITY);
            // whole cells to travel this step; the fraction is rounded at random so slow grains still creep
            let steps = Math.floor(vy[p]) + (this.rand() < vy[p] % 1 ? 1 : 0);
            if (steps < 1) steps = 1;
            for (let s = 0; s < steps; s++) {
                const x = p % G, cy = (p / G) | 0;
                if (cy >= GH - 1) break;
                const below = p + G;
                if (free(below)) { move(p, below); p = below; moved = true; continue; }
                const l = x > 0 && free(below - 1), r = x < G - 1 && free(below + 1);
                if (!l && !r) {
                    // landed: turn part of the fall into a sideways push for the next slide
                    if (vy[p] > 1) vx[p] += (this.rand() < 0.5 ? -1 : 1) * vy[p] * 0.25;
                    vy[p] = 0;
                    // creep sideways toward a nearby drop (gentle slopes, stair steps), or keep
                    // sliding on momentum; friction bleeds the momentum off. On the frame's
                    // rim or the funnel's side (gentler than the sand's own slope) a grain
                    // keeps sliding toward the hole.
                    const toward = x < G / 2 ? 1 : -1, onWall = wall[below] === 1;
                    const pref = onWall ? toward : vx[p] > 0.05 ? 1 : vx[p] < -0.05 ? -1 : this.rand() < 0.5 ? -1 : 1;
                    let side = 0;
                    for (const d of onWall ? [toward] : [pref, -pref]) {
                        const sx = x + d;
                        if (sx < 0 || sx >= G || !free(p + d)) continue;
                        const far = x + 2 * d;
                        const drop = free(below + d) || (far >= 0 && far < G && free(p + 2 * d) && free(below + 2 * d));
                        if (drop || onWall || Math.abs(vx[p]) > 0.6) { side = d; break; }
                    }
                    if (side) { vx[p] = vx[p] * FRICTION + side * 0.2; move(p, p + side); p += side; moved = true; }
                    else vx[p] *= FRICTION;
                    break;
                }
                let dir: number;
                if (l && r) dir = vx[p] > 0.05 ? 1 : vx[p] < -0.05 ? -1 : this.rand() < 0.5 ? -1 : 1;
                else dir = l ? -1 : 1;
                const q = below + dir;
                vx[p] = vx[p] * FRICTION + dir * 0.35;
                vy[p] *= 0.7;
                move(p, q); p = q; moved = true;
            }
        };
        // the funnel first, oldest grains first (the hole's row only waits for the hole)
        const funnel: number[] = [];
        for (let p = board; p < bottom; p++) if (key[p]) funnel.push(p);
        funnel.sort((a, b) => seq[a] - seq[b]);
        for (const p of funnel) if (key[p] && stepOf[p] !== step) grain(p);
        // then the board, bottom row up
        for (let y = G - 1; y >= 0; y--) {
            const row = y * G;
            for (let i = 0; i < G; i++) {
                const p = row + (flip ? i : G - 1 - i);
                if (key[p] && loose[p] && stepOf[p] !== step) grain(p);
            }
        }
        if (moved) this.picDirty = true;
    }
    // Small islands of fixed sand (thin slivers, specks) are too fiddly to swipe, so they come loose by themselves.
    private sweepDebris() {
        const { key, loose, G, GH } = this;
        const seen = new Uint8Array(G * GH), stack: number[] = [], comp: number[] = [];
        for (let s0 = 0; s0 < key.length; s0++) {
            if (!key[s0] || loose[s0] || seen[s0]) continue;
            seen[s0] = 1; stack.push(s0); comp.length = 0;
            while (stack.length) {
                const p = stack.pop()!; comp.push(p);
                const x = p % G, y = (p / G) | 0;
                for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx, ny = y + dy;
                    if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= G || ny >= GH) continue;
                    const q = ny * G + nx;
                    if (key[q] && !loose[q] && !seen[q]) { seen[q] = 1; stack.push(q); }
                }
            }
            let x0 = G, x1 = 0, y0 = G, y1 = 0;
            for (const p of comp) { const x = p % G, y = (p / G) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
            if (comp.length <= SMALL_ISLAND || Math.min(x1 - x0, y1 - y0) < THIN_ISLAND) {
                for (const p of comp) loose[p] = 1;
                this.picDirty = true;
            }
        }
    }
    private stepSand(dt: number) {
        this.simT += dt;
        let n = 0;
        while (this.simT >= 1 / SIM_HZ && n++ < 4) { this.simT -= 1 / SIM_HZ; this.simStep(); }
        if (n >= 4) this.simT = 0;
        this.sweepT += dt;
        if (this.sweepT > 0.5) { this.sweepT = 0; this.sweepDebris(); }
    }

    // ---------- the hole ----------
    // sand that has gone down the hole: BLOCK_GRAINS of a colour make a block in the pipe
    private addToHopper(k: string, n: number) {
        this.drained += n;
        this.hopper[k] = (this.hopper[k] || 0) + n;
        while (this.hopper[k] >= BLOCK_GRAINS) { this.hopper[k] -= BLOCK_GRAINS; this.pipe.push(k); }
    }
    /** Loose sand of each colour (falling, sliding, or piled in the funnel), in grains. */
    looseByColour() {
        const out: Record<string, number> = {}, { key, loose } = this;
        for (let p = 0; p < key.length; p++) if (key[p] && loose[p]) { const k = this.keys[key[p]]!; out[k] = (out[k] || 0) + 1; }
        return out;
    }
    /** Whether loose sand is still falling on the board (not yet down in the funnel). */
    boardFalling() {
        const { key, loose } = this, N = this.G * this.G;
        for (let p = 0; p < N; p++) if (key[p] && loose[p]) return true;
        return false;
    }

    // ---------- conveyor ----------
    slotPos(i: number): [number, number] {
        return beltPoint((((this.beltOff + i * SLOT_GAP) % BELT_LEN) + BELT_LEN) % BELT_LEN);
    }
    private stepBelt(dt: number) {
        this.beltOff = (this.beltOff + BELT_SPEED * dt) % BELT_LEN;
        // drop a block from the pipe into an empty slot passing under the mouth
        if (this.pipe.length && !this.dropping.length) {
            for (let i = 0; i < SLOTS; i++) {
                const s = (((this.beltOff + i * SLOT_GAP) % BELT_LEN) + BELT_LEN) % BELT_LEN;
                const d = DROP_S - s;
                if (d > -SLOT_GAP * 0.35 && d < SLOT_GAP * 0.2 && !this.slots[i]) {
                    const b: Block = { k: this.pipe.shift()!, claimed: null, drop: 0 };
                    this.slots[i] = b;
                    this.dropping.push(b);
                    this.sfx('drop', 0.7); // a new block lands on the belt: short, soft cube sound
                    break;
                }
            }
        }
        for (let i = this.dropping.length - 1; i >= 0; i--) {
            const b = this.dropping[i];
            b.drop += dt / 0.16;
            if (b.drop >= 1) { b.drop = 1; this.dropping.splice(i, 1); }
        }
    }

    // ---------- nests and ants ----------
    /** Ants work for the front nest of each column, and for nests the Activate booster woke. */
    isActive(nest: Nest, ri: number) { return ri === 0 || !!nest.on; }
    private stepNests(dt: number) {
        for (let ci = 0; ci < this.ncols; ci++) {
            const col = this.cols[ci];
            col.forEach((nest, ri) => {
                const [tx, ty] = nestPos(ci, ri, this.ncols);
                if (nest.dy === null) nest.dy = ty;
                if (nest.dx === null) nest.dx = tx;
                nest.dy += (ty - nest.dy) * Math.min(1, dt * 10);
                nest.dx += (tx - nest.dx) * Math.min(1, dt * 10);
                nest.bump = Math.max(0, nest.bump - dt * 4);
            });
            for (let ri = 0; ri < col.length; ri++) {
                const nest = col[ri];
                if (nest.pop > 0) {
                    nest.pop += dt / 0.35;
                    if (nest.pop < 1) continue;
                    col.splice(ri, 1);
                    // the nest behind a finished front nest starts work on the next frame
                    if (ri === 0) break;
                    ri--; continue;
                }
                if (!this.isActive(nest, ri)) continue;
                nest.cool -= dt;
                if (nest.got + nest.inflight >= nest.need || nest.cool > 0) continue;
                // ants use the nest's slot, not its sliding position, so the rules don't
                // depend on the animation (recorded plays then replay exactly)
                const [nx, ny] = nestPos(ci, ri, this.ncols);
                let best = -1, bd = 1e9;
                for (let i = 0; i < SLOTS; i++) {
                    const b = this.slots[i];
                    if (!b || b.claimed || b.k !== nest.color || b.drop < 1) continue;
                    const [bx, by] = this.slotPos(i);
                    const d = Math.hypot(bx - nx, by - ny);
                    if (d < bd) { bd = d; best = i; }
                }
                if (best >= 0) {
                    const b = this.slots[best]!;
                    // each ant takes its own line: it leaves from its own spot on the nest and
                    // heads off the block by its own amount, from chasing it to cutting across
                    const ox = (this.rand() - 0.5) * TILE * 0.6, lead = 0.25 + this.rand() * 0.75;
                    const ant: Ant = { x: nx + ox, y: ny - TILE / 2, slot: best, block: b, nest, col: ci, carry: null, ang: -Math.PI / 2, t: Math.random() * 6, lead, ox };
                    b.claimed = ant;
                    nest.inflight++;
                    nest.cool = 0.12;
                    this.ants.push(ant);
                }
            }
        }
    }
    /** Where an ant going for the block at (bx, by) aims: the point on the belt where it would
     * meet the block running straight, `lead` of the way there from the block. */
    private intercept(a: Ant, bx: number, by: number): [number, number] {
        let t = Math.hypot(bx - a.x, by - a.y) / ANT_SPEED;
        let p: [number, number] = [bx, by];
        for (let k = 0; k < 4; k++) {
            p = beltPoint((((this.beltOff + BELT_SPEED * t * a.lead + a.slot * SLOT_GAP) % BELT_LEN) + BELT_LEN) % BELT_LEN);
            t = Math.hypot(p[0] - a.x, p[1] - a.y) / ANT_SPEED;
        }
        return p;
    }
    private stepAnts(dt: number) {
        for (let i = this.ants.length - 1; i >= 0; i--) {
            const a = this.ants[i];
            a.t += dt;
            let tx: number, ty: number, ax: number, ay: number;
            if (!a.carry) { [tx, ty] = this.slotPos(a.slot); [ax, ay] = this.intercept(a, tx, ty); }
            else { [tx, ty] = nestPos(a.col, Math.max(0, this.cols[a.col].indexOf(a.nest)), this.ncols); tx += a.ox; ty -= TILE / 2; ax = tx; ay = ty; }
            // it runs toward its aim point and arrives when it reaches the block (or the nest)
            const dx = ax - a.x, dy = ay - a.y, d = Math.hypot(dx, dy), step = ANT_SPEED * dt;
            const left = Math.hypot(tx - a.x, ty - a.y);
            if (d > 1) {
                let da = Math.atan2(dy, dx) - a.ang;
                da = Math.atan2(Math.sin(da), Math.cos(da));
                a.ang += da * Math.min(1, dt * 18);
            }
            if (left <= step + 6) {
                a.x = tx; a.y = ty;
                if (!a.carry) {
                    a.carry = a.block.k;
                    this.slots[a.slot] = null;
                    this.sfx('pick', 0.45);
                } else {
                    this.ants.splice(i, 1);
                    this.deliver(a.nest, colX(a.col, this.ncols));
                }
            } else if (d > 0.001) {
                const k = Math.min(step, d) / d;
                a.x += dx * k; a.y += dy * k;
            }
        }
    }
    /** A block reaches its nest (carried by an ant, or blown in by the Fan). */
    private deliver(nest: Nest, x: number) {
        nest.got++; nest.inflight--; nest.bump = 1;
        if (nest.got >= nest.need) {
            nest.pop = 0.001;
            this.sfx('nest', 0.8);
            this.burst(x, nest.dy!, this.colors[nest.color]);
        } else this.sfx('add', 0.35);
    }
    private stepFlyers(dt: number) {
        for (let i = this.flyers.length - 1; i >= 0; i--) {
            const f = this.flyers[i];
            f.t += dt / f.dur;
            if (f.t >= 1) { this.flyers.splice(i, 1); this.deliver(f.nest, f.nest.dx!); }
        }
    }
    /** While the game holds still for the Fan: only its blocks fly (and the sparks and nest bumps
     * they set off play out); the sand, belt, ants and nests wait. */
    stepFlyersOnly(dt: number) {
        this.stepFlyers(dt);
        for (const col of this.cols) for (const n of col) n.bump = Math.max(0, n.bump - dt * 4);
        this.stepFx(dt);
    }
    private stepFx(dt: number) {
        for (let i = this.fx.length - 1; i >= 0; i--) {
            const f = this.fx[i];
            f.t += dt; f.vy += 1400 * dt; f.x += f.vx * dt; f.y += f.vy * dt;
            if (f.t > f.life) this.fx.splice(i, 1);
        }
    }

    // ---------- boosters ----------
    /** Activate: wake a nest waiting behind the front row, so ants work for it too. */
    activate(ci: number, ri: number) {
        const nest = this.cols[ci]?.[ri];
        if (!nest || this.isActive(nest, ri) || nest.pop) return false;
        nest.on = true; nest.bump = 1;
        this.sfx('nest', 0.6);
        return true;
    }
    /** Shuffle: the nests trade places at random. Nests with an ant on its way stay put. */
    shuffle() {
        const at: [number, number][] = [], nests: Nest[] = [];
        this.cols.forEach((col, ci) => col.forEach((n, ri) => { if (!n.pop && !n.inflight) { at.push([ci, ri]); nests.push(n); } }));
        if (new Set(nests.map((n) => n.color)).size < 2) return false;
        const order = nests.slice();
        // retry until at least one place shows a different colour
        for (let tries = 0; tries < 20; tries++) {
            for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(this.rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
            if (order.some((n, i) => n.color !== nests[i].color)) break;
        }
        at.forEach(([ci, ri], i) => { this.cols[ci][ri] = order[i]; order[i].bump = 1; });
        this.sfx('drop', 0.8);
        return true;
    }
    /** Fan: every block on the belt flies into a nest of its colour, upper rows first (any nest,
     * woken or not). Ants still on their way to a block go home. */
    /** Back to play after a loss (revive): the caller clears the belt (the Fan). */
    revive() { this.state = 'play'; this.endT = 0; this.stuckT = 0; }

    fan() {
        let n = 0;
        for (let i = 0; i < SLOTS; i++) {
            const b = this.slots[i];
            if (!b) continue;
            let target: Nest | null = null, bd = 1e9;
            const [bx, by] = this.slotPos(i);
            for (let ri = 0; !target && ri < Math.max(...this.cols.map((c) => c.length)); ri++) {
                this.cols.forEach((col, ci) => {
                    const nest = col[ri];
                    if (!nest || nest.pop || nest.color !== b.k) return;
                    // a block an ant has claimed already counts for its nest
                    const free = nest.need - nest.got - nest.inflight + (b.claimed?.nest === nest ? 1 : 0);
                    if (free <= 0) return;
                    const d = Math.abs(colX(ci, this.ncols) - bx);
                    if (d < bd) { bd = d; target = nest; }
                });
            }
            if (!target) continue;
            const ant = b.claimed;
            if (ant) { this.ants.splice(this.ants.indexOf(ant), 1); ant.nest.inflight--; }
            (target as Nest).inflight++;
            this.slots[i] = null;
            const di = this.dropping.indexOf(b);
            if (di >= 0) this.dropping.splice(di, 1);
            // shot one after another: the n-th block waits n gaps, then flies
            this.flyers.push({ k: b.k, sx: bx, sy: by, nest: target, t: 0, dur: FAN_FLIGHT + n * FAN_SHOT_GAP });
            n++;
        }
        if (n) this.sfx('pop', 0.9);
        return n > 0;
    }

    private burst(x: number, y: number, hex: string) {
        const color = parseInt(hex.slice(1), 16);
        for (let i = 0; i < 18; i++) {
            const a = Math.random() * Math.PI * 2, v = 250 + Math.random() * 400;
            this.fx.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 300, life: 0.7, t: 0, color, s: 10 + Math.random() * 10 });
        }
    }

    private checkEnd(dt: number) {
        if (this.state !== 'play') return;
        if (this.cols.every((c) => c.length === 0)) {
            this.state = 'win'; this.endT = 0; this.sfx('win', 0.9);
            ['#ffd23f', '#ff6b81', '#4fc3f7', '#7cc957'].forEach((c, i) => this.burst(240 + i * 200, 700, c));
            return;
        }
        // Lose: the conveyor is full and no block on it can go into a nest any more. That is, no
        // ant is on its way, no nest is popping (the one behind it might want a block), and no
        // front nest still wants a colour that is on the belt. A short grace covers the moment
        // between one nest filling and the next being found.
        const fits = this.slots.some((b) => b && this.cols.some((c) => c.some((n, ri) =>
            this.isActive(n, ri) && !n.pop && n.color === b.k && n.got + n.inflight < n.need)));
        if (this.slots.every(Boolean) && !this.ants.length && !this.flyers.length && !this.cols.some((c) => c.some((n) => n.pop)) && !fits) {
            this.stuckT += dt;
            if (this.stuckT > 0.35) { this.state = 'lose'; this.endT = 0; this.sfx('lose', 0.8); }
        } else this.stuckT = 0;
    }

    update(dt: number) {
        this.time += dt;
        this.stepSand(dt);
        this.stepBelt(dt);
        this.stepNests(dt);
        this.stepAnts(dt);
        this.stepFlyers(dt);
        this.stepFx(dt);
        this.checkEnd(dt);
        if (this.state !== 'play') this.endT += dt;
    }
}

// Make every colour a whole number of blocks so no sand is left over, changing as little sand as
// possible. First the picture's total is made a whole number of blocks: when the frame has room
// next to the sand, the missing grains are added there (each takes a neighbour's colour), one
// here and one there, spread evenly round the picture's outline, so nothing is cut; when the
// frame is full, the total remainder (fewer than BLOCK_GRAINS grains) is removed instead, spread
// evenly round the picture's whole outer edge (whatever their colours), so it leaves no gap. Each colour's extra grains are then handed to a
// neighbouring colour: a run of grains along the border between them changes colour, so the
// border just moves over by a grain there. The extras travel from colour to colour until they
// meet another colour's extras; as the total is now a whole number of blocks, they all cancel.
/** `top`: the first grid row inside the frame (the rows above it are padding, not the frame). */
function fitWholeBlocks(key: Uint8Array, G: number, nColors: number, top: number, wall: Uint8Array) {
    const count = new Array(nColors).fill(0);
    for (let p = 0; p < key.length; p++) if (key[p]) count[key[p]]++;
    const rem = (c: number) => count[c] % BLOCK_GRAINS;
    const nb = (p: number) => {
        const x = p % G, out: number[] = [];
        if (x > 0) out.push(p - 1);
        if (x < G - 1) out.push(p + 1);
        if (p >= G) out.push(p - G);
        if (p < G * (G - 1)) out.push(p + G);
        return out;
    };
    // n of the grains in `list`, evenly spaced along it (it is in scan order, so along the border)
    const spread = (list: number[], n: number) => {
        const take = Math.min(n, list.length), step = list.length / Math.max(1, take), out: number[] = [];
        for (let i = 0; i < take; i++) out.push(list[Math.floor((i + 0.5) * step)]);
        return out;
    };
    // colours that share a border, and colours on the picture's outer edge (next to empty space)
    const adjacency = () => {
        const adj = Array.from({ length: nColors }, () => new Set<number>()), edge = new Set<number>();
        for (let p = 0; p < key.length; p++) {
            const c = key[p];
            if (!c) continue;
            const x = p % G;
            if (x === 0 || x === G - 1 || p < G || p >= G * (G - 1)) edge.add(c);
            for (const q of nb(p)) { const o = key[q]; if (!o) edge.add(c); else if (o !== c) adj[c].add(o); }
        }
        return { adj, edge };
    };
    // the shortest chain of neighbouring colours from c to one that passes `done`
    const path = (c: number, adj: Set<number>[], done: (o: number) => boolean) => {
        const prev = new Map<number, number>([[c, -1]]), queue = [c];
        for (let h = 0; h < queue.length; h++) {
            const a = queue[h];
            if (a !== c && done(a)) {
                const out: number[] = [];
                for (let x = a; x !== -1; x = prev.get(x)!) out.unshift(x);
                return out;
            }
            for (const b of adj[a]) if (!prev.has(b)) { prev.set(b, a); queue.push(b); }
        }
        return null;
    };
    // hand n grains of colour a to its neighbour b: a run of a's grains along their border (from
    // its middle) takes b's colour, so the border moves over by a grain there rather than going
    // ragged
    const give = (a: number, b: number, n: number) => {
        for (let pass = 0; n > 0 && pass < 64; pass++) {
            const border: number[] = [];
            for (let p = 0; p < key.length; p++) if (key[p] === a && nb(p).some((q) => key[q] === b)) border.push(p);
            if (!border.length) break;
            const take = Math.min(n, border.length), from = Math.floor((border.length - take) / 2);
            for (const p of border.slice(from, from + take)) { key[p] = b; count[a]--; count[b]++; n--; }
        }
    };
    // 0. the total becomes a whole number of blocks: grains added in the frame's empty space next
    // to the sand when there is room, otherwise the remainder comes off the outer edge; either
    // way spread evenly all the way round
    const total = count.reduce((a, b) => a + b, 0), missing = (BLOCK_GRAINS - (total % BLOCK_GRAINS)) % BLOCK_GRAINS;
    if (missing) {
        const room: number[] = [];
        for (let p = top * G; p < key.length; p++) if (!key[p] && !wall[p] && nb(p).some((q) => key[q])) room.push(p);
        if (room.length >= missing) {
            // the spots are chosen from the picture as it is; each new grain copies a neighbour's colour
            for (const p of spread(room, missing)) { const c = key[nb(p).find((q) => key[q])!]; key[p] = c; count[c]++; }
        }
    }
    const total2 = count.reduce((a, b) => a + b, 0);
    if (total2 % BLOCK_GRAINS) {
        const outer: number[] = [];
        for (let p = 0; p < key.length; p++) {
            if (!key[p]) continue;
            const x = p % G;
            if (x === 0 || x === G - 1 || p < G || p >= G * (G - 1) || nb(p).some((q) => !key[q])) outer.push(p);
        }
        for (const p of spread(outer, total2 % BLOCK_GRAINS)) { count[key[p]]--; key[p] = 0; }
    }
    // 1. carry each colour's extras along a chain of neighbours to another colour with extras
    for (let guard = nColors * 4; guard > 0; guard--) {
        const left = [];
        for (let c = 1; c < nColors; c++) if (rem(c)) left.push(c);
        if (left.length < 2) break;
        const { adj } = adjacency();
        let moved = false;
        for (const c of left) {
            const chain = path(c, adj, (o) => rem(o) > 0);
            if (!chain) continue;
            const n = rem(c);
            for (let i = 0; i + 1 < chain.length; i++) give(chain[i], chain[i + 1], n);
            moved = true;
            break;
        }
        if (!moved) break;
    }
    // 2. anything left (only a colour cut off from every other) is removed from the outer edge,
    // after carrying it to a colour that has one
    const { adj, edge } = adjacency();
    for (let c = 1; c < nColors; c++) {
        let n = rem(c);
        if (!n) continue;
        let at = c;
        if (!edge.has(c)) {
            const chain = path(c, adj, (o) => edge.has(o));
            if (chain) { for (let i = 0; i + 1 < chain.length; i++) give(chain[i], chain[i + 1], n); at = chain[chain.length - 1]; n = rem(at); }
        }
        for (let pass = 0; n > 0 && pass < 64; pass++) {
            const outline: number[] = [];
            for (let p = 0; p < key.length; p++) {
                if (key[p] !== at) continue;
                const x = p % G;
                if (x === 0 || x === G - 1 || p < G || p >= G * (G - 1) || nb(p).some((q) => !key[q])) outline.push(p);
            }
            if (!outline.length) break;
            for (const p of spread(outline, n)) { key[p] = 0; count[at]--; n--; }
        }
    }
}
