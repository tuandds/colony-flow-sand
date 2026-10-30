// Colony Flow Sand level editor. Plain DOM, laid out like the team's level editor template:
// Editor mode (Colour Bank · Sand Editor · Nest Editor · Level Bank) and Organizer mode
// (chapter sets). Pictures are sand at grain level made from imported images in the game's own
// colours (sand.ts); nests come from a recorded winning play (src/game/bot.ts, in web workers).
// Levels are saved in the browser in the format the game reads with ?custom=1 (LevelDef).
// The game's built-in levels are in the Level Bank too (ids builtin-<i>); the game plays the
// saved copies, and on the dev server saving also writes them to src/game/level-edits.json.
import type { Recording } from '../game/bot';
import { COLS, FRAME_N, LAYOUT_VERSION, MAX_COLS, MIN_COLS, NEST_SCALE, SUB, frameGrains } from '../game/layout';
import EDITS from '../game/level-edits.json';
import { BANK_COLOURS, CUSTOM_KEY, type LevelDef, PREVIEW_KEY, SAND_PALETTE, type Sand, builtinDefs, decodeSand, encodeSand, loadCustomLevels, useLevels } from '../game/levels';
import { type Nest, Sim } from '../game/sim';
import { BANK, type BankColour, type ConvertOpts, HEX, NAME, countKeys, drawSand, fitToFrame, hexLab, imageToSand, moveRange, nearestKey, rowsToGrains, setBank } from './sand';
import type { SolveJob, SolveResult } from './solver.worker';

type Status = 'WIP' | 'REVIEW' | 'LIVE';
type Result = 'win' | 'lose' | 'stuck';
interface EdLevel {
    id: string; name: string; n: number; chunk: [number, number]; sand: Sand;
    order: 'rows' | 'onion'; seed: number; salt: number;
    /** Number of nest columns. */
    cols: number;
    /** Nests from a recorded play or edited by hand; without them the game uses order + seed. */
    nests?: [string, number][][];
    /** The recorded winning strokes for `nests` (Auto Play replays them). */
    moves?: Recording['moves'];
    /** true: won twice with these nests; false: changed since; undefined: never checked. */
    verified?: boolean;
    /** LAYOUT_VERSION the level was made with (recorded swipes are in screen positions). */
    layout?: number;
    status: Status; comment: string; updated: number;
    /** The level's Active Palette (Colour Bank keys); colours in the picture are always shown too. */
    palette?: string[];
    /** Last Organizer Auto Play result (not saved). */
    autoplay?: Result;
}
interface Chapter { id: string; name: string; description: string; levels: string[] }
type Tool = 'paint' | 'erase' | 'fill' | 'replace' | 'pick';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const CHAPTER_KEY = 'cf_custom_chapters', BACKUP_KEY = 'cf_custom_backups', HISTORY_KEY = 'cf_custom_history', UI_KEY = 'cf_editor_ui';
/** The edited Colour Bank (order, names, colours, added colours). */
const BANK_KEY = 'cf_editor_bank';
// version of the default colours a saved Bank was last brought up to (see loadBank)
const BANK_VER_KEY = 'cf_editor_bank_v', BANK_VER = 2;
const MAX_BACKUPS = 15, MAX_HISTORY = 10;
/** Set once the built-in levels have been added to a saved Level Bank (see loadLevels). */
const BUILTIN_KEY = 'cf_editor_builtin_v', BUILTIN_CHAPTER = 'builtin';
const DIFFS: { key: string; label: string; short: string; chunk: [number, number] }[] = [
    { key: '3,5', label: 'Rất dễ', short: 'Rất dễ', chunk: [3, 5] }, { key: '4,6', label: 'Dễ', short: 'Dễ', chunk: [4, 6] },
    { key: '4,7', label: 'Vừa', short: 'Vừa', chunk: [4, 7] }, { key: '5,8', label: 'Khó', short: 'Khó', chunk: [5, 8] },
    { key: '6,9', label: 'Rất khó', short: 'R.khó', chunk: [6, 9] },
];
const diffOf = (l: EdLevel) => DIFFS.find((d) => d.chunk.join(',') === l.chunk.join(',')) ?? DIFFS[2];
const uid = () => Math.random().toString(36).slice(2, 10);
const randomSalt = () => 100 + Math.floor(Math.random() * 9000);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

// ---------- state ----------
setBank(loadBank());
let chapters: Chapter[] = loadJson<Chapter[]>(CHAPTER_KEY, []);
let levels: EdLevel[] = loadLevels();
let savedAll = snapshotAll();
let cur = 0;
let grains: string[] = decodeSand(levels[0].sand);
let colour = BANK[0].key;
let tool: Tool = 'paint';
let brush = 6;
let sandUndo: string[] = [], sandRedo: string[] = [];
let bankUndo: string[] = [];
let selNest: [number, number] | null = null;
let mode: 'editor' | 'organizer' = 'editor';
let bankChapter = '';
const filters = { status: new Set<string>(), diff: new Set<string>(), check: new Set<string>() };

