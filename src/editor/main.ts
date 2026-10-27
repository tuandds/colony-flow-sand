// Colony Flow Sand level editor. Plain DOM. Turns an imported image into a sand picture made of the
// game's own colours, lets you touch it up, and finds a nest layout the test bot can win
// (src/game/bot.ts, run in web workers). Levels are saved in the browser in the format the game
// reads with ?custom=1 (LevelDef with rows, src/game/levels.ts).
import { CUSTOM_KEY, OUTLINE, PALETTE, PREVIEW_KEY, type LevelDef, loadCustomLevels, useLevels } from '../game/levels';
import { NEST_SCALE } from '../game/layout';
import { Sim } from '../game/sim';
import type { SolveJob, SolveResult } from './solver.worker';

interface EdLevel extends LevelDef {
    rows: string[];
    chunk: [number, number];
    order: 'rows' | 'onion';
    seed: number;
    salt: number;
    /** Nests built by a recorded play (see recordPlay); dropped when the picture changes. */
    nests?: [string, number][][];
    /** The test bot won this exact picture + nest layout twice. */
    verified?: boolean;
}
type Tool = 'paint' | 'erase' | 'fill' | 'pick';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
// one fixed key per palette colour, so a picture's rows stay readable and stable
const KEY_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const KEY_OF = new Map(PALETTE.map((hex, i) => [hex, KEY_CHARS[i]]));
const HEX_OF = new Map(PALETTE.map((hex, i) => [KEY_CHARS[i], hex]));
const OUTLINE_KEY = KEY_OF.get(OUTLINE)!;
const DIFF: Record<string, [number, number]> = { '3,5': [3, 5], '4,6': [4, 6], '4,7': [4, 7], '5,8': [5, 8], '6,9': [6, 9] };

// ---------- state ----------
let levels: EdLevel[] = load();
let savedAll = JSON.stringify(levels);
let cur = 0;
let colour = PALETTE[0];
let tool: Tool = 'paint';
let undoStack: string[] = [];
let image: HTMLImageElement | null = null;

function load(): EdLevel[] {
    const list = loadCustomLevels(CUSTOM_KEY).map(normalize);
    return list.length ? list : [blankLevel(20)];
}

function normalize(L: LevelDef): EdLevel {
    const n = L.n, rows = (L.rows || []).map((r) => r.padEnd(n, '.').slice(0, n));
    while (rows.length < n) rows.push('.'.repeat(n));
    // keys in saved levels may come from another palette order: re-key them by colour
    const remap = new Map<string, string>();
    for (const [k, hex] of Object.entries(L.colors)) remap.set(k, KEY_OF.get(hex) ?? nearestKey(hexLab(hex), [...KEY_OF.values()]));
    return {
        name: L.name || 'Màn mới', n, chunk: L.chunk || [4, 7], colors: {},
        rows: rows.map((r) => [...r].map((c) => (c === '.' ? '.' : remap.get(c) ?? '.')).join('')),
        order: L.order || 'rows', seed: L.seed ?? 0, salt: L.salt ?? randomSalt(),
        nests: L.nests?.map((col) => col.map(([k, n]) => [remap.get(k) ?? k, n] as [string, number])),
        verified: (L as EdLevel).verified,
    };
}

function blankLevel(n: number): EdLevel {
    return { name: 'Màn mới', n, chunk: [4, 7], colors: {}, rows: Array.from({ length: n }, () => '.'.repeat(n)), order: 'rows', seed: 0, salt: randomSalt() };
}
function randomSalt() { return 100 + Math.floor(Math.random() * 9000); }

const L = () => levels[cur];

/** The level as the game reads it: only the colours the picture uses. */
function toDef(l: EdLevel): EdLevel {
    const colors: Record<string, string> = {};
    for (const r of l.rows) for (const c of r) if (c !== '.') colors[c] = HEX_OF.get(c)!;
    return { ...l, colors };
}

function save() {
    try {
        const json = JSON.stringify(levels.map(toDef));
        localStorage.setItem(CUSTOM_KEY, json);
        localStorage.setItem(CUSTOM_KEY + '_at', String(Date.now()));
        savedAll = JSON.stringify(levels);
        renderDirty();
        toast('Đã lưu ' + levels.length + ' màn');
        return true;
    } catch {
        toast('Không lưu được: trình duyệt chặn bộ nhớ hoặc đã đầy');
        return false;
    }
}

