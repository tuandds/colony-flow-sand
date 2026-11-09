import * as Phaser from 'phaser';
import { RULES, VARIANT } from '../game/variant';
import { LOOSE_CUBE, YARD, YARD_CUBE } from '../game/belt-physics';
import {
    BELT, BLOCK, BOOSTER_IMAGES, BOOSTER_POS, BOOSTER_SIZE, FRAME_ART, GATE_OUT, H, INNER, NEST_BOXES, PAUSE_BTN, PIC, RIM_IN,
    BELT_LEN, SLOTS, SPEED_BTN, TILE, W, beltPoint,
} from '../game/layout';
import { CUSTOM_KEY, PREVIEW_KEY, gameLevels, levelCount, loadCustomLevels, useLevels } from '../game/levels';
import { type Recording, botStep, pickStroke, playBot, replayStep } from '../game/bot';
import { FAN_FLIGHT, FAN_SHOT_GAP, Flyer, Sfx, Sim, levelOverride } from '../game/sim';
import { GROUND_DEPTH, Item3D, ThreeLayer } from '../game/three-layer';
import { DEMO_SCENES, Demo } from './demo';
import { brighten, greyed, lightness, mulberry32 } from '../game/util';

const FONT = '"Lilita One", "Arial Rounded MT Bold", sans-serif';
/** Music, sound effects and vibration switches (Pause panel), kept in the browser. */
const PREFS_KEY = 'cf_prefs';
type Prefs = { music: boolean; sound: boolean; vibe: boolean };
// short buzzes for the moments that matter (Pause panel: vibration)
const VIBES: Partial<Record<Sfx, number | number[]>> = { nest: 25, win: [60, 40, 60], lose: 200 };
/** Uses of each booster (Activate, Shuffle, Fan) at the start of every level. */
const BOOSTER_USES = [1, 1, 1];
/** The level (1-based) from which each booster can be used; before it the booster shows locked. */
const BOOSTER_UNLOCK = [6, 12, 18];
/** Nests waiting behind the front row keep their colour, a little brighter (FAR.light of the way to
 * white, as vivid), and their number fades into it: a white just tinted by the box (its colour
 * mixed FAR.num of the way to white, like white seen a little see-through), stroked with its colour FAR.stroke of the way to black (a near-white box: a
 * grey number with a darker grey stroke). */
const FAR = { light: 0.12, num: 0.72, stroke: 0.45 };

// Depths, back to front.
const D = { bg: 0, chute: 1, funnel: 2, board: 3, sand: 4, belt: 5, shadows: 6, three: 7, labels: 8, fx: 9, tray: 10, hud: 11, overlay: 20 };

/** The coin panel's coin, top right; its pill runs to x 1044. */
const COIN_AT = { x: 780, y: 94 };
/** Prices in coins: Play On (the Out of Space revive), and a pack of boosters. */
const REVIVE_PRICE = 900, BOOSTER_PRICE = 300, BOOSTER_PACK = 3;
/** Each booster's name and line on the purchase popup. */
const BOOSTER_INFO = [
    ['Activate', 'Wake a waiting nest\nso its ants work too!'],
    ['Shuffle', 'Swap the nests around to find\nthe colours you need!'],
    ['Fan', 'Blow every block on the\nconveyor into its nest!'],
];
type Overlay = 'start' | 'settings' | 'buy' | 'end' | null;

/** Fan booster animation: the ball cannon drops into the middle, sucks the belt's blocks into its
 * mouth one by one, then shoots them out one by one into their nests. The game holds still until
 * the last block is in its nest. Times in s: the drop, each block's trip into the mouth, the gap
 * between shots. */
const FAN = { x: 540, y: 900, size: 300, drop: 0.45, suck: 0.5, shot: 0.06 };
/** The fill gauge: on the conveyor, along its middle; for the yard, under it. */
const GAUGE = RULES.yard
    ? { x: 540, y: YARD.y1 + 46, w: 600 }  // clear of the yard's rim (22 px out), above the nests
    : { x: 540, y: BELT.cy, w: BELT.cxR - BELT.cxL + 12 };
/** The gauge's track (px), inside its white rim. */
const GAUGE_TRACK = { w: GAUGE.w - 46, h: 30 };
/** The gauge's fill colours (top, middle, bottom of the bar) from `at` % full: light blue, then
 * orange, deep orange and red (pulsing) as the conveyor nears full. */
const GAUGE_COLOURS = [
    { at: 0, c: ['#c9f1ff', '#7fd6ff', '#4bb8ef'] },
    { at: 70, c: ['#ffd9a0', '#ffad4d', '#f28c1c'] },
    { at: 80, c: ['#ffb27a', '#ff7a2e', '#e2570f'] },
    { at: 90, c: ['#ff9a9a', '#ff4d4d', '#d92626'] },
];
/** A reel framed close (?demo=<reel>&close): the camera's zoom, and the world y at the top of its
 * view (a little room above the picture frame; the view then ends at the bottom of the screen,
 * 1920 / zoom further down). */