function loadJson<T>(key: string, fallback: T): T {
    try { const v = JSON.parse(localStorage.getItem(key) || 'null'); return v ?? fallback; } catch { return fallback; }
}
function loadBank(): BankColour[] {
    const saved = loadJson<BankColour[]>(BANK_KEY, []);
    const ok = Array.isArray(saved) && saved.length && saved.every((c) => c && /^[A-Za-z]$/.test(c.key) && /^#[0-9a-f]{6}$/i.test(c.hex) && c.name);
    if (!ok) return BANK_COLOURS.map((c) => ({ ...c }));
    // Once per update of the defaults: add the new default colours (unless the key or name is
    // taken by the user's own colour) and drop retired ones the user has not changed. Pictures
    // that use a retired colour still draw it. A colour deleted after this stays deleted.
    if (loadJson<number>(BANK_VER_KEY, 1) < BANK_VER) {
        const name = (n: string) => n.toLowerCase();
        let list = saved.filter((x) => !SAND_PALETTE.some((c) => c.retired && c.key === x.key && c.hex.toLowerCase() === x.hex.toLowerCase()));
        for (const c of BANK_COLOURS) {
            if (list.length < 52 && !list.some((x) => x.key === c.key || name(x.name) === name(c.name))) list.push({ ...c });
        }
        try { localStorage.setItem(BANK_KEY, JSON.stringify(list)); localStorage.setItem(BANK_VER_KEY, String(BANK_VER)); } catch { /* kept for this session */ }
        return list;
    }
    return saved;
}
function loadLevels(): EdLevel[] {
    const saved = loadCustomLevels(CUSTOM_KEY), file = EDITS as unknown as LevelDef[];
    // the game's levels: the copy in src/game/level-edits.json when there is one, else the original
    const game = builtinDefs().map((d) => file.find((x) => x.id === d.id) ?? d);
    // a copy saved in the repo after this browser's copy (another computer, git pull) replaces it
    const list = saved.map((l) => { const f = file.find((x) => x.id === l.id); return f && (f.updated ?? 0) > (l.updated ?? 0) ? f : l; });
    // the first time, the built-in levels are added at the top, with a chapter set of their own;
    // one deleted later stays deleted (the game then plays the original)
    if (!loadJson<number>(BUILTIN_KEY, 0)) {
        list.unshift(...game.filter((d) => !list.some((x) => x.id === d.id)).map((d) => ({ status: 'LIVE' as Status, ...d })));
        if (!chapters.some((c) => c.id === BUILTIN_CHAPTER)) chapters.unshift({ id: BUILTIN_CHAPTER, name: 'Game', description: 'Các màn có sẵn trong game', levels: game.map((d) => d.id!) });
    }
    const out = list.map(normalize);
    return out.length ? out : [blankLevel()];
}
/** Whether a built-in level's copy plays differently from the original (or is renamed). */
const ORIGINALS = new Map(builtinDefs().map((d) => [d.id!, d]));
const playSig = (d: LevelDef) => JSON.stringify([d.name, d.n, d.sand?.data, d.sand?.w, d.chunk, d.order || 'rows', d.seed ?? 0, d.salt, d.cols ?? COLS, d.nests ?? null]);
const isEdited = (l: EdLevel) => { const o = ORIGINALS.get(l.id); return !!o && playSig(toDef(l)) !== playSig(o); };
/** On the dev server, write the changed built-in levels to src/game/level-edits.json (vite.config.ts). */
function saveEdits() {
    if (!import.meta.env.DEV) return;
    const body = JSON.stringify(levels.filter(isEdited).map(toDef));
    fetch('/__level-edits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
        .then((r) => r.json()).then((r: { written?: boolean; count: number }) => { if (r.written) toast(`Đã ghi ${r.count} màn game đã sửa vào src/game/level-edits.json`); })
        .catch(() => toast('Không ghi được src/game/level-edits.json'));
}

/** Bring a saved level (this editor's or the first cell-based one) to the current format. */
function normalize(L: LevelDef & Partial<EdLevel>): EdLevel {
    // keys of older levels were their own; match them to the palette by colour
    const keyOf = new Map<string, string>();
    for (const [k, hex] of Object.entries(L.colors || {})) {
        // grain pictures already use bank keys; first-version levels are matched by colour
        if (L.sand) { keyOf.set(k, k); if (!HEX.has(k)) { HEX.set(k, hex); NAME.set(k, k); } continue; }
        const same = BANK.find((c) => c.hex === hex);
        keyOf.set(k, same ? same.key : nearestKey(hexLab(hex), BANK.map((c) => c.key)));
    }
    // pictures cover the game's whole frame, which is FRAME_N cells in every level; smaller or
    // older pictures (a square, an older frame, another size) sit centred in it, as in the game
    const n = FRAME_N, { w: FW, h: FH } = frameGrains(n);
    let sand: Sand, cut = false;
    if (L.sand && L.sand.size === FH && (L.sand.w ?? FH) === FW) sand = L.sand;
    else {
        const old = L.sand ? { keys: decodeSand(L.sand), w: L.sand.w ?? L.sand.size, h: L.sand.size }
            : { keys: rowsToGrains(L.rows || [], L.n || 20, (c) => keyOf.get(c) ?? BANK[0].key), ...frameGrains(L.n || 20) };
        const fit = fitToFrame(old.keys, old.w, old.h);
        sand = encodeSand(FH, fit.keys, FW);
        cut = fit.cut;
    }
    return {
        id: L.id || uid(), name: L.name || 'Màn mới', n, chunk: L.chunk || [4, 7], sand,
        order: L.order || 'rows', seed: L.seed ?? 0, salt: L.salt ?? randomSalt(),
        cols: Math.max(MIN_COLS, Math.min(MAX_COLS, L.cols ?? COLS)),
        nests: L.nests?.map((col) => col.map(([k, v]) => [keyOf.get(k) ?? k, v] as [string, number])),
        // a check made under another layout (or with sand cut off just now) no longer counts:
        // recorded swipes are screen positions, and the board has moved since
        moves: L.sand && (L.layout ?? 1) === LAYOUT_VERSION ? L.moves : undefined,
        verified: !L.sand ? undefined : (L.layout ?? 1) !== LAYOUT_VERSION || cut ? (L.verified === undefined ? undefined : false) : L.verified,
        layout: LAYOUT_VERSION,
        status: L.status || 'WIP', comment: L.comment || '', updated: L.updated || Date.now(),
        palette: Array.isArray(L.palette) ? L.palette.map((k) => keyOf.get(k) ?? k) : undefined,
    };
}
function blankLevel(): EdLevel {
    const n = FRAME_N, { w, h } = frameGrains(n);
    return { id: uid(), name: 'Màn mới', n, chunk: [4, 7], sand: encodeSand(h, new Array<string>(w * h).fill('.'), w),
        order: 'rows', seed: 0, salt: randomSalt(), cols: COLS, layout: LAYOUT_VERSION, status: 'WIP', comment: '', updated: Date.now() };
}

const L = () => levels[cur];
/** Picture size in grains: the game's frame, w wide and h tall. */
const dims = (l: EdLevel = L()) => ({ w: l.sand.w ?? l.sand.size, h: l.sand.size });

/** The level as the game reads it (plus the editor's own fields, which the game ignores). */
function toDef(l: EdLevel): LevelDef & Omit<EdLevel, 'autoplay'> {
    const colors: Record<string, string> = {};
    for (const m of l.sand.data.matchAll(/([^0-9.])/g)) colors[m[1]] = HEX.get(m[1])!;
    const { autoplay: _a, ...rest } = l;
    return { ...rest, colors };
}
function snapshotAll() { return JSON.stringify({ levels: levels.map(toDef), chapters }); }
const isDirty = () => snapshotAll() !== savedAll;

function save() {
    try {
        const prev = loadJson<(LevelDef & Partial<EdLevel>)[]>(CUSTOM_KEY, []);
        // a level changed since the last save gets a new time (the game plays the newest copy)
        const same = (l: EdLevel, p?: LevelDef) => !!p && JSON.stringify({ ...p, updated: 0 }) === JSON.stringify({ ...toDef(l), updated: 0 });
        for (const l of levels) if (!same(l, prev.find((p) => p.id === l.id))) l.updated = Date.now();
        const json = JSON.stringify(levels.map(toDef));
        localStorage.setItem(CUSTOM_KEY, json);
        localStorage.setItem(CHAPTER_KEY, JSON.stringify(chapters));
        localStorage.setItem(CUSTOM_KEY + '_at', String(Date.now()));
        localStorage.setItem(BUILTIN_KEY, '1');
        // version history per level: keep what changed
        const hist = loadJson<Record<string, { t: number; level: unknown }[]>>(HISTORY_KEY, {});
        for (const l of levels) {
            const before = prev.find((p) => p.id === l.id), now = JSON.stringify(toDef(l));
            if (before && JSON.stringify(before) === now) continue;
            (hist[l.id] ||= []).unshift({ t: Date.now(), level: toDef(l) });
            hist[l.id] = hist[l.id].slice(0, MAX_HISTORY);
        }
        localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
        // rolling backups of the whole bank
        const backups = loadJson<{ t: number; levels: unknown[]; chapters: Chapter[] }[]>(BACKUP_KEY, []);
        if (!backups.length || JSON.stringify(backups[0].levels) !== json) {
            backups.unshift({ t: Date.now(), levels: levels.map(toDef), chapters: clone(chapters) });
            localStorage.setItem(BACKUP_KEY, JSON.stringify(backups.slice(0, MAX_BACKUPS)));
        }
        savedAll = snapshotAll();
        renderDirty(); renderBankStore(); renderOrganizer();
        toast(`Đã lưu ${levels.length} màn`);
        saveEdits();
        return true;
    } catch {
        toast('Không lưu được: trình duyệt chặn bộ nhớ hoặc đã đầy');
        return false;
    }
}

// ---------- analysis (the game's own trimming and nest generator, via a Sim) ----------
interface Analysis { blocks: Map<string, number>; total: number; nests: Nest[][]; grains: number; fits: boolean }
const analysisCache = new Map<string, Analysis>();
function analyze(l: EdLevel): Analysis {
    const key = JSON.stringify([l.sand.data, l.chunk, l.order, l.seed, l.salt, l.nests, l.n, l.cols]);
    let a = analysisCache.get(key);
    if (a) return a;
    const def = toDef(l);
    const blocks = new Map<string, number>();
    let nests: Nest[][] = Array.from({ length: l.cols }, () => []), grainCount = 0, fits = true;
    if (Object.keys(def.colors).length) {
        useLevels([def]);
        try {
            const sim = new Sim(0, () => {});
            for (const k of sim.key) if (k) { const c = sim.keys[k]!; blocks.set(c, (blocks.get(c) || 0) + 1); grainCount++; }
            for (const [k, g] of blocks) blocks.set(k, Math.round(g / 64));
            nests = sim.cols;
            // the game ignores hand-made nests that don't hold exactly the picture's blocks
            if (l.nests) {
                const want = new Map(blocks);
                for (const col of l.nests) for (const [k, v] of col) want.set(k, (want.get(k) || 0) - v);
                fits = [...want.values()].every((v) => v === 0);
            }
        } finally { useLevels([]); }
    }
    a = { blocks, total: [...blocks.values()].reduce((s, v) => s + v, 0), nests, grains: grainCount, fits };
    if (analysisCache.size > 200) analysisCache.clear();
    analysisCache.set(key, a);
    return a;
}

// ---------- editing the picture ----------
function commitGrains() {
    const { w, h } = frameGrains(L().n);
    L().sand = encodeSand(h, grains, w);
    L().updated = Date.now();
}
const sandState = () => JSON.stringify({ sand: L().sand, n: L().n, nests: L().nests, moves: L().moves, verified: L().verified, chunk: L().chunk, order: L().order, seed: L().seed, cols: L().cols });
function sandSnapshot() {
    sandUndo.push(sandState());
    if (sandUndo.length > 60) sandUndo.shift();
    sandRedo = [];
}
function restoreSand(json: string) {
    const s = JSON.parse(json), l = L();
    l.sand = s.sand; l.n = s.n; l.nests = s.nests; l.moves = s.moves; l.verified = s.verified; l.chunk = s.chunk; l.order = s.order; l.seed = s.seed; l.cols = s.cols ?? COLS;
    grains = decodeSand(l.sand);
    renderEditor();
}
function undoSand() { const s = sandUndo.pop(); if (!s) return; sandRedo.push(sandState()); restoreSand(s); }
function redoSand() { const s = sandRedo.pop(); if (!s) return; sandUndo.push(sandState()); restoreSand(s); }
/** The picture changed: nests recorded for the old one no longer apply. */
function pictureChanged() {
    commitGrains();
    const l = L();
    delete l.nests; delete l.moves;
    if (l.verified) l.verified = false;
    renderEditor();
}
/** Nest settings changed: the bot check no longer counts. */
function nestsChanged() {
    const l = L();
    if (l.verified) l.verified = false;
    l.updated = Date.now();
    renderEditor();
}

// sand canvas: an offscreen copy of the picture, so hovering only redraws the brush ring
const sandCv = $<HTMLCanvasElement>('sand');
const sandArt = document.createElement('canvas');
let hover: [number, number] | null = null, painting: 'paint' | 'erase' | null = null;

// The canvas is exactly the game's frame interior: a picture that touches its edge here touches
// the frame in the game.
function renderSand() {
    const { w, h } = dims(), wrap = sandCv.parentElement!;
    const px = Math.max(1.2, Math.min(4, (Math.min(wrap.clientWidth || 600, 780) - 24) / w));
    const cw = Math.round(w * px), ch = Math.round(h * px), dpr = window.devicePixelRatio || 1;
    sandArt.width = w; sandArt.height = h;
    drawSand(sandArt.getContext('2d')!, grains, w, h, 0, 0, w, h);
    sandCv.width = Math.round(cw * dpr); sandCv.height = Math.round(ch * dpr);
    sandCv.style.width = cw + 'px'; sandCv.style.height = ch + 'px';
    drawSandCanvas();
}
function drawSandCanvas() {
    const g = sandCv.getContext('2d')!, cw = sandCv.width, ch = sandCv.height, { w } = dims(), s = cw / w;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = '#f0dcb4'; g.fillRect(0, 0, cw, ch);
    // faint cell grid: one cell = 8 x 8 grains
    g.strokeStyle = 'rgba(122,74,36,.10)';
    g.beginPath();
    for (let x = SUB; x < w; x += SUB) { g.moveTo(x * s, 0); g.lineTo(x * s, ch); }
    for (let y = SUB; y * s < ch; y += SUB) { g.moveTo(0, y * s); g.lineTo(cw, y * s); }
    g.stroke();
    g.imageSmoothingEnabled = false;
    g.drawImage(sandArt, 0, 0, cw, ch);
    if (hover && (tool === 'paint' || tool === 'erase')) {
        g.strokeStyle = 'rgba(0,0,0,.7)'; g.lineWidth = 1.5;
        g.beginPath(); g.arc((hover[0] + 0.5) * s, (hover[1] + 0.5) * s, brush * s, 0, Math.PI * 2); g.stroke();
    }
}
function grainAt(e: PointerEvent): [number, number] | null {
    const r = sandCv.getBoundingClientRect(), { w, h } = dims();
    const x = Math.floor(((e.clientX - r.left) / r.width) * w), y = Math.floor(((e.clientY - r.top) / r.height) * h);
    return x >= 0 && y >= 0 && x < w && y < h ? [x, y] : null;
}
function stamp(x: number, y: number, k: string) {
    const { w, h } = dims();
    let changed = false;
    for (let dy = -brush; dy <= brush; dy++) for (let dx = -brush; dx <= brush; dx++) {
        if (dx * dx + dy * dy > brush * brush) continue;
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const p = yy * w + xx;
        if (grains[p] !== k) { grains[p] = k; changed = true; }
    }
    return changed;
}
let lastStamp: [number, number] | null = null;
function strokeTo(x: number, y: number, k: string) {
    const [lx, ly] = lastStamp ?? [x, y], d = Math.hypot(x - lx, y - ly), steps = Math.max(1, Math.ceil(d / Math.max(1, brush / 2)));
    let changed = false;
    for (let i = 1; i <= steps; i++) changed = stamp(Math.round(lx + ((x - lx) * i) / steps), Math.round(ly + ((y - ly) * i) / steps), k) || changed;
    lastStamp = [x, y];
    return changed;
}
function flood(x: number, y: number, k: string) {
    const { w, h } = dims(), from = grains[y * w + x];
    if (from === k) return;
    const stack = [y * w + x];
    while (stack.length) {
        const p = stack.pop()!;
        if (grains[p] !== from) continue;
        grains[p] = k;
        const px = p % w;
        if (px > 0) stack.push(p - 1);
        if (px < w - 1) stack.push(p + 1);
        if (p >= w) stack.push(p - w);
        if (p < w * (h - 1)) stack.push(p + w);
    }
}

sandCv.addEventListener('contextmenu', (e) => e.preventDefault());
sandCv.addEventListener('pointerdown', (e) => {
    const c = grainAt(e);
    if (!c) return;
    const [x, y] = c, here = grains[y * dims().w + x];
    if (tool === 'pick' && e.button !== 2) { if (here !== '.') { colour = here; tool = 'paint'; renderColourBank(); renderTools(); } return; }
    if (tool === 'replace' && e.button !== 2 && (here === '.' || here === colour)) return;
    sandSnapshot();
    if (tool === 'fill' && e.button !== 2) { flood(x, y, colour); pictureChanged(); return; }
    if (tool === 'replace' && e.button !== 2) {
        grains = grains.map((k) => (k === here ? colour : k));
        pictureChanged(); toast(`Đã đổi cả màu ${NAME.get(here)} → ${NAME.get(colour)}`);
        return;
    }
    painting = e.button === 2 || tool === 'erase' ? 'erase' : 'paint';
    sandCv.setPointerCapture(e.pointerId);
    lastStamp = null;
    if (strokeTo(x, y, painting === 'erase' ? '.' : colour)) renderSand();
});
sandCv.addEventListener('pointermove', (e) => {
    const c = grainAt(e);
    hover = c;
    if (painting && c && strokeTo(c[0], c[1], painting === 'erase' ? '.' : colour)) { renderSand(); return; }
    drawSandCanvas();
});
sandCv.addEventListener('pointerleave', () => { hover = null; drawSandCanvas(); });
sandCv.addEventListener('pointerup', () => {
    if (!painting) return;
    painting = null; lastStamp = null;
    pictureChanged();
});

// ---------- colour bank + tools ----------
function pickColour(k: string) {
    colour = k;
    if (tool === 'erase' || tool === 'pick') tool = 'paint';
    renderColourBank(); renderTools();
}
/** The level's Active Palette: its chosen colours, then any other colour in the picture. */
function activeKeys(): string[] {
    const used = countKeys(grains), list = (L().palette ?? []).filter((k) => HEX.has(k));
    for (const c of BANK) if (used.has(c.key) && !list.includes(c.key)) list.push(c.key);
    for (const k of used.keys()) if (!list.includes(k)) list.push(k);
    return list;
}
function addToPalette(k: string) {
    const list = activeKeys();
    if (list.includes(k)) return;
    L().palette = [...list, k];
    renderDirty();
}
function removeFromPalette(k: string) {
    if (countKeys(grains).has(k)) { toast(`${NAME.get(k)} đang có trong tranh: không bỏ khỏi Active Palette được`); return; }
    L().palette = activeKeys().filter((x) => x !== k);
    renderColourBank(); renderDirty();
}
/** Long-press (or right-click) opens the colour's editor; a plain tap does `tap`. */
function pressable(el: HTMLElement, key: string, tap: () => void) {
    let timer = 0, long = false;
    el.onpointerdown = (e) => { if (e.button !== 0) return; long = false; timer = window.setTimeout(() => { long = true; openColour(key); }, 450); };
    el.onpointerup = el.onpointerleave = () => clearTimeout(timer);
    el.onclick = () => { if (!long) tap(); };
    el.oncontextmenu = (e) => { e.preventDefault(); openColour(key); };
}
let bankDrag: number | null = null;
function renderColourBank() {
    const used = countKeys(grains);
    const ap = $('active-pal');
    ap.innerHTML = '';
    const er = document.createElement('button');
    er.className = 'pal-btn eraser' + (tool === 'erase' ? ' on' : '');
    er.title = 'Tẩy (E)';
    er.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    er.onclick = () => { tool = 'erase'; renderColourBank(); renderTools(); };
    ap.appendChild(er);
    activeKeys().forEach((k, i) => {
        const b = document.createElement('button');
        b.className = 'pal-btn' + (k === colour && tool !== 'erase' ? ' on' : '');
        b.style.background = HEX.get(k)!;
        b.title = `${NAME.get(k)}${used.has(k) ? ` · ${used.get(k)} hạt` : ''}${i < 10 ? ` · phím ${(i + 1) % 10}` : ''} (giữ để sửa, kéo ra Bank để bỏ)`;
        b.draggable = true;
        b.ondragstart = (e) => { e.dataTransfer!.setData('text/x-cf-active', k); };
        pressable(b, k, () => pickColour(k));
        ap.appendChild(b);
    });
    // drop a bank colour here to add it
    ap.ondragover = (e) => { if (e.dataTransfer?.types.includes('text/x-cf-colour')) { e.preventDefault(); ap.classList.add('drop'); } };
    ap.ondragleave = () => ap.classList.remove('drop');
    ap.ondrop = (e) => { e.preventDefault(); ap.classList.remove('drop'); const k = e.dataTransfer!.getData('text/x-cf-colour'); if (k) { addToPalette(k); pickColour(k); } };

    const bank = $('bank-colours');
    bank.innerHTML = '';
    BANK.forEach((c, i) => {
        const row = document.createElement('div');
        row.className = 'cb-row' + (c.key === colour ? ' on' : '') + (used.has(c.key) ? ' used' : '');
        row.innerHTML = '<span class="cb-grip" title="Kéo để đổi thứ tự">⠿</span>';
        const sw = document.createElement('div');
        sw.className = 'cb-sw'; sw.style.background = c.hex;
        const pill = document.createElement('div');
        pill.className = 'cb-name'; pill.textContent = c.name;
        for (const el of [sw, pill]) {
            el.title = `${c.name} · ${c.hex} — bấm để vẽ, kéo vào Active Palette, giữ để sửa`;
            el.draggable = true;
            el.ondragstart = (e) => { e.stopPropagation(); e.dataTransfer!.setData('text/x-cf-colour', c.key); };
            pressable(el, c.key, () => { addToPalette(c.key); pickColour(c.key); });
        }
        row.append(sw, pill);
        // drag the grip to reorder the bank
        const grip = row.querySelector<HTMLElement>('.cb-grip')!;
        grip.draggable = true;
        grip.ondragstart = (e) => { bankDrag = i; e.dataTransfer!.setData('text/x-cf-bank', String(i)); };
        row.ondragover = (e) => { if (bankDrag !== null) { e.preventDefault(); row.classList.add('drop-before'); } };
        row.ondragleave = () => row.classList.remove('drop-before');
        row.ondrop = (e) => {
            row.classList.remove('drop-before');
            if (bankDrag === null) return;
            e.preventDefault(); e.stopPropagation();
            const list = [...BANK], [m] = list.splice(bankDrag, 1);
            list.splice(bankDrag < i ? i - 1 : i, 0, m);
            bankDrag = null;
            saveBank(list);
        };
        bank.appendChild(row);
    });
    // drop an Active Palette colour on the bank to take it off the palette
    bank.ondragover = (e) => { if (e.dataTransfer?.types.includes('text/x-cf-active')) e.preventDefault(); };
    bank.ondrop = (e) => { const k = e.dataTransfer?.getData('text/x-cf-active'); if (k) { e.preventDefault(); removeFromPalette(k); } };
}

// ---------- editing the Colour Bank ----------
const KEY_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let editingKey: string | null = null;
function saveBank(list: BankColour[]) {
    setBank(list);
    try { localStorage.setItem(BANK_KEY, JSON.stringify(list)); } catch { toast('Không lưu được Colour Bank'); }
    thumbCache.clear();
    if (!BANK.some((c) => c.key === colour)) colour = BANK[0].key;
    renderAll();
}
/** Levels whose picture uses colour key k. */
const levelsUsing = (k: string) => levels.filter((l) => l.sand.data.includes(k));
function openColour(key: string | null) {
    editingKey = key;
    const c = key ? BANK.find((x) => x.key === key) ?? { key, name: NAME.get(key) ?? key, hex: HEX.get(key) ?? '#888888' } : null;
    $('ce-title').textContent = c ? `Sửa màu · ${c.name}` : 'Thêm màu';
    $<HTMLInputElement>('ce-name').value = c ? c.name : '';
    $<HTMLInputElement>('ce-color').value = c ? c.hex : '#88aacc';
    const n = key ? levelsUsing(key).length : 0;
    $('ce-hint').textContent = key ? (n ? `Đang dùng ở ${n} màn: đổi màu sẽ đổi màu cát ở các màn đó khi lưu.` : 'Chưa màn nào dùng màu này.') : 'Tên là một từ, không dấu cách (vd: mint, darkBlue).';
    $<HTMLButtonElement>('ce-delete').hidden = !key;
    $<HTMLButtonElement>('ce-remove').hidden = !key || !activeKeys().includes(key);
    $('colour-modal').classList.add('on');
    $<HTMLInputElement>('ce-name').focus();
}
function closeColour() { $('colour-modal').classList.remove('on'); editingKey = null; }
$('ce-cancel').onclick = closeColour;
$('ce-save').onclick = () => {
    const name = $<HTMLInputElement>('ce-name').value.trim(), hex = $<HTMLInputElement>('ce-color').value.toLowerCase();
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,23}$/.test(name)) { toast('Tên màu là một từ: chữ cái đầu, không dấu cách'); return; }
    if (BANK.some((c) => c.key !== editingKey && c.name.toLowerCase() === name.toLowerCase())) { toast(`Đã có màu tên “${name}”`); return; }
    const list = BANK.map((c) => ({ ...c }));
    if (editingKey) {
        const c = list.find((x) => x.key === editingKey);
        if (c) Object.assign(c, { name, hex }); else list.push({ key: editingKey, name, hex });
    } else {
        const key = [...KEY_CHARS].find((k) => !HEX.has(k) && !list.some((c) => c.key === k));
        if (!key) { toast('Colour Bank đã đầy (52 màu)'); return; }
        list.push({ key, name, hex });
        colour = key;
        addToPalette(key);
    }
    closeColour();
    saveBank(list);
};
$('ce-delete').onclick = () => {
    const k = editingKey;
    if (!k) return;
    const n = levelsUsing(k).length;
    if (n) { toast(`Màu đang dùng ở ${n} màn: thay màu đó trong tranh trước khi xoá`); return; }
    if (!confirm(`Xoá màu “${NAME.get(k)}” khỏi Colour Bank?`)) return;
    for (const l of levels) if (l.palette) l.palette = l.palette.filter((x) => x !== k);
    closeColour();
    saveBank(BANK.filter((c) => c.key !== k));
};
$('ce-remove').onclick = () => { const k = editingKey; closeColour(); if (k) removeFromPalette(k); };
$('cb-add').onclick = () => openColour(null);
$('cb-reset').onclick = () => {
    if (!confirm(`Đặt lại Colour Bank về ${BANK_COLOURS.length} màu gốc? (Màu đã thêm mà đang dùng trong tranh vẫn vẽ được.)`)) return;
    saveBank(BANK_COLOURS.map((c) => ({ ...c })));
};

