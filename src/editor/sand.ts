// Image -> grain-level sand picture, and drawing sand the way the game does. A picture is one
// palette key per grain ('.' = empty), w x h grains covering the game's whole frame
// (frameGrains in layout.ts), so what the editor shows is what the game shows.
import { FRAME_N, SUB, frameGrains } from '../game/layout';
import { BANK_COLOURS, SAND_PALETTE } from '../game/levels';
import { hash, packColor } from '../game/util';

/** A Colour Bank entry: `key` is the one-character key in a picture's grain data (never
 * changes), `name` the single-word name shown in the editor. */
export interface BankColour { key: string; name: string; hex: string }
/** The Colour Bank the editor paints and converts images with: the game's sand colours by
 * default, edited by the user (see setBank). */
export let BANK: BankColour[] = BANK_COLOURS.map((c) => ({ ...c }));
export const HEX = new Map<string, string>(), NAME = new Map<string, string>();
let PAL_LAB = new Map<string, Lab>();
export function setBank(list: BankColour[]) {
    BANK = list;
    // keep colours a picture may still use after they leave the bank, so it still draws
    for (const c of SAND_PALETTE) if (!HEX.has(c.key)) { HEX.set(c.key, c.hex); NAME.set(c.key, c.name); }
    for (const c of list) { HEX.set(c.key, c.hex); NAME.set(c.key, c.name); }
    PAL_LAB = new Map(list.map((c) => [c.key, hexLab(c.hex)]));
}
/** Key of the outline colour: the bank's 'ink', or its darkest colour. */
export function outlineKey() {
    const ink = BANK.find((c) => c.name === 'ink');
    return ink ? ink.key : [...BANK].sort((a, b) => hexLab(a.hex)[0] - hexLab(b.hex)[0])[0].key;
}
/** Sand the game would shed at once: islands this small fall off by themselves (sim.ts). */
const MIN_ISLAND = 64;
/** Outline width in grains; thinner rims would count as debris in the game. */
const RIM = 4;