/** Call before changing the current level: records an undo point. */
function snapshot() {
    undoStack.push(JSON.stringify(L()));
    if (undoStack.length > 80) undoStack.shift();
}
function undo() {
    const s = undoStack.pop();
    if (!s) return;
    levels[cur] = JSON.parse(s);
    renderAll();
}
/** The picture or nest settings changed: the old bot check no longer counts, and a new picture
 * also needs new recorded nests. */
function changed(what: 'picture' | 'nests' = 'picture') {
    L().verified = false;
    if (what === 'picture') delete L().nests;
    renderAll();
}

// ---------- colour maths (sRGB -> CIELAB, distance = how different two colours look) ----------
type Lab = [number, number, number];
function rgbLab(r: number, g: number, b: number): Lab {
    const lin = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const R = lin(r), G = lin(g), B = lin(b);
    const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    const x = f((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047), y = f(R * 0.2126 + G * 0.7152 + B * 0.0722), z = f((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
function hexLab(hex: string): Lab { const v = parseInt(hex.slice(1), 16); return rgbLab((v >> 16) & 255, (v >> 8) & 255, v & 255); }
const dist = (a: Lab, b: Lab) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const PAL_LAB = new Map([...HEX_OF].map(([k, hex]) => [k, hexLab(hex)]));
function nearestKey(lab: Lab, keys: string[]) {
    let best = keys[0], bd = Infinity;
    for (const k of keys) { const d = dist(lab, PAL_LAB.get(k)!); if (d < bd) { bd = d; best = k; } }
    return best;
}

// ---------- image -> sand picture ----------
const opt = { size: 20, colors: 6, bg: 12, outline: true, clean: true };

function convert() {
    if (!image) return;
    snapshot();
    const n = opt.size, pad = opt.outline ? 1 : 0, inner = n - 2 * pad, S = 8;
    // fit the image inside the inner square, keeping its shape; the rest stays transparent (empty)
    const cv = document.createElement('canvas');
    cv.width = cv.height = inner * S;
    const cx = cv.getContext('2d', { willReadFrequently: true })!;
    const sc = Math.min(cv.width / image.naturalWidth, cv.height / image.naturalHeight);
    const w = image.naturalWidth * sc, h = image.naturalHeight * sc;
    cx.imageSmoothingQuality = 'high';
    cx.drawImage(image, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
    const px = cx.getImageData(0, 0, cv.width, cv.height).data;
    const bgLab = cornerColour(image);

    // every pixel votes for its nearest palette colour (or for "empty" when transparent or
    // background); a cell takes the winning vote, so edges stay crisp instead of mixing colours
    const all = [...PAL_LAB.keys()], memo = new Map<number, string>();
    const votes: Map<string, number>[] = [];
    for (let y = 0; y < inner; y++) for (let x = 0; x < inner; x++) {
        const v = new Map<string, number>();
        for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
            const i = ((y * S + sy) * cv.width + x * S + sx) * 4;
            let k = '.';
            if (px[i + 3] >= 128) {
                const id = ((px[i] >> 2) << 12) | ((px[i + 1] >> 2) << 6) | (px[i + 2] >> 2);
                k = memo.get(id) ?? '';
                if (!k) {
                    const lab = rgbLab(px[i], px[i + 1], px[i + 2]);
                    k = bgLab && opt.bg > 0 && dist(lab, bgLab) < opt.bg ? '.' : nearestKey(lab, all);
                    memo.set(id, k);
                }
            }
            v.set(k, (v.get(k) || 0) + 1);
        }
        votes.push(v);
    }
    const pick = (v: Map<string, number>, allowed: (k: string) => boolean) => {
        if ((v.get('.') || 0) * 2 >= S * S) return '.';
        let best = '.', bn = 0;
        for (const [k, c] of v) if (k !== '.' && allowed(k) && c > bn) { best = k; bn = c; }
        return best;
    };
    let cells = votes.map((v) => pick(v, () => true));
    // too many colours: drop the rarest one; its cells re-vote among the rest (or take the nearest)
    for (;;) {
        const count = new Map<string, number>();
        for (const k of cells) if (k !== '.') count.set(k, (count.get(k) || 0) + 1);
        if (count.size <= opt.colors) break;
        const rare = [...count].sort((a, b) => a[1] - b[1])[0][0];
        const keep = [...count.keys()].filter((k) => k !== rare);
        cells = cells.map((k, i) => {
            if (k !== rare) return k;
            const again = pick(votes[i], (c) => keep.includes(c));
            return again !== '.' ? again : nearestKey(PAL_LAB.get(rare)!, keep);
        });
    }
    if (opt.clean) cells = cleanSpecks(cells, inner);

    const rows: string[] = [];
    for (let y = 0; y < n; y++) {
        let row = '';
        for (let x = 0; x < n; x++) {
            const ix = x - pad, iy = y - pad;
            row += ix >= 0 && iy >= 0 && ix < inner && iy < inner ? cells[iy * inner + ix] : '.';
        }
        rows.push(row);
    }
    L().n = n;
    L().rows = opt.outline ? addOutline(rows) : rows;
    changed();
}

/** Average colour of the image's four corners (the background guess), or null if they are transparent. */
function cornerColour(img: HTMLImageElement): Lab | null {
    const cv = document.createElement('canvas'), s = 4;
    cv.width = cv.height = 32;
    const cx = cv.getContext('2d', { willReadFrequently: true })!;
    cx.drawImage(img, 0, 0, 32, 32);
    const d = cx.getImageData(0, 0, 32, 32).data;
    let r = 0, g = 0, b = 0, a = 0;
    for (const [ox, oy] of [[0, 0], [32 - s, 0], [0, 32 - s], [32 - s, 32 - s]]) {
        for (let y = oy; y < oy + s; y++) for (let x = ox; x < ox + s; x++) {
            const i = (y * 32 + x) * 4, al = d[i + 3];
            r += d[i] * al; g += d[i + 1] * al; b += d[i + 2] * al; a += al;
        }
    }
    return a / (4 * s * s * 255) < 0.5 ? null : rgbLab(r / a, g / a, b / a);
}

/** A cell with no 4-neighbour of its own colour takes the most common neighbour colour. */
function cleanSpecks(cells: string[], n: number) {
    const out = cells.slice();
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const k = cells[y * n + x];
        if (k === '.') continue;
        const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => {
            const xx = x + dx, yy = y + dy;
            return xx < 0 || yy < 0 || xx >= n || yy >= n ? '.' : cells[yy * n + xx];
        });
        if (nb.includes(k)) continue;
        const count = new Map<string, number>();
        for (const c of nb) count.set(c, (count.get(c) || 0) + 1);
        out[y * n + x] = [...count].sort((a, b) => b[1] - a[1])[0][0];
    }
    return out;
}

/** Dark outline like the built-in pictures: every empty cell touching the picture. */
function addOutline(rows: string[]) {
    const n = rows.length, g = rows.map((r) => [...r]);
    const at = (x: number, y: number) => x >= 0 && y >= 0 && x < n && y < n && rows[y][x] !== '.';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        if (rows[y][x] === '.' && (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1))) g[y][x] = OUTLINE_KEY;
    }
    return g.map((r) => r.join(''));
}