const TOOLS: [Tool, string, string][] = [['paint', '✏️', 'Vẽ (B)'], ['erase', '🧽', 'Tẩy (E)'], ['fill', '🪣', 'Đổ màu vùng (G)'], ['replace', '🔁', 'Thay cả màu (R)'], ['pick', '💧', 'Hút màu (I)']];
function renderTools() {
    $('tools').innerHTML = '';
    for (const [t, icon, tip] of TOOLS) {
        const b = document.createElement('button');
        b.className = 'tool' + (tool === t ? ' on' : '');
        b.textContent = icon; b.title = tip;
        b.onclick = () => { tool = t; renderTools(); renderColourBank(); };
        $('tools').appendChild(b);
    }
    $<HTMLInputElement>('brush').value = String(brush);
    $('brush-v').textContent = String(brush);
}

// ---------- sand editor info ----------
function renderSandInfo() {
    const l = L(), a = analyze(l), used = countKeys(grains);
    const v = $('sand-validation'), notes: [string, string][] = [];
    const nColours = a.blocks.size;
    v.textContent = `${nColours} màu › ${a.total} khối › ${a.grains.toLocaleString('vi-VN')} hạt`;
    if (!a.total) notes.push(['err', 'Tranh chưa có cát: tạo từ ảnh hoặc vẽ.']);
    if (nColours > 12) notes.push(['warn', `${nColours} màu: nhiều màu làm băng chuyền dễ đầy. Nên ≤ 12.`]);
    if (a.total > 420) notes.push(['warn', `${a.total} khối: tranh rất lớn, chơi lâu và khó tìm tổ giải được.`]);
    const lost = [...used.keys()].filter((k) => !a.blocks.has(k));
    if (lost.length) notes.push(['warn', `Màu ${lost.map((k) => NAME.get(k)).join(', ')} có dưới 64 hạt nên không thành khối nào; khi chơi sẽ bị cắt bỏ.`]);
    if (a.total) notes.push(l.verified ? ['ok', '✓ Tổ hiện tại đã thắng 2 lần (bot).'] : ['warn', l.verified === false ? 'Đã sửa sau lần kiểm tra: chạy lại “Tự sinh tổ kiến”.' : 'Chưa kiểm tra: chạy “Tự sinh tổ kiến” để có tổ giải được.']);
    v.className = 'edit-validation ' + (notes.some(([t]) => t === 'err') ? 'err' : notes.some(([t]) => t === 'warn') ? 'warn' : 'ok');
    $('sand-notes').innerHTML = notes.map(([t, m]) => `<div class="${t}">${m}</div>`).join('');
    $('color-summary').innerHTML = [...a.blocks].sort((x, y) => y[1] - x[1]).map(([k, b]) =>
        `<div class="cs-row"><div class="cs-dot" style="background:${HEX.get(k)}"></div><span class="cs-n">(${b})</span><span class="cs-label">${NAME.get(k)}</span><span class="cs-grains">${(b * 64).toLocaleString('vi-VN')} hạt</span></div>`).join('')
        || '<div class="hint">Chưa có màu nào</div>';
}
function renderSettings() {
    const l = L();
    $<HTMLInputElement>('s-name').value = l.name;
    $<HTMLSelectElement>('s-diff').value = diffOf(l).key;
    $<HTMLSelectElement>('s-status').value = l.status;
    $<HTMLTextAreaElement>('comment').value = l.comment;
    $('comment-count').textContent = `${l.comment.length}/500`;
    $<HTMLSelectElement>('s-order').value = l.nests ? 'play' : l.order;
    $<HTMLInputElement>('s-seed').value = String(l.seed);
    $<HTMLSelectElement>('s-cols').value = String(l.cols);
}