// ---------- colour maths (sRGB -> CIELAB; distance = how different two colours look) ----------
export type Lab = [number, number, number];
export function rgbLab(r: number, g: number, b: number): Lab {
    const lin = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const R = lin(r), G = lin(g), B = lin(b);
    const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    const x = f((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047), y = f(R * 0.2126 + G * 0.7152 + B * 0.0722), z = f((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
export function hexLab(hex: string): Lab { const v = parseInt(hex.slice(1), 16); return rgbLab((v >> 16) & 255, (v >> 8) & 255, v & 255); }
export const dist = (a: Lab, b: Lab) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
export function nearestKey(lab: Lab, keys: string[]) {
    let best = keys[0], bd = Infinity;
    for (const k of keys) { const lk = PAL_LAB.get(k); if (!lk) continue; const d = dist(lab, lk); if (d < bd) { bd = d; best = k; } }
    return best;
}

export interface ConvertOpts {
    /** Picture size in cells; the sand is n * SUB grains per side. */
    n: number;
    /** Most colours to keep (the outline not counted). */
    colors: number;
    /** Background removal: CIELAB distance to the corner colour (0 = off). */
    bg: number;
    outline: boolean;
    /** Passes of a 3 x 3 majority filter that clean up speckle. */
    smooth: number;
    /** 'contain': the whole image fits the frame; 'cover': the image fills the frame, cropped. */
    fit: 'contain' | 'cover';
    /** Colours to choose from (the Active Palette); every bank colour when empty. */
    keys?: string[];
}

/** Turn an image into sand: nearest palette colour per grain, few colours, no loose specks. */
export function imageToSand(img: HTMLImageElement, o: ConvertOpts): string[] {
    const { w: FW, h: FH } = frameGrains(o.n), m = o.outline ? RIM : 0, iw = FW - 2 * m, ih = FH - 2 * m;
    const cv = document.createElement('canvas');
    cv.width = iw; cv.height = ih;
    const cx = cv.getContext('2d', { willReadFrequently: true })!;
    const sc = (o.fit === 'cover' ? Math.max : Math.min)(iw / img.naturalWidth, ih / img.naturalHeight);
    const w = img.naturalWidth * sc, h = img.naturalHeight * sc;
    cx.imageSmoothingQuality = 'high';
    cx.drawImage(img, (iw - w) / 2, (ih - h) / 2, w, h);
    const px = cx.getImageData(0, 0, iw, ih).data;
    const bgLab = o.bg > 0 ? cornerColour(img) : null;

    // every grain: its colour (as a 6-bit-per-channel id) or -1 for empty
    const ids = new Int32Array(iw * ih), labOf = new Map<number, Lab>();
    for (let i = 0; i < ids.length; i++) {
        const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
        if (px[i * 4 + 3] < 128) { ids[i] = -1; continue; }
        const id = ((r >> 2) << 12) | ((g >> 2) << 6) | (b >> 2);
        let lab = labOf.get(id);
        if (!lab) { lab = rgbLab(r, g, b); labOf.set(id, lab); }
        ids[i] = bgLab && dist(lab, bgLab) < o.bg ? -1 : id;
    }
    // nearest palette colour; while there are too many, drop the colour whose loss changes the
    // picture least (total CIELAB error, so a small but distinct detail like a red roof stays)
    // choose from a coarser histogram (4 bits per channel) so photos stay fast
    const hist = new Map<number, number>();
    for (const id of ids) if (id >= 0) { const c = ((id >> 14) << 8) | (((id >> 8) & 15) << 4) | ((id >> 2) & 15); hist.set(c, (hist.get(c) || 0) + 1); }
    const coarse = [...hist.keys()], weight = coarse.map((c) => hist.get(c)!);
    const labs = coarse.map((c) => rgbLab(((c >> 8) << 4) + 8, (((c >> 4) & 15) << 4) + 8, ((c & 15) << 4) + 8));
    const PAL = new Map(BANK.map((c) => [c.key, hexLab(c.hex)]));
    const best = (lab: Lab, keys: string[]) => {
        let k = keys[0], d = Infinity;
        for (const c of keys) { const e = dist(lab, PAL.get(c)!); if (e < d) { d = e; k = c; } }
        return [k, d] as const;
    };
    const rim = outlineKey();
    let keep = (o.keys?.length ? o.keys : BANK.map((c) => c.key)).filter((k) => PAL.has(k) && (k !== rim || !o.outline));
    if (!keep.length) keep = BANK.map((c) => c.key);
    keep = [...new Set(labs.map((lab) => best(lab, keep)[0]))];
    while (keep.length > o.colors) {
        let drop = keep[0], least = Infinity;
        for (const k of keep) {
            const rest = keep.filter((c) => c !== k);
            let cost = 0;
            for (let i = 0; i < labs.length && cost < least; i++) {
                const [nk, nd] = best(labs[i], keep);
                if (nk === k) cost += (best(labs[i], rest)[1] - nd) * weight[i];
            }
            if (cost < least) { least = cost; drop = k; }
        }
        keep = keep.filter((c) => c !== drop);
    }
    // every grain then takes its nearest kept colour (at full colour precision)
    const pick = new Map<number, string>();
    let keys = Array.from(ids, (id) => {
        if (id < 0) return '.';
        let k = pick.get(id);
        if (!k) { k = best(labOf.get(id)!, keep)[0]; pick.set(id, k); }
        return k;
    });
    for (let p = 0; p < o.smooth; p++) keys = majority(keys, iw, ih);
    keys = dropSpecks(keys, iw, ih);

    // place inside the outline margin, then draw the rim
    const out = new Array<string>(FW * FH).fill('.');
    for (let y = 0; y < ih; y++) for (let x = 0; x < iw; x++) out[(y + m) * FW + x + m] = keys[y * iw + x];
    return o.outline ? addRim(out, FW, FH) : out;
}

/** Average colour of the image's corners (the background guess), or null when they are transparent. */
function cornerColour(img: HTMLImageElement): Lab | null {
    const cv = document.createElement('canvas'), S = 32, c = 4;
    cv.width = cv.height = S;
    const cx = cv.getContext('2d', { willReadFrequently: true })!;
    cx.drawImage(img, 0, 0, S, S);
    const d = cx.getImageData(0, 0, S, S).data;
    let r = 0, g = 0, b = 0, a = 0;
    for (const [ox, oy] of [[0, 0], [S - c, 0], [0, S - c], [S - c, S - c]]) {
        for (let y = oy; y < oy + c; y++) for (let x = ox; x < ox + c; x++) {
            const i = (y * S + x) * 4, al = d[i + 3];
            r += d[i] * al; g += d[i + 1] * al; b += d[i + 2] * al; a += al;
        }
    }
    return a / (4 * c * c * 255) < 0.5 ? null : rgbLab(r / a, g / a, b / a);
}

/** Each grain takes the most common key of its 3 x 3 neighbourhood when that wins clearly. */
function majority(keys: string[], w: number, h: number) {
    const out = keys.slice(), count = new Map<string, number>();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        count.clear();
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx, yy = y + dy;
            const k = xx < 0 || yy < 0 || xx >= w || yy >= h ? '.' : keys[yy * w + xx];
            count.set(k, (count.get(k) || 0) + 1);
        }
        let best = keys[y * w + x], bn = count.get(best)!;
        for (const [k, c] of count) if (c > bn) { best = k; bn = c; }
        if (bn >= 5) out[y * w + x] = best;
    }
    return out;
}

/** Remove islands of sand too small to stay fixed in the game. */
export function dropSpecks(keys: string[], w: number, h: number) {
    const out = keys.slice(), seen = new Uint8Array(w * h), stack: number[] = [], comp: number[] = [];
    for (let s = 0; s < out.length; s++) {
        if (out[s] === '.' || seen[s]) continue;
        seen[s] = 1; stack.push(s); comp.length = 0;
        while (stack.length) {
            const p = stack.pop()!, x = p % w, y = (p / w) | 0;
            comp.push(p);
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
                const xx = x + dx, yy = y + dy, q = yy * w + xx;
                if (xx < 0 || yy < 0 || xx >= w || yy >= h || seen[q] || out[q] === '.') continue;
                seen[q] = 1; stack.push(q);
            }
        }
        if (comp.length < MIN_ISLAND) for (const p of comp) out[p] = '.';
    }
    return out;
}

/** Dark rim RIM grains wide around the picture, like the built-in pictures' outline. */
export function addRim(keys: string[], w: number, h: number) {
    const rim = outlineKey(), out = keys.slice(), d = new Int16Array(w * h).fill(-1), q: number[] = [];
    for (let p = 0; p < keys.length; p++) if (keys[p] !== '.') { d[p] = 0; q.push(p); }
    for (let i = 0; i < q.length; i++) {
        const p = q[i], x = p % w, y = (p / w) | 0;
        if (d[p] >= RIM) continue;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
            const xx = x + dx, yy = y + dy, r = yy * w + xx;
            if (xx < 0 || yy < 0 || xx >= w || yy >= h || d[r] >= 0) continue;
            d[r] = d[p] + 1; out[r] = rim; q.push(r);
        }
    }
    return out;
}