// ---------- picture grid ----------
const grid = $<HTMLCanvasElement>('grid');
let cellPx = 24;
let painting: 'paint' | 'erase' | null = null;

function renderGrid() {
    const l = L(), n = l.n;
    const wrap = grid.parentElement!;
    cellPx = Math.max(10, Math.min(30, Math.floor((wrap.clientWidth - 24) / n)));
    const dpr = window.devicePixelRatio || 1;
    grid.width = n * cellPx * dpr; grid.height = n * cellPx * dpr;
    grid.style.width = n * cellPx + 'px'; grid.style.height = n * cellPx + 'px';
    const g = grid.getContext('2d')!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#f0dcb4'; g.fillRect(0, 0, n * cellPx, n * cellPx);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const k = l.rows[y][x];
        if (k === '.') {
            g.strokeStyle = 'rgba(122,74,36,.12)'; g.strokeRect(x * cellPx + 0.5, y * cellPx + 0.5, cellPx - 1, cellPx - 1);
            continue;
        }
        g.fillStyle = HEX_OF.get(k)!; g.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
        g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x * cellPx, y * cellPx, cellPx, 2);
        g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(x * cellPx, y * cellPx + cellPx - 2, cellPx, 2);
    }
}

function cellAt(e: PointerEvent): [number, number] | null {
    const r = grid.getBoundingClientRect(), n = L().n;
    const x = Math.floor(((e.clientX - r.left) / r.width) * n), y = Math.floor(((e.clientY - r.top) / r.height) * n);
    return x >= 0 && y >= 0 && x < n && y < n ? [x, y] : null;
}
function setCell(x: number, y: number, k: string) {
    const row = L().rows[y];
    if (row[x] === k) return false;
    L().rows[y] = row.slice(0, x) + k + row.slice(x + 1);
    return true;
}
function flood(x: number, y: number, k: string) {
    const rows = L().rows.map((r) => [...r]), n = L().n, from = rows[y][x];
    if (from === k) return;
    const stack = [[x, y]];
    while (stack.length) {
        const [cx, cy] = stack.pop()!;
        if (cx < 0 || cy < 0 || cx >= n || cy >= n || rows[cy][cx] !== from) continue;
        rows[cy][cx] = k;
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
    L().rows = rows.map((r) => r.join(''));
}

grid.addEventListener('contextmenu', (e) => e.preventDefault());
grid.addEventListener('pointerdown', (e) => {
    const c = cellAt(e);
    if (!c) return;
    const [x, y] = c, key = KEY_OF.get(colour)!;
    if (tool === 'pick' && e.button !== 2) {
        const k = L().rows[y][x];
        if (k !== '.') { colour = HEX_OF.get(k)!; tool = 'paint'; renderPalette(); }
        return;
    }
    snapshot();
    if (tool === 'fill' && e.button !== 2) { flood(x, y, key); changed(); return; }
    painting = e.button === 2 || tool === 'erase' ? 'erase' : 'paint';
    grid.setPointerCapture(e.pointerId);
    if (setCell(x, y, painting === 'erase' ? '.' : key)) renderGrid();
});
grid.addEventListener('pointermove', (e) => {
    if (!painting) return;
    const c = cellAt(e);
    if (c && setCell(c[0], c[1], painting === 'erase' ? '.' : KEY_OF.get(colour)!)) renderGrid();
});
grid.addEventListener('pointerup', () => { if (painting) { painting = null; changed(); } });

// ---------- palette + tools ----------
function renderPalette() {
    const used = new Set(L().rows.join(''));
    $('palette').innerHTML = '';
    for (const hex of PALETTE) {
        const b = document.createElement('button');
        b.className = 'bank-sw' + (hex === colour ? ' on' : '') + (used.has(KEY_OF.get(hex)!) ? ' used' : '');
        b.style.background = hex;
        b.title = hex;
        b.onclick = () => { colour = hex; if (tool === 'erase' || tool === 'pick') tool = 'paint'; renderPalette(); };
        $('palette').appendChild(b);
    }
    $('tools').innerHTML = '';
    for (const [t, icon, tip] of [['paint', '✏️', 'Vẽ (B)'], ['erase', '🧽', 'Tẩy (E)'], ['fill', '🪣', 'Đổ màu (G)'], ['pick', '💧', 'Hút màu (I)']] as const) {
        const b = document.createElement('button');
        b.className = 'tool' + (tool === t ? ' on' : '');
        b.textContent = icon; b.title = tip;
        b.onclick = () => { tool = t; renderPalette(); };
        $('tools').appendChild(b);
    }
}

// ---------- picture info + checks ----------
function colourCounts(l: EdLevel) {
    const count = new Map<string, number>();
    for (const r of l.rows) for (const c of r) if (c !== '.') count.set(c, (count.get(c) || 0) + 1);
    return [...count].sort((a, b) => b[1] - a[1]);
}

function renderInfo() {
    const l = L(), counts = colourCounts(l), total = counts.reduce((s, [, c]) => s + c, 0);
    $('counts').innerHTML = counts.map(([k, c]) => `<span class="chip"><i style="background:${HEX_OF.get(k)}"></i>${c}</span>`).join('') || '<span class="hint">Chưa có cát</span>';
    const msgs: [string, string][] = [];
    if (!total) msgs.push(['err', 'Tranh chưa có cát: nhập ảnh hoặc vẽ.']);
    if (counts.length > 9) msgs.push(['warn', `${counts.length} màu: nhiều màu làm băng chuyền dễ đầy. Nên ≤ 9.`]);
    if (total > 330) msgs.push(['warn', `${total} khối: tranh rất lớn, khó giải và chơi lâu. Các màn có sẵn dùng 120–300.`]);
    // design rule from the built-in levels: a colour that runs from top to bottom blocks its nests
    const n = l.n;
    let top = n, bottom = -1;
    l.rows.forEach((r, y) => { if (/[^.]/.test(r)) { top = Math.min(top, y); bottom = y; } });
    const h = bottom - top + 1;
    for (const [k, c] of counts) {
        if (k === OUTLINE_KEY || c < 12 || h < 6) continue;
        let a = n, b = -1;
        l.rows.forEach((r, y) => { if (r.includes(k)) { a = Math.min(a, y); b = y; } });
        if ((b - a + 1) / h > 0.85) msgs.push(['warn', `Màu <i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${HEX_OF.get(k)}"></i> trải từ trên xuống dưới tranh: tổ của nó khó đầy sớm. Tách thành 2 màu nếu bot không giải được.`]);
    }
    if (total) msgs.push(l.verified ? ['ok', '✓ Bot đã thắng màn này 2 lần với cách xếp tổ hiện tại.'] : ['warn', 'Chưa kiểm tra: bấm “Tự sinh tổ kiến” để tìm cách xếp tổ giải được.']);
    const level = msgs.some(([t]) => t === 'err') ? 'err' : msgs.some(([t]) => t === 'warn') ? 'warn' : 'ok';
    const v = $('validation');
    v.className = 'validation ' + level;
    v.innerHTML = msgs.map(([, m]) => `<div>${m}</div>`).join('');

    ($('s-name') as HTMLInputElement).value = l.name;
    ($('s-diff') as HTMLSelectElement).value = l.chunk.join(',');
    ($('s-n') as HTMLInputElement).value = String(l.n);
    const orderSel = $('s-order') as HTMLSelectElement;
    (orderSel.querySelector('option[value=play]') as HTMLOptionElement).disabled = !l.nests;
    orderSel.value = l.nests ? 'play' : l.order;
    ($('s-seed') as HTMLInputElement).value = String(l.seed);
    $('lvl-num').textContent = String(cur + 1);
    $('lvl-name').textContent = l.name;
}

// ---------- nests (the game's own generator, via a Sim) ----------
function nestsOf(l: EdLevel) {
    if (!l.rows.some((r) => /[^.]/.test(r))) return null;
    useLevels([toDef(l)]);
    try { return new Sim(0, () => {}).cols; } finally { useLevels([]); }
}

function renderNests() {
    const l = L(), cols = nestsOf(l);
    const nests = cols ? cols.flat() : [];
    const blocks = nests.reduce((s, x) => s + x.need, 0);
    $('stats').innerHTML = [[nests.length, 'Tổ'], [blocks, 'Khối'], [cols ? Math.max(...cols.map((c) => c.length)) : 0, 'Hàng sâu nhất']]
        .map(([v, t]) => `<div class="stat"><b>${v}</b><span>${t}</span></div>`).join('');
    $('nests').innerHTML = '';
    (cols || [[], [], [], []]).forEach((col, ci) => {
        const d = document.createElement('div');
        d.className = 'nest-col';
        d.innerHTML = `<h4>CỘT ${ci + 1}</h4>` + col.map((x, i) =>
            `<div class="nest ${i === 0 ? 'front' : 'back'}" style="background:${l.colors[x.color] ?? HEX_OF.get(x.color)}">${x.need}</div>`).join('');
        $('nests').appendChild(d);
    });
}

// ---------- solver: try nest layouts until the bot wins twice ----------
interface Combo { order: 'rows' | 'onion'; seed: number; chunk: [number, number]; record?: number }
let solving: { workers: Worker[]; stop: () => void } | null = null;

function log(html: string, reset = false) {
    const el = $('log');
    el.innerHTML = (reset ? '' : el.innerHTML + '\n') + html;
    el.scrollTop = el.scrollHeight;
}

function solve() {
    if (solving) { solving.stop(); log('<s>Đã dừng.</s>'); return; }
    const l = L();
    if (!l.rows.some((r) => /[^.]/.test(r))) { toast('Tranh chưa có cát'); return; }
    const target = cur, snapshotJson = JSON.stringify(l.rows);
    // the chosen difficulty first, then one step easier (smaller nests) if nothing wins
    const sizes: [number, number][] = [l.chunk];
    if (l.chunk[0] > 2) sizes.push([l.chunk[0] - 1, l.chunk[1] - 1]);
    // recorded plays first (they build nests that fit how the sand comes out), then rows / onion orders
    const combos: Combo[] = [];
    for (const chunk of sizes) {
        for (let rec = 0; rec < 8; rec++) combos.push({ order: 'rows', seed: rec % 3, chunk, record: rec });
        for (let seed = 0; seed < 6; seed++) for (const order of ['rows', 'onion'] as const) combos.push({ order, seed, chunk });
    }
    const blocks = colourCounts(l).reduce((t, [, c]) => t + c, 0), maxSec = Math.max(300, blocks * 2);

    const poolSize = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1));
    const workers = Array.from({ length: poolSize }, () => new Worker(new URL('./solver.worker.ts', import.meta.url), { type: 'module' }));
    let next = 0, done = 0, found = false;
    const t0 = performance.now();
    const progress = $<HTMLProgressElement>('solve-progress');
    progress.max = combos.length; progress.value = 0;
    $('btn-solve').textContent = '■ Dừng tìm';
    log(`Thử ${combos.length} cách xếp tổ trên ${poolSize} luồng…`, true);

    const stop = () => { workers.forEach((w) => w.terminate()); solving = null; $('btn-solve').textContent = '🤖 Tự sinh tổ kiến (giải được)'; };
    solving = { workers, stop };
    const feed = (w: Worker) => {
        if (found || next >= combos.length) return;
        const id = next++, c = combos[id];
        const def = toDef({ ...l, order: c.order, seed: c.seed, chunk: c.chunk });
        delete def.nests;
        const job: SolveJob = { id, def, runs: 2, maxSec, record: c.record };
        w.postMessage(job);
    };
    for (const w of workers) {
        w.onmessage = (e: MessageEvent<SolveResult>) => {
            const r = e.data, c = combos[r.id];
            done++; progress.value = done;
            const name = `${c.record != null ? 'ghi lại #' + c.record : c.order + '/' + c.seed} · tổ ${c.chunk[0] * NEST_SCALE}–${c.chunk[1] * NEST_SCALE}`;
            if (r.wins === r.runs && r.last === 'win' && !found) {
                found = true;
                log(`<b>✓ ${name}: thắng ${r.wins}/${r.runs} (${(r.ms / 1000).toFixed(1)} s)</b>`);
                stop();
                const lv = levels[target];
                if (JSON.stringify(lv.rows) !== snapshotJson) { log('<s>Tranh đã đổi trong lúc tìm: chạy lại.</s>'); return; }
                if (target === cur) snapshot();
                Object.assign(lv, { order: c.order, seed: c.seed, chunk: c.chunk, verified: true });
                if (r.nests) lv.nests = r.nests; else delete lv.nests;
                if (c.chunk !== l.chunk) log('Không cách nào thắng ở độ khó đã chọn; dùng tổ nhỏ hơn 1 bậc.');
                log(`Xong sau ${((performance.now() - t0) / 1000).toFixed(0)} s.`);
                renderAll();
                return;
            }
            if (!found) log(`${name}: ${r.last === 'lose' ? 'tràn băng chuyền' : r.last === 'stuck' ? 'kẹt' : 'thắng 1 lần'}${r.why ? ` <span style="color:var(--dim)">(${r.why})</span>` : ''}`);
            if (done >= combos.length && !found) {
                stop();
                log('<s>✗ Không tìm được cách xếp tổ bot thắng được. Thử giảm số màu, giảm kích thước lưới, hoặc tách màu trải dài từ trên xuống dưới.</s>');
                return;
            }
            feed(w);
        };
        w.onerror = (err) => { log('<s>Lỗi worker: ' + err.message + '</s>'); stop(); };
        feed(w);
    }
}

