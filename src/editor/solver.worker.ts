// Runs the test bot on a custom level away from the editor's UI thread. The editor sends one
// attempt at a time (a recorded play, or an order + seed); the worker plays it and answers.
import { type Recording, playBot, recordPlay, replay } from '../game/bot';
import { type LevelDef, useLevels } from '../game/levels';
import { Sim } from '../game/sim';

/** `record` set: first play the level while building its nests (recordPlay, that variant), then
 * replay the same strokes against those nests; otherwise the test bot plays the level as it is. */
export interface SolveJob { id: number; def: LevelDef; runs: number; maxSec: number; record?: number; moves?: Recording['moves'] }
export interface SolveResult { id: number; wins: number; runs: number; last: string; ms: number; nests?: [string, number][][]; moves?: Recording['moves']; why?: string; stage?: 'record' | 'check' }
/** `moves` set (and no `record`): check a level by replaying its saved winning strokes. */

self.onmessage = (e: MessageEvent<SolveJob>) => {
    const { id, runs, maxSec, record } = e.data;
    let def = e.data.def;
    const t0 = performance.now();
    useLevels([def]);
    let sim = new Sim(0, () => {});
    let rec: Recording | undefined = e.data.moves ? { result: 'win', nests: [], moves: e.data.moves } : undefined;
    if (record != null) {
        rec = recordPlay(sim, record);
        if (rec.result !== 'win') {
            post({ id, wins: 0, runs: 1, last: rec.result, ms: Math.round(performance.now() - t0), why: whyLost(sim), stage: 'record' });
            return;
        }
        def = { ...def, nests: rec.nests };
        useLevels([def]);
        sim = new Sim(0, () => {});
    }
    let wins = 0, last = '', played = 0;
    for (let r = 0; r < runs; r++) {
        if (r) sim.start(0);
        last = rec ? replay(sim, rec.moves, Math.max(maxSec, (rec.moves.at(-1)?.[0] ?? 0) + 200)) : playBot(sim, maxSec);
        played++;
        if (last !== 'win') break; // every run has to win
        wins++;
    }
    post({ id, wins, runs: played, last, ms: Math.round(performance.now() - t0), nests: record != null ? rec?.nests : undefined, moves: record != null ? rec?.moves : undefined, why: last === 'win' ? undefined : whyLost(sim), stage: 'check' });
};

const post = (r: SolveResult) => (self as unknown as Worker).postMessage(r);

/** Where a failed game ended: what the front nests wanted and what filled the belt. */
function whyLost(sim: Sim) {
    const belt: Record<string, number> = {};
    for (const b of sim.slots) if (b) belt[b.k] = (belt[b.k] || 0) + 1;
    return 'cần ' + sim.cols.map((c) => (c[0] ? c[0].color + (c[0].need - c[0].got) : '–')).join(' ') +
        ' · băng chuyền ' + Object.entries(belt).map(([k, n]) => k + n).join(' ') + ` · ${Math.round(sim.time)} s`;
}
