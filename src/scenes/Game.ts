import * as Phaser from 'phaser';
import {
    BELT, BLOCK, BOOSTER_IMAGES, BOOSTER_POS, BOOSTER_SIZE, GATE, FRAME_ART, H, INNER, MOUTH, NEST_BOXES, PAUSE_BTN, PIC,
    SLOTS, SPEED_BTN, TILE, W,
} from '../game/layout';
import { CUSTOM_KEY, PREVIEW_KEY, gameLevels, levelCount, loadCustomLevels, useLevels } from '../game/levels';
import { type Recording, botStep, playBot, replayStep } from '../game/bot';
import { FAN_FLIGHT, FAN_SHOT_GAP, Flyer, Sfx, Sim, levelOverride } from '../game/sim';
import { Item3D, ThreeLayer } from '../game/three-layer';
import { greyed } from '../game/util';

const FONT = '"Lilita One", "Arial Rounded MT Bold", sans-serif';
/** Music, sound effects and vibration switches (Pause panel), kept in the browser. */
const PREFS_KEY = 'cf_prefs';
type Prefs = { music: boolean; sound: boolean; vibe: boolean };
// short buzzes for the moments that matter (Pause panel: vibration)
const VIBES: Partial<Record<Sfx, number | number[]>> = { nest: 25, win: [60, 40, 60], lose: 200 };
/** Uses of each booster (Activate, Shuffle, Fan) at the start of every level. */
const BOOSTER_USES = [1, 1, 1];
/** The level (1-based) from which each booster can be used; before it the booster shows locked. */
const BOOSTER_UNLOCK = [3, 6, 9];
/** Nests waiting behind the front row sit under a light, half-clear overlay: its opacity on the
 * tile, its brightness, and the darker grey it gives the number's white fill and black stroke. */
const WAIT = { a: 0.45, light: 0xe0, text: 0xb0 };

// Depths, back to front.
const D = { bg: 0, chute: 1, funnel: 2, board: 3, sand: 4, belt: 5, shadows: 6, three: 7, labels: 8, fx: 9, tray: 10, hud: 11, overlay: 20 };

type Overlay = 'start' | 'settings' | 'end' | null;

/** Fan booster animation: the ball cannon drops into the middle, sucks the belt's blocks into its
 * mouth one by one, then shoots them out one by one into their nests. The game holds still until
 * the last block is in its nest. Times in s: the drop, each block's trip into the mouth, the gap
 * between shots. */
const FAN = { x: 540, y: 900, size: 300, drop: 0.45, suck: 0.5, shot: 0.06 };
/** The cannon's mouth: the centre of the barrel's dark opening, (66, 285) in bst_cannon's 373 x 381
 * picture. The cannon is placed and scaled about this point, so it stays put when the cannon kicks. */
const FAN_MOUTH_PX = { x: 66, y: 285 };
const FAN_MOUTH = { x: FAN.x + ((FAN_MOUTH_PX.x - 373 / 2) / 381) * FAN.size, y: FAN.y + ((FAN_MOUTH_PX.y - 381 / 2) / 381) * FAN.size };
/** A streak of air being sucked into the cannon. */
type Gust = { x: number; y: number; t: number; life: number; len: number; sx: number; sy: number };

// Draws the game with Phaser objects and turns pointer input into swipes and button presses.
// The rules live in Sim; the 3D nests, ants and blocks come from ThreeLayer as a texture.
export class Game extends Phaser.Scene {
    private three!: ThreeLayer;
    private sim!: Sim;
    private levelIndex = 0;
    /** Storage key for the last level reached ('' = don't remember). */
    private levelKey = 'cf_level';
    private started = false;
    private paused = false;
    private speedUp = false;
    /** x2 forced on because the picture frame is empty (its button is hidden until the next level). */
    private autoFast = false;
    /** The x2 setting before autoFast turned it on, given back on the next level. */
    private speedBefore = false;
    /** Auto Play (level editor): the test bot plays in front of you; botT counts to its next move. */
    private autoplay = false;
    private botT = 0;
    /** Recorded winning strokes to replay instead of the bot (level editor), and the next one. */
    private moves: Recording['moves'] | null = null;
    private moveAt = 0;
    /** Replays run in fixed 1/60 s frames, like the recording, so they play out exactly the same. */
    private replayAcc = 0;
    private replayFrame = 0;
    private swiping = false;
    private music?: Phaser.Sound.BaseSound;
    private lastSfx: Record<string, number> = {};
    private prefs: Prefs = (() => {
        try { return { music: true, sound: true, vibe: true, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }; } catch { return { music: true, sound: true, vibe: true }; }
    })();

    private sandTex!: Phaser.Textures.CanvasTexture;
    private sandCanvas!: HTMLCanvasElement;
    private sandImg!: ImageData;
    private sandImage!: Phaser.GameObjects.Image;
    private threeTex!: Phaser.Textures.CanvasTexture;
    private threeCtx!: CanvasRenderingContext2D;
    /** The belt's holders, one under each slot (they move with the belt). */
    private holds: Phaser.GameObjects.Image[] = [];
    private shadowGfx!: Phaser.GameObjects.Graphics;
    private fxGfx!: Phaser.GameObjects.Graphics;
    private fullText!: Phaser.GameObjects.Text;
    /** The fullness bar's fill: above the white bar track (drawBeltBase), below the % text. */
    private fullBar!: Phaser.GameObjects.NineSlice;
    /** Nest boxes and the white frame round the active ones, reused frame to frame (like the labels). */
    private nestBoxes: Phaser.GameObjects.Image[] = [];
    private nestFrames: Phaser.GameObjects.Image[] = [];
    private levelText!: Phaser.GameObjects.Text;
    private speedBtn!: Phaser.GameObjects.Image;
    /** The x2 button's image, icon and label, hidden together. */
    private speedParts: Phaser.GameObjects.Components.Visible[] = [];
    private boosters: {
        img: Phaser.GameObjects.Image; base: Phaser.GameObjects.Image; frame: Phaser.GameObjects.Image;
        badge: Phaser.GameObjects.Container; plus: Phaser.GameObjects.Image; count: Phaser.GameObjects.Text; bump: number; uses: number;
        /** Locked look: a grey button with a padlock instead of the picture and badge. */
        lockBase: Phaser.GameObjects.Image; lock: Phaser.GameObjects.Image; lockText: Phaser.GameObjects.Text; locked: boolean;
    }[] = [];
    /** "Unlocks at Level N", shown for a moment when a locked booster is tapped. */
    private lockHint!: Phaser.GameObjects.Text;
    /** Activate booster: waiting for the player to tap a nest (the game holds still meanwhile). */
    private picking = false;
    private pickHint!: Phaser.GameObjects.Text;
    /** The Fan booster's animation while it plays (the game holds still until the blocks are blown). */
    private fanFx: {
        t: number; blown: boolean; leaving: boolean;
        icon: Phaser.GameObjects.Image; dims: Phaser.GameObjects.Rectangle[]; wind: Phaser.GameObjects.Graphics;
        gusts: Gust[]; gustAcc: number;
        /** When each belt slot's block starts its trip into the mouth (s after the drop), and the gap. */
        order: Map<number, number>; gap: number;
        /** Each shot block's turn to leave the mouth, and those already fired (for the recoil). */
        shots: Map<Flyer, number>; fired: Set<Flyer>;
        /** A revive after a loss: it does not use up the Fan booster. */
        free: boolean;
    } | null = null;
    private labels: Phaser.GameObjects.Text[] = [];
    private overlay: Overlay = null;
    private overlayBox?: Phaser.GameObjects.Container;

    constructor() {
        super('Game');
    }

    init(data: { three: ThreeLayer }) {
        this.three = data.three;
    }

