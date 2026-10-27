// Small colour and random helpers shared by the simulation and the scene.

export function hexToRgb(h: string): [number, number, number] {
    const v = parseInt(h.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const mix = (c: number, f: number) => Math.max(0, Math.min(255, Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f))));

/** Lighten (f > 0) or darken (f < 0) a hex colour; returns 0xRRGGBB. */
export function shade(hex: string, f: number): number {
    const [r, g, b] = hexToRgb(hex);
    return (mix(r, f) << 16) | (mix(g, f) << 8) | mix(b, f);
}

/** Same as shade() but as a CSS colour string (for Text strokes). */
export function shadeCss(hex: string, f: number): string {
    return '#' + shade(hex, f).toString(16).padStart(6, '0');
}

/** Pack a hex colour (optionally lightened/darkened) into ImageData's little-endian ABGR. */
export function packColor(hex: string, f: number): number {
    const [r, g, b] = hexToRgb(hex);
    return ((255 << 24) | (mix(b, f) << 16) | (mix(g, f) << 8) | mix(r, f)) >>> 0;
}

/** ABGR pixel -> 0xRRGGBB. */
export function abgrToRgb(c: number): number {
    return ((c & 255) << 16) | (((c >> 8) & 255) << 8) | ((c >> 16) & 255);
}

export function mulberry32(a: number): () => number {
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function hash(x: number, y: number, i: number): number {
    let h = x * 374761393 + y * 668265263 + i * 2147483647;
    h = (h ^ (h >>> 13)) * 1274126177;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** True for colours light enough that white text on them is hard to read. */
export function isLight(hex: string): boolean {
    const [r, g, b] = hexToRgb(hex);
    return 0.299 * r + 0.587 * g + 0.114 * b > 205;
}
