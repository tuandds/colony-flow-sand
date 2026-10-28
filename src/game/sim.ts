// The whole game state and rules, independent of Phaser: sand picture, funnel, conveyor,
// nests and ants. The scene calls update() every frame and reads the fields to draw them.
import {
    ANT_SPEED, BELT_LEN, BELT_SPEED, BLOCK_GRAINS, BOARD, COLS, DRAIN_RATE, DROP_S, FMASK, FMASK_COUNT,
    FUNNEL, FUNNEL_HZ, GRAINS_PER_PARTICLE, GRAINS_PER_UNIT, MOUTH, MOUTH_RATE, NEST_SCALE, PIC, SIM_HZ, SLOTS,
    MAX_COLS, MIN_COLS, SLOT_GAP, SUB, TILE, beltPoint, colX, frameGrains, funnelHalf, nestPos,
} from './layout';
import { Level, buildLevel, decodeSand } from './levels';
import { hash, mulberry32, packColor } from './util';

export type Sfx = 'pop' | 'drop' | 'pick' | 'nest' | 'lose' | 'win' | 'click' | 'add';

export interface Nest {
    color: string; need: number; got: number; inflight: number; cool: number; pop: number;
    dx: number | null; dy: number | null; bump: number;
}
export interface Block { k: string; claimed: Ant | null; drop: number }
export interface Ant {
    x: number; y: number; slot: number; block: Block; nest: Nest; col: number;
    carry: string | null; ang: number; t: number;
}
export interface Particle { k: string; n: number; c: number; sx: number; sy: number; mx: number; my: number; ex: number; ey: number; t: number; dur: number }
export interface Spark { x: number; y: number; vx: number; vy: number; life: number; t: number; color: number; s: number }

/** Test-only: force a nest order/seed for a level (used to search solvable layouts). */
export const levelOverride: { order?: 'rows' | 'onion'; seed?: number } = {};

const GRAVITY = 0.09, MAX_FALL = 3.5, FRICTION = 0.82;
const SMALL_ISLAND = 48, THIN_ISLAND = 4;