// ---------- nest editor ----------
/** Start editing nests by hand: copy the generated ones into the level. */
function materializeNests() {
    const l = L();
    if (!l.nests) l.nests = analyze(l).nests.map((col) => col.map((n) => [n.color, n.need] as [string, number]));
    return l.nests;
}
function renderNests() {
    const l = L(), a = analyze(l);
    const cols: [string, number][][] = l.nests ?? a.nests.map((c) => c.map((n) => [n.color, n.need] as [string, number]));
    const inNests = new Map<string, number>();
    for (const col of cols) for (const [k, v] of col) inNests.set(k, (inNests.get(k) || 0) + v);
    const count = cols.reduce((s, c) => s + c.length, 0), sum = [...inNests.values()].reduce((s, v) => s + v, 0);
    const v = $('nest-validation'), diff = sum - a.total;
    v.textContent = `${count} tổ › ${sum}/${a.total} khối` + (diff ? ` › ${diff > 0 ? 'thừa ' + diff : 'thiếu ' + -diff}` : ' › khớp');
    if (l.nests && !a.fits) v.textContent += ' · game sẽ dùng rows/seed';
    v.className = 'edit-validation ' + (!a.fits || diff ? 'err' : l.verified ? 'ok' : 'warn');
    const keys = new Set([...a.blocks.keys(), ...inNests.keys()]);
    $('balance').innerHTML = [...keys].map((k) => {
        const have = inNests.get(k) || 0, need = a.blocks.get(k) || 0;
        return `<span class="chip${have !== need ? ' bad' : ''}" title="${NAME.get(k)}"><i style="background:${HEX.get(k)}"></i>${have}/${need}</span>`;
    }).join('');
    const box = $('nests');
    box.innerHTML = '';
    box.style.setProperty('--cols', String(cols.length));
    $('cols-label').textContent = `${cols.length} cột tổ`;
    cols.forEach((col, ci) => {
        const d = document.createElement('div');
        d.className = 'nest-col';
        d.innerHTML = `<h4>${cols.length > 4 ? '' : 'CỘT '}${ci + 1}</h4>`;
        col.forEach(([k, need], ri) => {
            const b = document.createElement('button');
            const sel = !!selNest && selNest[0] === ci && selNest[1] === ri;
            b.className = 'nest' + (ri === 0 ? ' front' : '') + (sel ? ' sel' : '');
            b.style.background = HEX.get(k) ?? '#888';
            b.textContent = String(need);
            b.title = `${NAME.get(k)} · ${need} khối`;
            b.onclick = () => { materializeNests(); selNest = [ci, ri]; renderNests(); renderSettings(); };
            // drag onto another nest to swap the two
            b.draggable = true;
            b.ondragstart = (e) => { nestDrag = [ci, ri]; e.dataTransfer!.effectAllowed = 'move'; b.classList.add('dragging'); };
            b.ondragend = () => { nestDrag = null; b.classList.remove('dragging'); };
            b.ondragover = (e) => { if (nestDrag) { e.preventDefault(); b.classList.add('drop'); } };
            b.ondragleave = () => b.classList.remove('drop');
            b.ondrop = (e) => { e.preventDefault(); e.stopPropagation(); b.classList.remove('drop'); dropNest(ci, ri); };
            d.appendChild(b);
        });
        const add = document.createElement('button');
        add.className = 'nest-add'; add.textContent = '＋'; add.title = 'Thêm tổ vào cuối cột';
        add.onclick = () => {
            sandSnapshot();
            const ns = materializeNests(), k = [...a.blocks.keys()][0] ?? colour;
            delete l.moves;
            ns[ci].push([k, Math.round(l.chunk[0] * NEST_SCALE)]);
            selNest = [ci, ns[ci].length - 1];
            nestsChanged();
        };
        // ...or onto ＋ (or the column's empty space) to move it to the end of that column
        add.ondragover = d.ondragover = (e) => { if (nestDrag) { e.preventDefault(); add.classList.add('drop'); } };
        add.ondragleave = () => add.classList.remove('drop');
        add.ondrop = d.ondrop = (e) => { e.preventDefault(); add.classList.remove('drop'); dropNest(ci, -1); };
        d.appendChild(add);
        box.appendChild(d);
    });
    renderTep();
}
let nestDrag: [number, number] | null = null;
/** Drop the dragged nest on nest (ci, ri): swap the two; ri = -1 moves it to the end of column ci. */
function dropNest(ci: number, ri: number) {
    const from = nestDrag;
    nestDrag = null;
    if (!from || (from[0] === ci && from[1] === ri)) return;
    sandSnapshot();
    const cols = materializeNests();
    delete L().moves; // hand edits: the recorded winning strokes no longer match
    const [fc, fr] = from;
    if (ri < 0) {
        const [n] = cols[fc].splice(fr, 1);
        cols[ci].push(n);
        selNest = [ci, cols[ci].length - 1];
    } else {
        [cols[fc][fr], cols[ci][ri]] = [cols[ci][ri], cols[fc][fr]];
        selNest = [ci, ri];
    }
    nestsChanged();
}

function renderTep() {
    const l = L(), tep = $('tep');
    if (!selNest || !l.nests || !l.nests[selNest[0]]?.[selNest[1]]) { tep.hidden = true; selNest = null; return; }
    tep.hidden = false;
    const [ci, ri] = selNest, [k, need] = l.nests[ci][ri];
    $('tep-id').textContent = `#${ci + 1}.${ri + 1}`;
    $('tep-colors').innerHTML = '';
    for (const c of analyze(l).blocks.keys()) {
        const b = document.createElement('button');
        b.className = 'tep-sw' + (c === k ? ' active' : '');
        b.style.background = HEX.get(c)!; b.title = NAME.get(c)!;
        b.onclick = () => editNest((cols) => { cols[ci][ri][0] = c; return [ci, ri]; });
        $('tep-colors').appendChild(b);
    }
    $<HTMLInputElement>('tep-size').value = String(need);
}
function editNest(fn: (cols: [string, number][][], ci: number, ri: number) => [number, number] | null) {
    if (!selNest || !L().nests) return;
    sandSnapshot();
    delete L().moves; // hand edits: the recorded winning strokes no longer match
    selNest = fn(L().nests!, selNest[0], selNest[1]);
    nestsChanged();
}
$('tep-close').onclick = () => { selNest = null; renderNests(); };
$('tep-minus').onclick = () => editNest((c, ci, ri) => { c[ci][ri][1] = Math.max(1, c[ci][ri][1] - 1); return [ci, ri]; });
$('tep-plus').onclick = () => editNest((c, ci, ri) => { c[ci][ri][1]++; return [ci, ri]; });
$<HTMLInputElement>('tep-size').onchange = (e) => editNest((c, ci, ri) => { c[ci][ri][1] = Math.max(1, parseInt((e.target as HTMLInputElement).value, 10) || 1); return [ci, ri]; });
$('tep-up').onclick = () => editNest((c, ci, ri) => { if (!ri) return [ci, ri]; [c[ci][ri - 1], c[ci][ri]] = [c[ci][ri], c[ci][ri - 1]]; return [ci, ri - 1]; });
$('tep-down').onclick = () => editNest((c, ci, ri) => { if (ri >= c[ci].length - 1) return [ci, ri]; [c[ci][ri + 1], c[ci][ri]] = [c[ci][ri], c[ci][ri + 1]]; return [ci, ri + 1]; });
const moveCol = (d: number) => editNest((c, ci, ri) => {
    const to = ci + d;
    if (to < 0 || to >= c.length) return [ci, ri];
    const [n] = c[ci].splice(ri, 1), at = Math.min(ri, c[to].length);
    c[to].splice(at, 0, n);
    return [to, at];
});
$('tep-left').onclick = () => moveCol(-1);
$('tep-right').onclick = () => moveCol(1);
$('tep-del').onclick = () => editNest((c, ci, ri) => { c[ci].splice(ri, 1); return null; });
$('btn-reset-nests').onclick = () => { sandSnapshot(); delete L().nests; delete L().moves; selNest = null; nestsChanged(); };

// ---------- solver: find nests the level can be won with ----------
interface Combo { order: 'rows' | 'onion'; seed: number; chunk: [number, number]; record?: number }
let solving: { stop: () => void } | null = null;

function log(html: string, reset = false) {
    const el = $('log');
    el.innerHTML = (reset ? '' : el.innerHTML + '\n') + html;
    el.scrollTop = el.scrollHeight;
}
const newWorker = () => new Worker(new URL('./solver.worker.ts', import.meta.url), { type: 'module' });
const poolSize = () => Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1));

function solve() {
    if (solving) { solving.stop(); log('<s>Đã dừng.</s>'); return; }
    const l = L(), a = analyze(l);
    if (!a.total) { toast('Tranh chưa có cát'); return; }
    const target = l.id, sandAt = l.sand.data;
    // recorded plays first (they build nests that fit how the sand comes out), then rows / onion orders
    const sizes: [number, number][] = [l.chunk];
    if (l.chunk[0] > 2) sizes.push([l.chunk[0] - 1, l.chunk[1] - 1]);
    const combos: Combo[] = [];
    for (const chunk of sizes) {
        for (let rec = 0; rec < 8; rec++) combos.push({ order: 'rows', seed: rec % 3, chunk, record: rec });
        for (let seed = 0; seed < 6; seed++) for (const order of ['rows', 'onion'] as const) combos.push({ order, seed, chunk });
    }
    const maxSec = Math.max(300, a.total * 2);
    const workers = Array.from({ length: poolSize() }, newWorker);
    let next = 0, done = 0, found = false;
    const t0 = performance.now(), progress = $<HTMLProgressElement>('solve-progress');
    progress.max = combos.length; progress.value = 0;
    $('btn-solve').textContent = '■ Dừng tìm';
    log(`Thử ${combos.length} cách xếp tổ trên ${workers.length} luồng…`, true);
    const stop = () => { workers.forEach((w) => w.terminate()); solving = null; $('btn-solve').textContent = '🤖 Tự sinh tổ kiến (giải được)'; };
    solving = { stop };
    const feed = (w: Worker) => {
        if (found || next >= combos.length) return;
        const id = next++, c = combos[id];
        const def = toDef({ ...l, order: c.order, seed: c.seed, chunk: c.chunk });
        delete def.nests; delete def.moves;
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
                const lv = levels.find((x) => x.id === target);
                if (!lv || lv.sand.data !== sandAt) { log('<s>Tranh đã đổi trong lúc tìm: chạy lại.</s>'); return; }
                if (lv === L()) sandSnapshot();
                Object.assign(lv, { order: c.order, seed: c.seed, chunk: c.chunk, verified: true, updated: Date.now() });
                if (r.nests) { lv.nests = r.nests; lv.moves = r.moves; } else { delete lv.nests; delete lv.moves; }
                if (c.chunk !== l.chunk) log('Không cách nào thắng ở độ khó đã chọn; dùng tổ nhỏ hơn 1 bậc.');
                log(`Xong sau ${((performance.now() - t0) / 1000).toFixed(0)} s. Bấm 🤖 trên thanh công cụ để xem lượt thắng.`);
                selNest = null;
                renderAll();
                return;
            }
            if (!found) log(`${name}: ${r.last === 'lose' ? 'tràn băng chuyền' : r.last === 'stuck' ? 'kẹt' : 'thắng 1 lần'}${c.record != null ? (r.stage === 'record' ? ' lúc ghi' : ' lúc chơi lại') : ''}${r.why ? ` <span style="color:var(--dim)">(${r.why})</span>` : ''}`);
            if (done >= combos.length && !found) {
                stop();
                log('<s>✗ Không tìm được tổ thắng được. Thử ít màu hơn, tranh nhỏ hơn, hoặc tách màu trải từ trên xuống dưới thành 2 màu.</s>');
                return;
            }
            feed(w);
        };
        w.onerror = (err) => { log('<s>Lỗi worker: ' + err.message + '</s>'); stop(); };
        feed(w);
    }
}

