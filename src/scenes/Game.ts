import * as Phaser from 'phaser';
import {
    BELT, BELT_LEN, BLOCK, BOOSTER_IMAGES, BOOSTER_POS, FMASK, FRAME, FUNNEL, H, INNER, MOUTH, PAUSE_BTN, PIC,
    SLOTS, SPEED_BTN, TILE, W, beltPoint,
} from '../game/layout';
import { CUSTOM_KEY, PREVIEW_KEY, gameLevels, levelCount, loadCustomLevels, useLevels } from '../game/levels';
import { type Recording, botStep, playBot, replayStep } from '../game/bot';
import { Sfx, Sim, levelOverride } from '../game/sim';
import { Item3D, ThreeLayer } from '../game/three-layer';
import { abgrToRgb, isLight, shade, shadeCss } from '../game/util';

const FONT = '"Lilita One", "Arial Rounded MT Bold", sans-serif';
/** Music, sound effects and vibration switches (Pause panel), kept in the browser. */
const PREFS_KEY = 'cf_prefs';
type Prefs = { music: boolean; sound: boolean; vibe: boolean };
// short buzzes for the moments that matter (Pause panel: vibration)
const VIBES: Partial<Record<Sfx, number | number[]>> = { nest: 25, win: [60, 40, 60], lose: 200 };

// Depths, back to front.
const D = { bg: 0, chute: 1, funnel: 2, board: 3, sand: 4, belt: 5, shadows: 6, three: 7, labels: 8, fx: 9, tray: 10, hud: 11, overlay: 20 };