// ---------- level bank ----------
function thumb(l: EdLevel) {
    const c = document.createElement('canvas');
    c.width = c.height = l.n;
    const g = c.getContext('2d')!;
    l.rows.forEach((r, y) => [...r].forEach((k, x) => { if (k !== '.') { g.fillStyle = HEX_OF.get(k)!; g.fillRect(x, y, 1, 1); } }));
    return c;
}
function renderBank() {
    const list = $('bank-list');
    list.innerHTML = '';
    levels.forEach((l, i) => {
        const b = document.createElement('button');
        b.className = 'bank-item' + (i === cur ? ' on' : '');
        b.appendChild(thumb(l));
        const s = document.createElement('span');
        s.innerHTML = `${i + 1}. ${escapeHtml(l.name)}<em>${l.n}×${l.n} · ${colourCounts(l).length} màu</em>`;
        b.appendChild(s);
        const u = document.createElement('u');
        u.textContent = l.verified ? '✓' : '…';
        u.title = l.verified ? 'Bot đã thắng' : 'Chưa kiểm tra';
        b.appendChild(u);
        b.onclick = () => { cur = i; undoStack = []; renderAll(); };
        list.appendChild(b);
    });
    let at = '';
    try { const t = +(localStorage.getItem(CUSTOM_KEY + '_at') || 0); if (t) at = 'Lưu lúc ' + new Date(t).toLocaleString('vi-VN'); } catch { /* storage blocked */ }
    $('saved-at').textContent = at;
}
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

