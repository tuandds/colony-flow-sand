(() => {
  'use strict';
  const W = 1080, H = 1920;
  // Three stacked canvases: 2D base (board, sand, belt), WebGL 3D (nests, ants, cubes), 2D UI on top.
  const baseCanvas = document.getElementById('c');
  const canvas = document.getElementById('ui');
  const wrap = document.getElementById('wrap');
  const bctx = baseCanvas.getContext('2d'), uctx = canvas.getContext('2d');
  let ctx = bctx;
  const use3D = () => window.R3 && window.R3.ready;

  // ---------- layout ----------
  const BOARD = { x: 105, y: 172, w: 870, h: 723 };
  // inner edge of the board frame (board sprite interior, scaled to BOARD); sand never draws outside it
  const INNER = { x: 128, y: 197, w: 824, h: 669 };
  const PIC = { x: 210, y: 200, size: 660 };
  const FRAME = { x: 300, y: 880, w: 480, bottom: 900 };
  const MOUTH = { x: 540, y: 990, half: 46 };
  // Sand that has left the board piles up in the funnel and trickles into the hole at MOUTH_RATE.
  // Each funnel cell holds one falling clump (up to GRAINS_PER_PARTICLE grains).
  const FUNNEL = { x0: 300, top: 898, cell: 6, cols: 80, rows: 16 };
  const FUNNEL_HZ = 40, MOUTH_RATE = 90; // sim steps per second, clumps into the hole per second
  const funnelHalf = y => 240 + (MOUTH.half - 240) * (y - FRAME.y) / (MOUTH.y - FRAME.y);
  const FMASK = new Uint8Array(FUNNEL.cols * FUNNEL.rows);
  for (let j = 0; j < FUNNEL.rows; j++) for (let i = 0; i < FUNNEL.cols; i++) {
    const cx = FUNNEL.x0 + (i + 0.5) * FUNNEL.cell, cy = FUNNEL.top + (j + 0.5) * FUNNEL.cell;
    if (Math.abs(cx - MOUTH.x) <= funnelHalf(cy) - FUNNEL.cell * 0.6) FMASK[j * FUNNEL.cols + i] = 1;
  }
  const FMASK_COUNT = FMASK.reduce((a, b) => a + b, 0);
  const BELT = { cxL: 300, cxR: 780, cy: 1135, r: 80, band: 96 };
  const BELT_LEN = 2 * (BELT.cxR - BELT.cxL) + 2 * Math.PI * BELT.r;
  const SLOTS = 24;
  const SLOT_GAP = BELT_LEN / SLOTS;
  const BELT_SPEED = 300;
  const DROP_S = MOUTH.x - BELT.cxL;
  const BLOCK = 50;
  const COLS = 4;
  const COL_X = [0, 1, 2, 3].map(i => 540 + (i - 1.5) * 174);
  const ROW_GAP = 146;
  const ROW_Y = [1368, 1368 + ROW_GAP, 1368 + 2 * ROW_GAP]; // three rows show above the tray, the rest wait below it
  const TILE = 126;
  const TRAY_Y = 1712;
  const BOOSTERS = ['bst_add', 'bst_shuffle', 'bst_claw', 'bst_flower'].map((img, i) => ({ img, x: 186 + i * 236, y: 1790, bump: 0 }));
  const PAUSE_BTN = { x: 36, y: 40, w: 104, h: 108 };
  const SPEED_BTN = { x: 852, y: 44, w: 190, h: 104 };
  const ANT_SPEED = 420; // px/s at 1080 wide, matched to Colony Flow
  const DRAIN_RATE = 260; // picture cells per second
  const SUB = 8; // sand grains per picture cell, per side
  const GRAINS_PER_UNIT = SUB * SUB;
  const GRAINS_PER_PARTICLE = 6;
  const UNITS_PER_BLOCK = 1; // units of sand (one picture cell each) that compress into a block
  // level nest sizes were tuned for 5-unit blocks; scale them so nests ask for the same amount of sand
  const NEST_SCALE = 2 / UNITS_PER_BLOCK;
  const BLOCK_GRAINS = UNITS_PER_BLOCK * GRAINS_PER_UNIT;
  const SIM_HZ = 110; // falling-sand steps per second

  // ---------- assets ----------
  const IMG = {};
  const imgList = ['bg', 'block', 'shadow', 'btn_green', 'mascot', 'board', 'holelid', 'btn_blue_sq', 'pause',
    'circle_cream', 'bst_add', 'bst_shuffle', 'bst_claw', 'bst_flower'];
  const SFX_FILES = {
    pop: 'pop.ogg', drop: 'box_drop_in.ogg', pick: 'SFX_INGAME_COIN_PICK.ogg', nest: 'count_reach.ogg',
    lose: 'sfx-Lose.wav', win: 'QuestRewardGet.ogg', click: 'ui_button_click.ogg', deny: 'cube_break_1.ogg',
    add: 'SFX_INGAME_ADD.ogg',
  };
  const sfxPool = {};
  let music = null, audioOn = false;

  function loadImages() {
    const load = (n, tries) => new Promise(res => {
      const im = new Image();
      im.onload = () => { IMG[n] = im; res(); };
      im.onerror = () => (tries > 0 ? load(n, tries - 1).then(res) : res());
      im.src = 'assets/img/' + n + '.png' + (tries < 3 ? '?r=' + tries : '');
    });
    return Promise.all(imgList.map(n => load(n, 3))).then(() => {
      // a missing sprite should never stop the frame from drawing
      for (const n of imgList) if (!IMG[n]) { const c = document.createElement('canvas'); c.width = c.height = 1; IMG[n] = c; }
    });
  }
  function initAudio() {
    if (audioOn) return;
    audioOn = true;
    for (const [k, f] of Object.entries(SFX_FILES)) {
      sfxPool[k] = { list: [0, 1, 2, 3].map(() => { const a = new Audio('assets/sfx/' + f); a.preload = 'auto'; return a; }), i: 0 };
    }
    music = new Audio('assets/sfx/music_gameplay.ogg');
    music.loop = true; music.volume = 0.3;
    music.play().catch(() => {});
  }
  const lastPlay = {};
  function sfx(name, vol = 0.7) {
    const p = sfxPool[name];
    if (!p) return;
    const now = performance.now();
    if (lastPlay[name] && now - lastPlay[name] < 60) return;
    lastPlay[name] = now;
    const a = p.list[p.i++ % p.list.length];
    try { a.currentTime = 0; a.volume = vol; a.play().catch(() => {}); } catch (e) {}
  }

  // ---------- color helpers ----------
  function hexToRgb(h) { const v = parseInt(h.slice(1), 16); return [v >> 16 & 255, v >> 8 & 255, v & 255]; }
  function shade(h, f) {
    const [r, g, b] = hexToRgb(h);
    const m = c => Math.max(0, Math.min(255, Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f))));
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }
  const tintCache = {};
  function tinted(name, color, lift = 0) {
    const key = name + color + lift;
    if (tintCache[key]) return tintCache[key];
    const im = IMG[name];
    const c = document.createElement('canvas');
    c.width = im.width; c.height = im.height;
    const g = c.getContext('2d');
    g.drawImage(im, 0, 0);
    g.globalCompositeOperation = name === 'nest' ? 'color' : 'multiply';
    g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
    if (name === 'nest') { g.globalCompositeOperation = 'soft-light'; g.fillRect(0, 0, c.width, c.height); }
    if (lift) { g.globalCompositeOperation = 'screen'; g.globalAlpha = lift; g.fillStyle = color; g.fillRect(0, 0, c.width, c.height); g.globalAlpha = 1; }
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(im, 0, 0);
    tintCache[key] = c;
    return c;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash(x, y, i) { let h = x * 374761393 + y * 668265263 + i * 2147483647; h = (h ^ h >>> 13) * 1274126177; return ((h ^ h >>> 16) >>> 0) / 4294967296; }

  // ---------- state ----------
  let S = null;
  let levelIndex = 0;
  try { levelIndex = Math.min(LEVEL_COUNT - 1, parseInt(localStorage.getItem('cf_level') || '0', 10) || 0); } catch (e) {}
  const qp = new URLSearchParams(location.search).get('level');
  if (qp) levelIndex = Math.max(0, Math.min(LEVEL_COUNT - 1, parseInt(qp, 10) - 1));

  function startLevel(i) {
    levelIndex = i;
    try { localStorage.setItem('cf_level', String(i)); } catch (e) {}
    const L = buildLevel(i);
    const n = L.n;
    const grid = L.grid;
    // Each picture cell is split into SUB x SUB sand grains that are simulated one by one.
    // The simulated area reaches the board's inner frame on both sides (and is padded above),
    // so loose sand on the picture's edges can still slide off and fall until the frame stops it.
    const PG = n * SUB, gs = PIC.size / PG;
    // side padding reaches exactly to the frame, so the frame is the wall loose sand stops at
    const pad = Math.floor((PIC.x - INNER.x) / gs), top = 2 * pad;
    const G = PG + 2 * pad, keys = [null, ...Object.keys(L.colors)];
    const key = new Uint8Array(G * G), rgb = new Uint32Array(G * G), dr = new Uint8Array(G * G);
    for (let gy = 0; gy < PG; gy++) for (let gx = 0; gx < PG; gx++) {
      const k = grid[(gy / SUB) | 0][(gx / SUB) | 0];
      if (k) key[(gy + top) * G + gx + pad] = keys.indexOf(k);
    }
    fitWholeBlocks(key, G, keys.length);
    for (let p = 0; p < key.length; p++) {
      if (key[p]) rgb[p] = packColor(L.colors[keys[key[p]]], (hash(p % G, (p / G) | 0, 7) - 0.5) * 0.16);
    }
    let total = 0;
    for (const v of key) if (v) total++;

    // Natural release order, cut into nests further down. Two ways to estimate it:
    //  'rows'  - the player digs from the bottom up, so walk the grains bottom row first;
    //  'onion' - the player digs from the outside in, so peel by distance to empty space.
    // Each level picks the order and a seed that a test player could actually solve
    // (nests never change column, so a bad order can leave a needed colour stuck).
    const ovr = window.__levelOverride || {};
    const orderMode = ovr.order || L.order || 'rows', seed = ovr.seed ?? L.seed ?? 0;
    const rng = mulberry32(1234 + i * 977 + seed * 7919);
    const blockSeq = [], acc = new Array(keys.length).fill(0), left = {};
    let order = [];
    if (orderMode === 'onion') {
      const dist = new Int32Array(G * G).fill(-1), bfs = [];
      for (let p = 0; p < key.length; p++) if (!key[p]) { dist[p] = 0; bfs.push(p); }
      for (let h = 0; h < bfs.length; h++) {
        const p = bfs[h], x = p % G;
        for (const q of [x > 0 ? p - 1 : -1, x < G - 1 ? p + 1 : -1, p - G, p + G]) {
          if (q < 0 || q >= key.length || dist[q] >= 0) continue;
          dist[q] = dist[p] + 1; bfs.push(q);
        }
      }
      for (let p = 0; p < key.length; p++) if (key[p]) order.push(p);
      order.sort((a, b) => (dist[a] - dist[b]) || (b - a));
    } else {
      for (let p = key.length - 1; p >= 0; p--) if (key[p]) order.push(p);
    }
    for (const p of order) {
      const c = key[p];
      if (++acc[c] === BLOCK_GRAINS) { acc[c] = 0; blockSeq.push(keys[c]); }
    }
    for (const k of blockSeq) left[k] = (left[k] || 0) + 1;
    const open = {}, chunks = [];
    const chunkLo = Math.round(L.chunk[0] * NEST_SCALE), chunkHi = Math.round(L.chunk[1] * NEST_SCALE);
    const pickSize = k => {
      let c = chunkLo + Math.floor(rng() * (chunkHi - chunkLo + 1));
      if (left[k] - c < chunkLo) c = left[k];
      left[k] -= c;
      return c;
    };
    blockSeq.forEach((k, idx) => {
      if (!open[k]) { open[k] = { color: k, need: pickSize(k), have: 0, first: idx }; chunks.push(open[k]); }
      if (++open[k].have >= open[k].need) open[k] = null;
    });
    chunks.sort((a, b) => a.first - b.first);
    const cols = [[], [], [], []];
    // Nests never change column, so deal each one (in release order) to the column with the
    // least sand still queued; the columns then drain evenly instead of one running long.
    const load = new Array(COLS).fill(0);
    for (const c of chunks) {
      let ci = 0;
      for (let j = 1; j < COLS; j++) if (load[j] < load[ci]) ci = j;
      load[ci] += c.need;
      cols[ci].push({ color: c.color, need: c.need, got: 0, inflight: 0, cool: 0, pop: 0, dy: null, bump: 0 });
    }
    const picCanvas = document.createElement('canvas');
    picCanvas.width = G * BEVEL_N; picCanvas.height = G * BEVEL_N;
    S = {
      L, n, G, keys, key, rgb, dr, loose: new Uint8Array(G * G), vx: new Float32Array(G * G), vy: new Float32Array(G * G), colors: L.colors, total, drained: 0,
      cell: PIC.size / n, gs, ox: PIC.x - pad * gs, oy: PIC.y - top * gs, picDirty: true, picCanvas,
      picImg: picCanvas.getContext('2d').createImageData(G * BEVEL_N, G * BEVEL_N),
      queue: [], particles: [], emitAcc: {}, emitAt: {},
      fk: new Array(FUNNEL.cols * FUNNEL.rows).fill(null), fn: new Uint8Array(FUNNEL.cols * FUNNEL.rows), fc: new Array(FUNNEL.cols * FUNNEL.rows),
      fFree: FMASK_COUNT, fT: 0, fExit: 0, fFlip: 0, hopper: {},
      pipe: [], dropping: [],
      slots: new Array(SLOTS).fill(null), beltOff: 0,
      cols, ants: [], fx: [],
      simT: 0, simFlip: 0, deny: null, state: 'play', endT: 0, time: 0,
    };
  }
  function packColor(hex, f) {
    const [r, g, b] = hexToRgb(hex);
    const m = c => Math.max(0, Math.min(255, Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f))));
    return (255 << 24 | m(b) << 16 | m(g) << 8 | m(r)) >>> 0;
  }

  // Trim every colour to a whole number of blocks so no sand is left over.
  // Extra grains on the picture's outer edge are removed (top edge first); extra grains
  // of a colour enclosed by others are handed to a neighbouring colour that is settled
  // later. Enclosed colours go first and edge colours last, since an edge colour can
  // always shed grains off its own outline.
  function fitWholeBlocks(key, G, nColors) {
    const count = new Array(nColors).fill(0), touchesEdge = new Uint8Array(nColors);
    const nb = p => {
      const x = p % G, out = [];
      if (x > 0) out.push(p - 1); if (x < G - 1) out.push(p + 1);
      if (p >= G) out.push(p - G); if (p < G * (G - 1)) out.push(p + G);
      return out;
    };
    const onEdge = p => {
      const x = p % G;
      if (x === 0 || x === G - 1 || p < G || p >= G * (G - 1)) return true;
      return nb(p).some(q => !key[q]);
    };
    for (let p = 0; p < key.length; p++) if (key[p]) { count[key[p]]++; if (onEdge(p)) touchesEdge[key[p]] = 1; }
    const queue = [];
    for (let c = 1; c < nColors; c++) if (count[c]) queue.push(c);
    queue.sort((a, b) => (touchesEdge[a] - touchesEdge[b]) || (count[a] - count[b]));
    const settled = new Uint8Array(nColors);
    let guard = nColors * 6;
    while (queue.length && guard-- > 0) {
      const c = queue.shift();
      let extra = count[c] % BLOCK_GRAINS;
      for (let pass = 0; extra > 0 && pass < 64; pass++) {
        const edge = [], free = [], taken = [];
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
          const reopen = new Set();
          for (const [p, o] of taken) { if (!extra) break; key[p] = o; count[c]--; count[o]++; extra--; reopen.add(o); }
          for (const o of reopen) { settled[o] = 0; queue.push(o); }
          changed = 1;
        }
        if (!changed) break;
      }
      settled[c] = 1;
    }
  }

  // ---------- picture ----------
  // One canvas pixel per grain; the per-grain colour noise gives the fine sand texture.
  const BEVEL_N = 1;
  function liftColor(c, f) {
    const r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
    return (255 << 24 | (b + (255 - b) * f | 0) << 16 | (g + (255 - g) * f | 0) << 8 | (r + (255 - r) * f | 0)) >>> 0;
  }
  function redrawPicture() {
    const px = new Uint32Array(S.picImg.data.buffer), { key, rgb, dr, loose } = S;
    for (let p = 0; p < key.length; p++) {
      if (!key[p]) { px[p] = 0; continue; }
      px[p] = dr[p] ? liftColor(rgb[p], 0.35) : loose[p] ? liftColor(rgb[p], 0.22) : rgb[p];
    }
    S.picCanvas.getContext('2d').putImageData(S.picImg, 0, 0);
    S.picDirty = false;
  }

  // Swiping drains only the sand under the finger, and only grains that are open
  // underneath (bottom row, empty, or already draining), so sand goes bottom-up.
  function brushPicture(px, py) {
    const G = S.G, gs = S.gs, r = Math.max(S.cell * 1.1, 34), { key, dr, loose } = S;
    const x0 = Math.max(0, Math.floor((px - r - S.ox) / gs)), x1 = Math.min(G - 1, Math.floor((px + r - S.ox) / gs));
    const y0 = Math.max(0, Math.floor((py - r - S.oy) / gs)), y1 = Math.min(G - 1, Math.floor((py + r - S.oy) / gs));
    if (x0 > x1 || y0 > y1) return 0;
    let added = 0;
    for (let y = y1; y >= y0; y--) for (let x = x0; x <= x1; x++) {
      const cx = S.ox + (x + 0.5) * gs, cy = S.oy + (y + 0.5) * gs;
      if ((cx - px) ** 2 + (cy - py) ** 2 > r * r) continue;
      const p = y * G + x;
      if (!key[p] || loose[p]) continue;
      loose[p] = 1; added++;
    }
    if (added) {
      S.picDirty = true;
      sfx('pop', 0.6);
    }
    return added;
  }
  let lastBrush = null;
  function swipeTo(px, py) {
    if (!lastBrush) { brushPicture(px, py); lastBrush = [px, py]; return; }
    const [lx, ly] = lastBrush, d = Math.hypot(px - lx, py - ly), step = Math.max(8, S.cell * 0.4);
    const k = Math.max(1, Math.ceil(d / step));
    for (let i = 1; i <= k; i++) brushPicture(lx + (px - lx) * i / k, ly + (py - ly) * i / k);
    lastBrush = [px, py];
  }

  function emitParticle(k, c, x, y, n) {
    // grains leave through the bottom of the board, so the falling sand starts below the frame
    const sx = S.ox + (x + 0.5) * S.gs, sy = Math.max(S.oy + (y + 0.5) * S.gs, BOARD.y + BOARD.h - 4);
    const half = funnelHalf(FUNNEL.top) - FUNNEL.cell;
    const ex = Math.max(MOUTH.x - half, Math.min(MOUTH.x + half, sx)), ey = FUNNEL.top + 2;
    const dur = 0.12 + Math.random() * 0.06;
    S.particles.push({ k, n, c: `rgb(${c & 255},${c >> 8 & 255},${c >> 16 & 255})`, sx, sy, mx: (sx + ex) / 2, my: (sy + ey) / 2, ex, ey, t: 0, dur });
  }
  function stepDrain(dt) {
    const budget = DRAIN_RATE * GRAINS_PER_UNIT * dt + (S.drainCarry || 0);
    let count = Math.floor(budget);
    S.drainCarry = budget - count;
    const { key, dr, rgb, G, gs } = S;
    let head = S.qHead || 0;
    // a full funnel backs up: grains wait at the bottom of the board until there is room
    while (count-- > 0 && head < S.queue.length && S.fFree - S.particles.length > 2) {
      const p = S.queue[head++];
      if (!dr[p]) continue;
      const k = S.keys[key[p]], x = p % G, y = (p / G) | 0;
      const c = rgb[p];
      key[p] = 0; dr[p] = 0; S.loose[p] = 0; S.vx[p] = 0; S.vy[p] = 0;
      S.picDirty = true;
      // grains are too many to animate one by one, so each particle carries a few of them
      S.emitAcc[k] = (S.emitAcc[k] || 0) + 1;
      S.emitAt[k] = [c, x, y];
      if (S.emitAcc[k] >= GRAINS_PER_PARTICLE) { emitParticle(k, c, x, y, S.emitAcc[k]); S.emitAcc[k] = 0; }
    }
    if (head >= S.queue.length) {
      S.queue.length = 0; head = 0;
      // leftover grains (less than a clump) fall from where that colour last left the board
      for (const k in S.emitAcc) if (S.emitAcc[k]) { const [c, x, y] = S.emitAt[k]; emitParticle(k, c, x, y, S.emitAcc[k]); S.emitAcc[k] = 0; }
    }
    S.qHead = head;
  }

  // Falling-sand step. Sand is fixed in place until swiped. Loose grains speed up as
  // they fall (gravity), and when something is in the way they slide down-left or
  // down-right, carrying sideways momentum so they keep running down a slope until
  // friction stops them. Fixed sand and settled loose sand both block. Grains reaching
  // the bottom of the board leave into the chute.
  // Rows are scanned bottom-up and the x direction alternates to avoid drift.
  const GRAVITY = 0.09, MAX_FALL = 3.5, FRICTION = 0.82;
  function simStep() {
    const { key, rgb, dr, loose, vx, vy, G } = S;
    const flip = S.simFlip ^= 1;
    let moved = false;
    const bottom = (G - 1) * G;
    for (let x = 0; x < G; x++) {
      const p = bottom + x;
      if (key[p] && loose[p] && !dr[p]) { dr[p] = 1; S.queue.push(p); }
    }
    const move = (p, q) => {
      key[q] = key[p]; rgb[q] = rgb[p]; loose[q] = 1; vx[q] = vx[p]; vy[q] = vy[p];
      key[p] = 0; loose[p] = 0; vx[p] = 0; vy[p] = 0;
    };
    for (let y = G - 2; y >= 0; y--) {
      const row = y * G;
      for (let i = 0; i < G; i++) {
        const x0 = flip ? i : G - 1 - i;
        let p = row + x0;
        if (!key[p] || !loose[p] || dr[p]) continue;
        vy[p] = Math.min(MAX_FALL, vy[p] + GRAVITY);
        // whole cells to travel this step; the fraction is rounded at random so slow grains still creep
        let steps = Math.floor(vy[p]) + (Math.random() < vy[p] % 1 ? 1 : 0);
        if (steps < 1) steps = 1;
        for (let s = 0; s < steps; s++) {
          const x = p % G, cy = (p / G) | 0;
          if (cy >= G - 1) break;
          const below = p + G;
          if (!key[below]) { move(p, below); p = below; moved = true; continue; }
          const l = x > 0 && !key[below - 1], r = x < G - 1 && !key[below + 1];
          if (!l && !r) {
            // landed: turn part of the fall into a sideways push for the next slide
            if (vy[p] > 1) vx[p] += (Math.random() < 0.5 ? -1 : 1) * vy[p] * 0.25;
            vy[p] = 0;
            // creep sideways toward a nearby drop (gentle slopes, stair steps), or keep
            // sliding on momentum; friction bleeds the momentum off
            const pref = vx[p] > 0.05 ? 1 : vx[p] < -0.05 ? -1 : (Math.random() < 0.5 ? -1 : 1);
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
          let dir;
          if (l && r) dir = vx[p] > 0.05 ? 1 : vx[p] < -0.05 ? -1 : (Math.random() < 0.5 ? -1 : 1);
          else dir = l ? -1 : 1;
          const q = below + dir;
          vx[p] = vx[p] * FRICTION + dir * 0.35;
          vy[p] *= 0.7;
          move(p, q); p = q; moved = true;
        }
      }
    }
    if (moved) S.picDirty = true;
  }
  // Small islands of fixed sand (thin slivers, specks) are too fiddly to swipe, so they come loose by themselves.
  const SMALL_ISLAND = 48, THIN_ISLAND = 4;
  function sweepDebris() {
    const { key, loose, G } = S;
    const seen = new Uint8Array(G * G), stack = [], comp = [];
    for (let s0 = 0; s0 < key.length; s0++) {
      if (!key[s0] || loose[s0] || seen[s0]) continue;
      seen[s0] = 1; stack.push(s0); comp.length = 0;
      while (stack.length) {
        const p = stack.pop(); comp.push(p);
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
        S.picDirty = true;
      }
    }
  }
  function stepSand(dt) {
    S.simT += dt;
    let n = 0;
    while (S.simT >= 1 / SIM_HZ && n++ < 4) { S.simT -= 1 / SIM_HZ; simStep(); }
    if (n >= 4) S.simT = 0;
    S.sweepT = (S.sweepT || 0) + dt;
    if (S.sweepT > 0.5) { S.sweepT = 0; sweepDebris(); }
  }

  // ---------- particles / hopper / pipe ----------
  function stepParticles(dt) {
    for (let i = S.particles.length - 1; i >= 0; i--) {
      const p = S.particles[i];
      p.t += dt / p.dur;
      if (p.t >= 1) {
        S.particles.splice(i, 1);
        if (!funnelInsert(p)) addToHopper(p.k, p.n);
      }
    }
  }
  // sand that has gone down the hole: 64 grains of a colour make a block in the pipe
  function addToHopper(k, n) {
    S.drained += n;
    S.hopper[k] = (S.hopper[k] || 0) + n;
    while (S.hopper[k] >= BLOCK_GRAINS) { S.hopper[k] -= BLOCK_GRAINS; S.pipe.push(k); }
  }
  function funnelInsert(p) {
    const W = FUNNEL.cols, col = Math.round((p.ex - FUNNEL.x0) / FUNNEL.cell - 0.5);
    for (let j = 0; j < 3; j++) for (let d = 0; d < W; d++) for (const i of d ? [col - d, col + d] : [col]) {
      const q = j * W + i;
      if (i < 0 || i >= W || !FMASK[q] || S.fk[q]) continue;
      S.fk[q] = p.k; S.fn[q] = p.n; S.fc[q] = p.c; S.fFree--;
      return true;
    }
    return false;
  }
  // Funnel sand: clumps slide down the slanted walls like sand and leave through the hole
  // at the bottom at a steady rate, so a big pour piles up and drains slowly.
  function stepFunnel(dt) {
    S.fT += dt;
    const W = FUNNEL.cols, Hh = FUNNEL.rows, { fk, fn, fc } = S;
    while (S.fT >= 1 / FUNNEL_HZ) {
      S.fT -= 1 / FUNNEL_HZ;
      S.fExit = Math.min(S.fExit + MOUTH_RATE / FUNNEL_HZ, 6);
      const bottom = (Hh - 1) * W;
      // a finished block still sitting in the hole (not yet dropped onto the conveyor)
      // plugs it: the sand above waits until the block is gone
      for (let i = 0; i < W && S.fExit >= 1 && !S.pipe.length; i++) {
        const q = bottom + i;
        if (!fk[q]) continue;
        addToHopper(fk[q], fn[q]);
        fk[q] = null; S.fFree++; S.fExit--;
      }
      const flip = (S.fFlip ^= 1);
      for (let j = Hh - 2; j >= 0; j--) for (let ii = 0; ii < W; ii++) {
        const i = flip ? ii : W - 1 - ii, q = j * W + i;
        if (!fk[q]) continue;
        let t = q + W;
        if (!FMASK[t] || fk[t]) {
          const l = i > 0 && FMASK[t - 1] && !fk[t - 1], r = i < W - 1 && FMASK[t + 1] && !fk[t + 1];
          if (l && r) t += Math.random() < 0.5 ? -1 : 1;
          else if (l) t -= 1;
          else if (r) t += 1;
          else {
            // the funnel walls are gentler than 45 degrees, so sand resting on them creeps
            // sideways toward the hole instead of sticking
            const toward = FUNNEL.x0 + (i + 0.5) * FUNNEL.cell < MOUTH.x ? 1 : -1;
            const side = q + toward;
            if (Math.random() < 0.5 || i + toward < 0 || i + toward >= W || !FMASK[side] || fk[side]) continue;
            t = side;
          }
        }
        fk[t] = fk[q]; fn[t] = fn[q]; fc[t] = fc[q]; fk[q] = null;
      }
    }
  }
  function particlePos(p) {
    const t = Math.pow(Math.min(1, p.t), 1.5), u = 1 - t;
    return [u * u * p.sx + 2 * u * t * p.mx + t * t * p.ex, u * u * p.sy + 2 * u * t * p.my + t * t * p.ey];
  }

  function slotPos(i) { return beltPoint(((S.beltOff + i * SLOT_GAP) % BELT_LEN + BELT_LEN) % BELT_LEN); }
  function beltPoint(s) {
    const straight = BELT.cxR - BELT.cxL, arc = Math.PI * BELT.r;
    const top = BELT.cy - BELT.r, bot = BELT.cy + BELT.r;
    if (s < straight) return [BELT.cxL + s, top];
    s -= straight;
    if (s < arc) { const a = -Math.PI / 2 + s / BELT.r; return [BELT.cxR + Math.cos(a) * BELT.r, BELT.cy + Math.sin(a) * BELT.r]; }
    s -= arc;
    if (s < straight) return [BELT.cxR - s, bot];
    s -= straight;
    const a = Math.PI / 2 + s / BELT.r; return [BELT.cxL + Math.cos(a) * BELT.r, BELT.cy + Math.sin(a) * BELT.r];
  }

  function stepBelt(dt) {
    S.beltOff = (S.beltOff + BELT_SPEED * dt) % BELT_LEN;
    // drop a block from the pipe into an empty slot passing under the mouth
    if (S.pipe.length && !S.dropping.length) {
      for (let i = 0; i < SLOTS; i++) {
        const s = ((S.beltOff + i * SLOT_GAP) % BELT_LEN + BELT_LEN) % BELT_LEN;
        let d = DROP_S - s;
        if (d > -SLOT_GAP * 0.35 && d < SLOT_GAP * 0.2 && !S.slots[i]) {
          const k = S.pipe.shift();
          S.slots[i] = { k, claimed: null, drop: 0 };
          S.dropping.push(S.slots[i]);
          sfx('drop', 0.5);
          break;
        }
      }
    }
    for (let i = S.dropping.length - 1; i >= 0; i--) {
      const b = S.dropping[i];
      b.drop += dt / 0.16;
      if (b.drop >= 1) { b.drop = 1; S.dropping.splice(i, 1); }
    }
  }

  // ---------- nests & ants ----------
  function nestPos(ci, ri) { return [COL_X[ci], ROW_Y[0] + ROW_GAP * ri]; }

  function stepNests(dt) {
    for (let ci = 0; ci < COLS; ci++) {
      const col = S.cols[ci];
      col.forEach((nest, ri) => {
        const [tx, ty] = nestPos(ci, ri);
        if (nest.dy === null) nest.dy = ty;
        if (nest.dx == null) nest.dx = tx;
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
        const [nx] = nestPos(ci, 0);
        const ny = front.dy;
        let best = -1, bd = 1e9;
        for (let i = 0; i < SLOTS; i++) {
          const b = S.slots[i];
          if (!b || b.claimed || b.k !== front.color || b.drop < 1) continue;
          const [bx, by] = slotPos(i);
          const d = Math.hypot(bx - nx, by - ny);
          if (d < bd) { bd = d; best = i; }
        }
        if (best >= 0) {
          const b = S.slots[best];
          const ant = { x: nx, y: ny - TILE / 2, slot: best, block: b, nest: front, col: ci, carry: null, ang: -Math.PI / 2, t: Math.random() * 6 };
          b.claimed = ant;
          front.inflight++;
          front.cool = 0.12;
          S.ants.push(ant);
        }
      }
    }
  }

  function stepAnts(dt) {
    for (let i = S.ants.length - 1; i >= 0; i--) {
      const a = S.ants[i];
      a.t += dt;
      let tx, ty;
      if (!a.carry) {
        [tx, ty] = slotPos(a.slot);
      } else {
        tx = COL_X[a.col]; ty = a.nest.dy - TILE / 2;
      }
      const dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
      const step = ANT_SPEED * dt;
      if (d > 1) { const want = Math.atan2(dy, dx); let da = want - a.ang; da = Math.atan2(Math.sin(da), Math.cos(da)); a.ang += da * Math.min(1, dt * 18); }
      if (d <= step + 6) {
        a.x = tx; a.y = ty;
        if (!a.carry) {
          a.carry = a.block.k;
          S.slots[a.slot] = null;
          sfx('pick', 0.45);
        } else {
          const nest = a.nest;
          nest.got++; nest.inflight--; nest.bump = 1;
          S.ants.splice(i, 1);
          if (nest.got >= nest.need) {
            nest.pop = 0.001;
            sfx('nest', 0.8);
            burst(COL_X[a.col], nest.dy, S.colors[nest.color]);
          } else sfx('add', 0.35);
        }
      } else {
        a.x += dx / d * step; a.y += dy / d * step;
      }
    }
  }

  function burst(x, y, color) {
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2, v = 250 + Math.random() * 400;
      S.fx.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 300, life: 0.7, t: 0, color, s: 10 + Math.random() * 10 });
    }
  }

  function checkEnd(dt) {
    if (S.state !== 'play') return;
    const left = S.cols.reduce((n, c) => n + c.length, 0);
    if (left === 0) {
      S.state = 'win'; S.endT = 0; sfx('win', 0.9);
      for (let i = 0; i < 4; i++) burst(240 + i * 200, 700, ['#ffd23f', '#ff6b81', '#4fc3f7', '#7cc957'][i]);
      return;
    }
    // Overflow: every slot on the conveyor is taken and another block is waiting at the pipe.
    // A short grace lets an ant that is just grabbing a block free its slot.
    const full = S.slots.every(Boolean);
    if (full && S.pipe.length) {
      S.stuckT = (S.stuckT || 0) + dt;
      if (S.stuckT > 0.35) { S.state = 'lose'; S.endT = 0; sfx('lose', 0.8); }
    } else S.stuckT = 0;
  }

  // ---------- update ----------
  function update(dt) {
    S.time += dt;
    if (S.deny) { S.deny.t -= dt; if (S.deny.t <= 0) S.deny = null; }
    stepDrain(dt);
    stepSand(dt);
    stepParticles(dt);
    stepFunnel(dt);
    stepBelt(dt);
    stepNests(dt);
    stepAnts(dt);
    for (let i = S.fx.length - 1; i >= 0; i--) {
      const f = S.fx[i]; f.t += dt; f.vy += 1400 * dt; f.x += f.vx * dt; f.y += f.vy * dt;
      if (f.t > f.life) S.fx.splice(i, 1);
    }
    checkEnd(dt);
    if (S.state !== 'play') S.endT += dt;
  }

  // ---------- draw ----------
  function roundRect(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  function stadium(g, r) {
    g.beginPath();
    g.arc(BELT.cxL, BELT.cy, r, Math.PI / 2, Math.PI * 1.5);
    g.arc(BELT.cxR, BELT.cy, r, -Math.PI / 2, Math.PI / 2);
    g.closePath();
  }
  function text(str, x, y, size, fill = '#fff', stroke = '#3a3550', lw = 8, align = 'center') {
    ctx.font = `${size}px "Lilita One", "Arial Rounded MT Bold", sans-serif`;
    ctx.textAlign = align; ctx.textBaseline = 'middle';
    if (stroke) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.strokeText(str, x, y); }
    ctx.fillStyle = fill; ctx.fillText(str, x, y);
  }
  function drawBlock(k, x, y, size, alpha = 1) {
    const im = tinted('block', S.colors[k], 0.1);
    ctx.globalAlpha = alpha;
    ctx.drawImage(im, x - size / 2, y - size / 2, size, size);
    ctx.globalAlpha = 1;
  }

  // Sand leaves the board through a short chute that narrows into the pipe.
  function funnelPath(g) {
    g.beginPath();
    g.moveTo(FRAME.x, FRAME.y);
    g.lineTo(MOUTH.x - MOUTH.half, MOUTH.y);
    g.lineTo(MOUTH.x + MOUTH.half, MOUTH.y);
    g.lineTo(FRAME.x + FRAME.w, FRAME.y);
    g.closePath();
  }

  // Nest tile: a chunky rounded cube with a darker extruded side, like the board pieces.
  function drawTile(x, y, size, color, label, alpha = 1, sc = 1) {
    const w = size * sc, h = size * sc, depth = 22 * sc, r = 26 * sc;
    const left = x - w / 2, top = y - h / 2 - depth / 2;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(80,50,20,0.18)';
    roundRect(ctx, left + 4, top + depth + 10, w, h, r); ctx.fill();
    ctx.fillStyle = '#f2ece6';
    roundRect(ctx, left - 6, top + depth - 4, w + 12, h + 12, r + 4); ctx.fill();
    ctx.fillStyle = shade(color, -0.32);
    roundRect(ctx, left, top + depth, w, h, r); ctx.fill();
    const grad = ctx.createLinearGradient(0, top, 0, top + h);
    grad.addColorStop(0, shade(color, 0.22));
    grad.addColorStop(1, shade(color, -0.04));
    ctx.fillStyle = grad;
    roundRect(ctx, left, top, w, h, r); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    roundRect(ctx, left + 12 * sc, top + 8 * sc, w - 24 * sc, 16 * sc, 8 * sc); ctx.fill();
    if (label != null) text(String(label), x, top + h * 0.5, 62 * sc, '#ffffff', '#2e2433', 11 * sc);
    ctx.globalAlpha = 1;
  }

  // Top-down ant drawn from simple shapes, tinted to its colony's colour.
  function drawAnt(a) {
    const body = S.colors[a.nest.color], dark = shade(body, -0.45);
    const walk = Math.sin(a.t * 26);
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.ang + Math.PI / 2);
    ctx.scale(1.45, 1.45);
    ctx.fillStyle = 'rgba(60,40,20,0.22)';
    ctx.beginPath(); ctx.ellipse(4, 6, 20, 30, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 4; ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) {
      const sw = walk * (i === 0 ? -1 : 1) * 6;
      for (const s of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(0, i * 9);
        ctx.lineTo(s * 16, i * 9 - 4 + sw * s);
        ctx.lineTo(s * 24, i * 13 + 2 + sw * s); ctx.stroke();
      }
    }
    ctx.beginPath(); ctx.moveTo(-4, -22); ctx.quadraticCurveTo(-10, -34, -14, -36);
    ctx.moveTo(4, -22); ctx.quadraticCurveTo(10, -34, 14, -36); ctx.lineWidth = 3; ctx.stroke();
    const part = (cy, rx, ry) => {
      const g = ctx.createRadialGradient(-rx * 0.3, cy - ry * 0.4, 1, 0, cy, Math.max(rx, ry));
      g.addColorStop(0, shade(body, 0.35)); g.addColorStop(1, shade(body, -0.25));
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
    };
    part(14, 11, 15); part(-2, 7, 8); part(-16, 9, 8);
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-4, -19, 2.6, 0, Math.PI * 2); ctx.arc(4, -19, 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    if (a.carry) {
      const fx = a.x + Math.cos(a.ang) * 40, fy = a.y + Math.sin(a.ang) * 40;
      drawBlock(a.carry, fx, fy - 6, 52);
    }
  }

  function drawBooster(b) {
    const s = 150 * (1 + b.bump * 0.12);
    ctx.drawImage(IMG.circle_cream, b.x - s / 2, b.y - s / 2, s, s * 1.06);
    const im = IMG[b.img], k = (s * 0.66) / Math.max(im.width, im.height);
    ctx.drawImage(im, b.x - im.width * k / 2, b.y - im.height * k / 2 - 2, im.width * k, im.height * k);
    ctx.fillStyle = '#5cbf2a'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(b.x + s * 0.36, b.y + s * 0.36, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    text('1', b.x + s * 0.36, b.y + s * 0.37, 34, '#fff', '#2e6b12', 6);
  }

  function drawTray() {
    ctx.save();
    roundRect(ctx, 6, TRAY_Y, W - 12, H - TRAY_Y + 60, 56);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    roundRect(ctx, 20, TRAY_Y + 14, W - 40, H - TRAY_Y + 60, 46);
    ctx.fillStyle = '#4f6fc4'; ctx.fill(); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    for (let y = TRAY_Y + 14, r = 0; y < H; y += 46, r++)
      for (let x = 20 + (r % 2) * 46; x < W; x += 92) ctx.fillRect(x, y, 46, 46);
    ctx.restore();
    for (const b of BOOSTERS) drawBooster(b);
  }

  function drawHud() {
    const p = PAUSE_BTN, sp = SPEED_BTN;
    ctx.drawImage(IMG.btn_blue_sq, p.x, p.y, p.w, p.h);
    ctx.drawImage(IMG.pause, p.x + p.w / 2 - 22, p.y + p.h / 2 - 28, 44, 48);
    text('Level ' + (levelIndex + 1), 540, 98, 78, '#7a4a24', 'rgba(255,240,220,0.6)', 6);
    ctx.globalAlpha = speedUp ? 1 : 0.9;
    ctx.drawImage(speedUp ? IMG.btn_green : tinted('btn_green', '#9bbf6a', 0.3), sp.x, sp.y, sp.w, sp.h);
    ctx.globalAlpha = 1;
    // fast-forward glyph
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#2e6b12'; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    const gx = sp.x + 30, gy = sp.y + sp.h * 0.44;
    for (const o of [0, 26]) {
      ctx.beginPath(); ctx.moveTo(gx + o, gy - 18); ctx.lineTo(gx + o + 26, gy); ctx.lineTo(gx + o, gy + 18); ctx.closePath();
      ctx.stroke(); ctx.fill();
    }
    text('x2', sp.x + sp.w - 50, gy + 2, 50, '#ffffff', '#2e6b12', 8);
  }

  function draw() {
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    if (IMG.bg) ctx.drawImage(IMG.bg, 0, 0, W, H); else { ctx.fillStyle = '#f6c48e'; ctx.fillRect(0, 0, W, H); }

    // chute under the board (drawn first so the board overlaps it)
    ctx.save();
    funnelPath(ctx);
    ctx.fillStyle = '#f1dcc0'; ctx.fill();
    ctx.lineJoin = 'round'; ctx.strokeStyle = '#e2bf92'; ctx.lineWidth = 12; ctx.stroke();
    ctx.restore();

    // board + picture
    ctx.drawImage(IMG.board, BOARD.x, BOARD.y, BOARD.w, BOARD.h);
    if (S.picDirty) redrawPicture();
    ctx.save();
    roundRect(ctx, INNER.x, INNER.y, INNER.w, INNER.h, 14); ctx.clip();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(S.picCanvas, S.ox, S.oy, S.G * S.gs, S.G * S.gs);
    ctx.imageSmoothingEnabled = true;
    if (S.deny) {
      ctx.fillStyle = `rgba(255,60,60,${0.5 * S.deny.t / 0.3})`;
      const ox = Math.sin(S.deny.t * 60) * 4;
      for (const p of S.deny.cells) ctx.fillRect(S.ox + (p % S.G) * S.gs + ox, S.oy + ((p / S.G) | 0) * S.gs, S.gs + 1, S.gs + 1);
    }
    ctx.restore();

    // sand resting in the funnel, waiting to go down the hole
    for (let q = 0; q < S.fk.length; q++) {
      if (!S.fk[q]) continue;
      const i = q % FUNNEL.cols, j = (q / FUNNEL.cols) | 0;
      ctx.fillStyle = S.fc[q];
      ctx.fillRect(FUNNEL.x0 + i * FUNNEL.cell, FUNNEL.top + j * FUNNEL.cell, FUNNEL.cell + 0.5, FUNNEL.cell + 0.5);
    }

    // particles
    for (const p of S.particles) {
      const [x, y] = particlePos(p);
      ctx.fillStyle = p.c;
      ctx.fillRect(x - 3, y - 3, 6, 6);
    }

    // pipe nozzle
    ctx.fillStyle = '#e2bf92'; roundRect(ctx, MOUTH.x - 56, MOUTH.y - 10, 112, 40, 14); ctx.fill();
    ctx.fillStyle = '#f7ead8'; roundRect(ctx, MOUTH.x - 50, MOUTH.y - 10, 100, 32, 12); ctx.fill();
    ctx.fillStyle = '#6b4a2e'; roundRect(ctx, MOUTH.x - 34, MOUTH.y - 2, 68, 18, 9); ctx.fill();

    // belt: cream rim, tan track, moving chevrons
    stadium(ctx, BELT.r + BELT.band / 2 + 12); ctx.fillStyle = '#e2bf92'; ctx.fill();
    stadium(ctx, BELT.r + BELT.band / 2 + 4); ctx.fillStyle = '#f7ead8'; ctx.fill();
    stadium(ctx, BELT.r + BELT.band / 2 - 4); ctx.fillStyle = '#d9b48a'; ctx.fill();
    ctx.save();
    stadium(ctx, BELT.r + BELT.band / 2 - 4); ctx.clip();
    ctx.strokeStyle = 'rgba(255,245,230,0.45)'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    const chevGap = 44;
    for (let s = (S.beltOff % chevGap); s < BELT_LEN; s += chevGap) {
      const [x, y] = beltPoint(s), [x2, y2] = beltPoint((s + 1) % BELT_LEN);
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(y2 - y, x2 - x));
      ctx.beginPath(); ctx.moveTo(-7, -12); ctx.lineTo(5, 0); ctx.lineTo(-7, 12); ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
    stadium(ctx, BELT.r - BELT.band / 2 + 4); ctx.fillStyle = '#f7ead8'; ctx.fill();
    stadium(ctx, BELT.r - BELT.band / 2 - 4); ctx.fillStyle = '#efdcc2'; ctx.fill();
    // how full the conveyor is; it turns yellow then red as it nears overflow
    const used = S.slots.filter(Boolean).length;
    const pct = Math.round(100 * used / SLOTS);
    const bx = BELT.cxL - 6, bw = BELT.cxR - BELT.cxL + 12, by = BELT.cy - 16;
    ctx.fillStyle = '#ffffff'; roundRect(ctx, bx, by, bw, 32, 16); ctx.fill();
    if (pct > 0) {
      ctx.fillStyle = pct >= 85 ? '#ef4b4b' : pct >= 60 ? '#f5b82e' : '#6cc53b';
      roundRect(ctx, bx + 4, by + 4, Math.max(24, (bw - 8) * pct / 100), 24, 12); ctx.fill();
    }
    text(pct + '%', 540, BELT.cy + 1, 30, '#5a3a20', null);

    const is3D = use3D();
    const items = [];
    for (let i = 0; i < SLOTS; i++) {
      const b = S.slots[i]; if (!b) continue;
      let [x, y] = slotPos(i);
      if (b.drop < 1) { const t = b.drop; x = MOUTH.x + (x - MOUTH.x) * t; y = MOUTH.y + 10 + (y - MOUTH.y - 10) * t; }
      ctx.drawImage(IMG.shadow, x - 30, y + 16, 60, 20);
      if (is3D) items.push({ ref: b, kind: 'cube', x, y: y + 18, color: S.colors[b.k], size: BLOCK });
      else drawBlock(b.k, x, y, BLOCK);
    }
    if (S.pipe.length) {
      if (is3D) items.push({ ref: S.pipe, kind: 'cube', x: MOUTH.x, y: MOUTH.y + 20, color: S.colors[S.pipe[0]], size: 38 });
      else drawBlock(S.pipe[0], MOUTH.x, MOUTH.y + 6, 38, 0.9);
    }

    // nest tiles: back rows first, lighter like the queue behind the front row
    const labels = [];
    for (let ri = 5; ri >= 0; ri--) {
      for (let ci = 0; ci < COLS; ci++) {
        const nest = S.cols[ci][ri]; if (!nest) continue;
        const y = nest.dy;
        if (y - TILE / 2 > H) continue;
        let sc = 1 + nest.bump * 0.07, alpha = 1;
        if (nest.pop > 0) { sc = 1 + nest.pop * 0.3; alpha = 1 - nest.pop; }
        // front row (the nests ants work for) is full height with a white outline; nests
        // queued behind are lower and paler
        const front = ri === 0;
        const col = front ? S.colors[nest.color] : shade(S.colors[nest.color], 0.42);
        if (is3D) {
          const squash = front ? window.R3.TILE_SQUASH : window.R3.TILE_SQUASH * 0.55;
          const w = TILE * 0.92 * sc, face = window.R3.tileFace(TILE) * sc, lift = window.R3.tileTopLift(TILE, squash) * sc;
          ctx.fillStyle = `rgba(90,55,25,${(front ? 0.2 : 0.1) * alpha})`;
          roundRect(ctx, nest.dx - w / 2 + 4, y - face / 2 + 10, w, face + lift, 26); ctx.fill();
          items.push({ ref: nest, kind: 'tile', x: nest.dx, y, color: col, size: TILE, alpha, scale: sc, squash, outline: front });
          labels.push({ x: nest.dx, y, n: nest.need - nest.got, sc, alpha, front, color: S.colors[nest.color] });
        } else {
          drawTile(nest.dx, y, TILE, col, nest.need - nest.got, alpha, sc);
        }
      }
    }

    for (const a of S.ants) {
      if (!is3D) { drawAnt(a); continue; }
      ctx.drawImage(IMG.shadow, a.x - 22, a.y - 4, 44, 14);
      items.push({ ref: a, kind: 'ant', x: a.x, y: a.y + 10, ang: a.ang, color: S.colors[a.nest.color], carry: a.carry && S.colors[a.carry] });
    }

    for (const f of S.fx) {
      ctx.globalAlpha = Math.max(0, 1 - f.t / f.life);
      ctx.fillStyle = f.color; ctx.fillRect(f.x - f.s / 2, f.y - f.s / 2, f.s, f.s);
    }
    ctx.globalAlpha = 1;

    if (is3D) window.R3.render(items, S.time);

    // UI layer
    ctx = uctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    for (const l of labels) {
      ctx.globalAlpha = l.alpha * (l.front ? 1 : 0.85);
      if (l.front) text(String(l.n), l.x, l.y + 2, 50 * l.sc, '#ffffff', '#2e2433', 9 * l.sc);
      else text(String(l.n), l.x, l.y + 2, 46 * l.sc, '#ffffff', shade(l.color, 0.1), 7 * l.sc);
    }
    ctx.globalAlpha = 1;

    drawTray();
    drawHud();

    if (S.state !== 'play') drawEnd();
    else if (paused) drawPause();
    if (!started) drawStart();
    ctx = bctx;
  }

  const BTN = { x: 360, y: 1130, w: 360, h: 150 };
  function drawPanel(title, color) {
    ctx.fillStyle = 'rgba(40,25,15,0.5)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2bf92'; roundRect(ctx, 160, 610, 760, 700, 64); ctx.fill();
    ctx.fillStyle = '#fbf1e4'; roundRect(ctx, 176, 622, 728, 670, 54); ctx.fill();
    text(title, 540, 700, 72, color, '#5a3a20', 10);
  }
  function drawEnd() {
    if (S.state === 'win' && S.endT < 0.9) return;
    ctx.save();
    const sc = 0.8 + 0.2 * Math.min(1, S.endT * 4);
    ctx.translate(540, 900); ctx.scale(sc, sc); ctx.translate(-540, -900);
    if (S.state === 'win') {
      const last = levelIndex >= LEVEL_COUNT - 1;
      drawPanel(last ? 'All Done!' : 'Level Complete!', '#ffd23f');
      if (IMG.mascot) ctx.drawImage(IMG.mascot, 540 - 150, 770, 300, 292);
      drawButton(BTN, last ? 'Replay' : 'Next', '#7cc957');
    } else {
      drawPanel('Conveyor full!', '#ff6b81');
      text('Too much sand on the belt', 540, 790, 36, '#7a4a24', null);
      if (IMG.mascot) ctx.drawImage(IMG.mascot, 540 - 120, 840, 240, 233);
      drawButton(BTN, 'Retry', '#ff9f43');
    }
    ctx.restore();
  }
  // Settings (opened by the pause button): resume, restart, and a cheat to jump to any level.
  const SET_RESUME = { x: 360, y: 600, w: 360, h: 130 };
  const SET_RESTART = { x: 360, y: 750, w: 360, h: 130 };
  const LEVEL_BTN = { w: 112, h: 100, gap: 20, perRow: 5, y: 1010 };
  function levelButton(i) {
    const row = Math.floor(i / LEVEL_BTN.perRow), col = i % LEVEL_BTN.perRow;
    const rowW = LEVEL_BTN.perRow * LEVEL_BTN.w + (LEVEL_BTN.perRow - 1) * LEVEL_BTN.gap;
    return { x: 540 - rowW / 2 + col * (LEVEL_BTN.w + LEVEL_BTN.gap), y: LEVEL_BTN.y + row * (LEVEL_BTN.h + LEVEL_BTN.gap), w: LEVEL_BTN.w, h: LEVEL_BTN.h };
  }
  function drawPause() {
    const rows = Math.ceil(LEVEL_COUNT / LEVEL_BTN.perRow);
    const bottom = LEVEL_BTN.y + rows * (LEVEL_BTN.h + LEVEL_BTN.gap) + 40;
    ctx.fillStyle = 'rgba(40,25,15,0.5)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e2bf92'; roundRect(ctx, 150, 460, 780, bottom - 460, 64); ctx.fill();
    ctx.fillStyle = '#fbf1e4'; roundRect(ctx, 166, 472, 748, bottom - 484, 54); ctx.fill();
    text('Settings', 540, 545, 72, '#ffffff', '#5a3a20', 10);
    drawButton(SET_RESUME, 'Resume', '#7cc957');
    drawButton(SET_RESTART, 'Restart', '#ff9f43');
    text('Cheat: go to level', 540, 955, 40, '#7a4a24', null);
    for (let i = 0; i < LEVEL_COUNT; i++) {
      const b = levelButton(i), cur = i === levelIndex;
      ctx.fillStyle = cur ? '#3f8f2a' : '#3c56a8';
      roundRect(ctx, b.x, b.y + 8, b.w, b.h, 22); ctx.fill();
      ctx.fillStyle = cur ? '#6cc53b' : '#5b7be0';
      roundRect(ctx, b.x, b.y, b.w, b.h - 6, 22); ctx.fill();
      text(String(i + 1), b.x + b.w / 2, b.y + b.h / 2 - 3, 50, '#ffffff', '#2e2433', 8);
    }
  }
  function drawButton(b, label, color) {
    const im = color === '#7cc957' ? IMG.btn_green : tinted('btn_green', color, 0.4);
    ctx.drawImage(im, b.x, b.y, b.w, b.h);
    text(label, b.x + b.w / 2, b.y + b.h * 0.45, 60);
  }
  function drawStart() {
    ctx.fillStyle = 'rgba(40,25,15,0.45)'; ctx.fillRect(0, 0, W, H);
    text('Tap to play', 540, 960, 80);
    text('Swipe the sand to set it free', 540, 1050, 38, '#fffbe8', '#5a3a20', 6);
  }

  // ---------- input ----------
  let scale = 1, offX = 0, offY = 0, started = false, paused = false, speedUp = false;
  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.min(vw / W, vh / H);
    const cw = Math.floor(W * s), ch = Math.floor(H * s);
    wrap.style.width = cw + 'px'; wrap.style.height = ch + 'px';
    for (const c of [baseCanvas, canvas, document.getElementById('c3')]) { c.style.width = cw + 'px'; c.style.height = ch + 'px'; }
    for (const c of [baseCanvas, canvas]) { c.width = Math.floor(cw * dpr); c.height = Math.floor(ch * dpr); }
    if (window.R3) window.R3.resize(cw, ch, dpr);
    scale = s * dpr; offX = 0; offY = 0;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('r3ready', resize);
  function toLogical(e) {
    const r = canvas.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H];
  }
  let swiping = false;
  canvas.addEventListener('pointermove', e => {
    if (!swiping || !S || S.state !== 'play') return;
    const [x, y] = toLogical(e);
    swipeTo(x, y);
  });
  const endSwipe = () => { swiping = false; lastBrush = null; };
  window.addEventListener('pointerup', endSwipe);
  window.addEventListener('pointercancel', endSwipe);
  canvas.addEventListener('pointerdown', e => {
    const [x, y] = toLogical(e);
    initAudio();
    if (!started) { started = true; return; }
    const hit = (b, sc = 1) => {
      const bx = 540 + (b.x - 540) * sc, by = 900 + (b.y - 900) * sc;
      return x >= bx && x <= bx + b.w * sc && y >= by && y <= by + b.h * sc;
    };
    if (S.state !== 'play') {
      if (S.state === 'win' && S.endT < 0.9) return;
      if (hit(BTN, 0.8 + 0.2 * Math.min(1, S.endT * 4))) {
        sfx('click');
        if (S.state === 'win') startLevel((levelIndex + 1) % LEVEL_COUNT); else startLevel(levelIndex);
      }
      return;
    }
    if (paused) {
      if (hit(SET_RESUME)) { sfx('click'); paused = false; }
      else if (hit(SET_RESTART)) { sfx('click'); paused = false; startLevel(levelIndex); }
      else {
        for (let i = 0; i < LEVEL_COUNT; i++) {
          if (hit(levelButton(i))) { sfx('click'); paused = false; startLevel(i); break; }
        }
      }
      return;
    }
    const inRect = b => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    if (inRect(PAUSE_BTN)) { sfx('click'); paused = true; return; }
    if (inRect(SPEED_BTN)) { sfx('click'); speedUp = !speedUp; return; }
    for (const b of BOOSTERS) if (Math.hypot(x - b.x, y - b.y) < 80) { sfx('click'); b.bump = 1; return; }
    swiping = true; lastBrush = null;
    canvas.setPointerCapture?.(e.pointerId);
    swipeTo(x, y);
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'n') startLevel((levelIndex + 1) % LEVEL_COUNT);
    if (e.key === 'p') startLevel((levelIndex + LEVEL_COUNT - 1) % LEVEL_COUNT);
    if (e.key === 'r') startLevel(levelIndex);
  });

  // ---------- loop ----------
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (started && !paused) update(speedUp ? dt * 2 : dt);
    for (const b of BOOSTERS) b.bump = Math.max(0, b.bump - dt * 5);
    draw();
    requestAnimationFrame(frame);
  }
  // test hook for automated checks
  window.__cf = { get state() { return S; }, swipeCells(pts) { lastBrush = null; for (const [x, y] of pts) swipeTo(PIC.x + (x + 0.5) * S.cell, PIC.y + (y + 0.5) * S.cell); lastBrush = null; }, start(i) { started = true; startLevel(i); },
    sim(sec) { for (let t = 0; t < sec; t += 1 / 60) update(1 / 60); draw(); } };

  resize();
  loadImages().then(() => { startLevel(levelIndex); requestAnimationFrame(frame); });
})();