// ---------- level bank ----------
const thumbCache = new Map<string, HTMLCanvasElement>();
function thumb(l: EdLevel) {
    let c = thumbCache.get(l.sand.data);
    if (!c) {
        c = document.createElement('canvas');
        const { w, h } = dims(l);
        c.width = w; c.height = h;
        drawSand(c.getContext('2d')!, decodeSand(l.sand), w, h, 0, 0, w, h);
        if (thumbCache.size > 300) thumbCache.clear();
        thumbCache.set(l.sand.data, c);
    }
    const out = document.createElement('canvas');
    out.width = c.width; out.height = c.height;
    out.getContext('2d')!.drawImage(c, 0, 0);
    return out;
}
const checkOf = (l: EdLevel) => (l.verified ? 'ok' : l.verified === false ? 'changed' : 'none');
const CHECK_LABEL: Record<string, string> = { ok: '✓ Đã kiểm tra', changed: '! Đã sửa', none: '– Chưa' };
function bankSnapshot() {
    bankUndo.push(JSON.stringify({ levels: levels.map(toDef), chapters, cur }));
    if (bankUndo.length > 40) bankUndo.shift();
}
function undoBank() {
    const s = bankUndo.pop();
    if (!s) { toast('Không còn gì để hoàn tác'); return; }
    const d = JSON.parse(s);
    levels = d.levels.map(normalize); chapters = d.chapters;
    selectLevel(Math.min(d.cur, levels.length - 1));
}
function visibleLevels(): number[] {
    const q = $<HTMLInputElement>('lb-search').value.trim().toLowerCase();
    const ch = chapters.find((c) => c.id === bankChapter);
    const ids = ch ? ch.levels : levels.map((l) => l.id);
    return ids.map((id) => levels.findIndex((l) => l.id === id)).filter((i) => {
        if (i < 0) return false;
        const l = levels[i];
        if (q && !l.name.toLowerCase().includes(q)) return false;
        if (filters.status.size && !filters.status.has(l.status)) return false;
        if (filters.diff.size && !filters.diff.has(diffOf(l).key)) return false;
        if (filters.check.size && !filters.check.has(checkOf(l))) return false;
        return true;
    });
}
let dragFrom = -1;
function renderBank() {
    const lay = $('lb-layouts');
    lay.innerHTML = '';
    const chip = (id: string, name: string, n: number) => {
        const b = document.createElement('button');
        b.className = 'lb-lay-chip' + (bankChapter === id ? ' active' : '');
        b.innerHTML = `${esc(name)}<small>${n}</small>`;
        b.title = id ? 'Chỉ hiện các màn của chapter set này' : 'Cả Level Bank';
        b.onclick = () => { bankChapter = id; renderBank(); };
        lay.appendChild(b);
    };
    chip('', 'ALL', levels.length);
    for (const c of chapters) chip(c.id, c.name, c.levels.length);

    const list = $('lb-list');
    list.innerHTML = '';
    const shown = visibleLevels();
    for (const i of shown) {
        const l = levels[i], a = analyze(l), chk = checkOf(l);
        const row = document.createElement('div');
        row.className = 'lb-row' + (i === cur ? ' on' : '');
        row.draggable = !bankChapter;
        row.innerHTML = `<span class="lb-id">${i + 1}</span><span class="lb-grip" title="Kéo để đổi thứ tự">⠿</span>`;
        row.appendChild(thumb(l));
        const name = document.createElement('div');
        name.className = 'lb-name';
        name.innerHTML = `${esc(l.name)}<em><span class="lb-status st-${l.status}">${l.status}</span> ${a.blocks.size} màu · ${a.total} khối · ${chk === 'ok' ? '✓' : chk === 'changed' ? '!' : '–'}</em>`;
        name.title = `${l.name} · ${CHECK_LABEL[chk]}`;
        row.appendChild(name);
        const diff = document.createElement('select');
        diff.className = 'lb-diff-select'; diff.title = 'Độ khó (cỡ tổ)';
        diff.innerHTML = DIFFS.map((d) => `<option value="${d.key}">${d.short}</option>`).join('');
        diff.value = diffOf(l).key;
        diff.onclick = (e) => e.stopPropagation();
        diff.onchange = () => { bankSnapshot(); l.chunk = DIFFS.find((d) => d.key === diff.value)!.chunk; if (l.verified) l.verified = false; delete l.nests; delete l.moves; renderAll(); };
        row.appendChild(diff);
        for (const [icon, tip, fn] of [
            ['⟲', 'Lịch sử phiên bản', () => showHistory(l)],
            ['⧉', 'Nhân bản', () => duplicateLevel(i)],
            ['🗑', 'Xoá', () => deleteLevel(i)],
        ] as [string, string, () => void][]) {
            const b = document.createElement('button');
            b.className = 'lb-act'; b.textContent = icon; b.title = tip;
            b.onclick = (e) => { e.stopPropagation(); fn(); };
            row.appendChild(b);
        }
        row.onclick = () => selectLevel(i);
        row.ondragstart = () => { dragFrom = i; };
        row.ondragover = (e) => { e.preventDefault(); row.classList.add('drop-before'); };
        row.ondragleave = () => row.classList.remove('drop-before');
        row.ondrop = (e) => {
            e.preventDefault(); row.classList.remove('drop-before');
            if (dragFrom < 0 || dragFrom === i) return;
            bankSnapshot();
            const curId = L().id, [m] = levels.splice(dragFrom, 1);
            levels.splice(dragFrom < i ? i - 1 : i, 0, m);
            cur = levels.findIndex((x) => x.id === curId);
            dragFrom = -1;
            renderAll();
        };
        list.appendChild(row);
    }
    if (!shown.length) list.innerHTML = '<div class="hint">Không có màn nào khớp.</div>';
    const opts = (id: string, set: Set<string>, items: [string, string][]) => {
        const box = $(id);
        box.innerHTML = '';
        for (const [val, label] of items) {
            const b = document.createElement('button');
            b.className = 'lb-filter-opt' + (set.has(val) ? ' active' : '');
            b.textContent = label;
            b.onclick = () => { if (set.has(val)) set.delete(val); else set.add(val); renderBank(); };
            box.appendChild(b);
        }
    };
    opts('f-status', filters.status, [['WIP', 'WIP'], ['REVIEW', 'REVIEW'], ['LIVE', 'LIVE']]);
    opts('f-diff', filters.diff, DIFFS.map((d) => [d.key, d.label]));
    opts('f-check', filters.check, Object.entries(CHECK_LABEL));
    $('lb-filter-btn').classList.toggle('on', !!(filters.status.size || filters.diff.size || filters.check.size));
    renderBankStore();
}
function renderBankStore() {
    let at = '';
    try { const t = +(localStorage.getItem(CUSTOM_KEY + '_at') || 0); if (t) at = 'Lưu lúc ' + new Date(t).toLocaleString('vi-VN'); } catch { /* storage blocked */ }
    $('saved-at').textContent = at;
}
function selectLevel(i: number) {
    cur = Math.max(0, Math.min(levels.length - 1, i));
    grains = decodeSand(L().sand);
    sandUndo = []; sandRedo = []; selNest = null;
    renderAll();
}
function newLevel() {
    bankSnapshot();
    const l = blankLevel();
    levels.splice(cur + 1, 0, l);
    chapters.find((c) => c.id === bankChapter)?.levels.push(l.id);
    selectLevel(cur + 1);
}
function duplicateLevel(i: number) {
    bankSnapshot();
    const c = clone(levels[i]);
    c.id = uid(); c.name += ' (copy)'; c.status = 'WIP'; c.updated = Date.now();
    levels.splice(i + 1, 0, c);
    selectLevel(i + 1);
}
function deleteLevel(i: number) {
    if (!confirm(`Xoá màn “${levels[i].name}”?`)) return;
    bankSnapshot();
    const [gone] = levels.splice(i, 1);
    for (const c of chapters) c.levels = c.levels.filter((id) => id !== gone.id);
    if (!levels.length) levels.push(blankLevel());
    selectLevel(Math.min(cur, levels.length - 1));
}

// ---------- history + backups ----------
function showList(title: string, body: HTMLElement, bar: HTMLElement[] = []) {
    $('list-title').textContent = title;
    $('list-body').innerHTML = ''; $('list-body').appendChild(body);
    $('list-bar').innerHTML = '';
    const close = document.createElement('button');
    close.className = 'btn'; close.textContent = 'Đóng';
    close.onclick = () => $('list-modal').classList.remove('on');
    for (const b of [...bar, close]) $('list-bar').appendChild(b);
    $('list-modal').classList.add('on');
}
function showHistory(l: EdLevel) {
    const box = document.createElement('div');
    const render = () => {
        const hist = loadJson<Record<string, { t: number; level: LevelDef & Partial<EdLevel> }[]>>(HISTORY_KEY, {});
        const items = hist[l.id] || [];
        box.innerHTML = items.length ? '' : '<div class="hint">Chưa có bản lưu nào của màn này. Mỗi lần Lưu, bản đã đổi được giữ lại (tối đa 10).</div>';
        items.forEach((h, i) => {
            const row = document.createElement('div');
            row.className = 'hist-item';
            const t = thumb(normalize(h.level));
            t.style.cssText = 'width:42px;height:auto;border-radius:6px;background:#f0dcb4';
            const s = document.createElement('span');
            s.textContent = `${new Date(h.t).toLocaleString('vi-VN')} · ${h.level.name}`;
            const load = document.createElement('button');
            load.className = 'btn'; load.textContent = 'Mở';
            load.onclick = () => {
                bankSnapshot();
                const idx = levels.findIndex((x) => x.id === l.id);
                levels[idx] = { ...normalize(h.level), id: l.id };
                selectLevel(idx);
                $('list-modal').classList.remove('on');
                toast('Đã mở bản lưu (chưa lưu)');
            };
            const del = document.createElement('button');
            del.className = 'btn danger'; del.textContent = 'Xoá';
            del.onclick = () => { items.splice(i, 1); hist[l.id] = items; localStorage.setItem(HISTORY_KEY, JSON.stringify(hist)); render(); };
            row.append(t, s, load, del);
            box.appendChild(row);
        });
    };
    render();
    showList(`Lịch sử phiên bản · ${l.name}`, box);
}
function showBackups() {
    const box = document.createElement('div');
    const backups = loadJson<{ t: number; levels: (LevelDef & Partial<EdLevel>)[]; chapters: Chapter[] }[]>(BACKUP_KEY, []);
    box.innerHTML = backups.length ? '' : '<div class="hint">Chưa có bản sao lưu. Mỗi lần Lưu, cả Level Bank được sao lưu (tối đa 15).</div>';
    for (const b of backups) {
        const row = document.createElement('div');
        row.className = 'hist-item';
        const s = document.createElement('span');
        s.textContent = `${new Date(b.t).toLocaleString('vi-VN')} · ${b.levels.length} màn · ${(b.chapters || []).length} chapter set`;
        const restore = document.createElement('button');
        restore.className = 'btn'; restore.textContent = 'Khôi phục';
        restore.onclick = () => {
            if (!confirm('Thay Level Bank hiện tại bằng bản sao lưu này? (Chưa lưu cho tới khi bấm Lưu)')) return;
            bankSnapshot();
            levels = b.levels.map(normalize); chapters = b.chapters || [];
            selectLevel(0);
            $('list-modal').classList.remove('on');
        };
        row.append(s, restore);
        box.appendChild(row);
    }
    showList('Bản sao lưu Level Bank', box);
}