function renderDirty() { $('dirty').classList.toggle('on', JSON.stringify(levels) !== savedAll); }

function renderAll() {
    renderPalette();
    renderGrid();
    renderInfo();
    renderNests();
    renderBank();
    renderDirty();
}

/** TypeScript for LEVELS in src/game/levels.ts. */
function levelTs(l: EdLevel) {
    const d = toDef(l);
    const colors = Object.entries(d.colors).map(([k, v]) => `${k}: '${v}'`).join(', ');
    return `    {\n        name: '${l.name.replace(/'/g, "\\'")}', n: ${l.n}, chunk: [${l.chunk.join(', ')}], order: '${l.order}', seed: ${l.seed}, salt: ${l.salt},\n` +
        `        colors: { ${colors} },\n        rows: [\n${l.rows.map((r) => `            '${r}',`).join('\n')}\n        ],\n` +
        (l.nests ? `        nests: ${JSON.stringify(l.nests).replace(/"/g, "'").replace(/,/g, ', ')},\n` : '') + '    },';
}

function download(name: string, text: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

let toastT = 0;
function toast(msg: string) {
    const t = $('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT);
    toastT = window.setTimeout(() => t.classList.remove('on'), 1800);
}

// ---------- play test ----------
function play(url: string) {
    $<HTMLIFrameElement>('play-frame').src = url;
    $('play-modal').classList.add('on');
}
function playCurrent() {
    try { localStorage.setItem(PREVIEW_KEY, JSON.stringify([toDef(L())])); } catch { toast('Trình duyệt chặn bộ nhớ'); return; }
    play('index.html?custom=preview&level=1&t=' + Date.now());
}
function closePlay() { $('play-modal').classList.remove('on'); $<HTMLIFrameElement>('play-frame').src = 'about:blank'; }

// ---------- wiring ----------
function loadImage(file: File) {
    if (!file.type.startsWith('image/')) { toast('Hãy chọn một file ảnh'); return; }
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
        image = img;
        const shown = $<HTMLImageElement>('src-img');
        shown.src = url; shown.hidden = false;
        $('drop-text').innerHTML = 'Bấm hoặc thả ảnh khác để đổi';
        ($('btn-convert') as HTMLButtonElement).disabled = false;
        if (L().name === 'Màn mới') L().name = file.name.replace(/\.[^.]+$/, '').slice(0, 40);
        convert();
    };
    img.onerror = () => toast('Không đọc được ảnh này');
    img.src = url;
}

const drop = $('drop'), imgInput = $<HTMLInputElement>('img-input');
drop.onclick = () => imgInput.click();
imgInput.onchange = () => { if (imgInput.files?.[0]) loadImage(imgInput.files[0]); imgInput.value = ''; };
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
drop.ondragleave = () => drop.classList.remove('over');
drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); const f = e.dataTransfer?.files[0]; if (f) loadImage(f); };
window.addEventListener('paste', (e) => {
    const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/'));
    if (f) loadImage(f);
});

