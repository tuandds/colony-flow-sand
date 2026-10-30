// A simple test player, used to check that a level can be won (level editor, console tests).
// It swipes the lowest fixed sand of the colours the front nests want, and only frees more
// sand while the conveyor has room. Sand physics uses Math.random, so one game can differ
// from the next; the editor asks for two wins in a row.
import { BLOCK_GRAINS, NEST_SCALE, SLOTS, nestPos } from './layout';
import { type Nest, Sim } from './sim';
import { mulberry32 } from './util';

/** Play the level loaded in `sim` for up to `maxSec` game seconds. */
export function playBot(sim: Sim, maxSec = 300): 'win' | 'lose' | 'stuck' {
    for (let t = 0; t < maxSec && sim.state === 'play'; t += 0.5) {
        botStep(sim);
        for (let k = 0; k < 30; k++) sim.update(1 / 60);
    }
    return sim.state === 'play' ? 'stuck' : sim.state;
}

/** One decision of the test bot (it decides every 0.5 s of game time). */
export function botStep(sim: Sim) {
    const s = sim;
    {
        if (!s.boardFalling()) {
            const grains = Object.values(s.looseByColour()).reduce((a, b) => a + b, 0);
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
            // keep a few slots free: at most SLOTS - 2 blocks for wanted colours, SLOTS - 4 otherwise
            if (want.length && used < SLOTS - 2) swipe(s, want.slice(0, used < 10 ? 4 : 1));
            else if (!want.length && any.length && used < SLOTS - 4) swipe(s, [any[any.length >> 1]]);
        }
    }
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
    // the bot waits while PACE blocks are pending; nests close early before that, so the belt
    // drains. Only nests with at least MIN_EARLY blocks close early, so there are no tiny nests.
    const PACE = 12, CROWDED = 9, MIN_EARLY = Math.max(2, lo - 2);
    // blocks of each colour still to reach the conveyor
    const left: Record<string, number> = {}, grains: Record<string, number> = {};
    for (const k of s.key) if (k) grains[s.keys[k]!] = (grains[s.keys[k]!] || 0) + 1;
    for (const k in grains) left[k] = Math.round(grains[k] / BLOCK_GRAINS);
    const seen = new WeakSet<object>();
    const COLS = s.ncols;
    const made: Nest[][] = Array.from({ length: COLS }, () => []);
    const moves: Recording['moves'] = [];
    s.cols = Array.from({ length: COLS }, () => []);

    // A column whose nest is gone gets its next nest at once, as the game's queued nests do; a
    // column with no colour left to take is closed for good (in the game its queue ran out).
    const closed = new Array<boolean>(COLS).fill(false);
    const manage = () => {
        for (const b of s.slots) if (b && !seen.has(b)) { seen.add(b); left[b.k]--; }
        const free: Record<string, number> = {};
        let onBelt = 0;
        for (const b of s.slots) if (b && !b.claimed) { free[b.k] = (free[b.k] || 0) + 1; onBelt++; }
        for (const k of s.pipe) { free[k] = (free[k] || 0) + 1; onBelt++; }
        const open = s.cols.map((c) => c[0]).filter((n) => n && !n.pop);
        // crowded belt: a nest with ants on the way stops at what they carry, so its column frees
        // up sooner (only then: a nest closed with no ant coming would pop at a different moment
        // than the same nest, sized from the start, does in the game)
        if (onBelt > CROWDED) {
            const has = (x: Nest) => x.got + x.inflight;
            const moving = open.filter((x) => x.inflight > 0 && has(x) < x.need);
            const n = moving.filter((x) => has(x) >= MIN_EARLY).sort((a, b) => has(b) - has(a))[0];
            if (n) n.need = has(n);
        }
        let inflow: Record<string, number> | null = null;
        for (let ci = 0; ci < COLS; ci++) {
            if (s.cols[ci].length || closed[ci]) continue;
            const taken = new Set(open.map((n) => n.color));
            const cands = Object.keys(left).filter((k) => !taken.has(k) && (free[k] || 0) + left[k] > 0);
            if (!cands.length) { closed[ci] = true; continue; }
            // what comes next: on the belt, then falling into the funnel, then lowest in the picture
            inflow ??= upcoming(s);
            const score = (k: string) => (free[k] || 0) * 1e6 + (inflow![k] || 0) * 10 + rng();
            const k = cands.sort((a, b) => score(b) - score(a))[0];
            const target = lo + Math.floor(rng() * (hi - lo + 1));
            // a colour's supply only falls through its own nest, so the size is final here
            const need = Math.min(target, (free[k] || 0) + left[k]);
            const [dx, dy] = nestPos(ci, 0, COLS);
            const nest: Nest = { color: k, need, got: 0, inflight: 0, cool: 0, pop: 0, dx, dy, bump: 0 };
            s.cols[ci].push(nest);
            made[ci].push(nest);
            open.push(nest);
        }
    };
    manage();

    for (let t = 0; t < maxSec && s.state !== 'lose'; t += 0.5) {
        let pending = s.slots.filter((b) => b && !b.claimed).length + s.pipe.length;
        const falling = s.boardFalling();
        if (!falling) for (const n of Object.values(s.looseByColour())) pending += n / BLOCK_GRAINS;
        if (!falling && pending < PACE) {
            // the lowest fixed grain of every 4th column; swipe a few of the lowest ones
            const G = s.G, pts: [number, number, number][] = [];
            const wanted = new Set(s.cols.map((c) => c[0]).filter((n) => n && !n.pop && n.got + n.inflight < n.need).map((n) => n.color));
            for (let x = 0; x < G; x += 4) {
                for (let y = G - 1; y >= 0; y--) {
                    const p = y * G + x;
                    // lowest first, and colours an open nest still wants before the rest
                    if (s.key[p] && !s.loose[p]) { pts.push([s.ox + (x + 0.5) * s.gs, s.oy + (y + 0.5) * s.gs, y + rng() * 6 + (wanted.has(s.keys[s.key[p]]!) ? 14 : 0)]); break; }
                }
            }
            pts.sort((a, b) => b[2] - a[2]);
            if (pts.length) {
                const stroke = pts.slice(0, 1 + Math.floor(rng() * 3)).map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10] as [number, number]);
                swipe(s, stroke);
                moves.push([t, stroke]);
            }
        }
        for (let k = 0; k < 30; k++) {
            s.update(1 / 60);
            // empty columns look like a win to the sim until the last block is in a nest
            if (s.state === 'win' && (Object.values(left).some((v) => v > 0) || s.pipe.length || s.slots.some(Boolean) || s.ants.length)) { s.state = 'play'; s.endT = 0; }
            if (s.state !== 'play') break;
            manage();
        }
        if (s.state === 'win') break;
    }
    const result = s.state === 'play' ? 'stuck' : s.state;
    return { result, moves, nests: made.map((col) => col.map((n) => [n.color, n.need] as [string, number])) };
}