// ---------- generate from an image ----------
const gen: ConvertOpts = { n: 20, colors: 6, bg: 12, outline: false, smooth: 1, fit: 'contain' };
let genActiveOnly = false;
let genImage: HTMLImageElement | null = null, genName = '', genResult: string[] | null = null, genTimer = 0;
/** Where the picture sits in the frame: grains right / down from centred (kept so its sand stays in the frame). */
const genOff = { x: 0, y: 0 };

function openGen() {
    $('gen-modal').classList.add('on');
    for (const [id, key] of [['g-size', 'n'], ['g-colors', 'colors'], ['g-bg', 'bg'], ['g-smooth', 'smooth']] as const) {
        $<HTMLInputElement>(id).value = String(gen[key]);
        $(id + '-v').textContent = String(gen[key]);
    }
    $<HTMLInputElement>('g-outline').checked = gen.outline;
    $<HTMLSelectElement>('g-fit').value = gen.fit;
    runGen();
}
function runGen() {
    clearTimeout(genTimer);
    genTimer = window.setTimeout(() => {
        // the preview is the whole frame at the game's scale, the picture (gen.n cells tall) centred in
        // it, then moved by genOff
        const cv = $<HTMLCanvasElement>('gen-preview'), { w: FW, h: FH } = frameGrains(FRAME_N), dpr = window.devicePixelRatio || 1;
        cv.style.aspectRatio = `${FW} / ${FH}`;
        const w = cv.clientWidth || 480;
        cv.width = Math.round(w * dpr); cv.height = Math.round((w * FH / FW) * dpr);
        const g = cv.getContext('2d')!;
        g.fillStyle = '#f0dcb4'; g.fillRect(0, 0, cv.width, cv.height);
        if (!genImage) { $('gen-summary').innerHTML = '<span class="hint">Chọn một ảnh để xem trước.</span>'; $<HTMLButtonElement>('gen-apply').disabled = true; return; }
        const pic = frameGrains(gen.n);
        const raw = imageToSand(genImage, { ...gen, keys: genActiveOnly ? activeKeys() : undefined }), r = moveRange(raw, pic.w, pic.h);
        genOff.x = Math.max(r.minX, Math.min(r.maxX, genOff.x)); genOff.y = Math.max(r.minY, Math.min(r.maxY, genOff.y));
        genResult = fitToFrame(raw, pic.w, pic.h, genOff.x, genOff.y).keys;
        const cell = (v: number) => `${v > 0 ? '+' : ''}${+(v / 8).toFixed(1)}`;
        $('g-move-v').textContent = genOff.x || genOff.y ? `${cell(genOff.x)}, ${cell(genOff.y)} ô` : 'giữa';
        drawSand(g, genResult, FW, FH, 0, 0, cv.width, cv.height);
        const c = [...countKeys(genResult)].sort((a, b) => b[1] - a[1]);
        const total = c.reduce((s, [, n]) => s + Math.floor(n / 64), 0);
        $('gen-summary').innerHTML = c.map(([k, n]) => `<span class="chip" title="${NAME.get(k)}"><i style="background:${HEX.get(k)}"></i>${Math.floor(n / 64)}</span>`).join('') +
            `<span class="chip">≈ ${total} khối · tranh ${pic.w}×${pic.h} hạt</span>`;
        $<HTMLButtonElement>('gen-apply').disabled = false;
    }, 80);
}
function loadImage(file: File) {
    if (!file.type.startsWith('image/')) { toast('Hãy chọn một file ảnh'); return; }
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
        genImage = img; genName = file.name.replace(/\.[^.]+$/, '').slice(0, 40);
        genOff.x = genOff.y = 0;
        const shown = $<HTMLImageElement>('src-img');
        shown.src = url; shown.hidden = false;
        $('drop-text').innerHTML = 'Bấm hoặc thả ảnh khác để đổi';
        if (!$('gen-modal').classList.contains('on')) openGen(); else runGen();
    };
    img.onerror = () => toast('Không đọc được ảnh này');
    img.src = url;
}
function applyGen() {
    if (!genResult) return;
    sandSnapshot();
    const l = L();
    l.n = FRAME_N; grains = genResult.slice();
    if (l.name === 'Màn mới' && genName) l.name = genName;
    $('gen-modal').classList.remove('on');
    pictureChanged();
    toast('Đã tạo tranh cát: chạy “Tự sinh tổ kiến” để có tổ giải được');
}
const drop = $('drop'), imgInput = $<HTMLInputElement>('img-input');
drop.onclick = () => imgInput.click();
imgInput.onchange = () => { if (imgInput.files?.[0]) loadImage(imgInput.files[0]); imgInput.value = ''; };
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
drop.ondragleave = () => drop.classList.remove('over');
drop.ondrop = (e) => { e.preventDefault(); e.stopPropagation(); drop.classList.remove('over'); const f = e.dataTransfer?.files[0]; if (f) loadImage(f); };
for (const [id, key] of [['g-size', 'n'], ['g-colors', 'colors'], ['g-bg', 'bg'], ['g-smooth', 'smooth']] as const) {
    $<HTMLInputElement>(id).oninput = (e) => { gen[key] = +(e.target as HTMLInputElement).value; $(id + '-v').textContent = String(gen[key]); runGen(); };
}
$<HTMLInputElement>('g-outline').onchange = (e) => { gen.outline = (e.target as HTMLInputElement).checked; runGen(); };
$<HTMLInputElement>('g-active').onchange = (e) => { genActiveOnly = (e.target as HTMLInputElement).checked; runGen(); };
$<HTMLSelectElement>('g-fit').onchange = (e) => { gen.fit = (e.target as HTMLSelectElement).value as ConvertOpts['fit']; runGen(); };
// move the picture in the frame: a cell (8 grains) a press, ⊙ back to the middle, or drag the preview
for (const [id, dx, dy] of [['g-left', -8, 0], ['g-right', 8, 0], ['g-up', 0, -8], ['g-down', 0, 8]] as const) {
    $(id).onclick = () => { genOff.x += dx; genOff.y += dy; runGen(); };
}
$('g-center').onclick = () => { genOff.x = genOff.y = 0; runGen(); };
{
    const cv = $<HTMLCanvasElement>('gen-preview');
    let drag: { x: number; y: number; ox: number; oy: number } | null = null;
    cv.onpointerdown = (e) => { if (!genImage) return; drag = { x: e.clientX, y: e.clientY, ox: genOff.x, oy: genOff.y }; cv.setPointerCapture(e.pointerId); };
    cv.onpointermove = (e) => {
        if (!drag) return;
        const k = frameGrains(FRAME_N).w / cv.clientWidth;
        genOff.x = drag.ox + Math.round((e.clientX - drag.x) * k); genOff.y = drag.oy + Math.round((e.clientY - drag.y) * k);
        runGen();
    };
    cv.onpointerup = cv.onpointercancel = () => { drag = null; };
}
$('gen-cancel').onclick = () => $('gen-modal').classList.remove('on');
$('gen-apply').onclick = applyGen;
$('btn-gen-sand').onclick = openGen;
window.addEventListener('paste', (e) => {
    const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/'));
    if (f) loadImage(f);
});
// an image dropped anywhere on the editor opens the generator with it
window.addEventListener('dragover', (e) => { if (e.dataTransfer?.types.includes('Files')) e.preventDefault(); });
window.addEventListener('drop', (e) => {
    const f = e.dataTransfer?.files[0];
    if (!f) return;
    e.preventDefault();
    if (f.type.startsWith('image/')) loadImage(f);
});

// ---------- organizer ----------
const ALL = '';
let orgChapter = ALL;
let orgDraft: string[] = [];
let orgUndo: string[] = [];
let orgSelect = false;
const orgSelected = new Set<string>();
const orgIssues = new Map<string, string>();