function bindRange(id: string, key: 'size' | 'colors' | 'bg') {
    const el = $<HTMLInputElement>(id), v = $(id + '-v');
    el.value = String(opt[key]); v.textContent = el.value;
    el.oninput = () => { opt[key] = +el.value; v.textContent = el.value; };
    el.onchange = () => convert();
}
bindRange('o-size', 'size'); bindRange('o-colors', 'colors'); bindRange('o-bg', 'bg');
for (const key of ['outline', 'clean'] as const) {
    const el = $<HTMLInputElement>('o-' + key);
    el.checked = opt[key];
    el.onchange = () => { opt[key] = el.checked; convert(); };
}
$('btn-convert').onclick = () => convert();

$<HTMLInputElement>('s-name').oninput = (e) => { L().name = (e.target as HTMLInputElement).value || 'Màn mới'; $('lvl-name').textContent = L().name; renderBank(); renderDirty(); };
$<HTMLSelectElement>('s-diff').onchange = (e) => { snapshot(); L().chunk = DIFF[(e.target as HTMLSelectElement).value]; changed('nests'); };
$<HTMLSelectElement>('s-order').onchange = (e) => {
    const v = (e.target as HTMLSelectElement).value;
    if (v === 'play') { renderInfo(); return; } // only the solver records nests
    snapshot(); L().order = v as EdLevel['order']; delete L().nests; changed('nests');
};
$<HTMLInputElement>('s-seed').onchange = (e) => { snapshot(); L().seed = Math.max(0, Math.min(99, parseInt((e.target as HTMLInputElement).value, 10) || 0)); changed('nests'); };
$('btn-clear').onclick = () => { snapshot(); L().rows = L().rows.map((r) => '.'.repeat(r.length)); changed(); };
$('btn-solve').onclick = () => solve();