type Overlay = 'start' | 'settings' | 'end' | null;

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
    /** The win screen animates itself (the lose panel scales in from update). */
    private winScreen = false;
    /** Counter tweens that drive the win screen's ants (stopped with the overlay). */
    private winFx: Phaser.Tweens.Tween[] = [];
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
    private funnelGfx!: Phaser.GameObjects.Graphics;
    private beltGfx!: Phaser.GameObjects.Graphics;
    private shadowGfx!: Phaser.GameObjects.Graphics;
    private fxGfx!: Phaser.GameObjects.Graphics;
    private fullText!: Phaser.GameObjects.Text;
    /** The fullness bar's fill: above the white bar track (drawBeltBase), below the % text. */
    private fullGfx!: Phaser.GameObjects.Graphics;
    private levelText!: Phaser.GameObjects.Text;
    private speedBtn!: Phaser.GameObjects.Image;
    private boosters: { img: Phaser.GameObjects.Image; base: Phaser.GameObjects.Image; badge: Phaser.GameObjects.Container; bump: number }[] = [];
    private labels: Phaser.GameObjects.Text[] = [];
    private overlay: Overlay = null;
    private overlayBox?: Phaser.GameObjects.Container;
    private endAt = 0;

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
        this.drawChute();
        this.funnelGfx = this.add.graphics().setDepth(D.funnel);
        this.drawBoard();
        this.sandImage = this.add.image(0, 0, '__WHITE').setOrigin(0).setDepth(D.sand);
        this.drawBeltBase();
        this.beltGfx = this.add.graphics().setDepth(D.belt);
        this.fullGfx = this.add.graphics().setDepth(D.belt + 0.2);
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
        // the sand picture is a canvas texture, one pixel per grain, drawn scaled up without smoothing
        const G = this.sim.G;
        if (this.textures.exists('sand')) this.textures.remove('sand');
        this.sandCanvas = document.createElement('canvas');
        this.sandCanvas.width = G; this.sandCanvas.height = G;
        this.sandImg = this.sandCanvas.getContext('2d')!.createImageData(G, G);
        this.sandTex = this.textures.addCanvas('sand', this.sandCanvas)!;
        this.sandTex.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.sandImage.setTexture('sand').setPosition(this.sim.ox, this.sim.oy).setDisplaySize(G * this.sim.gs, G * this.sim.gs);
        this.closeOverlay();
        this.endAt = 0;
    }

    update(_time: number, delta: number) {
        const dt = Math.min(0.05, delta / 1000);
        if (this.started && !this.paused && !(this.overlay === 'settings')) {
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
        if (this.sim.state !== 'play' && this.overlay !== 'end' && this.sim.endT >= (this.sim.state === 'win' ? 0.9 : 0)) this.showEnd();
        for (const b of this.boosters) { b.bump = Math.max(0, b.bump - dt * 5); const s = 1 + b.bump * 0.12; b.base.setScale(b.base.getData('s') * s); b.img.setScale(b.img.getData('s') * s); }
        if (this.overlay === 'end' && this.overlayBox && !this.winScreen) {
            this.endAt += dt;
            this.overlayBox.setScale(0.8 + 0.2 * Math.min(1, this.endAt * 4));
        }
        this.render();
    }

    // ---------- drawing ----------
    private render() {
        const s = this.sim;
        if (s.picDirty) this.redrawSand();
        this.drawFunnel();
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
            // a soft contact shadow tucked under the cube, sized with it
            g.fillEllipse(x, y + BLOCK * 0.55, BLOCK * 1.05, BLOCK * 0.32);
            items.push({ ref: b, kind: 'cube', x, y: y + BLOCK * 0.36, color: s.colors[b.k], size: BLOCK });
        }
        if (s.pipe.length) items.push({ ref: s.pipe, kind: 'cube', x: MOUTH.x, y: MOUTH.y + 16, color: s.colors[s.pipe[0]], size: 25 });

        // nest tiles: the front row (the nests ants work for) is full height with a white
        // outline; nests queued behind are lower and paler
        let li = 0;
        for (let ri = 5; ri >= 0; ri--) for (let ci = 0; ci < s.cols.length; ci++) {
            const nest = s.cols[ci][ri];
            if (!nest || nest.dy === null || nest.dx === null) continue;
            const y = nest.dy;
            if (y - TILE / 2 > H) continue;
            let sc = 1 + nest.bump * 0.07, alpha = 1;
            if (nest.pop > 0) { sc = 1 + nest.pop * 0.3; alpha = 1 - nest.pop; }
            const front = ri === 0;
            const hex = s.colors[nest.color];
            const squash = front ? this.three.TILE_SQUASH : this.three.TILE_SQUASH * 0.55;
            const w = TILE * 0.92 * sc, face = this.three.tileFace(TILE) * sc, lift = this.three.tileTopLift(TILE, squash) * sc;
            g.fillStyle(0x5a3719, (front ? 0.2 : 0.1) * alpha);
            g.fillRoundedRect(nest.dx - w / 2 + 4, y - face / 2 + 10, w, face + lift, 26);
            items.push({ ref: nest, kind: 'tile', x: nest.dx, y, color: front ? hex : shade(hex, 0.42), size: TILE, alpha, scale: sc, squash, outline: front });
            const label = this.label(li++);
            label.setText(String(nest.need - nest.got)).setPosition(nest.dx, y + 2).setVisible(true);
            label.setFontSize(Math.round((front ? 50 : 46) * sc));
            // front nests: white number with a dark stroke; queued nests: no stroke, white on the
            // pale tile, or a darker shade of the nest colour when the tile is too light for white
            if (front) label.setColor('#ffffff').setStroke('#2e2433', 9 * sc);
            else label.setColor(isLight(shadeCss(hex, 0.42)) ? shadeCss(hex, -0.45) : '#ffffff').setStroke('#000000', 0);
            label.setAlpha(alpha * (front ? 1 : 0.85));
        }
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

        this.fxGfx.clear();
        for (const f of s.fx) {
            this.fxGfx.fillStyle(f.color, Math.max(0, 1 - f.t / f.life));
            this.fxGfx.fillRect(f.x - f.s / 2, f.y - f.s / 2, f.s, f.s);
        }
    }

    private redrawSand() {
        const s = this.sim, px = new Uint32Array(this.sandImg.data.buffer), { key, rgb, dr, loose } = s;
        const lift = (c: number, f: number) => {
            const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
            return ((255 << 24) | ((b + (255 - b) * f) << 16) | ((g + (255 - g) * f) << 8) | (r + (255 - r) * f)) >>> 0;
        };
        // freed sand is a little brighter than fixed sand, sand about to leave brighter still
        for (let p = 0; p < key.length; p++) px[p] = !key[p] ? 0 : dr[p] ? lift(rgb[p], 0.35) : loose[p] ? lift(rgb[p], 0.22) : rgb[p];
        this.sandCanvas.getContext('2d')!.putImageData(this.sandImg, 0, 0);
        this.sandTex.refresh();
        s.picDirty = false;
    }

    /** The picture frame: a white rim around a periwinkle inside (sand is drawn on top). */
    private drawBoard() {
        const g = this.add.graphics().setDepth(D.board), m = 14;
        g.fillStyle(0x24345e, 0.12).fillRoundedRect(INNER.x - m, INNER.y - m + 6, INNER.w + 2 * m, INNER.h + 2 * m, 26);
        g.fillStyle(0xfcfaff).fillRoundedRect(INNER.x - m, INNER.y - m, INNER.w + 2 * m, INNER.h + 2 * m, 26);
        g.fillStyle(0x96aedd).fillRoundedRect(INNER.x, INNER.y, INNER.w, INNER.h, 12);
    }

    private drawChute() {
        const g = this.add.graphics().setDepth(D.chute);
        const pts = [
            new Phaser.Math.Vector2(FRAME.x, FRAME.y), new Phaser.Math.Vector2(MOUTH.x - MOUTH.half, MOUTH.y),
            new Phaser.Math.Vector2(MOUTH.x + MOUTH.half, MOUTH.y), new Phaser.Math.Vector2(FRAME.x + FRAME.w, FRAME.y),
        ];
        g.fillStyle(0x93a9d8).fillPoints(pts, true);
        g.lineStyle(12, 0xfcfaff).strokePoints(pts, true);
        // pipe nozzle under the hole
        const n = this.add.graphics().setDepth(D.belt + 0.2);
        n.fillStyle(0xfcfaff).fillRoundedRect(MOUTH.x - 56, MOUTH.y - 10, 112, 40, 14);
        n.fillStyle(0xdfe6f7).fillRoundedRect(MOUTH.x - 50, MOUTH.y - 10, 100, 32, 12);
        n.fillStyle(0x34466f).fillRoundedRect(MOUTH.x - 34, MOUTH.y - 2, 68, 18, 9);
    }

    private drawFunnel() {
        const s = this.sim, g = this.funnelGfx;
        g.clear();
        // sand resting in the funnel, waiting to go down the hole
        for (let q = 0; q < s.fk.length; q++) {
            if (!s.fk[q] || !FMASK[q]) continue;
            const i = q % FUNNEL.cols, j = (q / FUNNEL.cols) | 0;
            g.fillStyle(abgrToRgb(s.fc[q]));
            g.fillRect(FUNNEL.x0 + i * FUNNEL.cell, FUNNEL.top + j * FUNNEL.cell, FUNNEL.cell + 0.5, FUNNEL.cell + 0.5);
        }
        // clumps falling from the board into the funnel
        for (const p of s.particles) {
            const [x, y] = s.particlePos(p);
            g.fillStyle(abgrToRgb(p.c));
            g.fillRect(x - 3, y - 3, 6, 6);
        }
    }

    private stadium(g: Phaser.GameObjects.Graphics, r: number, color: number) {
        g.fillStyle(color);
        g.beginPath();
        g.arc(BELT.cxL, BELT.cy, r, Math.PI / 2, Math.PI * 1.5);
        g.arc(BELT.cxR, BELT.cy, r, -Math.PI / 2, Math.PI / 2);
        g.closePath();
        g.fillPath();
    }

    // slate-blue belt with white rims; its edges are darker than its middle
    private drawBeltBase() {
        const g = this.add.graphics().setDepth(D.belt - 0.5), R = BELT.r + BELT.band / 2, r = BELT.r - BELT.band / 2;
        this.stadium(g, R + 12, 0xfcfeff);
        this.stadium(g, R + 4, 0x6f8bb2);
        this.stadium(g, R - 6, 0x82a2cb);
        const inner = this.add.graphics().setDepth(D.belt + 0.1);
        this.stadium(inner, r + 10, 0x6f8bb2);
        this.stadium(inner, r + 4, 0xf9fdff);
        this.stadium(inner, r - 4, 0xc8d3ef);
        inner.fillStyle(0xf1f1fa).fillRoundedRect(BELT.cxL - 6, BELT.cy - 13, BELT.cxR - BELT.cxL + 12, 26, 13);
        inner.fillStyle(0x8a9dcc).fillRoundedRect(BELT.cxL - 3, BELT.cy - 10, BELT.cxR - BELT.cxL + 6, 20, 10);
    }

    private drawBelt() {
        const s = this.sim, g = this.beltGfx;
        g.clear();
        // moving chevrons along the track
        g.lineStyle(6, 0xc9d9f2, 0.4);
        const gap = 44;
        for (let d = s.beltOff % gap; d < BELT_LEN; d += gap) {
            const [x, y] = beltPoint(d), [x2, y2] = beltPoint((d + 1) % BELT_LEN);
            const a = Math.atan2(y2 - y, x2 - x), c = Math.cos(a), sn = Math.sin(a);
            const pt = (u: number, v: number) => [x + u * c - v * sn, y + u * sn + v * c];
            const [ax, ay] = pt(-6, -10), [bx, by] = pt(4, 0), [cx, cy] = pt(-6, 10);
            g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.lineTo(cx, cy); g.strokePath();
        }
        // how full the conveyor is; it turns yellow then red as it nears overflow
        const used = s.slots.filter(Boolean).length, pct = Math.round((100 * used) / SLOTS);
        const fg = this.fullGfx.clear();
        if (pct > 0) {
            const bx = BELT.cxL - 6, bw = BELT.cxR - BELT.cxL + 12, by = BELT.cy - 13;
            fg.fillStyle(pct >= 85 ? 0xef4b4b : pct >= 60 ? 0xf5b82e : 0x6cc53b);
            fg.fillRoundedRect(bx + 3, by + 3, Math.max(20, ((bw - 6) * pct) / 100), 20, 10);
        }
        this.fullText.setText(pct + '%');
    }

    // ---------- UI ----------
    private text(x: number, y: number, str: string, size: number, color = '#ffffff', stroke: string | null = '#3a3550', thick = 8) {
        const t = this.add.text(x, y, str, { fontFamily: FONT, fontSize: `${size}px`, color, align: 'center' }).setOrigin(0.5);
        if (stroke) t.setStroke(stroke, thick);
        return t;
    }

    private label(i: number) {
        if (!this.labels[i]) this.labels[i] = this.text(0, 0, '', 50, '#ffffff', '#2e2433', 9).setDepth(D.labels);
        return this.labels[i];
    }

    // boosters: a row under the HUD, above the picture frame (as in Sand Drop)
    private buildTray() {
        BOOSTER_IMAGES.forEach((key, i) => {
            const { x, y } = BOOSTER_POS[i];
            const base = this.add.image(x, y, 'circle_cream').setDepth(D.tray + 0.1);
            base.setData('s', 128 / base.width).setScale(base.getData('s'));
            const img = this.add.image(x, y - 2, key).setDepth(D.tray + 0.2);
            img.setData('s', 86 / Math.max(img.width, img.height)).setScale(img.getData('s'));
            const badge = this.add.container(x + 46, y + 44).setDepth(D.tray + 0.3);
            const bg = this.add.graphics();
            bg.fillStyle(0x5cbf2a).fillCircle(0, 0, 26).lineStyle(6, 0xffffff).strokeCircle(0, 0, 26);
            badge.add([bg, this.text(0, 1, '1', 34, '#ffffff', '#2e6b12', 6)]);
            const b = { img, base, badge, bump: 0 };
            // boosters are only for show for now: tapping makes them bounce
            base.setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (!this.overlay) { this.sfx('click'); b.bump = 1; } });
            this.boosters.push(b);
        });
    }

    private buildHud() {
        const p = PAUSE_BTN, sp = SPEED_BTN;
        this.add.image(p.x, p.y, 'btn_blue_sq').setOrigin(0).setDisplaySize(p.w, p.h).setDepth(D.hud)
            .setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (!this.overlay) { this.sfx('click'); this.showSettings(); } });
        this.add.image(p.x + p.w / 2, p.y + p.h / 2 - 4, 'pause').setDisplaySize(44, 48).setDepth(D.hud + 0.1);
        this.levelText = this.text(540, 98, 'Level 1', 78, '#7a4a24', '#fff0dc', 6).setDepth(D.hud);
        // x2 speed: Colony Flow's speed button, grey when off and green when on, with its
        // fast-forward icon and "x2"
        this.speedBtn = this.add.image(sp.x, sp.y, 'btn_speed_off').setOrigin(0).setDisplaySize(sp.w, sp.h).setDepth(D.hud)
            .setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                if (this.overlay) return;
                this.sfx('click');
                this.speedUp = !this.speedUp;
                this.speedBtn.setTexture(this.speedUp ? 'btn_speed_on' : 'btn_speed_off').setDisplaySize(sp.w, sp.h);
            });
        const ix = sp.x + 58, iy = sp.y + sp.h * 0.46;
        this.add.image(ix, iy, 'icon_ff').setDisplaySize(59, 42).setDepth(D.hud + 0.1);
        this.text(sp.x + sp.w - 52, iy + 1, 'x2', 50, '#ffffff', '#2e5a12', 8).setDepth(D.hud + 0.1);
    }

    /** A region of the win atlases, cut out upright when the game loaded (Boot.cutWinFrames). */
    private winImage(x: number, y: number, atlas: 'win_text' | 'win_char', frame: string) {
        return this.add.image(x, y, `${atlas}:${frame}`);
    }

    /** Colony Flow's win screen, as in its game: "Level N" over "VICTORY!" popping in letter by
     * letter, the two cheering ants jumping either side of a pile of coins in a glow with turning
     * rays, confetti raining down, and the two reward buttons (both go on to the next level: the
     * prototype has no coins yet). */
    private showWin() {
        const box = this.add.container(0, 0).setDepth(D.overlay);
        this.winScreen = true;
        box.add(this.add.rectangle(0, 0, W, H, 0x1c0f08, 0.86).setOrigin(0).setInteractive());
        const cy = 1060;
        const glow = this.add.image(540, cy, 'glow').setScale(2.4).setTint(0xffd58a).setAlpha(0);
        const rays = this.add.image(540, cy, 'glow_rays').setScale(5.5).setTint(0xfff1c2).setAlpha(0);
        box.add([glow, rays]);
        this.tweens.add({ targets: glow, alpha: 0.8, duration: 400 });
        this.tweens.add({ targets: rays, alpha: 0.38, duration: 500 });
        this.tweens.add({ targets: rays, angle: 360, duration: 24000, repeat: -1 });

        const level = this.text(540, 480, `Level ${this.levelIndex + 1}`, 64, '#ffb347', '#5a2a10', 10).setAlpha(0);
        box.add(level);
        this.tweens.add({ targets: level, alpha: 1, duration: 300, delay: 100 });

        // VICTORY!: each letter is its drop shadow, the orange body and the cream face on top
        const word = ['V', 'I', 'C', 'T', 'O', 'R', 'Y', '!'];
        const fw = (f: string) => this.textures.getFrame(`win_text:${f}`);
        const scale = 1.05, gap = -10;
        const widths = word.map((c) => fw(`text/Outline_${c}`).realWidth * scale);
        // the "!" sits closer to the word than the letters sit to each other
        const gaps = word.map((_c, i) => (i === word.length - 1 ? 0 : word[i + 1] === '!' ? gap - 22 : gap));
        let x = 540 - (widths.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0)) / 2;
        word.forEach((c, i) => {
            const lx = x + widths[i] / 2;
            x += widths[i] + gaps[i];
            const letter = this.add.container(lx, 640);
            letter.add([
                this.winImage(6, 14, 'win_text', `text/DropShadow_${c}`).setScale(scale * 0.86).setAlpha(0.35).setTint(0x000000),
                this.winImage(0, 0, 'win_text', `text/Outline_${c}`).setScale(scale),
                this.winImage(0, -8 * scale, 'win_text', `text/${c}`).setScale(scale),
            ]);
            letter.setScale(0);
            box.add(letter);
            this.tweens.add({ targets: letter, scale: 1, duration: 380, delay: 180 + i * 70, ease: 'Back.Out' });
            this.tweens.add({ targets: letter, y: 628, duration: 700, delay: 900 + i * 90, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
        });
        const shine = this.winImage(800, 550, 'win_text', 'shine').setScale(0).setBlendMode(Phaser.BlendModes.ADD);
        box.add(shine);
        this.tweens.add({ targets: shine, scale: 0.7, angle: 90, duration: 500, delay: 800, yoyo: true, repeat: -1, repeatDelay: 900 });

        // the coin pile between the ants
        const coins = this.winImage(540, cy + 30, 'win_char', 'coin').setScale(0);
        box.add(coins);
        this.tweens.add({ targets: coins, scale: 0.95, duration: 380, delay: 500, ease: 'Back.Out' });
        this.addWinAnt(box, 345, cy - 20, 'yellow', 0);
        this.addWinAnt(box, 738, cy - 20, 'pink', 0.5);
        this.addConfetti(box);

        // rewards: a yellow "watch an ad" button and a green one
        const next = () => this.startLevel((this.levelIndex + 1) % levelCount());
        box.add(this.rewardButton(300, 1440, 'btn_yellow', 80, true, next, 1100));
        box.add(this.rewardButton(785, 1440, 'btn_green', 40, false, next, 1200));
        this.overlayBox = box;
    }

    /** A wide reward button from Colony Flow's art: a coin, the amount, and an ad badge. */
    private rewardButton(x: number, y: number, key: string, amount: number, ad: boolean, onTap: () => void, delay: number) {
        const w = 380, h = 150, c = this.add.container(x, y);
        c.add(this.add.nineslice(0, 0, key, undefined, w, h, 80, 80, 70, 80));
        c.add(this.add.image(-62, -8, 'icon_coin').setDisplaySize(78, 78));
        c.add(this.text(38, -10, String(amount), 72, '#ffffff', '#5a3a10', 10));
        if (ad) c.add(this.add.image(w / 2 - 22, -h / 2 + 4, 'icon_ads').setDisplaySize(84, 88).setAngle(8));
        c.setSize(w, h).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); onTap(); });
        c.setScale(0);
        this.tweens.add({ targets: c, scale: 1, duration: 350, delay, ease: 'Back.Out' });
        return c;
    }

    // Colony Flow's two cheering ants (win_char), put together from their parts: [part, x, y,
    // turn] from the middle of the ant's chest, back to front. The pink one leans toward the
    // coins, one arm reaching for them behind its body and the other raised in front, as in Colony Flow. Their Spine skeleton is not in the
    // extracted files, so they jump with tweens.
    private static WIN_ANTS: Record<'yellow' | 'pink', [string, number, number, number?][]> = {
        yellow: [['A1_thigh_R', -40, 98, -1.05], ['A1_calf_R', -2, 112, -1.05], ['A1_arm_L', 75, -40], ['A1_torso', -48, 36], ['A1_leg_L', -62, 108], ['A1_head', 6, -142], ['A1_arm_R', -75, -40]],
        pink: [['A2_leg_L', -30, 100], ['A2_arm_R', -59, -32, -0.55], ['A2_torso', 39, 40], ['A2_leg_R', 40, 100], ['A2_head', -22, -132], ['A2_arm_L', 72, -41]],
    };

    /** One cheering ant that keeps jumping, arms waving, over its shadow; `phase` (0-1) offsets its jumps. */
    private addWinAnt(box: Phaser.GameObjects.Container, x: number, y: number, kind: 'yellow' | 'pink', phase: number) {
        const id = kind === 'yellow' ? 'A1' : 'A2';
        const ANT_SCALE = 0.95;
        const shadow = this.winImage(x + (kind === 'yellow' ? -25 : 25) * ANT_SCALE, y + 175 * ANT_SCALE, 'win_char', `${kind}/${id}_shadow`);
        const body = this.add.container(x, y);
        const arms: Phaser.GameObjects.Image[] = [];
        for (const [part, px, py, turn = 0] of Game.WIN_ANTS[kind]) {
            const img = this.winImage(px, py, 'win_char', `${kind}/${part}`).setRotation(turn);
            if (part.includes('arm')) {
                // arms swing from the shoulder: the lower inner corner (fists are up and out)
                const ox = part.endsWith('_R') ? 0.88 : 0.12, oy = 0.92;
                img.setOrigin(ox, oy).setPosition(px + (ox - 0.5) * img.width, py + (oy - 0.5) * img.height).setData('turn', turn).setData('sign', part.endsWith('_R') ? -1 : 1);
                arms.push(img);
            }
            body.add(img);
        }
        body.setScale(0);
        box.add([shadow, body]);
        this.tweens.add({ targets: body, scale: ANT_SCALE, duration: 350, delay: 600 + phase * 300, ease: 'Back.Out' });
        // one jump per second: up fast, down, a little squash on landing; arms wave twice a jump
        this.winFx.push(this.tweens.addCounter({
            from: 0, to: 1, duration: 900, repeat: -1, delay: 950 + phase * 450,
            onUpdate: (tw) => {
                const t = tw.getValue() ?? 0, h = Math.sin(Math.PI * t);
                body.y = y - 70 * h;
                const land = Math.max(0, 1 - h * 4);
                body.scaleX = ANT_SCALE * (1 + 0.06 * land); body.scaleY = ANT_SCALE * (1 - 0.08 * land);
                shadow.setScale(ANT_SCALE * (1 - 0.35 * h)).setAlpha(1 - 0.4 * h);
                arms.forEach((a) => (a.rotation = a.getData('turn') + a.getData('sign') * 0.28 * Math.sin(Math.PI * 4 * t)));
            },
        }));
    }

    /** Confetti raining down over the win screen, as in Colony Flow: coloured paper strips that
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

    private button(x: number, y: number, w: number, h: number, label: string, color: number | null, onTap: () => void) {
        const c = this.add.container(x + w / 2, y + h / 2);
        if (color === null) {
            c.add(this.add.image(0, 0, 'btn_green').setDisplaySize(w, h));
        } else {
            const g = this.add.graphics();
            g.fillStyle(0xfff3e0).fillRoundedRect(-w / 2, -h / 2 + 4, w, h - 8, 40);
            g.fillStyle(shade('#' + color.toString(16).padStart(6, '0'), -0.25)).fillRoundedRect(-w / 2 + 10, -h / 2 + 12, w - 20, h - 28, 32);
            g.fillStyle(color).fillRoundedRect(-w / 2 + 10, -h / 2 + 8, w - 20, h - 34, 32);
            c.add(g);
        }
        c.add(this.text(0, -h * 0.05, label, h >= 140 ? 60 : 56));
        c.setSize(w, h).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); onTap(); });
        return c;
    }

    private panel(top: number, bottom: number, title: string, titleColor: string) {
        const box = this.add.container(0, 0).setDepth(D.overlay);
        const shade = this.add.rectangle(0, 0, W, H, 0x281910, 0.5).setOrigin(0).setInteractive();
        const g = this.add.graphics();
        g.fillStyle(0xe2bf92).fillRoundedRect(150, top, 780, bottom - top, 64);
        g.fillStyle(0xfbf1e4).fillRoundedRect(166, top + 12, 748, bottom - top - 24, 54);
        box.add([shade, g, this.text(540, top + 85, title, 72, titleColor, '#5a3a20', 10)]);
        return box;
    }

    private closeOverlay() {
        for (const t of this.winFx) t.remove();
        this.winFx = [];
        if (this.overlayBox) this.tweens.killTweensOf(this.overlayBox.getAll());
        this.overlayBox?.each((o: Phaser.GameObjects.GameObject) => { if (o instanceof Phaser.GameObjects.Container) this.tweens.killTweensOf(o.getAll()); });
        this.winScreen = false;
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
        const win = this.sim.state === 'win';
        if (win) { this.showWin(); return; }
        const last = this.levelIndex >= levelCount() - 1;
        const box = this.panel(610, 1310, win ? (last ? 'All Done!' : 'Level Complete!') : 'Conveyor full!', win ? '#ffd23f' : '#ff6b81');
        if (!win) box.add(this.text(540, 790, 'No block on the belt fits a nest', 36, '#7a4a24', null));
        box.add(this.add.image(540, win ? 916 : 956, 'mascot').setDisplaySize(win ? 300 : 240, win ? 292 : 233));
        box.add(win
            ? this.button(360, 1130, 360, 150, last ? 'Replay' : 'Next', null, () => this.startLevel((this.levelIndex + 1) % levelCount()))
            : this.button(360, 1130, 360, 150, 'Retry', 0xff9f43, () => this.startLevel(this.levelIndex)));
        // scale in around the panel centre
        box.list.forEach((o) => { const t = o as unknown as Phaser.GameObjects.Components.Transform; t.x -= 540; t.y -= 900; });
        box.setPosition(540, 900).setScale(0.8);
        this.overlayBox = box;
    }

    private onDown(p: Phaser.Input.Pointer, over: Phaser.GameObjects.GameObject[]) {
        if (this.overlay || over.length || this.sim.state !== 'play') return;
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
                scene.autoplay = on; scene.speedUp = speed > 1;
                scene.moves = moves ?? null; scene.moveAt = 0; scene.replayAcc = 0; scene.replayFrame = 0;
                if (on) { if (moves) scene.startLevel(scene.levelIndex); scene.started = true; scene.closeOverlay(); }
            },
            swipeCells(pts: [number, number][]) {
                const s = scene.sim;
                s.endSwipe();
                for (const [x, y] of pts) s.swipeTo(PIC.x + (x + 0.5) * s.cell, PIC.y + (y + 0.5) * s.cell);
                s.endSwipe();
            },
        };
    }
}