const orgLevels = () => (orgChapter === ALL ? levels.map((l) => l.id) : orgDraft);
function orgOpen(id: string) {
    orgChapter = id;
    orgDraft = id === ALL ? [] : [...(chapters.find((c) => c.id === id)?.levels ?? [])];
    orgUndo = []; orgSelected.clear();
    renderOrganizer();
}
function orgUnsaved() {
    const ch = chapters.find((c) => c.id === orgChapter);
    return ch ? JSON.stringify(ch.levels) !== JSON.stringify(orgDraft) : false;
}
function orgPush() { orgUndo.push(JSON.stringify({ draft: orgDraft, levels: levels.map(toDef) })); if (orgUndo.length > 40) orgUndo.shift(); }
function renderOrganizer() {
    if (mode !== 'organizer') return;
    const side = $('org-chapter-list');
    side.innerHTML = '';
    const item = (id: string, name: string, meta: string, actions: boolean) => {
        const d = document.createElement('div');
        d.className = 'org-chapter' + (orgChapter === id ? ' active' : '');
        d.innerHTML = `<b>${esc(name)}</b><small>${meta}</small>`;
        d.onclick = () => orgOpen(id);
        if (actions) {
            const row = document.createElement('div');
            row.className = 'row';
            for (const [label, fn] of [['Đổi tên', () => editSet(id)], ['Nhân bản', () => duplicateSet(id)], ['Xoá', () => deleteSet(id)]] as [string, () => void][]) {
                const b = document.createElement('button');
                b.className = 'btn' + (label === 'Xoá' ? ' danger' : ''); b.textContent = label;
                b.onclick = (e) => { e.stopPropagation(); fn(); };
                row.appendChild(b);
            }
            d.appendChild(row);
        }
        side.appendChild(d);
    };
    item(ALL, 'Tất cả màn (Level Bank)', `${levels.length} màn`, false);
    for (const c of chapters) item(c.id, c.name, `${c.levels.length} màn${c.description ? ' · ' + esc(c.description) : ''}`, true);
    if (!chapters.length) side.insertAdjacentHTML('beforeend', '<div class="hint">Chưa có chapter set nào.</div>');

    const ch = chapters.find((c) => c.id === orgChapter);
    $('org-title').textContent = ch ? ch.name : 'Tất cả màn';
    $('org-subtitle').textContent = ch ? ch.description || 'Chapter set' : 'Thứ tự của Level Bank (cũng là thứ tự khi chơi ?custom=1).';
    $('org-unsaved').hidden = !(orgUnsaved() || isDirty());
    for (const id of ['org-edit-set', 'org-delete-set']) $<HTMLButtonElement>(id).disabled = !ch;
    $('org-select-mode').classList.toggle('on', orgSelect);
    $<HTMLButtonElement>('org-delete-selected').disabled = !orgSelected.size;
    $<HTMLButtonElement>('org-add-levels').disabled = !ch;
    document.querySelector<HTMLElement>('.org-sel-col')!.hidden = !orgSelect;

    const body = $('org-body');
    body.innerHTML = '';
    let dragRow = -1;
    const ids = orgLevels();
    ids.forEach((id, i) => {
        const l = levels.find((x) => x.id === id);
        if (!l) return;
        const a = analyze(l), tr = document.createElement('tr');
        tr.draggable = true;
        const colours = [...a.blocks.keys()];
        const chips = colours.slice(0, 6).map((k) => `<span class="org-color-chip" style="background:${HEX.get(k)}" title="${NAME.get(k)}"></span>`).join('') +
            (colours.length > 6 ? `<span class="org-more" title="${colours.slice(6).map((k) => NAME.get(k)).join(', ')}">+${colours.length - 6}</span>` : '');
        const nests = (l.nests ?? a.nests).reduce((s, c) => s + c.length, 0);
        const ap = l.autoplay, issue = orgIssues.get(id);
        tr.innerHTML = `<td ${orgSelect ? '' : 'hidden'}><input type="checkbox" ${orgSelected.has(id) ? 'checked' : ''} /></td>` +
            `<td>${i + 1}</td><td><span class="org-link" title="Mở trong Editor">${esc(l.name)}</span></td><td></td>` +
            `<td>${a.total}</td><td>${nests} <span class="res-none">· ${l.cols} cột</span></td><td>${chips}</td><td></td><td></td>` +
            `<td>${l.verified ? '<span class="res-ok">✓</span>' : l.verified === false ? '<span class="res-bad">!</span>' : '<span class="res-none">–</span>'}</td>` +
            `<td>${ap ? `<span class="${ap === 'win' ? 'res-ok' : 'res-bad'}">${ap === 'win' ? 'Thắng' : ap === 'lose' ? 'Tràn' : 'Kẹt'}</span>` : '<span class="res-none">–</span>'}</td>` +
            `<td>${issue === undefined ? '<span class="res-none">–</span>' : issue ? `<span class="res-bad">${esc(issue)}</span>` : '<span class="res-ok">OK</span>'}</td>`;
        tr.cells[3].appendChild(thumb(l));
        const st = document.createElement('select');
        st.innerHTML = '<option>WIP</option><option>REVIEW</option><option>LIVE</option>';
        st.value = l.status;
        st.onchange = () => { l.status = st.value as Status; renderAll(); };
        tr.cells[7].appendChild(st);
        const df = document.createElement('select');
        df.innerHTML = DIFFS.map((d) => `<option value="${d.key}">${d.label}</option>`).join('');
        df.value = diffOf(l).key;
        df.onchange = () => { l.chunk = DIFFS.find((d) => d.key === df.value)!.chunk; if (l.verified) l.verified = false; delete l.nests; delete l.moves; renderAll(); };
        tr.cells[8].appendChild(df);
        tr.querySelector<HTMLInputElement>('input[type=checkbox]')!.onchange = (e) => {
            if ((e.target as HTMLInputElement).checked) orgSelected.add(id); else orgSelected.delete(id);
            $<HTMLButtonElement>('org-delete-selected').disabled = !orgSelected.size;
        };
        tr.querySelector<HTMLElement>('.org-link')!.onclick = () => { setMode('editor'); selectLevel(levels.indexOf(l)); };
        tr.ondragstart = () => { dragRow = i; };
        tr.ondragover = (e) => { e.preventDefault(); tr.classList.add('drop-before'); };
        tr.ondragleave = () => tr.classList.remove('drop-before');
        tr.ondrop = (e) => {
            e.preventDefault(); tr.classList.remove('drop-before');
            if (dragRow < 0 || dragRow === i) return;
            orgPush();
            if (orgChapter === ALL) {
                const curId = L().id, [m] = levels.splice(dragRow, 1);
                levels.splice(dragRow < i ? i - 1 : i, 0, m);
                cur = levels.findIndex((x) => x.id === curId);
            } else {
                const [m] = orgDraft.splice(dragRow, 1);
                orgDraft.splice(dragRow < i ? i - 1 : i, 0, m);
            }
            renderAll();
        };
        body.appendChild(tr);
    });
    if (!ids.length) body.innerHTML = '<tr><td colspan="12" class="hint">Set này chưa có màn nào: bấm “＋ Thêm màn”.</td></tr>';
}
function newSet() {
    const name = prompt('Tên chapter set mới:', `Chapter ${chapters.length + 1}`);
    if (!name) return;
    const c: Chapter = { id: uid(), name: name.slice(0, 60), description: '', levels: [] };
    chapters.push(c);
    setMode('organizer');
    orgOpen(c.id);
    renderBank();
}
function editSet(id: string) {
    const c = chapters.find((x) => x.id === id);
    if (!c) return;
    const name = prompt('Tên set:', c.name);
    if (name == null) return;
    const desc = prompt('Mô tả (tuỳ chọn):', c.description);
    c.name = name.slice(0, 60) || c.name; c.description = (desc ?? c.description).slice(0, 120);
    renderAll();
}
function duplicateSet(id: string) {
    const c = chapters.find((x) => x.id === id);
    if (!c) return;
    chapters.push({ ...clone(c), id: uid(), name: c.name + ' (copy)' });
    renderAll();
}
function deleteSet(id: string) {
    const c = chapters.find((x) => x.id === id);
    if (!c || !confirm(`Xoá chapter set “${c.name}”? (Các màn vẫn còn trong Level Bank)`)) return;
    chapters = chapters.filter((x) => x.id !== id);
    if (bankChapter === id) bankChapter = '';
    orgOpen(ALL);
    renderAll();
}
function addLevelsDialog() {
    const ch = chapters.find((c) => c.id === orgChapter);
    if (!ch) return;
    const box = document.createElement('div'), picks = new Set<string>();
    for (const l of levels) {
        if (orgDraft.includes(l.id)) continue;
        const row = document.createElement('label');
        row.className = 'hist-item';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.onchange = () => { if (cb.checked) picks.add(l.id); else picks.delete(l.id); };
        const t = thumb(l);
        t.style.cssText = 'width:42px;height:auto;border-radius:6px;background:#f0dcb4';
        const s = document.createElement('span');
        s.textContent = `${levels.indexOf(l) + 1}. ${l.name} · ${l.status}`;
        row.append(cb, t, s);
        box.appendChild(row);
    }
    if (!box.children.length) box.innerHTML = '<div class="hint">Mọi màn trong Level Bank đã ở trong set này.</div>';
    const add = document.createElement('button');
    add.className = 'btn primary'; add.textContent = 'Thêm vào set';
    add.onclick = () => { orgPush(); orgDraft.push(...levels.filter((l) => picks.has(l.id)).map((l) => l.id)); $('list-modal').classList.remove('on'); renderOrganizer(); };
    showList(`Thêm màn vào “${ch.name}”`, box, [add]);
}
function playLevels(ids: string[], autoplay = false) {
    const list = ids.map((id) => levels.find((l) => l.id === id)).filter((l): l is EdLevel => !!l);
    if (!list.length) { toast('Không có màn nào để chơi'); return; }
    try { localStorage.setItem(PREVIEW_KEY, JSON.stringify(list.map(toDef))); } catch { toast('Trình duyệt chặn bộ nhớ'); return; }
    openPlay('index.html?custom=preview&level=1&t=' + Date.now(), autoplay ? (list[0].nests && list[0].moves) || undefined : undefined, autoplay);
}
/** Check every level of the set in the workers: replay its winning strokes, or let the bot play. */
function autoplaySet() {
    const ids = orgLevels().filter((id) => levels.some((l) => l.id === id));
    if (!ids.length) return;
    const bar = $<HTMLProgressElement>('org-progress');
    bar.hidden = false; bar.max = ids.length; bar.value = 0;
    const workers = Array.from({ length: Math.min(poolSize(), ids.length) }, newWorker);
    let next = 0, done = 0;
    const feed = (w: Worker) => {
        if (next >= ids.length) return;
        const i = next++, l = levels.find((x) => x.id === ids[i])!;
        const job: SolveJob = { id: i, def: toDef(l), runs: 1, maxSec: Math.max(300, analyze(l).total * 2), moves: l.nests && l.moves ? l.moves : undefined };
        w.postMessage(job);
    };
    for (const w of workers) {
        w.onmessage = (e: MessageEvent<SolveResult>) => {
            const l = levels.find((x) => x.id === ids[e.data.id]);
            if (l) l.autoplay = e.data.last as Result;
            bar.value = ++done;
            renderOrganizer();
            if (done >= ids.length) {
                workers.forEach((x) => x.terminate()); bar.hidden = true;
                toast(`Auto Play: thắng ${ids.filter((id) => levels.find((x) => x.id === id)?.autoplay === 'win').length}/${ids.length} màn`);
            } else feed(w);
        };
        feed(w);
    }
}
function validateSet() {
    let bad = 0;
    for (const id of orgLevels()) {
        const l = levels.find((x) => x.id === id);
        if (!l) continue;
        const a = analyze(l), issues: string[] = [];
        if (!a.total) issues.push('chưa có cát');
        if (l.nests && !a.fits) issues.push('tổ không khớp tranh');
        if (!l.verified) issues.push('tổ chưa kiểm tra');
        if (a.blocks.size > 12) issues.push('quá nhiều màu');
        if (a.total > 420) issues.push('tranh quá lớn');
        if (l.name === 'Màn mới') issues.push('chưa đặt tên');
        orgIssues.set(id, issues.join(', '));
        if (issues.length) bad++;
    }
    renderOrganizer();
    toast(bad ? `${bad} màn cần sửa` : 'Tất cả màn đều ổn');
}
function exportCsv() {
    const rows = [['order', 'name', 'id', 'blocks', 'columns', 'nests', 'colours', 'status', 'difficulty', 'nests_checked', 'autoplay', 'comment']];
    orgLevels().forEach((id, i) => {
        const l = levels.find((x) => x.id === id);
        if (!l) return;
        const a = analyze(l);
        rows.push([String(i + 1), l.name, l.id, String(a.total), String(l.cols), String((l.nests ?? a.nests).reduce((s, c) => s + c.length, 0)),
            [...a.blocks.keys()].map((k) => NAME.get(k)).join(' '), l.status, diffOf(l).label, l.verified ? 'yes' : 'no', l.autoplay ?? '', l.comment]);
    });
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    download(`${$('org-title').textContent || 'levels'}.csv`, csv, 'text/csv');
}
function exportSetJson() {
    const ch = chapters.find((c) => c.id === orgChapter);
    const list = orgLevels().map((id) => levels.find((l) => l.id === id)).filter((l): l is EdLevel => !!l);
    download(`${ch?.name ?? 'Level Bank'}.json`, JSON.stringify({ name: ch?.name ?? 'Level Bank', description: ch?.description ?? '', levels: list.map(toDef) }, null, 2));
}

// ---------- modes, panels, playtest ----------
function setMode(m: 'editor' | 'organizer') {
    mode = m;
    document.body.classList.toggle('org', m === 'organizer');
    $('mode-editor').classList.toggle('active', m === 'editor');
    $('mode-organizer').classList.toggle('active', m === 'organizer');
    if (m === 'organizer') renderOrganizer(); else renderEditor();
}

// panels: minimise and drag to resize (remembered per viewer)
const ui = loadJson<{ min: string[]; w: Record<string, number> }>(UI_KEY, { min: [], w: {} });
const saveUi = () => { try { localStorage.setItem(UI_KEY, JSON.stringify(ui)); } catch { /* storage blocked */ } };
for (const p of document.querySelectorAll<HTMLElement>('.edit-panel')) {
    if (ui.min.includes(p.id)) p.classList.add('min');
    if (ui.w[p.id]) p.style.flexBasis = ui.w[p.id] + 'px';
    p.querySelector<HTMLButtonElement>('.panel-min-btn')!.onclick = () => {
        p.classList.toggle('min');
        ui.min = [...document.querySelectorAll('.edit-panel.min')].map((x) => x.id);
        saveUi();
        renderSand();
    };
}
for (const r of document.querySelectorAll<HTMLElement>('.panel-resizer')) {
    const target = $(r.dataset.target!), sign = +r.dataset.sign!;
    r.onpointerdown = (e) => {
        const x0 = e.clientX, w0 = target.getBoundingClientRect().width;
        r.setPointerCapture(e.pointerId);
        r.onpointermove = (ev) => { target.style.flexBasis = Math.max(160, w0 + sign * (ev.clientX - x0)) + 'px'; };
        r.onpointerup = () => { r.onpointermove = null; ui.w[target.id] = target.getBoundingClientRect().width; saveUi(); renderSand(); };
    };
    r.ondblclick = () => { target.style.flexBasis = ''; delete ui.w[target.id]; saveUi(); renderSand(); };
}