$('bank-new').onclick = () => { levels.push(blankLevel(opt.size)); cur = levels.length - 1; undoStack = []; renderAll(); };
$('bank-dup').onclick = () => { const c = clone(L()); c.name += ' (copy)'; c.salt = randomSalt(); c.verified = false; levels.splice(cur + 1, 0, c); cur++; renderAll(); };
$('bank-del').onclick = () => {
    if (!confirm(`Xoá màn “${L().name}”?`)) return;
    levels.splice(cur, 1);
    if (!levels.length) levels.push(blankLevel(opt.size));
    cur = Math.min(cur, levels.length - 1); undoStack = []; renderAll();
};
const move = (d: number) => { const j = cur + d; if (j < 0 || j >= levels.length) return; [levels[cur], levels[j]] = [levels[j], levels[cur]]; cur = j; renderAll(); };
$('bank-up').onclick = () => move(-1);
$('bank-down').onclick = () => move(1);
$('bank-save').onclick = $('btn-save').onclick = () => save();
$('bank-export').onclick = () => download('colony-flow-levels.json', JSON.stringify(levels.map(toDef), null, 2));
$('btn-download').onclick = () => download(`level-${cur + 1}.json`, JSON.stringify(toDef(L()), null, 2));
const bankInput = $<HTMLInputElement>('bank-input');
$('bank-import').onclick = () => bankInput.click();
bankInput.onchange = async () => {
    const f = bankInput.files?.[0];
    bankInput.value = '';
    if (!f) return;
    try {
        const data = JSON.parse(await f.text());
        const list = (Array.isArray(data) ? data : [data]).filter((x) => x && Array.isArray(x.rows) && x.colors).map(normalize);
        if (!list.length) throw new Error('empty');
        levels.push(...list); cur = levels.length - list.length; undoStack = [];
        renderAll(); toast(`Đã nhập ${list.length} màn (chưa lưu)`);
    } catch { toast('File không đúng định dạng màn'); }
};
$('bank-copy-ts').onclick = async () => {
    try { await navigator.clipboard.writeText(levelTs(L())); toast('Đã copy TS của màn này'); } catch { toast('Không copy được'); }
};
$('bank-play-all').onclick = () => { if (save()) window.open('index.html?custom=1', '_blank'); };
$('btn-play').onclick = () => playCurrent();
$('btn-home').onclick = () => { location.href = 'index.html'; };
$('play-close').onclick = closePlay;
$('play-reload').onclick = playCurrent;
$('play-tab').onclick = () => { window.open($<HTMLIFrameElement>('play-frame').src, '_blank'); };

window.addEventListener('keydown', (e) => {
    const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); return; }
    if (e.key === 'Escape') { closePlay(); return; }
    if (typing) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); return; }
    const t = ({ b: 'paint', e: 'erase', g: 'fill', i: 'pick' } as Record<string, Tool>)[e.key.toLowerCase()];
    if (t && !e.ctrlKey && !e.metaKey) { tool = t; renderPalette(); }
});
window.addEventListener('beforeunload', (e) => { if (JSON.stringify(levels) !== savedAll) e.preventDefault(); });
window.addEventListener('resize', () => renderGrid());

renderAll();