/** Play recorded strokes at their recorded times. */
export function replay(sim: Sim, moves: Recording['moves'], maxSec = 900): 'win' | 'lose' | 'stuck' {
    let m = 0;
    for (let t = 0; t < maxSec && sim.state === 'play'; t += 0.5) {
        m = replayStep(sim, moves, m, t);
        for (let k = 0; k < 30; k++) sim.update(1 / 60);
    }
    return sim.state === 'play' ? 'stuck' : sim.state;
}

/** Make every recorded stroke due by game time `t`, starting at index `m`; returns the next index. */
export function replayStep(sim: Sim, moves: Recording['moves'], m: number, t: number) {
    while (m < moves.length && moves[m][0] <= t) swipe(sim, moves[m++][1]);
    return m;
}

/** Grains of each colour on their way to the hole (hopper, loose sand falling or in the funnel),
 * plus the lowest sand of the picture, which a bottom-up dig frees next. */
function upcoming(s: Sim) {
    const out: Record<string, number> = {};
    for (const k in s.hopper) out[k] = (out[k] || 0) + s.hopper[k] * 4;
    for (const [k, n] of Object.entries(s.looseByColour())) out[k] = (out[k] || 0) + n * 4;
    for (let x = 0; x < s.G; x += 2) {
        for (let y = s.G - 1; y >= 0; y--) {
            const p = y * s.G + x;
            if (s.key[p] && !s.loose[p]) { const k = s.keys[s.key[p]]!; out[k] = (out[k] || 0) + 1; break; }
        }
    }
    return out;
}

/** One stroke through the points (the stroke frees sand along the whole path). */
function swipe(s: Sim, pts: [number, number][]) {
    s.endSwipe();
    for (const [x, y] of pts) s.swipeTo(x, y);
    s.endSwipe();
}