const playWrap = $('play-wrap'), playFrame = $<HTMLIFrameElement>('play-frame');
let playUrl = '';
type CfHook = { state?: unknown; autoplay: (on: boolean, speed: number, m?: Recording['moves']) => void };
function openPlay(url: string, moves?: Recording['moves'], autoplay = false) {
    playUrl = url;
    playFrame.src = url;
    playWrap.classList.add('on');
    if (!autoplay) return;
    // wait for the game (as long as this playtest stays open), then let it play: replay the
    // recorded winning strokes, or the bot
    const tick = () => {
        if (playUrl !== url || !playWrap.classList.contains('on')) return;
        const cf = (playFrame.contentWindow as unknown as { __cf?: CfHook } | null)?.__cf;
        if (cf?.state) { cf.autoplay(true, 2, moves); toast(moves ? 'Auto Play: phát lại lượt thắng đã ghi' : 'Auto Play: bot đang chơi'); }
        else setTimeout(tick, 300);
    };
    setTimeout(tick, 600);
}
function closePlay() { playWrap.classList.remove('on'); playFrame.src = 'about:blank'; }
function playCurrent(autoplay = false) { playLevels([L().id], autoplay); }
$('play-close').onclick = closePlay;
$('play-reload').onclick = () => { playFrame.src = playUrl; };
$('play-popout').onclick = () => { window.open(playUrl, '_blank', 'width=420,height=760'); };
$('play-drag').onpointerdown = (e) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    const r = playWrap.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top, el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    playFrame.style.pointerEvents = 'none';
    el.onpointermove = (ev) => { playWrap.style.left = ev.clientX - dx + 'px'; playWrap.style.top = Math.max(0, ev.clientY - dy) + 'px'; playWrap.style.right = 'auto'; };
    el.onpointerup = () => { el.onpointermove = null; playFrame.style.pointerEvents = ''; };
};
$('play-resize').onpointerdown = (e) => {
    const x0 = e.clientX, w0 = playWrap.getBoundingClientRect().width, el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    playFrame.style.pointerEvents = 'none';
    el.onpointermove = (ev) => { playWrap.style.width = Math.max(240, Math.min(700, w0 + ev.clientX - x0)) + 'px'; };
    el.onpointerup = () => { el.onpointermove = null; playFrame.style.pointerEvents = ''; };
};

// ---------- misc ----------
function download(name: string, text: string, type = 'application/json') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
let toastT = 0;
function toast(msg: string) {
    const t = $('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT);
    toastT = window.setTimeout(() => t.classList.remove('on'), 2200);
}
/** TypeScript for LEVELS in src/game/levels.ts. */
function levelTs(l: EdLevel) {
    const d = toDef(l), q = (v: unknown) => JSON.stringify(v).replace(/"/g, "'");
    return `    {\n        name: ${q(l.name)}, n: ${l.n}, chunk: [${l.chunk.join(', ')}], order: '${l.order}', seed: ${l.seed}, salt: ${l.salt}${l.cols !== COLS ? `, cols: ${l.cols}` : ''},\n` +
        `        colors: ${q(d.colors).replace(/,/g, ', ')},\n        sand: { size: ${l.sand.size}, w: ${dims(l).w}, data: '${l.sand.data}' },\n` +
        (l.nests ? `        nests: ${q(l.nests).replace(/,/g, ', ')},\n` : '') + '    },';
}
async function importJson(file: File, asSet: boolean) {
    try {
        const data = JSON.parse(await file.text());
        const raw: (LevelDef & Partial<EdLevel>)[] = Array.isArray(data) ? data : Array.isArray(data.levels) ? data.levels : [data];
        const list = raw.filter((x) => x && (Array.isArray(x.rows) || x.sand) && x.colors).map(normalize);
        if (!list.length) throw new Error('empty');
        bankSnapshot();
        for (const l of list) if (levels.some((x) => x.id === l.id)) l.id = uid();
        levels.push(...list);
        if (!Array.isArray(data) && Array.isArray(data.chapters) && !asSet) {
            for (const c of data.chapters as Chapter[]) if (!chapters.some((x) => x.id === c.id)) chapters.push(c);
        } else if (asSet || (!Array.isArray(data) && data.name)) {
            chapters.push({ id: uid(), name: String(data.name || file.name).slice(0, 60), description: String(data.description || ''), levels: list.map((l) => l.id) });
        }
        selectLevel(levels.length - list.length);
        toast(`Đã nhập ${list.length} màn (chưa lưu)`);
    } catch { toast('File không đúng định dạng màn'); }
}

function renderDirty() {
    $('dirty').classList.toggle('on', isDirty());
    $('lvl-num').textContent = String(cur + 1);
    $('lvl-name').textContent = L().name;
}
function renderEditor() {
    renderColourBank(); renderTools(); renderSand(); renderSandInfo(); renderSettings(); renderNests(); renderBank(); renderDirty();
}
function renderAll() {
    renderEditor();
    renderOrganizer();
}

// ---------- wiring ----------
$('mode-editor').onclick = () => setMode('editor');
$('mode-organizer').onclick = () => setMode('organizer');
$<HTMLInputElement>('s-name').oninput = (e) => { L().name = (e.target as HTMLInputElement).value || 'Màn mới'; renderDirty(); renderBank(); };
$<HTMLSelectElement>('s-diff').onchange = (e) => { sandSnapshot(); L().chunk = DIFFS.find((d) => d.key === (e.target as HTMLSelectElement).value)!.chunk; delete L().nests; delete L().moves; nestsChanged(); };
$<HTMLSelectElement>('s-status').onchange = (e) => { L().status = (e.target as HTMLSelectElement).value as Status; renderDirty(); renderBank(); };
$<HTMLTextAreaElement>('comment').oninput = (e) => { L().comment = (e.target as HTMLTextAreaElement).value.slice(0, 500); $('comment-count').textContent = `${L().comment.length}/500`; renderDirty(); };
$<HTMLSelectElement>('s-order').onchange = (e) => {
    const v = (e.target as HTMLSelectElement).value;
    if (v === 'play') { renderSettings(); return; }
    sandSnapshot(); L().order = v as EdLevel['order']; delete L().nests; delete L().moves; nestsChanged();
};
$<HTMLSelectElement>('s-cols').onchange = (e) => {
    // a different number of columns needs new nests
    sandSnapshot(); L().cols = +(e.target as HTMLSelectElement).value; delete L().nests; delete L().moves; selNest = null; nestsChanged();
    toast('Đã đổi số cột: chạy “Tự sinh tổ kiến” để có tổ giải được');
};
$<HTMLInputElement>('s-seed').onchange = (e) => { sandSnapshot(); L().seed = Math.max(0, Math.min(99, parseInt((e.target as HTMLInputElement).value, 10) || 0)); delete L().nests; delete L().moves; nestsChanged(); };
$<HTMLInputElement>('brush').oninput = (e) => { brush = +(e.target as HTMLInputElement).value; $('brush-v').textContent = String(brush); };
$('btn-undo').onclick = undoSand;
$('btn-redo').onclick = redoSand;
$('btn-solve').onclick = solve;

$('lb-new').onclick = newLevel;
$('lb-new-chapter').onclick = newSet;
$<HTMLInputElement>('lb-search').oninput = () => renderBank();
$('lb-filter-btn').onclick = () => { $('lb-filter-panel').hidden = !$('lb-filter-panel').hidden; };
$('f-reset').onclick = () => { filters.status.clear(); filters.diff.clear(); filters.check.clear(); renderBank(); };
$('lb-undo').onclick = undoBank;
$('bank-save').onclick = $('btn-save').onclick = () => save();
$('bank-export').onclick = () => download('colony-flow-levels.json', JSON.stringify({ levels: levels.map(toDef), chapters }, null, 2));
const uploadInput = $<HTMLInputElement>('upload-input');
let uploadAsSet = false;
$('bank-import').onclick = $('btn-upload').onclick = () => { uploadAsSet = false; uploadInput.click(); };
$('org-upload').onclick = () => { uploadAsSet = true; uploadInput.click(); };
uploadInput.onchange = () => { const f = uploadInput.files?.[0]; uploadInput.value = ''; if (f) importJson(f, uploadAsSet); };
$('btn-download').onclick = () => download(`${L().name || 'level'}.json`, JSON.stringify(toDef(L()), null, 2));
$('bank-copy-ts').onclick = async () => { try { await navigator.clipboard.writeText(levelTs(L())); toast('Đã copy TS của màn này'); } catch { toast('Không copy được'); } };
$('bank-play-all').onclick = () => { if (save()) window.open('index.html?custom=1', '_blank'); };
$('btn-backups').onclick = showBackups;
$('btn-home').onclick = () => { location.href = 'index.html'; };
$('btn-play').onclick = () => playCurrent(false);
$('btn-auto').onclick = () => playCurrent(true);

$('org-new-chapter').onclick = newSet;
$('org-select-mode').onclick = () => { orgSelect = !orgSelect; if (!orgSelect) orgSelected.clear(); renderOrganizer(); };
$('org-select-all').onclick = () => { orgSelect = true; for (const id of orgLevels()) orgSelected.add(id); renderOrganizer(); };
$('org-delete-selected').onclick = () => {
    if (!orgSelected.size) return;
    if (orgChapter === ALL) {
        if (!confirm(`Xoá hẳn ${orgSelected.size} màn khỏi Level Bank?`)) return;
        bankSnapshot();
        levels = levels.filter((l) => !orgSelected.has(l.id));
        for (const c of chapters) c.levels = c.levels.filter((id) => !orgSelected.has(id));
        if (!levels.length) levels.push(blankLevel());
        cur = 0; grains = decodeSand(L().sand);
    } else { orgPush(); orgDraft = orgDraft.filter((id) => !orgSelected.has(id)); }
    orgSelected.clear();
    renderAll();
};
$('org-add-levels').onclick = addLevelsDialog;
$('org-undo').onclick = () => {
    const s = orgUndo.pop();
    if (!s) { toast('Không còn gì để hoàn tác'); return; }
    const d = JSON.parse(s), curId = L().id;
    orgDraft = d.draft;
    levels = d.levels.map(normalize);
    cur = Math.max(0, levels.findIndex((l) => l.id === curId));
    grains = decodeSand(L().sand);
    renderAll();
};
$('org-save').onclick = () => {
    const ch = chapters.find((c) => c.id === orgChapter);
    if (ch) ch.levels = [...orgDraft];
    save();
};
$('org-play').onclick = () => playLevels(orgLevels());
$('org-autoplay').onclick = autoplaySet;
$('org-validate').onclick = validateSet;
$('org-export-csv').onclick = exportCsv;
$('org-export-json').onclick = exportSetJson;
$('org-edit-set').onclick = () => editSet(orgChapter);
$('org-delete-set').onclick = () => deleteSet(orgChapter);

window.addEventListener('keydown', (e) => {
    const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement;
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); save(); return; }
    if (e.key === 'Escape') { closePlay(); closeColour(); $('gen-modal').classList.remove('on'); $('list-modal').classList.remove('on'); return; }
    if (typing || mode !== 'editor') return;
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) redoSand(); else undoSand(); return; }
    if (mod) return;
    if (e.key === '[') { brush = Math.max(2, brush - 1); renderTools(); drawSandCanvas(); return; }
    if (e.key === ']') { brush = Math.min(24, brush + 1); renderTools(); drawSandCanvas(); return; }
    if (/^[0-9]$/.test(e.key)) { const k = activeKeys()[(+e.key + 9) % 10]; if (k) pickColour(k); return; }
    const t = ({ b: 'paint', e: 'erase', g: 'fill', r: 'replace', i: 'pick' } as Record<string, Tool>)[e.key.toLowerCase()];
    if (t) { tool = t; renderTools(); renderColourBank(); }
});
window.addEventListener('beforeunload', (e) => { if (isDirty()) e.preventDefault(); });
window.addEventListener('resize', () => renderSand());

renderAll();
