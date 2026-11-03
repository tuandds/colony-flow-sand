// Gameplay variants: the same levels played under different rules, picked beside the level
// editor's Play button and passed to the game as ?variant=<n>. Variant 1 is the game as it is;
// 2 and 3 play exactly like it for now, as starting points for changes of their own.

export const VARIANTS = [
    { id: 1, name: 'Phiên bản 1', note: 'Gameplay hiện tại' },
    { id: 2, name: 'Phiên bản 2', note: 'Tạm thời giống bản 1' },
    { id: 3, name: 'Phiên bản 3', note: 'Tạm thời giống bản 1' },
] as const;
export type Variant = (typeof VARIANTS)[number]['id'];

/** The variant this page plays: ?variant=<n> when it names one, else 1. */
export const VARIANT: Variant = (() => {
    const n = Number(new URLSearchParams(location.search).get('variant'));
    return VARIANTS.find((v) => v.id === n)?.id ?? 1;
})();