export class Sim {
    levelIndex: number;
    L!: Level;
    n = 0; G = 0;
    keys: (string | null)[] = [];
    // per grain: colour key index, packed colour, draining / loose flags, velocity
    key!: Uint8Array; rgb!: Uint32Array; dr!: Uint8Array; loose!: Uint8Array; vx!: Float32Array; vy!: Float32Array;
    colors: Record<string, string> = {};
    total = 0; drained = 0;
    cell = 0; gs = 0; ox = 0; oy = 0;
    picDirty = true;
    queue: number[] = []; qHead = 0; drainCarry = 0;
    particles: Particle[] = [];
    emitAcc: Record<string, number> = {}; emitAt: Record<string, [number, number, number]> = {};
    // funnel cells: colour key, grain count, colour
    fk: (string | null)[] = []; fn = new Uint8Array(FUNNEL.cols * FUNNEL.rows); fc: number[] = [];
    fFree = FMASK_COUNT; fT = 0; fExit = 0; fFlip = 0;
    hopper: Record<string, number> = {};
    pipe: string[] = []; dropping: Block[] = [];
    slots: (Block | null)[] = []; beltOff = 0;
    cols: Nest[][] = []; ants: Ant[] = []; fx: Spark[] = [];
    /** Number of nest columns in this level. */
    ncols = COLS;
    simT = 0; simFlip = 0; sweepT = 0; stuckT = 0;
    state: 'play' | 'win' | 'lose' = 'play'; endT = 0; time = 0;
    /** Random numbers for the rules (sand, funnel, particles), restarted with every level so the
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
        const n = (this.n = L.n);
        // Each picture cell is split into SUB x SUB sand grains that are simulated one by one.
        // The simulated area reaches the board's inner frame on both sides (and is padded above),
        // so loose sand on the picture's edges can still slide off and fall until the frame stops it.
        const { h: PG, gs, pad } = frameGrains(n), top = 2 * pad;
        const G = (this.G = PG + 2 * pad);
        const keys = (this.keys = [null, ...Object.keys(L.colors)]);
        const key = new Uint8Array(G * G), rgb = new Uint32Array(G * G);
        // grain-level pictures (level editor) give every grain, as wide as the frame (or a
        // centred square); the others one key per cell in the centred picture square
        const grains = L.sand && L.sand.size === PG ? decodeSand(L.sand) : null;
        const SW = grains ? L.sand!.w ?? PG : PG, x0 = Math.floor((G - SW) / 2);
        for (let gy = 0; gy < PG; gy++) for (let gx = 0; gx < SW; gx++) {
            const k = grains ? grains[gy * SW + gx] : L.grid[(gy / SUB) | 0][(gx / SUB) | 0];
            if (k && k !== '.' && gx + x0 >= 0 && gx + x0 < G) key[(gy + top) * G + gx + x0] = Math.max(0, keys.indexOf(k));
        }
        fitWholeBlocks(key, G, keys.length);
        for (let p = 0; p < key.length; p++) {
            if (key[p]) rgb[p] = packColor(L.colors[keys[key[p]]!], (hash(p % G, (p / G) | 0, 7) - 0.5) * 0.16);
        }
        let total = 0;
        for (const v of key) if (v) total++;

        this.key = key; this.rgb = rgb;
        this.dr = new Uint8Array(G * G); this.loose = new Uint8Array(G * G);
        this.vx = new Float32Array(G * G); this.vy = new Float32Array(G * G);
        this.colors = L.colors; this.total = total; this.drained = 0;
        this.cell = PIC.size / n; this.gs = gs; this.ox = PIC.x - pad * gs; this.oy = PIC.y - top * gs;
        this.picDirty = true;
        this.queue = []; this.qHead = 0; this.drainCarry = 0;
        this.particles = []; this.emitAcc = {}; this.emitAt = {};
        this.fk = new Array(FUNNEL.cols * FUNNEL.rows).fill(null); this.fn.fill(0); this.fc = new Array(FUNNEL.cols * FUNNEL.rows).fill(0);
        this.fFree = FMASK_COUNT; this.fT = 0; this.fExit = 0; this.fFlip = 0;
        this.hopper = {}; this.pipe = []; this.dropping = [];
        this.slots = new Array(SLOTS).fill(null); this.beltOff = 0;
        this.ncols = Math.max(MIN_COLS, Math.min(MAX_COLS, L.cols ?? COLS));
        this.cols = this.makeNests(i, L, key, keys);
        this.ants = []; this.fx = [];
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
            const dist = new Int32Array(G * G).fill(-1), bfs: number[] = [];
            for (let p = 0; p < key.length; p++) if (!key[p]) { dist[p] = 0; bfs.push(p); }
            for (let h = 0; h < bfs.length; h++) {
                const p = bfs[h], x = p % G;
                for (const q of [x > 0 ? p - 1 : -1, x < G - 1 ? p + 1 : -1, p - G, p + G]) {
                    if (q < 0 || q >= key.length || dist[q] >= 0) continue;
                    dist[q] = dist[p] + 1; bfs.push(q);
                }
            }
            for (let p = 0; p < key.length; p++) if (key[p]) order.push(p);
            order.sort((a, b) => dist[a] - dist[b] || b - a);
        } else {
            for (let p = key.length - 1; p >= 0; p--) if (key[p]) order.push(p);
        }
        for (const p of order) {
            const c = key[p];
            if (++acc[c] === BLOCK_GRAINS) { acc[c] = 0; blockSeq.push(keys[c]!); }
        }
        // nests from a recorded play (level editor) win when they hold exactly the same blocks
        const n = this.ncols;
        if (L.nests && L.nests.length === n) {
            const want: Record<string, number> = {};
            for (const k of blockSeq) want[k] = (want[k] || 0) + 1;
            for (const col of L.nests) for (const [k, n] of col) want[k] = (want[k] || 0) - n;
            if (Object.values(want).every((v) => v === 0)) {
                return L.nests.map((col, ci) => col.map(([color, need], ri) => {
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
        const y0 = Math.max(0, Math.floor((py - r - this.oy) / gs)), y1 = Math.min(G - 1, Math.floor((py + r - this.oy) / gs));
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

    // ---------- sand leaving the board ----------
    private emitParticle(k: string, c: number, x: number, y: number, n: number) {
        // grains leave through the bottom of the board, so the falling sand starts below the frame
        const sx = this.ox + (x + 0.5) * this.gs, sy = Math.max(this.oy + (y + 0.5) * this.gs, BOARD.y + BOARD.h - 4);
        const half = funnelHalf(FUNNEL.top) - FUNNEL.cell;
        const ex = Math.max(MOUTH.x - half, Math.min(MOUTH.x + half, sx)), ey = FUNNEL.top + 2;
        const dur = 0.12 + this.rand() * 0.06;
        this.particles.push({ k, n, c, sx, sy, mx: (sx + ex) / 2, my: (sy + ey) / 2, ex, ey, t: 0, dur });
    }
    private stepDrain(dt: number) {
        const budget = DRAIN_RATE * GRAINS_PER_UNIT * dt + this.drainCarry;
        let count = Math.floor(budget);
        this.drainCarry = budget - count;
        const { key, dr, rgb, G } = this;
        let head = this.qHead;
        // a full funnel backs up: grains wait at the bottom of the board until there is room
        while (count-- > 0 && head < this.queue.length && this.fFree - this.particles.length > 2) {
            const p = this.queue[head++];
            if (!dr[p]) continue;
            const k = this.keys[key[p]]!, x = p % G, y = (p / G) | 0;
            const c = rgb[p];
            key[p] = 0; dr[p] = 0; this.loose[p] = 0; this.vx[p] = 0; this.vy[p] = 0;
            this.picDirty = true;
            // grains are too many to animate one by one, so each particle carries a few of them
            this.emitAcc[k] = (this.emitAcc[k] || 0) + 1;
            this.emitAt[k] = [c, x, y];
            if (this.emitAcc[k] >= GRAINS_PER_PARTICLE) { this.emitParticle(k, c, x, y, this.emitAcc[k]); this.emitAcc[k] = 0; }
        }
        if (head >= this.queue.length) {
            this.queue.length = 0; head = 0;
            // leftover grains (less than a clump) fall from where that colour last left the board
            for (const k in this.emitAcc) if (this.emitAcc[k]) { const [c, x, y] = this.emitAt[k]; this.emitParticle(k, c, x, y, this.emitAcc[k]); this.emitAcc[k] = 0; }
        }
        this.qHead = head;
    }

    // Falling-sand step. Sand is fixed in place until swiped. Loose grains speed up as they
    // fall, and when something is in the way they slide down-left or down-right, carrying
    // sideways momentum down a slope until friction stops them. Grains reaching the bottom of
    // the board leave into the chute. Rows are scanned bottom-up, alternating x direction.
    private simStep() {
        const { key, rgb, dr, loose, vx, vy, G } = this;
        const flip = (this.simFlip ^= 1);
        let moved = false;
        const bottom = (G - 1) * G;
        for (let x = 0; x < G; x++) {
            const p = bottom + x;
            if (key[p] && loose[p] && !dr[p]) { dr[p] = 1; this.queue.push(p); }
        }
        const move = (p: number, q: number) => {
            key[q] = key[p]; rgb[q] = rgb[p]; loose[q] = 1; vx[q] = vx[p]; vy[q] = vy[p];
            key[p] = 0; loose[p] = 0; vx[p] = 0; vy[p] = 0;
        };
        for (let y = G - 2; y >= 0; y--) {
            const row = y * G;
            for (let i = 0; i < G; i++) {
                let p = row + (flip ? i : G - 1 - i);
                if (!key[p] || !loose[p] || dr[p]) continue;
                vy[p] = Math.min(MAX_FALL, vy[p] + GRAVITY);
                // whole cells to travel this step; the fraction is rounded at random so slow grains still creep
                let steps = Math.floor(vy[p]) + (this.rand() < vy[p] % 1 ? 1 : 0);
                if (steps < 1) steps = 1;
                for (let s = 0; s < steps; s++) {
                    const x = p % G, cy = (p / G) | 0;
                    if (cy >= G - 1) break;
                    const below = p + G;
                    if (!key[below]) { move(p, below); p = below; moved = true; continue; }
                    const l = x > 0 && !key[below - 1], r = x < G - 1 && !key[below + 1];
                    if (!l && !r) {
                        // landed: turn part of the fall into a sideways push for the next slide
                        if (vy[p] > 1) vx[p] += (this.rand() < 0.5 ? -1 : 1) * vy[p] * 0.25;
                        vy[p] = 0;
                        // creep sideways toward a nearby drop (gentle slopes, stair steps), or keep
                        // sliding on momentum; friction bleeds the momentum off
                        const pref = vx[p] > 0.05 ? 1 : vx[p] < -0.05 ? -1 : this.rand() < 0.5 ? -1 : 1;
                        let side = 0;
                        for (const d of [pref, -pref]) {
                            const sx = x + d;
                            if (sx < 0 || sx >= G || key[p + d]) continue;
                            const far = x + 2 * d;
                            const drop = !key[below + d] || (far >= 0 && far < G && !key[p + 2 * d] && !key[below + 2 * d]);
                            if (drop || Math.abs(vx[p]) > 0.6) { side = d; break; }
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
            }
        }
        if (moved) this.picDirty = true;
    }
    // Small islands of fixed sand (thin slivers, specks) are too fiddly to swipe, so they come loose by themselves.
    private sweepDebris() {
        const { key, loose, G } = this;
        const seen = new Uint8Array(G * G), stack: number[] = [], comp: number[] = [];
        for (let s0 = 0; s0 < key.length; s0++) {
            if (!key[s0] || loose[s0] || seen[s0]) continue;
            seen[s0] = 1; stack.push(s0); comp.length = 0;
            while (stack.length) {
                const p = stack.pop()!; comp.push(p);
                const x = p % G, y = (p / G) | 0;
                for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx, ny = y + dy;
                    if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= G || ny >= G) continue;
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

    // ---------- falling clumps, funnel, hole ----------
    private stepParticles(dt: number) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.t += dt / p.dur;
            if (p.t >= 1) {
                this.particles.splice(i, 1);
                if (!this.funnelInsert(p)) this.addToHopper(p.k, p.n);
            }
        }
    }
    particlePos(p: Particle): [number, number] {
        const t = Math.pow(Math.min(1, p.t), 1.5), u = 1 - t;
        return [u * u * p.sx + 2 * u * t * p.mx + t * t * p.ex, u * u * p.sy + 2 * u * t * p.my + t * t * p.ey];
    }
    // sand that has gone down the hole: BLOCK_GRAINS of a colour make a block in the pipe
    private addToHopper(k: string, n: number) {
        this.drained += n;
        this.hopper[k] = (this.hopper[k] || 0) + n;
        while (this.hopper[k] >= BLOCK_GRAINS) { this.hopper[k] -= BLOCK_GRAINS; this.pipe.push(k); }
    }
    private funnelInsert(p: Particle) {
        const W = FUNNEL.cols, col = Math.round((p.ex - FUNNEL.x0) / FUNNEL.cell - 0.5);
        for (let j = 0; j < 3; j++) for (let d = 0; d < W; d++) for (const i of d ? [col - d, col + d] : [col]) {
            const q = j * W + i;
            if (i < 0 || i >= W || !FMASK[q] || this.fk[q]) continue;
            this.fk[q] = p.k; this.fn[q] = p.n; this.fc[q] = p.c; this.fFree--;
            return true;
        }
        return false;
    }
    // Funnel sand: clumps slide down the slanted walls and leave through the hole at a steady
    // rate, so a big pour piles up and drains slowly.
    private stepFunnel(dt: number) {
        this.fT += dt;
        const W = FUNNEL.cols, Hh = FUNNEL.rows, { fk, fn, fc } = this;
        while (this.fT >= 1 / FUNNEL_HZ) {
            this.fT -= 1 / FUNNEL_HZ;
            this.fExit = Math.min(this.fExit + MOUTH_RATE / FUNNEL_HZ, 6);
            const bottom = (Hh - 1) * W;
            // a finished block still sitting in the hole (not yet dropped onto the conveyor)
            // plugs it: the sand above waits until the block is gone
            for (let i = 0; i < W && this.fExit >= 1 && !this.pipe.length; i++) {
                const q = bottom + i;
                if (!fk[q]) continue;
                this.addToHopper(fk[q]!, fn[q]);
                fk[q] = null; this.fFree++; this.fExit--;
            }
            const flip = (this.fFlip ^= 1);
            for (let j = Hh - 2; j >= 0; j--) for (let ii = 0; ii < W; ii++) {
                const i = flip ? ii : W - 1 - ii, q = j * W + i;
                if (!fk[q]) continue;
                let t = q + W;
                if (!FMASK[t] || fk[t]) {
                    const l = i > 0 && FMASK[t - 1] && !fk[t - 1], r = i < W - 1 && FMASK[t + 1] && !fk[t + 1];
                    if (l && r) t += this.rand() < 0.5 ? -1 : 1;
                    else if (l) t -= 1;
                    else if (r) t += 1;
                    else {
                        // the funnel walls are gentler than 45 degrees, so sand resting on them creeps
                        // sideways toward the hole instead of sticking
                        const toward = FUNNEL.x0 + (i + 0.5) * FUNNEL.cell < MOUTH.x ? 1 : -1;
                        const side = q + toward;
                        if (this.rand() < 0.5 || i + toward < 0 || i + toward >= W || !FMASK[side] || fk[side]) continue;
                        t = side;
                    }
                }
                fk[t] = fk[q]; fn[t] = fn[q]; fc[t] = fc[q]; fk[q] = null;
            }
        }
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
            const front = col[0];
            if (!front) continue;
            if (front.pop > 0) {
                front.pop += dt / 0.35;
                if (front.pop >= 1) col.shift();
                continue;
            }
            front.cool -= dt;
            if (front.got + front.inflight < front.need && front.cool <= 0) {
                // ants use the front slot, not the nest's sliding position, so the rules don't
                // depend on the animation (recorded plays then replay exactly)
                const [nx, ny] = nestPos(ci, 0, this.ncols);
                let best = -1, bd = 1e9;
                for (let i = 0; i < SLOTS; i++) {
                    const b = this.slots[i];
                    if (!b || b.claimed || b.k !== front.color || b.drop < 1) continue;
                    const [bx, by] = this.slotPos(i);
                    const d = Math.hypot(bx - nx, by - ny);
                    if (d < bd) { bd = d; best = i; }
                }
                if (best >= 0) {
                    const b = this.slots[best]!;
                    const ant: Ant = { x: nx, y: ny - TILE / 2, slot: best, block: b, nest: front, col: ci, carry: null, ang: -Math.PI / 2, t: Math.random() * 6 };
                    b.claimed = ant;
                    front.inflight++;
                    front.cool = 0.12;
                    this.ants.push(ant);
                }
            }
        }
    }
    private stepAnts(dt: number) {
        for (let i = this.ants.length - 1; i >= 0; i--) {
            const a = this.ants[i];
            a.t += dt;
            let tx: number, ty: number;
            if (!a.carry) [tx, ty] = this.slotPos(a.slot);
            else { [tx, ty] = nestPos(a.col, 0, this.ncols); ty -= TILE / 2; }
            const dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
            const step = ANT_SPEED * dt;
            if (d > 1) {
                let da = Math.atan2(dy, dx) - a.ang;
                da = Math.atan2(Math.sin(da), Math.cos(da));
                a.ang += da * Math.min(1, dt * 18);
            }
            if (d <= step + 6) {
                a.x = tx; a.y = ty;
                if (!a.carry) {
                    a.carry = a.block.k;
                    this.slots[a.slot] = null;
                    this.sfx('pick', 0.45);
                } else {
                    const nest = a.nest;
                    nest.got++; nest.inflight--; nest.bump = 1;
                    this.ants.splice(i, 1);
                    if (nest.got >= nest.need) {
                        nest.pop = 0.001;
                        this.sfx('nest', 0.8);
                        this.burst(colX(a.col, this.ncols), nest.dy!, this.colors[nest.color]);
                    } else this.sfx('add', 0.35);
                }
            } else {
                a.x += (dx / d) * step; a.y += (dy / d) * step;
            }
        }
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
        const fits = this.slots.some((b) => b && this.cols.some((c) => {
            const n = c[0];
            return !!n && !n.pop && n.color === b.k && n.got + n.inflight < n.need;
        }));
        if (this.slots.every(Boolean) && !this.ants.length && !this.cols.some((c) => c[0]?.pop) && !fits) {
            this.stuckT += dt;
            if (this.stuckT > 0.35) { this.state = 'lose'; this.endT = 0; this.sfx('lose', 0.8); }
        } else this.stuckT = 0;
    }

    update(dt: number) {
        this.time += dt;
        this.stepDrain(dt);
        this.stepSand(dt);
        this.stepParticles(dt);
        this.stepFunnel(dt);
        this.stepBelt(dt);
        this.stepNests(dt);
        this.stepAnts(dt);
        for (let i = this.fx.length - 1; i >= 0; i--) {
            const f = this.fx[i];
            f.t += dt; f.vy += 1400 * dt; f.x += f.vx * dt; f.y += f.vy * dt;
            if (f.t > f.life) this.fx.splice(i, 1);
        }
        this.checkEnd(dt);
        if (this.state !== 'play') this.endT += dt;
    }
}

// Trim every colour to a whole number of blocks so no sand is left over.
// Extra grains on the picture's outer edge are removed (top edge first); extra grains of a
// colour enclosed by others are handed to a neighbouring colour that is settled later.
// Enclosed colours go first and edge colours last, since an edge colour can always shed
// grains off its own outline.
function fitWholeBlocks(key: Uint8Array, G: number, nColors: number) {
    const count = new Array(nColors).fill(0), touchesEdge = new Uint8Array(nColors);
    const nb = (p: number) => {
        const x = p % G, out: number[] = [];
        if (x > 0) out.push(p - 1);
        if (x < G - 1) out.push(p + 1);
        if (p >= G) out.push(p - G);
        if (p < G * (G - 1)) out.push(p + G);
        return out;
    };
    const onEdge = (p: number) => {
        const x = p % G;
        if (x === 0 || x === G - 1 || p < G || p >= G * (G - 1)) return true;
        return nb(p).some((q) => !key[q]);
    };
    for (let p = 0; p < key.length; p++) if (key[p]) { count[key[p]]++; if (onEdge(p)) touchesEdge[key[p]] = 1; }
    const queue: number[] = [];
    for (let c = 1; c < nColors; c++) if (count[c]) queue.push(c);
    queue.sort((a, b) => touchesEdge[a] - touchesEdge[b] || count[a] - count[b]);
    const settled = new Uint8Array(nColors);
    let guard = nColors * 6;
    while (queue.length && guard-- > 0) {
        const c = queue.shift()!;
        let extra = count[c] % BLOCK_GRAINS;
        for (let pass = 0; extra > 0 && pass < 64; pass++) {
            const edge: number[] = [], free: [number, number][] = [], taken: [number, number][] = [];
            for (let p = 0; p < key.length; p++) {
                if (key[p] !== c) continue;
                if (onEdge(p)) { edge.push(p); continue; }
                for (const q of nb(p)) {
                    const o = key[q];
                    if (o && o !== c) { (settled[o] ? taken : free).push([p, o]); break; }
                }
            }
            let changed = 0;
            for (const p of edge) { if (!extra) break; key[p] = 0; count[c]--; extra--; changed++; }
            for (const [p, o] of free) { if (!extra) break; key[p] = o; count[c]--; count[o]++; extra--; changed++; }
            // boxed in by settled colours only: hand the grains over and settle that colour again
            if (extra && !changed && taken.length) {
                const reopen = new Set<number>();
                for (const [p, o] of taken) { if (!extra) break; key[p] = o; count[c]--; count[o]++; extra--; reopen.add(o); }
                for (const o of reopen) { settled[o] = 0; queue.push(o); }
                changed = 1;
            }
            if (!changed) break;
        }
        settled[c] = 1;
    }
}