/** Scale a cell-based picture (first editor version, rows of keys) up to grains, centred in
 * the frame where the game used to put it. */
export function rowsToGrains(rows: string[], n: number, keyOf: (c: string) => string) {
    const { w, h, pad } = frameGrains(n), out = new Array<string>(w * h).fill('.');
    for (let y = 0; y < h; y++) for (let x = 0; x < h; x++) {
        const c = rows[(y / SUB) | 0]?.[(x / SUB) | 0] ?? '.';
        out[y * w + x + pad] = c === '.' ? '.' : keyOf(c);
    }
    return out;
}

/** Put a picture `oldW` x `oldH` grains (a smaller picture, an earlier editor level's square or
 * frame) centred in the game's frame (FRAME_N cells), where the game shows it; returns the
 * grains and whether any sand fell outside the frame and was cut. */
export function fitToFrame(keys: string[], oldW: number, oldH: number) {
    const { w, h } = frameGrains(FRAME_N), out = new Array<string>(w * h).fill('.');
    const dx = Math.floor((w - oldW) / 2), dy = Math.floor((h - oldH) / 2);
    let cut = false;
    for (let y = 0; y < oldH; y++) for (let x = 0; x < oldW; x++) {
        const k = keys[y * oldW + x] ?? '.', nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) out[ny * w + nx] = k;
        else if (k !== '.') cut = true;
    }
    return { keys: out, cut };
}

/** Draw sand like the game does: one pixel per grain with a little brightness noise per grain. */
export function drawSand(ctx: CanvasRenderingContext2D, keys: string[], gw: number, gh: number, x: number, y: number, w: number, h: number) {
    const img = new ImageData(gw, gh), px = new Uint32Array(img.data.buffer);
    for (let p = 0; p < keys.length; p++) {
        const k = keys[p];
        if (k !== '.') px[p] = packColor(HEX.get(k) ?? '#ff00ff', (hash(p % gw, (p / gw) | 0, 7) - 0.5) * 0.16);
    }
    const cv = document.createElement('canvas');
    cv.width = gw; cv.height = gh;
    cv.getContext('2d')!.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(cv, x, y, w, h);
}

/** Grains per key ('.' left out). */
export function countKeys(keys: string[]) {
    const c = new Map<string, number>();
    for (const k of keys) if (k !== '.') c.set(k, (c.get(k) || 0) + 1);
    return c;
}

setBank(BANK);
