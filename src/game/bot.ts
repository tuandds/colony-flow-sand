// A simple test player, used to check that a level can be won (level editor, console tests).
// It swipes the lowest fixed sand of the colours the front nests want, and only frees more
// sand while the conveyor has room. Sand physics uses Math.random, so one game can differ
// from the next; the editor asks for two wins in a row.
import { BLOCK_GRAINS, COLS, NEST_SCALE, nestPos } from './layout';
import { type Nest, Sim } from './sim';
import { mulberry32 } from './util';

/** Play the level loaded in `sim` for up to `maxSec` game seconds. */
export function playBot(sim: Sim, maxSec = 300): 'win' | 'lose' | 'stuck' {
    const s = sim;
    for (let t = 0; t < maxSec && s.state === 'play'; t += 0.5) {
        if (s.queue.length - s.qHead <= 0) {
            let grains = 0;
            for (let q = 0; q < s.fk.length; q++) if (s.fk[q]) grains += s.fn[q];
            for (const p of s.particles) grains += p.n;
            const used = s.slots.filter(Boolean).length + s.pipe.length + Math.round(grains / 64);
            const need = new Set(s.cols.map((c) => c[0]).filter(Boolean).map((n) => n.color));
            // lowest fixed grain in every 4th column, as a screen point
            const G = s.G, want: [number, number][] = [], any: [number, number][] = [];
            for (let x = 0; x < G; x += 4) {
                for (let y = G - 1; y >= 0; y--) {
                    const p = y * G + x;
                    if (!s.key[p] || s.loose[p]) continue;
                    const pt: [number, number] = [s.ox + (x + 0.5) * s.gs, s.oy + (y + 0.5) * s.gs];
                    any.push(pt);
                    if (need.has(s.keys[s.key[p]]!)) want.push(pt);
                    break;
                }
            }
            if (want.length && used < 22) swipe(s, want.slice(0, used < 10 ? 4 : 1));
            else if (!want.length && any.length && used < 20) swipe(s, [any[any.length >> 1]]);
        }
        for (let k = 0; k < 30; k++) s.update(1 / 60);
    }
    return s.state === 'play' ? 'stuck' : s.state;
}

export interface Recording {
    result: 'win' | 'lose' | 'stuck';
    /** Each column's nests, front to back, as [colour, blocks]. */
    nests: [string, number][][];
    /** Every stroke: game time (s) and its screen points. */
    moves: [number, [number, number][]][];
}

/**
 * Play the level while building its nests, for the level editor. The bot digs the picture from
 * the bottom up and waits while the conveyor is busy; whenever a column has no nest, a new one
 * opens there for the colour most common on the belt. A nest closes early (its size drops to what
 * it has) when the belt gets crowded or no more of its colour can come. Ants carry blocks as in
 * a real game, so a win here means these nests can be beaten with these strokes.
 * `variant` changes which of the lowest spots are swiped.
 */