const CLOSE = { zoom: 1.16, top: 264 };
/** Variants 2 and 3 draw their blocks glossy (jelly sweets); variant 1's are matte. */
const SHINY = RULES.looseBelt || RULES.yard;
/** Direction arrows round a loose belt (variant 2). */
const BELT_ARROWS = 20;
/** Shuffle booster: seconds the game holds on the nests before they move, and their move. */
const SHUFFLE = { focus: 0.5, move: 0.5 };
/** Frames a second when a demo reel is recorded frame by frame. */
const CAPTURE_FPS = 30;
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
    /** Demo mode (?demo=<scene>, see demo.ts): the game plays itself for gameplay videos. */
    private demo?: Demo;
    /** Recording a demo reel frame by frame (?demo=<reel>&capture): the game loop is stopped and
     * window.__capture.step() moves it on one frame of 1/CAPTURE_FPS s at a time. */
    private capture = false;
    /** Panel buttons the demo's hand can tap, by name. */
    private taps = new Map<string, { c: Phaser.GameObjects.Container; onTap: () => void }>();
    private started = false;
    private paused = false;
    private speedUp = false;
    /** x2 forced on because all the picture's sand is swept (its button is hidden until the next level). */
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
    /** Recording (capture): the sounds the reel makes, as [name, volume, seconds from its start],
     * for the recorder to lay on the video; none while a cut fast-forwards a level. */
    private sfxLog: [string, number, number][] = [];
    private sfxT0 = 0;
    private sfxMute = false;
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
    /** A loose belt's direction arrows (variant 2: it has no holders to show it turning). */
    private arrows: Phaser.GameObjects.Image[] = [];
    /** Colony Flow's soft shadow under each ant (img/ant_shadow.png), reused frame to frame. */
    private antShadows: Phaser.GameObjects.Image[] = [];
    private shadowGfx!: Phaser.GameObjects.Graphics;
    private fxGfx!: Phaser.GameObjects.Graphics;
    private fullText!: Phaser.GameObjects.Text;
    /** The fullness bar's fill: above the white bar track (drawBeltBase), below the % text. */
    /** The gauge's fills, one for each of GAUGE_COLOURS; the one for how full it is shows. */
    private fullBars: Phaser.GameObjects.NineSlice[] = [];
    /** Nest boxes and the white frame round the active ones, reused frame to frame (like the labels). */
    private nestBoxes: Phaser.GameObjects.Image[] = [];
    private nestFrames: Phaser.GameObjects.Image[] = [];
    private levelText!: Phaser.GameObjects.Text;
    /** The player's coins (the prototype starts at 1000 each session) and the HUD's count. */
    private coins = 1000;
    /** Coins are being paid (spend); the overlay's buttons wait. */
    private spending = false;
    private coinLabel!: Phaser.GameObjects.Text;
    private speedBtn!: Phaser.GameObjects.Image;
    /** The x2 button's image, icon and label, hidden together. */
    private speedParts: Phaser.GameObjects.Components.Visible[] = [];
    /** A reel framed close (?demo=<reel>&close; see CLOSE). */
    private close = false;
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
    /** The Shuffle booster's animation: the game holds still, and after SHUFFLE.focus seconds the
     * nests trade places. */
    private shuffleFx: { t: number; swapped: boolean } | null = null;
    private labels: Phaser.GameObjects.Text[] = [];
    /** The ice drawn over each frozen area (same order as sim.frozen), with its count. */
    private ice: { box: Phaser.GameObjects.Container; text: Phaser.GameObjects.Text; count: number; broken: boolean }[] = [];
    /** Scroll painting: the limit line with its chevrons, the frosted strip at the frame's top that
     * hints at the colours above it, and the slide it was last drawn for. */
    private scrollGfx?: Phaser.GameObjects.Graphics;
    private scrollHint?: Phaser.GameObjects.Image;
    private scrollGlass?: Phaser.GameObjects.Image;
    /** The ridges on the roller's two end caps, drawn as they turn (see drawCaps). */
    private scrollCaps?: Phaser.GameObjects.Graphics;
    private scrollSlid = -1;
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
        // a loose belt (variant 2) has no holders: its blocks lie on the belt itself
        if (RULES.looseBelt) {
            if (!this.textures.exists('belt_arrow')) {
                const g = this.make.graphics({}, false);
                g.fillStyle(0xffffff, 1).fillTriangle(2, 2, 22, 13, 2, 24);
                g.generateTexture('belt_arrow', 26, 26).destroy();
            }
            for (let i = 0; i < BELT_ARROWS; i++) this.arrows.push(this.add.image(0, 0, 'belt_arrow').setTint(0x2b2f63).setAlpha(0.35).setDepth(D.belt));
        } else if (!RULES.yard) for (let i = 0; i < SLOTS; i++) this.holds.push(this.add.image(0, 0, 'conveyor_hold').setDisplaySize(BLOCK * 0.9, BLOCK * 0.9).setDepth(D.belt));
        // in the middle of the gauge's groove (y 14 to 66 of its 95 px art, so 7.5 px above the art's middle)
        this.fullText = this.text(GAUGE.x, GAUGE.y + 1, '0%', 24, '#ffffff', null).setDepth(D.belt + 0.5);
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

        const demo = DEMO_SCENES[q.get('demo') ?? ''];
        if (demo) { level = demo.level; this.levelKey = ''; }
        this.startLevel(level);
        this.showStart();
        if (demo) this.demo = new Demo({
            scene: this, sim: () => this.sim, overlay: () => this.overlay, setSpeed: (on) => this.setSpeed(on),
            goLevel: (i) => { this.startLevel(i); this.started = true; },
            fastForward: (sec, mode, belt) => {
                // play on in half-second turns, as the test bot does, until the level ends
                const pending = () => this.sim.slots.filter(Boolean).length + this.sim.pipe.length
                    + Object.values(this.sim.looseByColour()).reduce((a, b) => a + b, 0) / 64;
                this.sfxMute = true;
                for (let t = 0; t < sec && this.sim.state === 'play' && !(belt && pending() >= belt); t += 0.5) {
                    const pts = pickStroke(this.sim, mode);
                    if (pts) { this.sim.endSwipe(); for (const [x, y] of pts) this.sim.swipeTo(x, y); this.sim.endSwipe(); }
                    for (let k = 0; k < 30; k++) this.sim.update(1 / 60);
                }
                this.sfxMute = false;
            },
            target: (name) => this.demoTarget(name),
            label: (x, y, str, size, color, stroke, thick) => this.text(x, y, str, size, color, stroke, thick),
            busy: () => !!this.fanFx || !!this.shuffleFx || this.picking,
        }, demo);
        // a reel framed close (&close): the camera zooms in on the board, its view starting a
        // little above the picture frame, so the HUD (level, x2) is out of the shot; the boosters,
        // which would peek in at the top, are hidden
        this.close = !!demo && q.has('close');
        if (this.close) this.cameras.main.setZoom(CLOSE.zoom).centerOn(W / 2, CLOSE.top + H / CLOSE.zoom / 2);
        if (demo && q.has('capture')) this.startCapture(demo.length);
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
        this.sandImage.setTexture('sand').setPosition(this.sim.ox, this.sim.oy).setDisplaySize(G * this.sim.gsx, GH * this.sim.gs);
        this.drawIce();
        this.drawScroll();
        this.closeOverlay();
        this.setPicking(false);
        this.endFan();
        this.endShuffle();
        this.setAutoFast(false);
        this.boosters.forEach((_b, i) => { this.setLocked(i, this.levelIndex + 1 < BOOSTER_UNLOCK[i]); this.setUses(i, BOOSTER_USES[i]); });
    }

    update(_time: number, delta: number) {
        const dt = Math.min(0.05, delta / 1000);
        const live = this.started && !this.paused && !(this.overlay === 'settings' || this.overlay === 'buy');
        if (live && this.fanFx) this.stepFan(dt);
        if (live && this.fanFx?.blown && !this.fanFx.leaving) this.sim.stepFlyersOnly(this.speedUp ? dt * 2 : dt);
        if (live && this.shuffleFx) this.stepShuffle(dt);
        if (live && !this.picking && !this.shuffleFx && !(this.fanFx && !this.fanFx.leaving)) {
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
        this.stepIce();
        this.stepScrollHint();
        // the demo runs once play has started, panels and all (it taps their buttons)
        if (this.demo && this.started) this.demo.update(dt, this.paused, (this.capture ? this.time.now : performance.now()) / 1000);
        if (this.sim.fixed <= 0 && this.sim.state === 'play') this.setAutoFast(true);
        if (this.sim.state !== 'play' && this.overlay !== 'end' && this.sim.endT >= (this.sim.state === 'win' ? 0.9 : 0)) this.showEnd();
        this.boosters.forEach((b, i) => {
            b.bump = Math.max(0, b.bump - dt * 5);
            const s = 1 + b.bump * 0.12 + (this.picking && i === 0 ? 0.06 + 0.04 * Math.sin(this.time.now / 120) : 0);
            for (const o of [b.base, b.img, b.frame, b.lockBase, b.lock, b.lockText]) o.setScale((o.getData('sx') ?? o.getData('s')) * s, (o.getData('sy') ?? o.getData('s')) * s);
            // a reel framed close leaves the boosters out (they would peek in at the top)
            if (this.close) for (const o of [b.base, b.img, b.frame, b.lockBase, b.lock, b.lockText, b.badge, b.plus, b.count]) o.setAlpha(0);
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
        for (let i = 0; i < s.slots.length; i++) {
            const b = s.slots[i];
            if (!b) continue;
            let [x, y] = s.blockPos(i);
            if (b.drop < 1) { const t = b.drop; x = GATE_OUT.x + (x - GATE_OUT.x) * t; y = GATE_OUT.y + (y - GATE_OUT.y) * t; }
            // Fan: the block is sucked into the cannon, its shadow fading as it rises; swallowed
            // blocks are not drawn
            const up = this.fanLift(i, x, y);
            if (up.e >= 1) continue;
            // a soft contact shadow tucked under the cube, sized with it
            g.fillStyle(0x24345e, 0.25 * (1 - up.e));
            const bs = b.body ? (RULES.yard ? YARD_CUBE : LOOSE_CUBE) : BLOCK;
            g.fillEllipse(x, y + bs * 0.55, bs * 1.05 * (1 - up.e * 0.5), bs * 0.32 * (1 - up.e * 0.5));
            if (up.e > 0) items.push({ ref: b, kind: 'cube', x: up.x, y: up.y, color: s.colors[b.k], size: BLOCK, ang: up.ang, scale: up.scale, centered: true });
            else if (b.body) {
                const size = bs;
                items.push({ ref: b, kind: 'cube', x, y: y + size * 0.36, color: s.colors[b.k], size, spin: [b.body.rx, b.body.yaw, b.body.rz], shiny: SHINY, depthK: RULES.yard ? GROUND_DEPTH : undefined });
            }
            else items.push({ ref: b, kind: 'cube', x, y: y + BLOCK * 0.36, color: s.colors[b.k], size: BLOCK });
        }
        if (s.pipe.length) items.push({ ref: s.pipe, kind: 'cube', x: GATE_OUT.x, y: GATE_OUT.y, color: s.colors[s.pipe[0]], size: 25, shiny: SHINY });
        // Fan: blocks shot from the cannon's mouth arc into their nests, growing out of the mouth to
        // 1.5 times their size and turning as they fly, then shrinking back as they drop in; a block
        // still waiting its turn is inside the cannon
        for (const f of s.flyers) {
            const k = this.fanFx?.shots.get(f);
            let t = Math.min(1, f.t);
            if (k !== undefined) { const age = this.shotAge(f, k); if (age < 0) continue; t = Math.min(1, age / FAN_FLIGHT); }
            // (x, y) is the block's centre: it leaves from the middle of the mouth
            const e = t * (2 - t), ex = f.nest.dx ?? f.sx, ey = (f.nest.dy ?? f.sy) - TILE * 0.2;
            // a block jumping in by itself (no ants) hops low and stays its size, shrinking a
            // little as it drops in
            const x = f.sx + (ex - f.sx) * e, y = f.sy + (ey - f.sy) * e - Math.sin(Math.PI * t) * (f.hop ? 70 : 140);
            const sc = f.hop ? 1 - 0.3 * t * t : 1.5 * Math.min(1, 0.25 + t * 3) * (1 - 0.3 * t * t);
            items.push({ ref: f, kind: 'cube', x, y, color: s.colors[f.k], size: f.hop ? LOOSE_CUBE : BLOCK, scale: sc, ang: (1 - t) * 6, centered: true, shiny: SHINY });
        }

        // nest boxes (img/nest_box_*.png) in the nest's colour, each row drawn over the row above
        // it: the nests ants work for (the front row, and nests woken by Activate) are full height
        // inside a white frame (img/nest_frame.png); the other nests queued behind are lower, a little
        // brighter, with their numbers faded into their colour (FAR). The box art is 302 x 387, drawn TILE * 0.92 wide and placed by the centre of
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
            // the boxes stand over the 3D layer: an ant walking up to its nest goes behind it, as
            // under a raised box (their numbers are above them, D.labels)
            const sx = k * sc, sy = sx * (front ? 1 : 0.8), depth = D.three + 0.3 + ri * 0.01;
            const box = (this.nestBoxes[li] ??= this.add.image(0, 0, 'nest_frame').setOrigin(151 / 302, 136 / 387));
            // front nests; every nest waiting behind them keeps its colour, its number faded
            const far = !front, css = (c: number) => '#' + c.toString(16).padStart(6, '0');
            const boxHex = far ? css(brighten(hex, FAR.light)) : hex;
            box.setTexture(this.nestTexture(boxHex))
                .setPosition(nest.dx, y).setScale(sx, sy).setAlpha(alpha).setDepth(depth).setVisible(true);
            const frame = (this.nestFrames[li] ??= this.add.image(0, 0, 'nest_frame').setOrigin(167.5 / 335, 202 / 404));
            frame.setPosition(nest.dx, y + 48 * sy).setScale(sx, sy).setAlpha(alpha).setDepth(depth + 0.005).setVisible(front);
            const label = this.label(li++);
            label.setText(String(nest.need - nest.got)).setPosition(nest.dx, y + 2).setVisible(true);
            label.setFontSize(Math.round((front ? 50 : 46) * sc));
            // white number with a black stroke; further back it fades into the box's own colour
            if (!far) label.setColor('#ffffff').setStroke('#000000', (front ? 9 : 8) * sc);
            else if (lightness(hex) > 0.8) label.setColor(css(greyed(hex, 0.35, 150))).setStroke(css(greyed(hex, 0.6, 90)), 8 * sc);
            else label.setColor(css(greyed(boxHex, FAR.num, 255))).setStroke(css(greyed(hex, FAR.stroke, 0)), 8 * sc);
            label.setAlpha(alpha);
        }
        for (let i = li; i < this.nestBoxes.length; i++) { this.nestBoxes[i].setVisible(false); this.nestFrames[i].setVisible(false); }
        for (; li < this.labels.length; li++) this.labels[li].setVisible(false);

        // each ant's shadow lies along it, a little below and right of it (the light is up left),
        // over the belt and the nests, under the 3D layer
        s.ants.forEach((a, i) => {
            const sh = (this.antShadows[i] ??= this.add.image(0, 0, 'ant_shadow').setDepth(D.three - 0.05).setAlpha(0.85));
            sh.setPosition(a.x + 5, a.y + 18).setDisplaySize(100, 40).setRotation(a.ang).setVisible(true);
        });
        for (let i = s.ants.length; i < this.antShadows.length; i++) this.antShadows[i].setVisible(false);
        for (const a of s.ants) {
            items.push({ ref: a, kind: 'ant', x: a.x, y: a.y + 10, ang: a.ang, color: s.colors[a.nest.color], carry: a.carry ? parseInt(s.colors[a.carry].slice(1), 16) : null, shiny: SHINY });
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

    /** Ice over each frozen area: the picture shows through it tinted cool blue, cracked into
     * pale cells, with a soft white glow round its edge, and the number of nests still to remove
     * in the middle. */
    private drawIce() {
        for (const f of this.ice) f.box.destroy();
        this.ice = [];
        const s = this.sim;
        s.frozen.forEach((f, i) => {
            const w = (f.x1 - f.x0 + 1) * s.gsx, h = (f.y1 - f.y0 + 1) * s.gs;
            const box = this.add.container(s.ox + f.x0 * s.gsx + w / 2, s.oy + f.y0 * s.gs + h / 2).setDepth(D.sand + 0.3);
            const { key, margin } = this.frostTexture('ice' + i, f.x0, f.y0, f.x1, f.y1, f.def.shape === 'circle', 77 + this.levelIndex * 13 + i);
            const text = this.text(0, 2, String(f.count), Math.round(Math.min(52, Math.max(28, Math.min(w, h) * 0.2))), '#1b2a4a', '#ffffff', 8);
            box.add([this.add.image(0, 0, key).setDisplaySize(w + 2 * margin * s.gsx, h + 2 * margin * s.gs), text]);
            this.ice.push({ box, text, count: f.count, broken: f.broke !== null });
            if (f.broke !== null) box.setVisible(false);
        });
    }

    /** The ice for one frozen area, drawn once (the sand under it cannot change while it is
     * frozen): the grains under it, softened and tinted cool blue; pale cracks between ice cells
     * (a Voronoi pattern, each cell a little lighter or darker); a white glow along the inside
     * of its edge and round its outside. The texture has a `margin` (in grains) on every side
     * for the outer glow. */
    private frostTexture(key: string, x0: number, y0: number, x1: number, y1: number, round: boolean, seed: number) {
        const s = this.sim, cw = x1 - x0 + 1, ch = y1 - y0 + 1, k = 6, W = cw * k, H = ch * k, margin = 7, M = margin * k;
        const src = document.createElement('canvas');
        src.width = cw; src.height = ch;
        const img = src.getContext('2d')!.createImageData(cw, ch), px = new Uint32Array(img.data.buffer);
        for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
            // on a scroll painting, part of it may still be hidden above the frame
            px[y * cw + x] = s.colorAt(x0 + x, y0 + y) || 0xffffd2b5;
        }
        src.getContext('2d')!.putImageData(img, 0, 0);

        // the cracks: pale lines where two ice cells meet, each cell a little lighter or darker
        const rnd = mulberry32(seed), n = Math.max(8, Math.min(60, Math.round((cw * ch) / 130)));
        const pts = Array.from({ length: n }, () => [rnd() * W, rnd() * H, rnd()] as const);
        const crack = document.createElement('canvas');
        crack.width = W; crack.height = H;
        const ci = crack.getContext('2d')!.createImageData(W, H), cd = ci.data, edge = 2.4 * k;
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
            let d1 = Infinity, d2 = Infinity, c = 0;
            for (let j = 0; j < n; j++) {
                const d = Math.hypot(pts[j][0] - x, pts[j][1] - y);
                if (d < d1) { d2 = d1; d1 = d; c = j; } else if (d < d2) d2 = d;
            }
            const line = Math.max(0, 1 - (d2 - d1) / edge) ** 2, a = Math.min(1, line * 0.6 + pts[c][2] * 0.08 + (d1 / (d1 + d2)) ** 2 * 0.24);
            const q = (y * W + x) * 4;
            cd[q] = 255; cd[q + 1] = 255; cd[q + 2] = 255; cd[q + 3] = Math.round(a * 255);
        }
        crack.getContext('2d')!.putImageData(ci, 0, 0);

        if (this.textures.exists(key)) this.textures.remove(key);
        const tex = this.textures.createCanvas(key, W + 2 * M, H + 2 * M)!, ctx = tex.getContext();
        const path = () => {
            ctx.beginPath();
            if (round) ctx.ellipse(M + W / 2, M + H / 2, W / 2, H / 2, 0, 0, Math.PI * 2);
            else ctx.roundRect(M, M, W, H, 1.5 * k);
        };
        // the glow round its outside
        ctx.save();
        ctx.shadowColor = 'rgba(200, 228, 255, 1)'; ctx.shadowBlur = 5 * k;
        ctx.fillStyle = 'rgba(200, 228, 255, 1)';
        path(); ctx.fill(); ctx.fill();
        ctx.restore();
        // the ice itself
        ctx.save();
        path(); ctx.clip();
        ctx.clearRect(M, M, W, H);
        ctx.filter = `blur(${0.5 * k}px)`;
        ctx.drawImage(src, M - k, M - k, W + 2 * k, H + 2 * k);
        ctx.filter = 'none';
        ctx.fillStyle = 'rgba(95, 135, 245, 0.68)';
        ctx.fillRect(M, M, W, H);
        ctx.drawImage(crack, M, M);
        // the white glow along the inside of its edge
        ctx.filter = `blur(${2 * k}px)`;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'; ctx.lineWidth = 3.4 * k;
        path(); ctx.stroke();
        ctx.filter = 'none';
        ctx.restore();
        path();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; ctx.lineWidth = 0.5 * k; ctx.stroke();
        tex.refresh();
        return { key, margin };
    }

    /** The ice follows the frozen areas: the number pops as it counts down; at 0 the ice
     * shatters, its pieces flying out and falling, and fades. */
    private stepIce() {
        const s = this.sim;
        this.sim.frozen.forEach((f, i) => {
            const v = this.ice[i];
            if (!v || v.broken) return;
            // on a scroll painting the ice slides down with the picture; it shows once it is
            // wholly out from under the roller
            if (s.scroll) {
                v.box.y = s.oy + (f.y0 + (f.y1 - f.y0 + 1) / 2) * s.gs;
                v.box.setVisible(s.oy + f.y0 * s.gs >= PIC.y + s.scroll.strip * s.gs - 2);
            }
            if (f.count !== v.count) {
                v.count = f.count;
                v.text.setText(String(Math.max(0, f.count)));
                this.tweens.add({ targets: v.text, scale: { from: 1.45, to: 1 }, duration: 260, ease: 'Back.Out' });
            }
            if (f.broke === null) return;
            v.broken = true;
            // ice still hidden above the frame just goes
            if (!v.box.visible) return;
            const { x, y } = v.box, b = v.box.getBounds();
            this.tweens.add({ targets: v.box, alpha: 0, scale: 1.12, duration: 320, ease: 'Quad.Out', onComplete: () => v.box.setVisible(false) });
            for (let k = 0; k < 18; k++) {
                const sx = x + (Math.random() - 0.5) * b.width * 0.8, sy = y + (Math.random() - 0.5) * b.height * 0.8, sz = 10 + Math.random() * 18;
                const shard = this.add.triangle(sx, sy, 0, 0, sz, sz * 0.3, sz * 0.4, sz, 0xdff0ff, 0.95).setStrokeStyle(1.5, 0xffffff).setDepth(D.fx);
                const vx = (sx - x) * 2.2 + (Math.random() - 0.5) * 120, vy = -120 - Math.random() * 160;
                this.tweens.add({ targets: shard, x: sx + vx * 0.7, y: sy + vy * 0.7 + 380, angle: (Math.random() - 0.5) * 540, alpha: 0, duration: 700 + Math.random() * 300, ease: 'Quad.In', onComplete: () => shard.destroy() });
            }
        });
    }

    /** Scroll painting: the limit line across the frame (a dashed line with double chevrons under
     * it, pointing down), and a glass roller across the frame's top (see stepScrollHint). Nothing
     * for a picture that fits the frame. */
    private drawScroll() {
        const s = this.sim, S = s.scroll;
        this.scrollGfx ??= this.add.graphics().setDepth(D.sand + 0.05);
        this.scrollHint ??= this.add.image(0, 0, '__WHITE').setOrigin(0).setDepth(D.sand + 0.2);
        this.scrollGlass ??= this.add.image(0, 0, '__WHITE').setOrigin(0.5).setDepth(D.sand + 0.21);
        this.scrollCaps ??= this.add.graphics().setDepth(D.sand + 0.22);
        this.scrollGfx.clear();
        this.scrollCaps.clear().setVisible(!!S);
        this.scrollSlid = -1;
        this.scrollHint.setVisible(!!S);
        this.scrollGlass.setVisible(!!S);
        if (!S) return;
        const g = this.scrollGfx, y = s.oy + S.line * s.gs, x0 = INNER.x + 18, x1 = INNER.x + INNER.w - 18;
        g.lineStyle(4, 0x5b6fb5, 0.9);
        for (let x = x0; x < x1; x += 26) g.lineBetween(x, y, Math.min(x1, x + 16), y);
        g.lineStyle(5, 0x8193d0, 0.75);
        for (let i = 0; i < 4; i++) {
            const cx = INNER.x + (INNER.w * (i + 0.5)) / 4;
            for (const dy of [16, 30]) { g.lineBetween(cx - 13, y + dy, cx, y + dy + 10); g.lineBetween(cx, y + dy + 10, cx + 13, y + dy); }
        }
        const h = S.strip * s.gs;
        this.scrollGlass.setTexture(this.glassTexture(INNER.w, h)).setPosition(INNER.x + INNER.w / 2, PIC.y + h / 2);
        this.stepScrollHint();
    }
    /** The roller's glass (drawn once): a pale blue tint, slanting sheen bands, a highlight along
     * its top, white rims top and bottom, and a cap at each end standing out past the frame (its
     * ridges are drawn as it turns, see drawCaps). */
    private glassTexture(w: number, h: number) {
        const key = 'scroll_glass', CAP = 26, OUT = 14, PAD = 8;
        if (this.textures.exists(key)) this.textures.remove(key);
        const W = w + 2 * OUT, H = h + 2 * PAD, tex = this.textures.createCanvas(key, W, H)!, ctx = tex.getContext();
        const x0 = OUT, y0 = PAD;
        // the glass
        const tint = ctx.createLinearGradient(0, y0, 0, y0 + h);
        tint.addColorStop(0, 'rgba(255, 255, 255, 0.55)'); tint.addColorStop(0.35, 'rgba(220, 236, 255, 0.18)');
        tint.addColorStop(0.8, 'rgba(190, 215, 255, 0.12)'); tint.addColorStop(1, 'rgba(150, 185, 245, 0.35)');
        ctx.fillStyle = tint; ctx.fillRect(x0, y0, w, h);
        // slanting sheen bands, in pairs
        ctx.save();
        ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        for (const [f, bw] of [[0.36, 26], [0.43, 12], [0.74, 34], [0.83, 14]] as const) {
            const cx = x0 + w * f, k = h * 0.6;
            ctx.beginPath(); ctx.moveTo(cx + k, y0); ctx.lineTo(cx + k + bw, y0); ctx.lineTo(cx - k + bw, y0 + h); ctx.lineTo(cx - k, y0 + h); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        // white rims: a thin one along the top, a thicker one along the bottom with a soft shade above
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(x0, y0, w, 3);
        ctx.fillStyle = 'rgba(110, 140, 200, 0.35)'; ctx.fillRect(x0, y0 + h - 7, w, 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.98)'; ctx.fillRect(x0, y0 + h - 5, w, 5);
        // the end caps: rounded, white to pale blue, with ridges across them
        for (const cx of [CAP / 2, W - CAP / 2]) {
            const g = ctx.createLinearGradient(cx - CAP / 2, 0, cx + CAP / 2, 0);
            g.addColorStop(0, '#dfe9fb'); g.addColorStop(0.45, '#ffffff'); g.addColorStop(1, '#c9d8f3');
            ctx.fillStyle = g; ctx.strokeStyle = '#9fb3dc'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.roundRect(cx - CAP / 2, 1, CAP, H - 2, 7); ctx.fill(); ctx.stroke();
        }
        tex.refresh();
        return key;
    }
    /** The colours in the roller: the picture's next hidden rows above each part of the frame,
     * averaged into a few broad patches and washed pale, so the player sees what is coming but
     * not its detail; redrawn as the picture slides, the frame's light blue once nothing is hidden. */
    /** The end caps' ridges: the caps are the ends of a turning roller, so ridges round them come
     * over the top, run down the front (widest and darkest face on) and go round underneath. The
     * roller turns as the picture slides down: its front moves down as far as the picture has. */
    private drawCaps() {
        const s = this.sim, S = s.scroll, g = this.scrollCaps;
        if (!S || !g) return;
        const CAP = 26, OUT = 14, PAD = 8, N = 16, h = S.strip * s.gs, H = h + 2 * PAD, R = (H - 6) / 2, cy = PIC.y + h / 2;
        const phase = (S.slid * s.gs) / R;
        g.clear();
        for (const cx of [INNER.x - OUT + CAP / 2, INNER.x + INNER.w + OUT - CAP / 2]) {
            for (let i = 0; i < N; i++) {
                const a = phase + (i * 2 * Math.PI) / N, face = Math.cos(a);
                if (face < 0.12) continue;
                const y = cy + R * Math.sin(a);
                g.lineStyle(0.8 + 1.4 * face, 0x8ca0cd, 0.2 + 0.6 * face);
                g.lineBetween(cx - CAP / 2 + 4, y, cx + CAP / 2 - 4, y);
            }
        }
    }
    private stepScrollHint() {
        const s = this.sim, S = s.scroll, img = this.scrollHint;
        if (!S || !img || S.slid === this.scrollSlid) return;
        this.scrollSlid = S.slid;
        this.drawCaps();
        const ROWS = 24, BAND = 8, COL = 4, G = s.G, C = Math.ceil(G / COL), R = ROWS / BAND, BASE = [207, 227, 255], WASH = 0.3;
        const key = 'scroll_hint';
        if (!this.textures.exists(key) || this.textures.get(key).getSourceImage().width !== C) {
            if (this.textures.exists(key)) this.textures.remove(key);
            this.textures.createCanvas(key, C, R)!.setFilter(Phaser.Textures.FilterMode.LINEAR);
        }
        const tex = this.textures.get(key) as Phaser.Textures.CanvasTexture, ctx = tex.getContext();
        const data = ctx.createImageData(C, R), d = data.data;
        for (let cx = 0; cx < C; cx++) for (let b = 0; b < R; b++) {
            // band b: R - 1 is the band just above the roller's bottom (the next rows to come in)
            let r = 0, g = 0, bl = 0, n = 0;
            for (let x = cx * COL; x < Math.min(G, cx * COL + COL); x++) for (let j = 0; j < BAND; j++) {
                const c = s.colorAt(x, S.open[x] - 1 - (R - 1 - b) * BAND - j);
                if (!c) continue;
                r += c & 255; g += (c >> 8) & 255; bl += (c >> 16) & 255; n++;
            }
            const full = COL * BAND, k = n / full, q = (b * C + cx) * 4;
            const mix = (v: number, i: number) => Math.round(((n ? v / n : BASE[i]) * k + BASE[i] * (1 - k)) * (1 - WASH) + 255 * WASH);
            d[q] = mix(r, 0); d[q + 1] = mix(g, 1); d[q + 2] = mix(bl, 2); d[q + 3] = 255;
        }
        ctx.putImageData(data, 0, 0);
        tex.refresh();
        img.setTexture(key).setPosition(INNER.x, PIC.y).setDisplaySize(INNER.w, S.strip * s.gs);
    }

    /** The picture frame and its funnel (one piece of art, its spout ending in a gate just above
     * the belt), its light blue inside scaled onto INNER (sand is drawn on top). */
    private drawBoard() {
        const A = FRAME_ART, kx = INNER.w / A.w, ky = INNER.h / A.h, x = INNER.x - A.x * kx, y = INNER.y - A.y * ky;
        this.add.image(x, y, 'frame').setOrigin(0).setDisplaySize(A.imgW * kx, A.imgH * ky).setDepth(D.board);
        // the sand is cut grain by grain at the board's rounded top corners, so its edge steps;
        // over it lie the art's own corners, cut along the smooth curve (RIM_IN), so the corners
        // look as round as the art's
        const key = 'frame_corners';
        if (!this.textures.exists(key)) {
            const top = RIM_IN.filter(([ay]) => ay <= A.y + 50), y1 = top[top.length - 1][0], cw = top[0][1] + 4;
            const src = this.textures.get('frame').getSourceImage() as HTMLImageElement;
            const tex = this.textures.createCanvas(key, A.w, y1 - A.y + 2)!, ctx = tex.getContext();
            for (const side of [-1, 1]) {
                // one corner: from the frame's side in to the curve, row by row, smoothed
                const ex = side < 0 ? 0 : A.w;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(ex, -1);
                for (const [ay, inset] of top) ctx.lineTo(ex - side * inset, ay - A.y);
                ctx.lineTo(ex, y1 - A.y + 1);
                ctx.closePath();
                ctx.clip();
                const sx = side < 0 ? A.x : A.x + A.w - cw;
                ctx.drawImage(src, sx, A.y, cw, y1 - A.y + 2, sx - A.x, 0, cw, y1 - A.y + 2);
                ctx.restore();
            }
            tex.refresh();
        }
        this.add.image(INNER.x, INNER.y, key).setOrigin(0).setScale(kx, ky).setDepth(D.sand + 0.1);
    }

    /** The belt art (img/conveyor.png, 1872 x 454, with its own hollow in the wood drawn round
     * it): its slate band with its dark outline (x 64 to 1807, y 61 to 393 of the art, centred on
     * its middle row) lies on the track, 2 x (BELT.r + BELT.band / 2) tall; only its middle is
     * stretched, so the round ends keep their shape. Its fill gauge (drawGauge) runs
     * along the middle. */
    private drawBeltBase() {
        if (RULES.yard) { this.drawYard(); return; }
        const R = BELT.r + BELT.band / 2, k = (2 * R) / 332, w = (BELT.cxR - BELT.cxL + 2 * R) / k + 64 + 64;
        this.add.nineslice(540, BELT.cy, 'conveyor', undefined, w, undefined, 250, 250, 0, 0).setScale(k).setDepth(D.belt - 0.5);
        this.drawGauge();
    }

    /** The fill gauge at GAUGE: a dark navy track with a white rim; the fill grows along it from
     * the left, in GAUGE_COLOURS by how full the conveyor (or yard) is; a navy label with a white
     * rim stays in the middle, showing the percentage. */
    private drawGauge() {
        const { x, y } = GAUGE, w = GAUGE_TRACK.w, h = GAUGE_TRACK.h, g = this.add.graphics().setDepth(D.belt + 0.1);
        g.fillStyle(0xf5f7ff, 1).fillRoundedRect(x - w / 2 - 6, y - h / 2 - 6, w + 12, h + 12, h / 2 + 6);
        g.lineStyle(2, 0x283064, 0.35).strokeRoundedRect(x - w / 2 - 6, y - h / 2 - 6, w + 12, h + 12, h / 2 + 6);
        g.fillStyle(0x22396b, 1).fillRoundedRect(x - w / 2, y - h / 2, w, h, h / 2);
        const fh = h - 6;
        this.fullBars = GAUGE_COLOURS.map(({ c }, i) =>
            this.add.nineslice(x - w / 2 + 3, y, this.gaugeFill(i, c, fh), undefined, fh * 2, fh, fh / 2 + 1, fh / 2 + 1, 0, 0)
                .setOrigin(0, 0.5).setDepth(D.belt + 0.2).setVisible(false));
        const lw = 68, lh = 34, l = this.add.graphics().setDepth(D.belt + 0.3);
        l.fillStyle(0x1e2c57, 1).fillRoundedRect(x - lw / 2, y - lh / 2, lw, lh, 12);
        l.lineStyle(3, 0xffffff, 1).strokeRoundedRect(x - lw / 2, y - lh / 2, lw, lh, 12);
    }
    /** One of the gauge's fills (a rounded bar `h` tall, stretched across by a nine-slice): light on
     * top, deeper below (colours c: top, middle, bottom), with a white shine along its top. */
    private gaugeFill(i: number, c: string[], h: number) {
        const key = `gauge_fill_${i}`;
        if (this.textures.exists(key)) return key;
        const w = h * 2, tex = this.textures.createCanvas(key, w, h)!, ctx = tex.getContext();
        const pill = (x: number, y: number, pw: number, ph: number) => { ctx.beginPath(); ctx.roundRect(x, y, pw, ph, ph / 2); };
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, c[0]); grad.addColorStop(0.45, c[1]); grad.addColorStop(1, c[2]);
        ctx.fillStyle = grad; pill(0, 0, w, h); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; pill(h * 0.3, 3, w - h * 0.6, 5); ctx.fill();
        tex.refresh();
        return key;
    }

    /** Variant 3's yard in place of the conveyor, sunk into the table like the conveyor art: from
     * the outside in, a hollow cut in the wood (darker at the top, lit at the bottom), a navy
     * outline, a white rim, a lilac band, and the floor with a soft shadow round its edge, where the
     * blocks lie. Its rounded corners stay the yard's own. Drawn once into a canvas texture; its
     * fill gauge is under it. */
    private drawYard() {
        this.drawGauge();
        const { x0, x1, y0, y1 } = YARD, w = x1 - x0, h = y1 - y0, r = 34, out = 22, key = 'yard_tray';
        if (!this.textures.exists(key)) {
            const tex = this.textures.createCanvas(key, w + 2 * out, h + 2 * out)!, c = tex.getContext();
            const ring = (pad: number, fill: string | CanvasGradient) => {
                c.beginPath(); c.roundRect(out - pad, out - pad, w + 2 * pad, h + 2 * pad, r + pad); c.fillStyle = fill; c.fill();
            };
            const wood = c.createLinearGradient(0, 0, 0, h + 2 * out);
            wood.addColorStop(0, '#d38a4c'); wood.addColorStop(1, '#fbe6c8');
            ring(22, wood); ring(18, '#2b3258'); ring(13, '#eef0ff'); ring(7, '#aeb6ee'); ring(2, '#99a1c4');
            // the floor's shadow: a dark line just outside it, blurred, seen only inside the floor
            c.save();
            c.beginPath(); c.roundRect(out - 2, out - 2, w + 4, h + 4, r + 2); c.clip();
            c.shadowColor = 'rgba(20,22,50,0.85)'; c.shadowBlur = 16; c.lineWidth = 12; c.strokeStyle = 'rgba(20,22,50,1)';
            c.beginPath(); c.roundRect(out - 8, out - 8, w + 16, h + 16, r + 8); c.stroke();
            c.restore();
            tex.refresh();
        }
        this.add.image(x0 - out, y0 - out, key).setOrigin(0).setDepth(D.belt - 0.5);
    }

    private drawBelt() {
        const s = this.sim;
        this.drawFill();
        // the holders ride round with the belt, one under each slot
        this.holds.forEach((h, i) => { const [x, y] = s.slotPos(i); h.setPosition(x, y + 4); });
        // a loose belt's arrows ride round with it too, each pointing the way it runs
        this.arrows.forEach((a, i) => {
            const at = (s.beltOff + (i * BELT_LEN) / BELT_ARROWS) % BELT_LEN;
            const [x, y] = beltPoint(at), [x2, y2] = beltPoint((at + 2) % BELT_LEN);
            a.setPosition(x, y).setRotation(Math.atan2(y2 - y, x2 - x));
        });
    }

    /** How full the conveyor (or yard) is: the gauge fills from the left, light blue, then orange,
     * deep orange and red (pulsing a little) as it nears full (GAUGE_COLOURS). */
    private drawFill() {
        const s = this.sim, used = s.slots.filter(Boolean).length, pct = Math.round((100 * used) / s.slots.length);
        let level = 0;
        GAUGE_COLOURS.forEach((g, i) => { if (pct >= g.at) level = i; });
        const t = this.time.now / 1000, fh = GAUGE_TRACK.h - 6, full = GAUGE_TRACK.w - 6;
        this.fullBars.forEach((b, i) => {
            b.setVisible(pct > 0 && i === level).width = Math.max(fh * 2, (full * pct) / 100);
            b.setAlpha(i === GAUGE_COLOURS.length - 1 ? 0.88 + 0.12 * Math.sin(t * 12) : 1);
        });
        this.fullText.setText(pct + '%');
    }

    // ---------- UI ----------
    private text(x: number, y: number, str: string, size: number, color = '#ffffff', stroke: string | null = '#3a3550', thick = 8) {
        const t = this.add.text(x, y, str, { fontFamily: FONT, fontSize: `${size}px`, color, align: 'center' }).setOrigin(0.5);
        if (stroke) t.setStroke(stroke, thick);
        return t;
    }

    /** The nest box art in colour `hex` (made once per colour), from the box art whose colour is
     * nearest. Each pixel of the art is read as its top face's colour, shaded (k) and mixed with
     * white (a): k * face * (1 - a) + a, solved from the pixel's brightest and dimmest channels.
     * The pixel is then made the same way from the new colour, with its white mixed in so that it
     * stands out from the face at least as much as in the art, so the light ring on the top face
     * shows clearly on every box (a light colour takes more white, up to all of it). A near-white
     * box's face is drawn a little greyer so its ring still shows. */
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
        const lum = (c: number[]) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
        let T = rgb.map((v) => v / 255);
        if (Math.min(...T) > 0.75) T = T.map((v) => v * (0.84 / Math.max(...T)));
        const F = base.map((v) => v / 255), fHi = Math.max(...F), fLo = Math.min(...F);
        // white that lifts the art's face by some amount lifts the new face by at least as much
        // (dark colours keep the art's amount of white, so their ring stays as bright)
        const more = Math.max(1, (1 - lum(F)) / Math.max(0.05, 1 - lum(T)));
        for (let p = 0; p < d.length; p += 4) {
            if (!d[p + 3]) continue;
            const hi = Math.max(d[p], d[p + 1], d[p + 2]) / 255, lo = Math.min(d[p], d[p + 1], d[p + 2]) / 255;
            const q = Math.max(0, (hi - lo) / (fHi - fLo)), a = Math.min(1, Math.max(0, lo - q * fLo));
            const k = a < 1 ? q / (1 - a) : 0, a2 = Math.min(1, a * more);
            for (let c = 0; c < 3; c++) d[p + c] = Math.min(1, Math.max(0, k * T[c] * (1 - a2) + a2)) * 255;
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
        if (this.overlay || this.sim.state !== 'play' || this.fanFx || this.shuffleFx) return;
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
        if (b.uses <= 0) { this.showBuyBooster(i); return; }
        if (i === 0) {
            if (this.sim.cols.some((col, ci) => col.some((_n, ri) => this.canWake(ci, ri)))) this.setPicking(true);
            return;
        }
        this.setPicking(false);
        if (i === 1) { if (this.sim.canShuffle()) { this.setUses(i, b.uses - 1); this.startShuffle(); } }
        else if (this.sim.slots.some(Boolean)) this.startFan();
    }

    // ---------- Shuffle booster animation ----------
    /** The game holds still and the nests pulse for a moment, then trade places. */
    private startShuffle() {
        for (const col of this.sim.cols) for (const n of col) n.bump = 1;
        this.shuffleFx = { t: 0, swapped: false };
    }
    private stepShuffle(dt: number) {
        const f = this.shuffleFx!;
        f.t += dt;
        this.sim.stepNestsOnly(dt);
        if (!f.swapped && f.t >= SHUFFLE.focus) { f.swapped = true; this.sim.shuffle(); }
        if (f.t >= SHUFFLE.focus + SHUFFLE.move) this.endShuffle();
    }
    private endShuffle() { this.shuffleFx = null; }

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
        for (let i = 0; i < s.slots.length; i++) {
            if (!s.slots[i]) continue;
            const [x, y] = s.blockPos(i);
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

    /** The coin panel, top right (in the HUD and on the Win screen), as a container at its coin's
     * centre (COIN_AT): a white pill with a light blue rim and the count, the Win screen's coin
     * over its left end and a green plus under the coin. Its children: pill, coin, count, plus. */
    private coinPanel() {
        const pw = 270, ph = 74, c = this.add.container(COIN_AT.x, COIN_AT.y);
        const pill = this.add.graphics();
        pill.fillStyle(0x9fc3ea).fillRoundedRect(-6, -ph / 2, pw, ph, ph / 2);
        pill.fillStyle(0xf4f8fd).fillRoundedRect(-1, -ph / 2 + 5, pw - 10, ph - 10, ph / 2 - 5);
        pill.fillStyle(0xdfe9f6).fillRoundedRect(-1, 4, pw - 10, ph / 2 - 9, { tl: 0, tr: 0, bl: ph / 2 - 5, br: ph / 2 - 5 });
        c.add([
            pill,
            this.add.image(0, 0, 'icon_coin').setDisplaySize(92, 104),
            this.text(pw / 2 + 24, -2, String(this.coins), 50, '#1f4fa8', null),
            this.add.image(34, 38, 'badge_plus').setDisplaySize(44, 44),
        ]);
        return c;
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
        // coins, top right: a white pill with a light blue rim and the count, the Win screen's coin
        // over its left end and a green plus under the coin (the prototype has no coins yet)
        this.coinLabel = this.coinPanel().setDepth(D.hud).getAt(2) as Phaser.GameObjects.Text;
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

    /** Once all the picture's sand is swept (none of it fixed any more, though some may still be
     * falling), the rest of the level (the sand falling, funnel, belt, ants) runs at x2 and the x2 button hides, so it cannot be turned off; the next level gives
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
        const panel = this.coinPanel();
        box.add(panel);
        let paid = false;
        const pay = (n: number) => () => {
            if (paid) return;
            paid = true;
            this.collectCoins(box, panel, 480, 1170, n, () => this.startLevel((this.levelIndex + 1) % levelCount()));
        };
        const claim = this.add.container(540, 1400);
        claim.add([
            this.add.image(0, 0, 'btn_reward'),
            this.add.image(-150, -52, 'icon_ads').setDisplaySize(112, 109).setAngle(-6),
            this.text(40, -56, 'Claim x2', 64, '#ffffff', '#a8480a', 10),
            this.add.image(-38, 76, 'icon_coin').setDisplaySize(48, 54),
            this.text(26, 74, '80', 52, '#ffffff', '#a8660a', 8),
        ]);
        pop(this.tapTarget(claim, 517, 304, pay(80), 'claim'), 1, 900);
        const cont = this.add.container(540, 1660);
        cont.add([this.add.image(0, 0, 'btn_continue'), this.text(0, -8, 'Continue', 68, '#ffffff', '#1f7a12', 10)]);
        pop(this.tapTarget(cont, 472, 210, pay(40), 'continue'), 0.9, 1050);
        this.overlayBox = box;
    }

    /** The coins won fly from (x, y) up into the Win screen's coin panel, one after another; each
     * one that lands bumps the panel's coin and adds its share to the count. Once all are in, the
     * count holds a moment and `done` runs. */
    private collectCoins(box: Phaser.GameObjects.Container, panel: Phaser.GameObjects.Container, x: number, y: number, n: number, done: () => void) {
        const count = panel.getAt(2) as Phaser.GameObjects.Text, coin = panel.getAt(1) as Phaser.GameObjects.Image;
        const from = this.coins, k = 10, to = (this.coins += n);
        this.coinLabel.setText(String(to));
        let landed = 0;
        for (let i = 0; i < k; i++) {
            const c = this.add.image(x + Phaser.Math.Between(-50, 50), y + Phaser.Math.Between(-40, 40), 'icon_coin').setDisplaySize(70, 79);
            box.add(c);
            const s = c.scale;
            c.setScale(0);
            this.tweens.chain({
                targets: c,
                tweens: [
                    { scale: s, duration: 160, delay: i * 70, ease: 'Back.Out' },
                    { x: COIN_AT.x, y: COIN_AT.y, scale: s * 0.8, duration: 520, ease: 'Cubic.In' },
                ],
                onComplete: () => {
                    c.destroy();
                    landed++;
                    count.setText(String(Math.round(from + (n * landed) / k)));
                    this.sfx('pick', 0.6);
                    this.tweens.killTweensOf(coin);
                    coin.setDisplaySize(92, 104);
                    this.tweens.add({ targets: coin, scale: coin.scale * 1.2, duration: 70, yoyo: true });
                    if (landed === k) this.time.delayedCall(500, done);
                },
            });
        }
    }

    /** Make a button container tappable over its art's w x h (clicks go to `onTap`). */
    /** Where a demo target is and how to tap it (see DemoHost.target in demo.ts). */
    private demoTarget(name: string) {
        const [kind, arg] = name.split(':');
        if (kind === 'booster') {
            const i = +arg, b = BOOSTER_POS[i];
            return { x: b.x, y: b.y - 6, tap: () => this.useBooster(i) };
        }
        if (kind === 'nest') {
            const [ci, ri] = arg.split(',').map(Number), n = this.sim.cols[ci]?.[ri];
            if (!n || n.dx === null || n.dy === null) return null;
            const x = n.dx, y = n.dy;
            return { x, y, tap: () => this.onDown({ x, y } as Phaser.Input.Pointer, []) };
        }
        const t = this.taps.get(name);
        if (!t || !t.c.active || t.c.scale < 0.85) return null;
        const r = t.c.getBounds();
        return { x: r.centerX, y: r.centerY, tap: t.onTap };
    }

    private tapTarget(c: Phaser.GameObjects.Container, w: number, h: number, onTap: () => void, name?: string) {
        if (name) this.taps.set(name, { c, onTap });
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
        this.spending = false;
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
        box.add(this.text(W - 20, H - 24, __APP_VERSION__ + (VARIANT === 1 ? '' : ` · variant ${VARIANT}`), 24, '#fffbe8', null).setOrigin(1, 0.5));
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

    /** Lost (the conveyor is full): revive with an ad or with REVIVE_PRICE coins (the cannon
     * clears the belt and play goes on; the prototype has no ads, so Free just revives), or give
     * up with the close button. The coin panel shows over the dim. */
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
            this.text(38, -14, String(REVIVE_PRICE), 58, '#ffffff', '#1f7a12', 10),
        ]);
        const panel = this.coinPanel();
        this.overlayBox!.add(panel);
        board.add([this.tapTarget(ad, 323, 194, revive, 'free'), this.tapTarget(coins, 319, 196, () => this.spend(REVIVE_PRICE, panel, coins, revive), 'coins')]);
    }

    /** A booster with no uses left (the green plus) opens its purchase popup; the game holds
     * still. Free (an ad in the Unity game) gives 1; BOOSTER_PRICE coins give BOOSTER_PACK. Either
     * closes the popup and play goes on; ✕ closes it without buying. */
    private showBuyBooster(i: number) {
        this.overlay = 'buy';
        this.paused = true;
        this.setPicking(false);
        const [name, line] = BOOSTER_INFO[i];
        const board = this.losePanel(name, () => this.closeOverlay());
        const panel = this.coinPanel();
        this.overlayBox!.add(panel);
        const base = this.add.image(0, -150, 'bst_btn').setScale(0.62);
        const icon = this.add.image(0, -158, BOOSTER_IMAGES[i]);
        icon.setScale(170 / Math.max(icon.width, icon.height));
        board.add([base, icon, this.text(0, 110, line, 42, '#1f4fa8', null)]);
        const give = (n: number) => { this.closeOverlay(); this.setUses(i, this.boosters[i].uses + n); this.boosters[i].bump = 1; this.sfx('add'); };
        const ad = this.add.container(-170, 300);
        ad.add([
            this.add.image(0, 0, 'lose_btn_rv').setScale(0.66),
            this.add.image(-70, -12, 'lose_icon_rv').setDisplaySize(84, 85),
            this.text(42, -14, '+1', 58, '#ffffff', '#a8480a', 10),
        ]);
        const coins = this.add.container(170, 300);
        coins.add([
            this.add.image(0, 0, 'lose_btn_purchase').setScale(0.8),
            this.add.image(-90, -12, 'lose_icon_coin').setDisplaySize(56, 61),
            this.text(10, -14, String(BOOSTER_PRICE), 50, '#ffffff', '#1f7a12', 9),
            this.text(98, -14, '+' + BOOSTER_PACK, 50, '#fff36b', '#1f7a12', 9),
        ]);
        board.add([this.tapTarget(ad, 323, 194, () => give(1), 'buy_free'), this.tapTarget(coins, 319, 196, () => this.spend(BOOSTER_PRICE, panel, coins, () => give(BOOSTER_PACK)), 'buy_coins')]);
    }

    /** Pay `n` coins from an overlay's coin panel, then run `then`: the count runs down, a coin
     * flies from the panel to the button `btn` and `then` runs as it lands. Without enough coins
     * the panel and the button shake, "Not enough coins!" floats up, and nothing is bought. */
    private spend(n: number, panel: Phaser.GameObjects.Container, btn: Phaser.GameObjects.Container, then: () => void) {
        const count = panel.getAt(2) as Phaser.GameObjects.Text;
        if (this.spending) return;
        if (this.coins < n) {
            for (const o of [panel, btn]) {
                const x = o.x;
                this.tweens.add({ targets: o, x: x + 12, duration: 50, yoyo: true, repeat: 3, onComplete: () => o.setX(x) });
            }
            const r = btn.getBounds(), msg = this.text(r.centerX, r.top - 20, 'Not enough coins!', 44, '#ffffff', '#b8202a', 9);
            this.overlayBox!.add(msg);
            this.tweens.add({ targets: msg, y: msg.y - 70, alpha: 0, delay: 600, duration: 500, onComplete: () => msg.destroy() });
            return;
        }
        this.spending = true;
        const from = this.coins;
        this.coins -= n;
        this.coinLabel.setText(String(this.coins));
        this.tweens.addCounter({ from, to: this.coins, duration: 400, onUpdate: (t) => count.setText(String(Math.round(t.getValue() ?? 0))) });
        const r = btn.getBounds(), c = this.add.image(COIN_AT.x, COIN_AT.y, 'icon_coin').setDisplaySize(70, 79);
        this.overlayBox!.add(c);
        this.tweens.add({
            targets: c, x: r.centerX, y: r.centerY, scale: c.scale * 0.7, duration: 450, ease: 'Cubic.In',
            onComplete: () => { c.destroy(); this.sfx('pick', 0.6); this.time.delayedCall(250, () => { this.spending = false; then(); }); },
        });
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
        board.add(this.tapTarget(btn, 471, 210, again, 'try'));
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
        if (this.sfxMute) return;
        // recording runs on the game clock, so a sound is placed on the frame it is made in
        const now = this.capture ? this.time.now : performance.now();
        if (this.lastSfx[name] && now - this.lastSfx[name] < 60) return;
        this.lastSfx[name] = now;
        if (this.capture) { if (this.prefs.sound) this.sfxLog.push([name, vol, (now - this.sfxT0) / 1000]); return; }
        if (this.prefs.vibe && VIBES[name]) navigator.vibrate?.(VIBES[name]!);
        if (this.sound.locked || !this.prefs.sound) return;
        this.sound.play(name, { volume: vol });
    }

    /** Frame-by-frame recording: the reel starts at once (no Tap to play) and each step() runs one
     * frame of exactly 1/CAPTURE_FPS s, however long it takes to draw and grab, so the video is
     * smooth. The recorder grabs the page after each step. */
    private startCapture(length: number) {
        const game = this.game, ms = 1000 / CAPTURE_FPS;
        this.capture = true;
        game.loop.sleep();
        this.started = true;
        this.closeOverlay();
        let t = this.time.now;
        this.sfxT0 = t;
        this.sfxLog = [];
        const log = this.sfxLog;
        (window as unknown as Record<string, unknown>).__capture = {
            fps: CAPTURE_FPS,
            /** The sounds so far: [name, volume, seconds]. */
            sfx: log,
            frames: Math.round(length * CAPTURE_FPS),
            step(n = 1) { for (let i = 0; i < n; i++) { t += ms; game.step(t, ms); } },
        };
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