    create() {
        // ?custom=1 plays the level editor's list, ?custom=preview the one level it is testing
        const q = new URLSearchParams(location.search), custom = q.get('custom');
        if (custom) {
            useLevels(loadCustomLevels(custom === 'preview' ? PREVIEW_KEY : CUSTOM_KEY));
            this.levelKey = custom === 'preview' ? '' : 'cf_level_custom';
        } else useLevels(gameLevels());
        let level = 0;
        try { if (this.levelKey) level = Math.min(levelCount() - 1, parseInt(localStorage.getItem(this.levelKey) || '0', 10) || 0); } catch { /* storage blocked */ }
        const qp = q.get('level');
        if (qp) level = Math.max(0, Math.min(levelCount() - 1, parseInt(qp, 10) - 1));

        this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(W, H).setDepth(D.bg);
        this.drawBoard();
        this.sandImage = this.add.image(0, 0, '__WHITE').setOrigin(0).setDepth(D.sand);
        this.drawBeltBase();
        // the gate where the funnel's spout meets the belt, over the belt's rim
        this.add.image(GATE.x, GATE.y, 'box_gate').setScale(GATE.w / 320).setDepth(D.belt + 0.3);
        for (let i = 0; i < SLOTS; i++) this.holds.push(this.add.image(0, 0, 'conveyor_hold').setDisplaySize(30, 30).setAlpha(0.5).setDepth(D.belt));
        this.fullText = this.text(540, BELT.cy + 1, '0%', 24, '#14203a', null).setDepth(D.belt + 0.5);
        this.shadowGfx = this.add.graphics().setDepth(D.shadows);
        // Phaser canvas textures need a 2D canvas, so each frame the WebGL output of the 3D
        // layer is copied into one
        const copy = document.createElement('canvas');
        copy.width = this.three.canvas.width; copy.height = this.three.canvas.height;
        this.threeCtx = copy.getContext('2d')!;
        this.threeTex = this.textures.addCanvas('three', copy)!;
        this.add.image(0, 0, 'three').setOrigin(0).setDisplaySize(W, H).setDepth(D.three);
        this.fxGfx = this.add.graphics().setDepth(D.fx);
        this.buildTray();
        this.buildHud();

        this.input.on('pointerdown', (p: Phaser.Input.Pointer, over: Phaser.GameObjects.GameObject[]) => this.onDown(p, over));
        this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
            if (this.swiping && this.sim.state === 'play' && !this.overlay) this.sim.swipeTo(p.x, p.y);
        });
        const end = () => { this.swiping = false; this.sim?.endSwipe(); };
        this.input.on('pointerup', end);
        this.input.on('pointerupoutside', end);
        this.input.keyboard?.on('keydown-N', () => this.startLevel((this.levelIndex + 1) % levelCount()));
        this.input.keyboard?.on('keydown-P', () => this.startLevel((this.levelIndex + levelCount() - 1) % levelCount()));
        this.input.keyboard?.on('keydown-R', () => this.startLevel(this.levelIndex));

        this.startLevel(level);
        this.showStart();
        this.exposeTestHook();
    }

    // ---------- level ----------
    private startLevel(i: number) {
        // the level editor may have saved changes to the built-in levels since
        if (!new URLSearchParams(location.search).get('custom')) useLevels(gameLevels());
        this.levelIndex = i;
        try { if (this.levelKey) localStorage.setItem(this.levelKey, String(i)); } catch { /* storage blocked */ }
        this.three.clear();
        if (this.sim) this.sim.start(i);
        else this.sim = new Sim(i, (name, vol) => this.sfx(name, vol));
        this.levelText.setText('Level ' + (i + 1));
        // the sand is a canvas texture covering the board and the funnel under it, one pixel per
        // grain, drawn scaled up without smoothing
        const { G, GH } = this.sim;
        if (this.textures.exists('sand')) this.textures.remove('sand');
        this.sandCanvas = document.createElement('canvas');
        this.sandCanvas.width = G; this.sandCanvas.height = GH;
        this.sandImg = this.sandCanvas.getContext('2d')!.createImageData(G, GH);
        this.sandTex = this.textures.addCanvas('sand', this.sandCanvas)!;
        this.sandTex.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.sandImage.setTexture('sand').setPosition(this.sim.ox, this.sim.oy).setDisplaySize(G * this.sim.gs, GH * this.sim.gs);
        this.closeOverlay();
        this.setPicking(false);
        this.endFan();
        this.setAutoFast(false);
        this.boosters.forEach((_b, i) => { this.setLocked(i, this.levelIndex + 1 < BOOSTER_UNLOCK[i]); this.setUses(i, BOOSTER_USES[i]); });
    }

    update(_time: number, delta: number) {
        const dt = Math.min(0.05, delta / 1000);
        const live = this.started && !this.paused && !(this.overlay === 'settings');
        if (live && this.fanFx) this.stepFan(dt);
        if (live && this.fanFx?.blown && !this.fanFx.leaving) this.sim.stepFlyersOnly(this.speedUp ? dt * 2 : dt);
        if (live && !this.picking && !(this.fanFx && !this.fanFx.leaving)) {
            const step = this.speedUp ? dt * 2 : dt;
            if (this.autoplay && this.moves) {
                // strokes on the half second, then 30 frames of 1/60 s: the recorder's rhythm
                this.replayAcc += step;
                for (let k = 0; this.replayAcc >= 1 / 60 && k < 8; k++) {
                    this.replayAcc -= 1 / 60;
                    if (this.sim.state === 'play' && this.replayFrame % 30 === 0) this.moveAt = replayStep(this.sim, this.moves, this.moveAt, this.replayFrame / 60);
                    this.sim.update(1 / 60);
                    this.replayFrame++;
                }
            } else {
                if (this.autoplay && this.sim.state === 'play' && (this.botT -= step) <= 0) { this.botT = 0.5; botStep(this.sim); }
                this.sim.update(step);
            }
        }
        if (this.sim.left === 0 && this.sim.state === 'play') this.setAutoFast(true);
        if (this.sim.state !== 'play' && this.overlay !== 'end' && this.sim.endT >= (this.sim.state === 'win' ? 0.9 : 0)) this.showEnd();
        this.boosters.forEach((b, i) => {
            b.bump = Math.max(0, b.bump - dt * 5);
            const s = 1 + b.bump * 0.12 + (this.picking && i === 0 ? 0.06 + 0.04 * Math.sin(this.time.now / 120) : 0);
            for (const o of [b.base, b.img, b.frame, b.lockBase, b.lock, b.lockText]) o.setScale((o.getData('sx') ?? o.getData('s')) * s, (o.getData('sy') ?? o.getData('s')) * s);
        });
        this.render();
    }

    // ---------- drawing ----------
    private render() {
        const s = this.sim;
        if (s.picDirty) this.redrawSand();
        this.drawBelt();
        const items: Item3D[] = [];
        const g = this.shadowGfx;
        g.clear();
        g.fillStyle(0x24345e, 0.25);
        for (let i = 0; i < SLOTS; i++) {
            const b = s.slots[i];
            if (!b) continue;
            let [x, y] = s.slotPos(i);
            if (b.drop < 1) { const t = b.drop; x = MOUTH.x + (x - MOUTH.x) * t; y = MOUTH.y + 10 + (y - MOUTH.y - 10) * t; }
            // Fan: the block is sucked into the cannon, its shadow fading as it rises; swallowed
            // blocks are not drawn
            const up = this.fanLift(i, x, y);
            if (up.e >= 1) continue;
            // a soft contact shadow tucked under the cube, sized with it
            g.fillStyle(0x24345e, 0.25 * (1 - up.e));
            g.fillEllipse(x, y + BLOCK * 0.55, BLOCK * 1.05 * (1 - up.e * 0.5), BLOCK * 0.32 * (1 - up.e * 0.5));
            if (up.e > 0) items.push({ ref: b, kind: 'cube', x: up.x, y: up.y, color: s.colors[b.k], size: BLOCK, ang: up.ang, scale: up.scale, centered: true });
            else items.push({ ref: b, kind: 'cube', x, y: y + BLOCK * 0.36, color: s.colors[b.k], size: BLOCK });
        }
        if (s.pipe.length) items.push({ ref: s.pipe, kind: 'cube', x: MOUTH.x, y: MOUTH.y + 16, color: s.colors[s.pipe[0]], size: 25 });
        // Fan: blocks shot from the cannon's mouth arc into their nests, growing out of the mouth to
        // 1.5 times their size and turning as they fly, then shrinking back as they drop in; a block
        // still waiting its turn is inside the cannon
        for (const f of s.flyers) {
            const k = this.fanFx?.shots.get(f);
            let t = Math.min(1, f.t);
            if (k !== undefined) { const age = this.shotAge(f, k); if (age < 0) continue; t = Math.min(1, age / FAN_FLIGHT); }
            // (x, y) is the block's centre: it leaves from the middle of the mouth
            const e = t * (2 - t), ex = f.nest.dx ?? f.sx, ey = (f.nest.dy ?? f.sy) - TILE * 0.2;
            const x = f.sx + (ex - f.sx) * e, y = f.sy + (ey - f.sy) * e - Math.sin(Math.PI * t) * 140;
            const sc = 1.5 * Math.min(1, 0.25 + t * 3) * (1 - 0.3 * t * t);
            items.push({ ref: f, kind: 'cube', x, y, color: s.colors[f.k], size: BLOCK, scale: sc, ang: (1 - t) * 6, centered: true });
        }

        // nest boxes (img/nest_box_*.png) in the nest's colour, each row drawn over the row above
        // it: the nests ants work for (the front row, and nests woken by Activate) are full height
        // inside a white frame (img/nest_frame.png); the other nests queued behind are lower, under a light
        // overlay. The box art is 302 x 387, drawn TILE * 0.92 wide and placed by the centre of
        // its top face (151, 136), where the nest's point and number are; the frame's hole is
        // centred at (167.5, 202) of its 335 x 404, round the box body's centre (151, 184).
        let li = 0;
        const k = (TILE * 0.92) / 302;
        for (let ri = 5; ri >= 0; ri--) for (let ci = 0; ci < s.cols.length; ci++) {
            const nest = s.cols[ci][ri];
            if (!nest || nest.dy === null || nest.dx === null) continue;
            const y = nest.dy;
            if (y - TILE / 2 > H) continue;
            let sc = 1 + nest.bump * 0.07, alpha = 1;
            if (nest.pop > 0) { sc = 1 + nest.pop * 0.3; alpha = 1 - nest.pop; }
            // woken nests look like front nests; while picking, the nests that can be woken pulse
            const front = s.isActive(nest, ri);
            if (this.picking && this.canWake(ci, ri)) sc *= 1.04 + 0.04 * Math.sin(this.time.now / 110);
            const hex = s.colors[nest.color];
            const sx = k * sc, sy = sx * (front ? 1 : 0.8), depth = D.three - 0.3 + ri * 0.01;
            const box = (this.nestBoxes[li] ??= this.add.image(0, 0, 'nest_frame').setOrigin(151 / 302, 136 / 387));
            box.setTexture(this.nestTexture(front ? hex : '#' + greyed(hex, WAIT.a, WAIT.light).toString(16).padStart(6, '0')))
                .setPosition(nest.dx, y).setScale(sx, sy).setAlpha(alpha).setDepth(depth).setVisible(true);
            const frame = (this.nestFrames[li] ??= this.add.image(0, 0, 'nest_frame').setOrigin(167.5 / 335, 202 / 404));
            frame.setPosition(nest.dx, y + 48 * sy).setScale(sx, sy).setAlpha(alpha).setDepth(depth + 0.005).setVisible(front);
            const label = this.label(li++);
            label.setText(String(nest.need - nest.got)).setPosition(nest.dx, y + 2).setVisible(true);
            label.setFontSize(Math.round((front ? 50 : 46) * sc));
            // white number with a black stroke; on waiting nests the light overlay covers it too
            const css = (c: number) => '#' + c.toString(16).padStart(6, '0');
            if (front) label.setColor('#ffffff').setStroke('#000000', 9 * sc);
            else label.setColor(css(greyed('#ffffff', WAIT.a, WAIT.text))).setStroke(css(greyed('#000000', 0.6, WAIT.text)), 8 * sc);
            label.setAlpha(alpha);
        }
        for (let i = li; i < this.nestBoxes.length; i++) { this.nestBoxes[i].setVisible(false); this.nestFrames[i].setVisible(false); }
        for (; li < this.labels.length; li++) this.labels[li].setVisible(false);

        g.fillStyle(0x3c2814, 0.22);
        for (const a of s.ants) {
            g.fillEllipse(a.x, a.y + 3, 44, 14);
            items.push({ ref: a, kind: 'ant', x: a.x, y: a.y + 10, ang: a.ang, color: s.colors[a.nest.color], carry: a.carry ? parseInt(s.colors[a.carry].slice(1), 16) : null });
        }
        this.three.render(items, s.time);
        this.threeCtx.clearRect(0, 0, this.threeCtx.canvas.width, this.threeCtx.canvas.height);
        this.threeCtx.drawImage(this.three.canvas, 0, 0);
        this.threeTex.refresh();

        this.drawWind();
        this.fxGfx.clear();
        for (const f of s.fx) {
            this.fxGfx.fillStyle(f.color, Math.max(0, 1 - f.t / f.life));
            this.fxGfx.fillRect(f.x - f.s / 2, f.y - f.s / 2, f.s, f.s);
        }
    }

    private redrawSand() {
        const s = this.sim, px = new Uint32Array(this.sandImg.data.buffer), { key, rgb, loose } = s;
        const lift = (c: number, f: number) => {
            const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
            return ((255 << 24) | ((b + (255 - b) * f) << 16) | ((g + (255 - g) * f) << 8) | (r + (255 - r) * f)) >>> 0;
        };
        // freed sand is a little brighter than fixed sand
        for (let p = 0; p < key.length; p++) px[p] = !key[p] ? 0 : loose[p] ? lift(rgb[p], 0.22) : rgb[p];
        this.sandCanvas.getContext('2d')!.putImageData(this.sandImg, 0, 0);
        this.sandTex.refresh();
        s.picDirty = false;
    }

    /** The picture frame and its funnel (one piece of art), its light blue inside scaled onto
     * INNER (sand is drawn on top); the funnel's spout runs on under the belt. */
    private drawBoard() {
        const A = FRAME_ART, kx = INNER.w / A.w, ky = INNER.h / A.h;
        this.add.image(INNER.x - A.x * kx, INNER.y - A.y * ky, 'frame').setOrigin(0).setDisplaySize(A.imgW * kx, A.imgH * ky).setDepth(D.board);
    }

    /** The belt art (img/conveyor.png): its slate band (x 33 to 1810, y 40 to 400 of the art)
     * lies on the track, 2 x (BELT.r + BELT.band / 2) tall; only its middle is stretched, so the
     * round ends keep their shape. Its fill gauge (img/progress_bar.png) runs along the middle. */
    private drawBeltBase() {
        const R = BELT.r + BELT.band / 2, k = (2 * R) / 360, w = (BELT.cxR - BELT.cxL + 2 * R) / k + 33 + 34;
        this.add.nineslice(540, BELT.cy + 8 * k, 'conveyor', undefined, w, undefined, 230, 230, 0, 0).setScale(k).setDepth(D.belt - 0.5);
        // the gauge's groove is x 22 to 1378, y 14 to 66 of its 1400 x 95 art; the green fill is
        // exactly as tall as the groove
        const bw = BELT.cxR - BELT.cxL + 12, gk = bw / 1400;
        this.add.image(540, BELT.cy, 'progress_bar').setScale(gk).setDepth(D.belt + 0.1);
        this.fullBar = this.add.nineslice(540 - bw / 2 + 22 * gk, BELT.cy + (40 - 47.5) * gk, 'progress', undefined, 52, undefined, 26, 26, 0, 0)
            .setOrigin(0, 0.5).setScale(gk).setDepth(D.belt + 0.2).setData('max', 1356);
    }

    private drawBelt() {
        const s = this.sim;
        // the holders ride round with the belt, one under each slot
        this.holds.forEach((h, i) => { const [x, y] = s.slotPos(i); h.setPosition(x, y + 4); });
        // how full the conveyor is
        const used = s.slots.filter(Boolean).length, pct = Math.round((100 * used) / SLOTS);
        this.fullBar.setVisible(pct > 0).width = Math.max(52, (this.fullBar.getData('max') * pct) / 100);
        this.fullText.setText(pct + '%');
    }

    // ---------- UI ----------
    private text(x: number, y: number, str: string, size: number, color = '#ffffff', stroke: string | null = '#3a3550', thick = 8) {
        const t = this.add.text(x, y, str, { fontFamily: FONT, fontSize: `${size}px`, color, align: 'center' }).setOrigin(0.5);
        if (stroke) t.setStroke(stroke, thick);
        return t;
    }

    /** The nest box art in colour `hex` (made once per colour): of the box arts, the one whose
     * colour is nearest; each pixel's hue becomes the colour's, its saturation and brightness
     * scaled by the colour's against those of the art's top face (outline and shading stay), so a
     * colour the art already has comes out as the art. */
    private nestTexture(hex: string) {
        const key = `nest_box:${hex}`;
        if (this.textures.exists(key)) return key;
        const t = parseInt(hex.slice(1), 16), rgb = [(t >> 16) & 255, (t >> 8) & 255, t & 255];
        const dist = (c: number[]) => c.reduce((s, v, i) => s + (v - rgb[i]) ** 2, 0);
        const [art, base] = NEST_BOXES.reduce((a, b) => (dist(b[1]) < dist(a[1]) ? b : a));
        const src = this.textures.get(art).getSourceImage() as HTMLImageElement;
        const tex = this.textures.createCanvas(key, src.width, src.height)!, ctx = tex.getContext();
        ctx.drawImage(src, 0, 0);
        const img = ctx.getImageData(0, 0, src.width, src.height), d = img.data;
        const hsv = (r: number, g: number, b: number) => {
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn;
            const h = c === 0 ? 0 : mx === r ? ((g - b) / c + 6) % 6 : mx === g ? (b - r) / c + 2 : (r - g) / c + 4;
            return [h * 60, mx ? c / mx : 0, mx / 255];
        };
        const [th, ts, tv] = hsv(rgb[0], rgb[1], rgb[2]), [, bs, bv] = hsv(...base);
        for (let p = 0; p < d.length; p += 4) {
            if (!d[p + 3]) continue;
            const [, s0, v0] = hsv(d[p], d[p + 1], d[p + 2]);
            const sat = Math.min(1, (s0 * ts) / bs), val = Math.min(1, (v0 * tv) / bv);
            // HSV back to RGB
            const c = val * sat, x = c * (1 - Math.abs(((th / 60) % 2) - 1)), m = val - c, sector = Math.floor(th / 60) % 6;
            const [r, g, b] = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][sector];
            d[p] = (r + m) * 255; d[p + 1] = (g + m) * 255; d[p + 2] = (b + m) * 255;
        }
        ctx.putImageData(img, 0, 0);
        tex.refresh();
        return key;
    }

    private label(i: number) {
        if (!this.labels[i]) this.labels[i] = this.text(0, 0, '', 50, '#ffffff', '#2e2433', 9).setDepth(D.labels);
        return this.labels[i];
    }

    // boosters: a row under the HUD, above the picture frame (as in Sand Drop)
    // as in Sand Drop: a square button with the booster's picture, a red badge with the uses left
    // (a green plus when there are none), and a yellow frame while it waits for a tap
    private buildTray() {
        BOOSTER_IMAGES.forEach((key, i) => {
            const { x, y } = BOOSTER_POS[i];
            // the button art is 408 x 442: its body is x 6 to 400, y 0 to 410 (the white rim and
            // orange face are the top 357, a lilac lip below), the orange face y 37 to 352
            const k = BOOSTER_SIZE / 394, u = BOOSTER_SIZE / 150, at = (ay: number) => y + (ay - 221) * k;
            const base = this.add.image(x, y, 'bst_btn').setScale(k).setData('s', k).setDepth(D.tray + 0.1);
            // the yellow frame lies over the white rim while Activate waits for a nest
            const frame = this.add.image(x, at(178.5), 'bst_frame').setDepth(D.tray + 0.15).setDisplaySize(394 * k, 357 * k).setVisible(false);
            frame.setData('sx', frame.scaleX).setData('sy', frame.scaleY);
            const img = this.add.image(x, at(194.5), key).setDepth(D.tray + 0.2);
            img.setData('s', (100 * u) / Math.max(img.width, img.height)).setScale(img.getData('s'));
            const badge = this.add.container(x + 58 * u, y + 58 * u).setDepth(D.tray + 0.3);
            const count = this.text(0, 1, '1', Math.round(36 * u), '#ffffff', '#7a1020', 6);
            badge.add([this.add.image(0, 0, 'badge_red').setDisplaySize(58 * u, 58 * u), count]);
            const plus = this.add.image(x + 58 * u, y + 58 * u, 'badge_plus').setDisplaySize(58 * u, 58 * u).setDepth(D.tray + 0.3).setVisible(false);
            // locked: a grey square over the button's whole body
            const lockBase = this.add.image(x, at(205), 'bst_btn_locked').setDepth(D.tray + 0.1).setDisplaySize(394 * k, 410 * k).setVisible(false);
            lockBase.setData('sx', lockBase.scaleX).setData('sy', lockBase.scaleY);
            // the padlock sits a little high, with the level it opens at under it
            const lock = this.add.image(x, y - 24 * u, 'icon_lock').setDepth(D.tray + 0.2).setVisible(false);
            lock.setData('s', (66 * u) / lock.height).setScale(lock.getData('s'));
            const lockText = this.text(x, y + 34 * u, `Level ${BOOSTER_UNLOCK[i]}`, Math.round(30 * u), '#ffffff', '#3a3a3a', 6)
                .setDepth(D.tray + 0.2).setData('s', 1).setVisible(false);
            const b = { img, base, frame, badge, plus, count, bump: 0, uses: BOOSTER_USES[i], lockBase, lock, lockText, locked: false };
            for (const o of [base, lockBase]) o.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.useBooster(i));
            this.boosters.push(b);
        });
        this.pickHint = this.text(540, INNER.y + 40, 'Tap a waiting nest to wake it up', 40, '#ffffff', '#3a3550', 8)
            .setDepth(D.hud).setVisible(false);
        this.lockHint = this.text(540, INNER.y + 40, '', 40, '#ffffff', '#3a3550', 8).setDepth(D.hud).setAlpha(0);
    }

    private setLocked(i: number, on: boolean) {
        const b = this.boosters[i];
        b.locked = on;
        b.lockBase.setVisible(on); b.lock.setVisible(on); b.lockText.setVisible(on);
        b.base.setVisible(!on); b.img.setVisible(!on);
    }

    private setUses(i: number, n: number) {
        const b = this.boosters[i];
        b.uses = n;
        b.count.setText(String(n));
        b.badge.setVisible(!b.locked && n > 0);
        b.plus.setVisible(!b.locked && n <= 0);
    }

    private setPicking(on: boolean) {
        this.picking = on;
        this.pickHint?.setVisible(on);
        this.boosters[0]?.frame.setVisible(on);
    }

    /** A nest the Activate booster can wake: waiting in the second or third row (the third shows
     * down to its number). */
    private canWake(ci: number, ri: number) {
        const nest = this.sim.cols[ci]?.[ri];
        return !!nest && ri <= 2 && !this.sim.isActive(nest, ri) && !nest.pop && nest.dy !== null;
    }

    /** Booster buttons: Activate waits for a nest to be tapped; Shuffle and Fan act at once. A
     * booster that would do nothing (nothing to wake, swap or blow) only bounces. */
    private useBooster(i: number) {
        if (this.overlay || this.sim.state !== 'play' || this.fanFx) return;
        const b = this.boosters[i];
        this.sfx('click'); b.bump = 1;
        if (i === 0 && this.picking) { this.setPicking(false); return; }
        if (b.locked) {
            this.setPicking(false);
            this.tweens.killTweensOf(this.lockHint);
            this.lockHint.setText(`Unlocks at Level ${BOOSTER_UNLOCK[i]}`).setAlpha(1);
            this.tweens.add({ targets: this.lockHint, alpha: 0, delay: 1200, duration: 300 });
            return;
        }
        if (b.uses <= 0) return;
        if (i === 0) {
            if (this.sim.cols.some((col, ci) => col.some((_n, ri) => this.canWake(ci, ri)))) this.setPicking(true);
            return;
        }
        this.setPicking(false);
        if (i === 1) { if (this.sim.shuffle()) this.setUses(i, b.uses - 1); }
        else if (this.sim.slots.some(Boolean)) this.startFan();
    }

    // ---------- Fan booster animation ----------
    /** The screen dims (the blocks, nests and ants stay lit), and the fan drops into the middle. */
    private startFan(free = false) {
        // one under the 3D layer (it dims the picture and the belt, not the blocks, nests and ants)
        // and one over the HUD and boosters above the frame
        const top = INNER.y - 14;
        const dims = [
            this.add.rectangle(0, top, W, H - top, 0x000000, 0.55).setOrigin(0).setDepth(D.shadows - 0.05),
            this.add.rectangle(0, 0, W, top, 0x000000, 0.55).setOrigin(0).setDepth(D.hud + 0.5),
        ];
        for (const d of dims) { d.setAlpha(0); this.tweens.add({ targets: d, alpha: 1, duration: 200 }); }
        const icon = this.add.image(FAN_MOUTH.x, -FAN.size, 'bst_cannon').setDepth(D.hud + 1);
        icon.setOrigin(FAN_MOUTH_PX.x / icon.width, FAN_MOUTH_PX.y / icon.height);
        icon.setScale(FAN.size / Math.max(icon.width, icon.height)).setData('s', icon.scale);
        // it falls in over everything, then sits behind the blocks (under the 3D layer) so the
        // blocks show going into and out of its mouth
        this.tweens.add({ targets: icon, y: FAN_MOUTH.y, duration: FAN.drop * 1000, ease: 'Bounce.Out', onComplete: () => icon.setDepth(D.three - 0.1) });
        // blocks nearest the mouth go in first; all of them within about a second
        const s = this.sim, near: { i: number; d: number }[] = [];
        for (let i = 0; i < SLOTS; i++) {
            if (!s.slots[i]) continue;
            const [x, y] = s.slotPos(i);
            near.push({ i, d: Math.hypot(x - FAN_MOUTH.x, y - FAN_MOUTH.y) });
        }
        near.sort((p, q) => p.d - q.d);
        const gap = Math.min(0.06, 1 / Math.max(1, near.length));
        const order = new Map(near.map(({ i }, k) => [i, k * gap] as [number, number]));
        this.fanFx = { t: 0, blown: false, leaving: false, icon, dims, wind: this.add.graphics().setDepth(D.hud + 0.9), gusts: [], gustAcc: 0, order, gap, shots: new Map(), fired: new Set(), free };
        this.sfx('click');
    }

    /** Where block `i` of the belt is while the cannon sucks it in: from the belt (x, y) along a
     * curve into the mouth, speeding up, shrinking and turning. `e` is how far in it is (0 on the
     * belt, 1 swallowed: then it is no longer drawn). */
    private fanLift(i: number, x: number, y: number) {
        const f = this.fanFx, start = f?.order.get(i);
        if (!f || f.blown || start === undefined) return { x, y, e: 0, ang: 0, scale: 1 };
        const u = Phaser.Math.Clamp((f.t - FAN.drop - start) / FAN.suck, 0, 1), e = u * u;
        // a curve that rises from the block, then swings sideways into the mouth
        const cx = x, cy = FAN_MOUTH.y + 60, m = 1 - e;
        return {
            x: m * m * x + 2 * m * e * cx + e * e * FAN_MOUTH.x,
            y: m * m * y + 2 * m * e * cy + e * e * FAN_MOUTH.y,
            e, ang: u * 6, scale: 1 - 0.85 * e,
        };
    }

    private stepFan(dt: number) {
        const f = this.fanFx!;
        f.t += dt;
        // air streaks rush in from the belt toward the mouth while the blocks go in
        const sucking = !f.blown && f.t > FAN.drop * 0.8;
        if (sucking) {
            f.gustAcc += dt * 40;
            for (; f.gustAcc >= 1; f.gustAcc--) {
                const sx = BELT.cxL - 40 + Math.random() * (BELT.cxR - BELT.cxL + 80), sy = BELT.cy + (Math.random() - 0.5) * 140;
                f.gusts.push({ x: sx, y: sy, sx, sy, t: 0, life: 0.35 + Math.random() * 0.15, len: 50 + Math.random() * 50 });
            }
        }
        for (let i = f.gusts.length - 1; i >= 0; i--) {
            const g = f.gusts[i];
            g.t += dt;
            const k = Math.min(1, g.t / g.life) ** 2;
            g.x = g.sx + (FAN_MOUTH.x - g.sx) * k; g.y = g.sy + (FAN_MOUTH.y - g.sy) * k;
            if (g.t > g.life) f.gusts.splice(i, 1);
        }
        // the cannon swells a little as each block goes in, and kicks back with each shot
        const sc = f.icon.getData('s') as number;
        let kick = 0;
        if (!f.blown) for (const [, start] of f.order) { const u = (f.t - FAN.drop - start) / FAN.suck; if (u > 0.9 && u < 1.15) kick = Math.max(kick, 0.05); }
        for (const [fl, k] of f.shots) {
            const since = this.shotAge(fl, k);
            if (since >= 0 && !f.fired.has(fl)) { f.fired.add(fl); this.sfx('pop', 0.8); }
            if (since >= 0 && since < 0.12) kick = Math.max(kick, 0.1 * (1 - since / 0.12));
        }
        f.icon.setScale(sc * (1 + kick), sc * (1 - kick * 0.5));
        const last = Math.max(0, ...f.order.values());
        if (!f.blown && f.t >= FAN.drop + last + FAN.suck + 0.15) this.blowFan();
        if (f.blown && !f.leaving && !this.sim.flyers.length) this.leaveFan();
    }

    /** How long ago block `fl` left the mouth (s; negative while it waits its turn). Flyers all
     * start together in the rules, each `dur` long (the flight plus FAN_SHOT_GAP per block before
     * it), so the extra time of a later block is spent waiting inside the cannon. */
    private shotAge(fl: Flyer, k: number) {
        return fl.t * fl.dur - k * FAN_SHOT_GAP;
    }

    /** The rules take over: every block flies from the cannon's mouth to its nest, one after another. */
    private blowFan() {
        const f = this.fanFx!, s = this.sim, before = s.flyers.length;
        if (s.fan() && !f.free) this.setUses(2, this.boosters[2].uses - 1);
        f.blown = true;
        s.flyers.slice(before).forEach((fl, k) => { fl.sx = FAN_MOUTH.x; fl.sy = FAN_MOUTH.y; f.shots.set(fl, k); });
    }

    private leaveFan() {
        const f = this.fanFx!;
        f.leaving = true;
        f.icon.setDepth(D.hud + 1);
        this.tweens.add({ targets: f.icon, y: -FAN.size, duration: 350, ease: 'Back.In' });
        this.tweens.add({ targets: f.dims, alpha: 0, duration: 350, onComplete: () => this.endFan() });
    }

    private endFan() {
        const f = this.fanFx;
        if (!f) return;
        this.tweens.killTweensOf([f.icon, ...f.dims]);
        f.icon.destroy(); f.wind.destroy();
        for (const d of f.dims) d.destroy();
        this.fanFx = null;
    }

    /** The Fan's suction: white streaks rushing from the belt into the cannon's mouth. */
    private drawWind() {
        const f = this.fanFx;
        if (!f) return;
        const g = f.wind.clear();
        for (const w of f.gusts) {
            const k = w.t / w.life, dx = FAN_MOUTH.x - w.sx, dy = FAN_MOUTH.y - w.sy, d = Math.hypot(dx, dy) || 1;
            g.lineStyle(6 * (1 - k * 0.5), 0xffffff, 0.6 * Math.sin(Math.PI * Math.min(1, k)));
            g.lineBetween(w.x, w.y, w.x - (dx / d) * w.len, w.y - (dy / d) * w.len);
        }
    }

    /** x2 speed on or off; the button shows which. Every game starts at normal speed. While
     * autoFast is on, x2 stays on. */
    private setSpeed(on: boolean) {
        this.speedUp = on || this.autoFast;
        this.speedBtn.setTexture(on ? 'btn_speed_on' : 'btn_speed_off');
    }

    private buildHud() {
        const p = PAUSE_BTN, sp = SPEED_BTN;
        // the settings button (212 x 224 art) opens the pause panel
        this.add.image(p.x, p.y, 'btn_settings').setOrigin(0).setDisplaySize(p.w, (p.w * 224) / 212).setDepth(D.hud)
            .setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (!this.overlay) { this.sfx('click'); this.showSettings(); } });
        this.levelText = this.text(540, 94, 'Level 1', 72, '#ffffff', '#1b1a4a', 12).setDepth(D.hud);
        // x2 speed: a white pill with a fast-forward arrow (grey when off, green when on) and "x2"
        // on its left; the art is 291 x 150, its body the top 128
        this.speedBtn = this.add.image(sp.x, sp.y, 'btn_speed_off').setOrigin(0).setDisplaySize(sp.w, (sp.w * 150) / 291).setDepth(D.hud)
            .setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                if (this.overlay || this.autoFast) return;
                this.sfx('click');
                this.setSpeed(!this.speedUp);
            });
        const k = sp.w / 291;
        this.speedParts = [this.speedBtn, this.text(sp.x + 82 * k, sp.y + 62 * k, 'x2', Math.round(50 * k * 291 / 190), '#2b2a6b', null).setDepth(D.hud + 0.1)];
    }

    /** Once all the sand has fallen off the picture frame, the rest of the level (funnel, belt,
     * ants) runs at x2 and the x2 button hides, so it cannot be turned off; the next level gives
     * back the speed the player had. */
    private setAutoFast(on: boolean) {
        if (on === this.autoFast) return;
        if (on) this.speedBefore = this.speedUp;
        this.autoFast = on;
        this.setSpeed(on || this.speedBefore);
        for (const o of this.speedParts) o.setVisible(!on);
    }

    /** The win screen (public/assets/win): "Level N" and the "AMAZING" title over a pile of coins
     * in a glow with turning rays, the coins won, confetti raining down, and two buttons: claim x2
     * with an ad (80 coins) or continue (40). Both go on to the next level: the prototype has no
     * coins or ads yet. */
    private showWin() {
        const box = this.add.container(0, 0).setDepth(D.overlay);
        box.add(this.add.image(0, 0, 'win_bg').setOrigin(0).setDisplaySize(W, H).setInteractive());
        const pop = (o: Phaser.GameObjects.Components.Transform & Phaser.GameObjects.GameObject, scale: number, delay: number) => {
            o.setScale(0);
            box.add(o);
            this.tweens.add({ targets: o, scale, duration: 380, delay, ease: 'Back.Out' });
        };

        const cy = 880;
        const glow = this.add.image(540, cy, 'glow').setScale(2.6).setTint(0xfff6c8).setAlpha(0);
        const rays = this.add.image(540, cy, 'glow_rays').setScale(5.5).setAlpha(0);
        box.add([glow, rays]);
        this.tweens.add({ targets: glow, alpha: 0.75, duration: 400 });
        this.tweens.add({ targets: rays, alpha: 0.35, duration: 500 });
        this.tweens.add({ targets: rays, angle: 360, duration: 24000, repeat: -1 });

        const level = this.text(540, 250, `Level ${this.levelIndex + 1}`, 64, '#ffffff', '#1f4fa8', 10).setAlpha(0);
        box.add(level);
        this.tweens.add({ targets: level, alpha: 1, duration: 300, delay: 100 });
        const title = this.add.image(540, 450, 'amazing');
        pop(title, 1.15, 150);
        this.tweens.add({ targets: title, y: 436, duration: 900, delay: 700, yoyo: true, repeat: -1, ease: 'Sine.InOut' });

        pop(this.add.image(540, cy, 'rewards'), 1, 400);
        // the coins this level gives
        const won = this.add.container(540, 1170);
        won.add([this.add.image(-60, 0, 'icon_coin').setDisplaySize(84, 95), this.text(36, -4, '+40', 76, '#ffffff', '#1f4fa8', 12)]);
        pop(won, 1, 650);
        this.addConfetti(box);

        // claim x2 with an ad: the clapperboard and "Claim x2" on the orange face, the coins on
        // its yellow tab; continue: the green button
        const next = () => this.startLevel((this.levelIndex + 1) % levelCount());
        const claim = this.add.container(540, 1400);
        claim.add([
            this.add.image(0, 0, 'btn_reward'),
            this.add.image(-150, -52, 'icon_ads').setDisplaySize(112, 109).setAngle(-6),
            this.text(40, -56, 'Claim x2', 64, '#ffffff', '#a8480a', 10),
            this.add.image(-38, 76, 'icon_coin').setDisplaySize(48, 54),
            this.text(26, 74, '80', 52, '#ffffff', '#a8660a', 8),
        ]);
        pop(this.tapTarget(claim, 517, 304, next), 1, 900);
        const cont = this.add.container(540, 1660);
        cont.add([this.add.image(0, 0, 'btn_continue'), this.text(0, -8, 'Continue', 68, '#ffffff', '#1f7a12', 10)]);
        pop(this.tapTarget(cont, 472, 210, next), 0.9, 1050);
        this.overlayBox = box;
    }

    /** Make a button container tappable over its art's w x h (clicks go to `onTap`). */
    private tapTarget(c: Phaser.GameObjects.Container, w: number, h: number, onTap: () => void) {
        return c.setSize(w, h).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); onTap(); });
    }

    /** Confetti raining down over the win screen (Colony Flow's art): coloured paper strips that
     * flip as they fall (its white confetti quad, tinted), white and yellow stars, a few of its
     * confetti shapes and some curly streamers. */
    private addConfetti(box: Phaser.GameObjects.Container) {
        const colours = [0x4fd1ff, 0xff5a5a, 0xffe14d, 0x7dff6a, 0xff8ad8, 0xffffff, 0x5a7dff, 0xff9f2e];
        if (!this.textures.exists('streamer')) {
            const g = this.make.graphics({}, false).lineStyle(5, 0xffffff);
            g.beginPath(); g.moveTo(10, 4);
            for (let y = 4; y <= 156; y += 4) g.lineTo(10 + Math.sin(y / 16) * 7, y);
            g.strokePath(); g.generateTexture('streamer', 22, 160); g.destroy();
        }
        const fall = (piece: Phaser.GameObjects.Image, slow = 1) => {
            const x = piece.x, ms = Phaser.Math.Between(2600, 4800) * slow;
            box.add(piece);
            this.tweens.add({ targets: piece, y: H + 80, duration: ms, delay: Phaser.Math.Between(0, 3000), repeat: -1 });
            this.tweens.add({ targets: piece, x: x + Phaser.Math.Between(-60, 60), duration: Phaser.Math.Between(700, 1300), yoyo: true, repeat: -1, ease: 'Sine.InOut' });
            this.tweens.add({ targets: piece, angle: Phaser.Math.Between(-400, 400), duration: ms, repeat: -1 });
        };
        const at = () => [Phaser.Math.Between(10, W - 10), Phaser.Math.Between(-400, -40)] as const;
        for (let i = 0; i < 110; i++) {
            const piece = this.add.image(...at(), 'confetti_ribbon').setTint(Phaser.Utils.Array.GetRandom(colours));
            piece.setDisplaySize(Phaser.Math.Between(7, 11), Phaser.Math.Between(20, 34));
            fall(piece);
            // flutter: the strip turns over and back as it falls
            this.tweens.add({ targets: piece, scaleX: -piece.scaleX, duration: Phaser.Math.Between(250, 500), yoyo: true, repeat: -1 });
        }
        for (let i = 0; i < 26; i++) {
            const star = this.add.image(...at(), 'confetti_star').setTint(Phaser.Utils.Array.GetRandom([0xffffff, 0xffffff, 0xffe14d, 0x7fe3ff]));
            star.setDisplaySize(...(() => { const d = Phaser.Math.Between(26, 44); return [d, d] as const; })());
            fall(star, 1.2);
        }
        for (let i = 0; i < 20; i++) fall(this.add.image(...at(), 'confetti', Phaser.Math.Between(0, 24)).setScale(Phaser.Math.FloatBetween(0.4, 0.7)));
        for (let i = 0; i < 6; i++) fall(this.add.image(...at(), 'streamer').setTint(Phaser.Utils.Array.GetRandom(colours)).setScale(1.4), 1.5);
    }

    private closeOverlay() {
        if (this.overlayBox) this.tweens.killTweensOf(this.overlayBox.getAll());
        this.overlayBox?.each((o: Phaser.GameObjects.GameObject) => { if (o instanceof Phaser.GameObjects.Container) this.tweens.killTweensOf(o.getAll()); });
        this.overlayBox?.destroy();
        this.overlayBox = undefined;
        this.overlay = null;
        this.paused = false;
    }

    private showStart() {
        this.overlay = 'start';
        const box = this.add.container(0, 0).setDepth(D.overlay);
        const shade = this.add.rectangle(0, 0, W, H, 0x281910, 0.45).setOrigin(0).setInteractive();
        shade.on('pointerdown', () => {
            this.started = true;
            this.closeOverlay();
            this.playMusic();
        });
        box.add([shade, this.text(540, 960, 'Tap to play', 80), this.text(540, 1050, 'Swipe the sand to set it free', 38, '#fffbe8', '#5a3a20', 6)]);
        box.add(this.text(W - 20, H - 24, __APP_VERSION__, 24, '#fffbe8', null).setOrigin(1, 0.5));
        this.overlayBox = box;
    }

    private playMusic() {
        if (!this.prefs.music) return;
        this.music ??= this.sound.add('music', { loop: true, volume: 0.3 });
        if (!this.music.isPlaying) this.music.play();
    }
    private setPref(k: keyof Prefs, on: boolean) {
        this.prefs[k] = on;
        try { localStorage.setItem(PREFS_KEY, JSON.stringify(this.prefs)); } catch { /* storage blocked */ }
        if (k === 'music') { if (on) this.playMusic(); else this.music?.stop(); }
        if (k === 'vibe' && on) navigator.vibrate?.(30);
    }

    // Pause panel (the pause button), from the team's settings art (public/assets/settings):
    // board with a close button, music / sound / vibration switches, Restart, Home, and the
    // level cheat. Built at the art's size around the panel centre, then shown at 80 %.
    private showSettings() {
        this.overlay = 'settings';
        this.paused = true;
        const box = this.add.container(0, 0).setDepth(D.overlay);
        box.add(this.add.rectangle(0, 0, W, H, 0x0a1020, 0.62).setOrigin(0).setInteractive());
        const panel = this.add.container(540, 960 - H * 0.1).setScale(0.8);
        box.add(panel);
        const BW = 888, BH = 1098, top = -BH / 2;
        panel.add(this.add.image(0, 0, 'set_board'));
        panel.add(this.text(0, top + 98, 'Pause', 84, '#ffffff', '#1d2a44', 12));
        panel.add(this.artButton(BW / 2 - 70, top + 96, 'set_btn_close', 1, null, '', () => this.closeOverlay()));
        // music, sound and vibration: blue when on, grey with a crossed-out icon when off
        (['music', 'sound', 'vibe'] as const).forEach((k, i) => {
            const btn = this.add.container((i - 1) * 240, top + 300);
            const paint = () => {
                btn.removeAll(true);
                const on = this.prefs[k];
                const icon = this.add.image(0, -10, `set_${k}_${on ? 'on' : 'off'}`);
                icon.setScale((on ? 118 : 150) / Math.max(icon.width, icon.height));
                btn.add([this.add.image(0, 0, on ? 'set_btn_blue' : 'set_btn_gray').setScale(0.8), icon]);
            };
            paint();
            btn.setSize(204, 220).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.setPref(k, !this.prefs[k]); this.sfx('click'); paint(); });
            panel.add(btn);
        });
        panel.add(this.artButton(0, top + 520, 'set_btn_green', 0.8, 'set_icon_retry', 'Restart', () => this.startLevel(this.levelIndex)));
        panel.add(this.artButton(0, top + 712, 'set_btn_red', 0.8, 'set_icon_home', 'Home', () => this.goHome()));
        // cheat: jump to any level
        panel.add(this.text(0, top + 846, 'Cheat: go to level', 38, '#33507e', null));
        const perRow = 5, cw = 88, gap = 16, rowW = perRow * cw + (perRow - 1) * gap;
        for (let i = 0; i < levelCount(); i++) {
            const c = this.add.container(-rowW / 2 + cw / 2 + (i % perRow) * (cw + gap), top + 912 + Math.floor(i / perRow) * 98);
            c.add([this.add.image(0, 0, i === this.levelIndex ? 'set_btn_gray' : 'set_btn_blue').setScale(0.34), this.text(0, -6, String(i + 1), 38, '#ffffff', '#1d2a44', 7)]);
            c.setSize(cw, 94).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); this.startLevel(i); });
            panel.add(c);
        }
        this.overlayBox = box;
    }

    /** A button from the settings art: its image, an optional icon left of the label, and the label. */
    private artButton(x: number, y: number, key: string, scale: number, icon: string | null, label: string, onTap: () => void) {
        const c = this.add.container(x, y), img = this.add.image(0, 0, key).setScale(scale);
        c.add(img);
        if (icon) { const ic = this.add.image(label ? -img.displayWidth / 2 + 78 : 0, -8, icon); ic.setScale(80 / Math.max(ic.width, ic.height)); c.add(ic); }
        if (label) c.add(this.text(icon ? 36 : 0, -10, label, 60, '#ffffff', '#1d2a44', 10));
        c.setSize(img.displayWidth, img.displayHeight).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); onTap(); });
        return c;
    }

    /** Home: the site's landing page when the game runs on it, else back to level 1's start screen. */
    private goHome() {
        if (/\/demo\/(index\.html)?$/.test(location.pathname)) { location.href = '../'; return; }
        this.started = false;
        this.startLevel(0);
        this.showStart();
    }

    private showEnd() {
        this.overlay = 'end';
        this.swiping = false;
        if (this.sim.state === 'win') this.showWin();
        else this.showOutOfSpace();
    }

    /** A lose panel (public/assets/lose): a dim, and the board popping in with its title on the
     * blue header and a close button on its corner (board centre 540, 940; the board image is
     * 886 x 1097, its light blue box 716 x 392 centred 433 px below its top). */
    private losePanel(title: string, onClose: () => void) {
        const box = this.add.container(0, 0).setDepth(D.overlay);
        box.add(this.add.rectangle(0, 0, W, H, 0x0a1430, 0.6).setOrigin(0).setInteractive());
        const board = this.add.container(540, 940);
        board.add([
            this.add.image(0, 0, 'lose_lose_board'),
            this.text(0, -452, title, 76, '#ffffff', '#0a3a8a', 12),
            this.add.image(408, -500, 'lose_btn_close').setScale(0.9).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => { this.sfx('click'); onClose(); }),
        ]);
        board.setScale(0.8);
        this.tweens.add({ targets: board, scale: 1, duration: 300, ease: 'Back.Out' });
        box.add(board);
        this.overlayBox = box;
        return board;
    }

    /** Lost (the conveyor is full): revive with an ad or with coins (the cannon clears the belt and
     * play goes on; the prototype has no ads or coins yet, so both just revive), or give up with
     * the close button. */
    private showOutOfSpace() {
        const board = this.losePanel('Out of Space!', () => { this.closeOverlay(); this.overlay = 'end'; this.showFailed(); });
        board.add(this.add.image(0, -150, 'lose_heart_break').setScale(0.85));
        board.add(this.text(0, 20, 'The conveyor is full!', 46, '#1f4fa8', null));
        board.add(this.text(0, 140, 'Clear it and keep playing?', 40, '#3a5a8a', null));
        const revive = () => {
            this.closeOverlay();
            this.sim.revive();
            this.startFan(true);
        };
        const ad = this.add.container(-170, 300);
        ad.add([
            this.add.image(0, 0, 'lose_btn_rv').setScale(0.66),
            this.add.image(-70, -12, 'lose_icon_rv').setDisplaySize(84, 85),
            this.text(42, -14, 'Free', 58, '#ffffff', '#a8480a', 10),
        ]);
        const coins = this.add.container(170, 300);
        coins.add([
            this.add.image(0, 0, 'lose_btn_purchase').setScale(0.8),
            this.add.image(-66, -12, 'lose_icon_coin').setDisplaySize(64, 70),
            this.text(38, -14, '900', 58, '#ffffff', '#1f7a12', 10),
        ]);
        board.add([this.tapTarget(ad, 323, 194, revive), this.tapTarget(coins, 319, 196, revive)]);
    }

    /** Gave up: "Level N", the lives (one of five lost, a blank heart) and the time to the next
     * one counting down from 30:00, "Level failed!" and Try Again. Try Again and the close button
     * both start the level over; the prototype has no lives yet, so they are only shown. */
    private showFailed() {
        const again = () => this.startLevel(this.levelIndex);
        const board = this.losePanel(`Level ${this.levelIndex + 1}`, again);
        for (let i = 0; i < 5; i++) board.add(this.add.image((i - 2) * 132, -192, i < 4 ? 'lose_heart' : 'lose_heart_blank').setDisplaySize(124, 122));
        const clock = this.text(40, -26, '30:00', 60, '#ffffff', '#0a3a8a', 10);
        board.add([this.add.image(0, -24, 'lose_heart_timebox').setScale(0.9), this.add.image(-110, -26, 'lose_heart').setDisplaySize(82, 81), clock]);
        let left = 30 * 60;
        // a do-nothing tween on the clock ticks it each second (and stops with the panel)
        this.tweens.add({
            targets: clock, alpha: 1, duration: 1000, repeat: -1,
            onRepeat: () => { left = Math.max(0, left - 1); clock.setText(`${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`); },
        });
        board.add(this.text(0, 150, 'Level failed!', 58, '#1f5fc8', null));
        const btn = this.add.container(0, 330);
        btn.add([this.add.image(0, 0, 'lose_btn_try_again'), this.text(0, -10, 'Try Again', 70, '#ffffff', '#1f7a12', 10)]);
        board.add(this.tapTarget(btn, 471, 210, again));
    }

    private onDown(p: Phaser.Input.Pointer, over: Phaser.GameObjects.GameObject[]) {
        if (this.overlay || over.length || this.sim.state !== 'play' || this.fanFx) return;
        if (this.picking) {
            // Activate: wake the nest under the finger; a tap anywhere else cancels
            const s = this.sim;
            s.cols.forEach((col, ci) => col.forEach((n, ri) => {
                if (!this.picking || !this.canWake(ci, ri) || Math.abs(p.x - n.dx!) > TILE / 2 || Math.abs(p.y - n.dy!) > TILE / 2) return;
                if (s.activate(ci, ri)) this.setUses(0, this.boosters[0].uses - 1);
            }));
            this.setPicking(false);
            return;
        }
        this.swiping = true;
        this.sim.endSwipe();
        this.sim.swipeTo(p.x, p.y);
    }

    private sfx(name: Sfx, vol = 0.7) {
        const now = performance.now();
        if (this.lastSfx[name] && now - this.lastSfx[name] < 60) return;
        this.lastSfx[name] = now;
        if (this.prefs.vibe && VIBES[name]) navigator.vibrate?.(VIBES[name]!);
        if (this.sound.locked || !this.prefs.sound) return;
        this.sound.play(name, { volume: vol });
    }

    // Hooks used by automated play-tests in the browser console.
    private exposeTestHook() {
        const scene = this;
        (window as unknown as Record<string, unknown>).__cf = {
            get state() { return scene.sim; },
            levelOverride,
            start(i: number) { scene.started = true; scene.startLevel(i); },
            sim(sec: number) { for (let t = 0; t < sec; t += 1 / 60) scene.sim.update(1 / 60); scene.render(); },
            /** Let the test bot play the current level for up to `sec` game seconds. */
            /** Show the win screen now (layout checks). */
            win() { scene.sim.state = 'win'; scene.sim.endT = 1; },
            bot(sec = 300) { scene.started = true; return playBot(scene.sim, sec); },
            /** Play live with the test bot, or replay recorded winning strokes from the start, at `speed` (1 or 2). */
            autoplay(on = true, speed = 2, moves?: Recording['moves']) {
                // Auto Play runs at `speed`; stopping it goes back to normal speed
                scene.autoplay = on;
                scene.moves = moves ?? null; scene.moveAt = 0; scene.replayAcc = 0; scene.replayFrame = 0;
                if (on) { if (moves) scene.startLevel(scene.levelIndex); scene.started = true; scene.closeOverlay(); }
                scene.setSpeed(on && speed > 1);
            },
            /** Hold the game still (or let it go on), without the pause panel: for screenshots. */
            hold(on = true) { scene.paused = on; },
            /** Use a booster: 0 Activate (with `ci`, `ri`: the nest to wake), 1 Shuffle, 2 Fan. */
            booster(i: number, ci = 0, ri = 1) { return i === 0 ? scene.sim.activate(ci, ri) : i === 1 ? scene.sim.shuffle() : scene.sim.fan(); },
            swipeCells(pts: [number, number][]) {
                const s = scene.sim;
                s.endSwipe();
                for (const [x, y] of pts) s.swipeTo(PIC.x + (x + 0.5) * s.cell, PIC.y + (y + 0.5) * s.cell);
                s.endSwipe();
            },
        };
    }
}
