// Gameplay variants: the same levels played under different rules, picked beside the level
// editor's Play button and passed to the game as ?variant=<n>. Variant 1 is the game as it is.
import { BLOCK_GRAINS, SLOTS } from './layout';

export const VARIANTS = [
    { id: 1, name: 'Phiên bản 1', note: 'Gameplay hiện tại' },
    { id: 2, name: 'Phiên bản 2', note: 'Không kiến, 16 hạt/khối, 100 khối trên băng' },
    { id: 3, name: 'Phiên bản 3', note: 'Không băng chuyền: khối nằm trên bãi, kiến đi lấy' },
] as const;
export type Variant = (typeof VARIANTS)[number]['id'];

/** The variant this page plays: ?variant=<n> when it names one, else 1. */
export const VARIANT: Variant = (() => {
    const n = Number(new URLSearchParams(location.search).get('variant'));
    return VARIANTS.find((v) => v.id === n)?.id ?? 1;
})();

export interface Rules {
    /** Grains of a colour that make one block. */
    blockGrains: number;
    /** Blocks the conveyor holds (full is a loss). */
    slots: number;
    /** Ants carry blocks to their nests; without them a block passing a nest of its colour (on
     * the belt's bottom run, right over it) jumps in by itself. */
    ants: boolean;
    /** Blocks lie loose on the belt, a little off its middle and turned, piling into each other,
     * with no holders under them. */
    looseBelt: boolean;
    /** No conveyor: an open yard in its place, where blocks drop in and lie about, bumping into
     * each other; ants walk out to them. */
    yard: boolean;
}

/** Variant 2: no ants, 16 grains a block (so a picture makes about 4 times as many blocks, and
 * nests are 4 times as big: as many nests as variant 1), a belt of 100 blocks lying loose.
 * Variant 3: variant 1's blocks, nests and ants, but no conveyor: a yard of up to SLOTS blocks. */
export const RULES: Rules = VARIANT === 2
    ? { blockGrains: 16, slots: 100, ants: false, looseBelt: true, yard: false }
    : { blockGrains: BLOCK_GRAINS, slots: SLOTS, ants: true, looseBelt: false, yard: VARIANT === 3 };