export function recordPlay(sim: Sim, variant: number, maxSec = 1500): Recording {
    const s = sim, rng = mulberry32(99 + variant * 7919);
    const lo = Math.round(s.L.chunk[0] * NEST_SCALE), hi = Math.round(s.L.chunk[1] * NEST_SCALE);
    // the bot waits while PACE blocks are pending; nests close early before that, so the belt drains
    const PACE = 10, CROWDED = 7;
    // blocks of each colour still to reach the conveyor
    const left: Record<string, number> = {}, grains: Record<string, number> = {};
    for (const k of s.key) if (k) grains[s.keys[k]!] = (grains[s.keys[k]!] || 0) + 1;
    for (const k in grains) left[k] = Math.round(grains[k] / BLOCK_GRAINS);
    const seen = new WeakSet<object>();
    const made: Nest[][] = Array.from({ length: COLS }, () => []);
    const moves: Recording['moves'] = [];
    s.cols = Array.from({ length: COLS }, () => []);

    const manage = () => {
        for (const b of s.slots) if (b && !seen.has(b)) { seen.add(b); left[b.k]--; }
        const free: Record<string, number> = {};
        let onBelt = 0;
        for (const b of s.slots) if (b && !b.claimed) { free[b.k] = (free[b.k] || 0) + 1; onBelt++; }
        for (const k of s.pipe) { free[k] = (free[k] || 0) + 1; onBelt++; }
        const open = () => s.cols.map((c) => c[0]).filter((n) => n && !n.pop);
        /** Shrink a nest to `need`; the game only pops a nest when an ant delivers, so pop it here
         * when nothing is on the way, and drop it if it never got anything. */
        const shrink = (n: Nest, need: number) => {
            n.need = need;
            if (n.inflight || n.got < need) return;
            const ci = s.cols.findIndex((c) => c[0] === n);
            if (n.got) n.pop = 0.001;
            else { s.cols[ci].shift(); made[ci].splice(made[ci].indexOf(n), 1); }
        };
        // a nest can't wait for blocks that will never come
        for (const n of open()) {
            const most = n.got + n.inflight + (free[n.color] || 0) + left[n.color];
            if (most < n.need) shrink(n, most);
        }
        // crowded belt: the fullest open nest stops where it is, freeing its column sooner
        if (onBelt > CROWDED) {
            const n = open().filter((x) => x.got + x.inflight > 0).sort((a, b) => b.got + b.inflight - a.got - a.inflight)[0];
            if (n) shrink(n, n.got + n.inflight);
            else {
                // every open nest is still empty: give up one whose colour isn't on the belt
                const idle = open().find((x) => !free[x.color]);
                if (idle) shrink(idle, 0);
            }
        }
        for (let ci = 0; ci < COLS; ci++) {
            if (s.cols[ci].length) continue;
            const taken = new Set(open().map((n) => n.color));
            const k = Object.keys(free).filter((c) => !taken.has(c)).sort((a, b) => free[b] - free[a])[0];
            if (!k) continue;
            const target = lo + Math.floor(rng() * (hi - lo + 1));
            const need = Math.max(1, Math.min(target, free[k] + left[k]));
            const [dx, dy] = nestPos(ci, 0);
            const nest: Nest = { color: k, need, got: 0, inflight: 0, cool: 0, pop: 0, dx, dy, bump: 0 };
            s.cols[ci].push(nest);
            made[ci].push(nest);
        }
    };

    for (let t = 0; t < maxSec && s.state !== 'lose'; t += 0.5) {
        let pending = s.slots.filter((b) => b && !b.claimed).length + s.pipe.length;
        for (let q = 0; q < s.fk.length; q++) if (s.fk[q]) pending += s.fn[q] / BLOCK_GRAINS;
        if (s.queue.length - s.qHead <= 0 && pending < PACE) {
            // the lowest fixed grain of every 4th column; swipe a few of the lowest ones
            const G = s.G, pts: [number, number, number][] = [];
            for (let x = 0; x < G; x += 4) {
                for (let y = G - 1; y >= 0; y--) {
                    const p = y * G + x;
                    if (s.key[p] && !s.loose[p]) { pts.push([s.ox + (x + 0.5) * s.gs, s.oy + (y + 0.5) * s.gs, y + rng() * 6]); break; }
                }
            }
            pts.sort((a, b) => b[2] - a[2]);
            if (pts.length) {
                const stroke = pts.slice(0, 1 + Math.floor(rng() * 3)).map(([x, y]) => [x, y] as [number, number]);
                swipe(s, stroke);
                moves.push([t, stroke]);
            }
        }
        for (let k = 0; k < 30; k++) {
            s.update(1 / 60);
            // empty columns look like a win to the sim until the last block is home
            if (s.state === 'win' && Object.values(left).some((v) => v > 0)) { s.state = 'play'; s.endT = 0; }
            if (s.state !== 'play') break;
            manage();
        }
        if (s.state === 'win') break;
    }
    const result = s.state === 'play' ? 'stuck' : s.state;
    return { result, moves, nests: made.map((col) => col.map((n) => [n.color, n.need] as [string, number])) };
}

/** Play the recorded strokes at their recorded times (nests cut from the recording's order). */
export function replay(sim: Sim, moves: Recording['moves'], maxSec = 900): 'win' | 'lose' | 'stuck' {
    const s = sim;
    let m = 0;
    for (let t = 0; t < maxSec && s.state === 'play'; t += 0.5) {
        while (m < moves.length && moves[m][0] <= t) swipe(s, moves[m++][1]);
        for (let k = 0; k < 30; k++) s.update(1 / 60);
    }
    return s.state === 'play' ? 'stuck' : s.state;
}

/** One stroke through the points (the stroke frees sand along the whole path). */
function swipe(s: Sim, pts: [number, number][]) {
    s.endSwipe();
    for (const [x, y] of pts) s.swipeTo(x, y);
    s.endSwipe();
}
