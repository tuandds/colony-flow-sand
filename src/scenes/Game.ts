import * as Phaser from 'phaser';
import {
    BELT, BELT_LEN, BLOCK, BOARD, BOOSTER_IMAGES, BOOSTER_POS, FMASK, FRAME, FUNNEL, H, MOUTH, PAUSE_BTN, PIC,
    SLOTS, SPEED_BTN, TILE, TRAY_Y, W, beltPoint,
} from '../game/layout';
import { CUSTOM_KEY, PREVIEW_KEY, levelCount, loadCustomLevels, useLevels } from '../game/levels';
import { type Recording, botStep, playBot, replayStep } from '../game/bot';
import { Sfx, Sim, levelOverride } from '../game/sim';
import { Item3D, ThreeLayer } from '../game/three-layer';
import { abgrToRgb, shade, shadeCss } from '../game/util';

const FONT = '"Lilita One", "Arial Rounded MT Bold", sans-serif';

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
        }
        let level = 0;
        try { if (this.levelKey) level = Math.min(levelCount() - 1, parseInt(localStorage.getItem(this.levelKey) || '0', 10) || 0); } catch { /* storage blocked */ }
        const qp = q.get('level');
        if (qp) level = Math.max(0, Math.min(levelCount() - 1, parseInt(qp, 10) - 1));

        this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(W, H).setDepth(D.bg);
        this.drawChute();
        this.funnelGfx = this.add.graphics().setDepth(D.funnel);
        this.add.image(BOARD.x, BOARD.y, 'board').setOrigin(0).setDisplaySize(BOARD.w, BOARD.h).setDepth(D.board);
        this.sandImage = this.add.image(0, 0, '__WHITE').setOrigin(0).setDepth(D.sand);
        this.drawBeltBase();
        this.beltGfx = this.add.graphics().setDepth(D.belt);
        this.fullText = this.text(540, BELT.cy + 1, '0%', 30, '#5a3a20', null).setDepth(D.belt + 0.5);
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
        if (this.overlay === 'end' && this.overlayBox) {
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
        g.fillStyle(0x5a3719, 0.22);
        for (let i = 0; i < SLOTS; i++) {
            const b = s.slots[i];
            if (!b) continue;
            let [x, y] = s.slotPos(i);
            if (b.drop < 1) { const t = b.drop; x = MOUTH.x + (x - MOUTH.x) * t; y = MOUTH.y + 10 + (y - MOUTH.y - 10) * t; }
            g.fillEllipse(x, y + 26, 56, 18);
            items.push({ ref: b, kind: 'cube', x, y: y + 18, color: s.colors[b.k], size: BLOCK });
        }
        if (s.pipe.length) items.push({ ref: s.pipe, kind: 'cube', x: MOUTH.x, y: MOUTH.y + 20, color: s.colors[s.pipe[0]], size: 38 });

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
            label.setStroke(front ? '#2e2433' : shadeCss(hex, 0.1), (front ? 9 : 7) * sc);
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

    private drawChute() {
        const g = this.add.graphics().setDepth(D.chute);
        const pts = [
            new Phaser.Math.Vector2(FRAME.x, FRAME.y), new Phaser.Math.Vector2(MOUTH.x - MOUTH.half, MOUTH.y),
            new Phaser.Math.Vector2(MOUTH.x + MOUTH.half, MOUTH.y), new Phaser.Math.Vector2(FRAME.x + FRAME.w, FRAME.y),
        ];
        g.fillStyle(0xf1dcc0).fillPoints(pts, true);
        g.lineStyle(12, 0xe2bf92).strokePoints(pts, true);
        // pipe nozzle under the hole
        const n = this.add.graphics().setDepth(D.belt + 0.2);
        n.fillStyle(0xe2bf92).fillRoundedRect(MOUTH.x - 56, MOUTH.y - 10, 112, 40, 14);
        n.fillStyle(0xf7ead8).fillRoundedRect(MOUTH.x - 50, MOUTH.y - 10, 100, 32, 12);
        n.fillStyle(0x6b4a2e).fillRoundedRect(MOUTH.x - 34, MOUTH.y - 2, 68, 18, 9);
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

    private drawBeltBase() {
        const g = this.add.graphics().setDepth(D.belt - 0.5);
        this.stadium(g, BELT.r + BELT.band / 2 + 12, 0xe2bf92);
        this.stadium(g, BELT.r + BELT.band / 2 + 4, 0xf7ead8);
        this.stadium(g, BELT.r + BELT.band / 2 - 4, 0xd9b48a);
        const inner = this.add.graphics().setDepth(D.belt + 0.1);
        this.stadium(inner, BELT.r - BELT.band / 2 + 4, 0xf7ead8);
        this.stadium(inner, BELT.r - BELT.band / 2 - 4, 0xefdcc2);
        inner.fillStyle(0xffffff).fillRoundedRect(BELT.cxL - 6, BELT.cy - 16, BELT.cxR - BELT.cxL + 12, 32, 16);
    }

    private drawBelt() {
        const s = this.sim, g = this.beltGfx;
        g.clear();
        // moving chevrons along the track
        g.lineStyle(8, 0xfff5e6, 0.45);
        const gap = 44;
        for (let d = s.beltOff % gap; d < BELT_LEN; d += gap) {
            const [x, y] = beltPoint(d), [x2, y2] = beltPoint((d + 1) % BELT_LEN);
            const a = Math.atan2(y2 - y, x2 - x), c = Math.cos(a), sn = Math.sin(a);
            const pt = (u: number, v: number) => [x + u * c - v * sn, y + u * sn + v * c];
            const [ax, ay] = pt(-7, -12), [bx, by] = pt(5, 0), [cx, cy] = pt(-7, 12);
            g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.lineTo(cx, cy); g.strokePath();
        }
        // how full the conveyor is; it turns yellow then red as it nears overflow
        const used = s.slots.filter(Boolean).length, pct = Math.round((100 * used) / SLOTS);
        if (pct > 0) {
            const bx = BELT.cxL - 6, bw = BELT.cxR - BELT.cxL + 12, by = BELT.cy - 16;
            g.fillStyle(pct >= 85 ? 0xef4b4b : pct >= 60 ? 0xf5b82e : 0x6cc53b);
            g.fillRoundedRect(bx + 4, by + 4, Math.max(24, ((bw - 8) * pct) / 100), 24, 12);
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

    private buildTray() {
        const g = this.add.graphics().setDepth(D.tray);
        g.fillStyle(0xffffff).fillRoundedRect(6, TRAY_Y, W - 12, H - TRAY_Y + 60, 56);
        g.fillStyle(0x4f6fc4).fillRoundedRect(20, TRAY_Y + 14, W - 40, H - TRAY_Y + 60, 46);
        g.fillStyle(0xffffff, 0.07);
        for (let y = TRAY_Y + 30, r = 0; y < H; y += 46, r++)
            for (let x = 40 + (r % 2) * 46; x < W - 40; x += 92) g.fillRect(x, y, 46, 46);
        BOOSTER_IMAGES.forEach((key, i) => {
            const { x, y } = BOOSTER_POS[i];
            const base = this.add.image(x, y, 'circle_cream').setDepth(D.tray + 0.1);
            base.setData('s', 150 / base.width).setScale(base.getData('s'));
            const img = this.add.image(x, y - 2, key).setDepth(D.tray + 0.2);
            img.setData('s', 99 / Math.max(img.width, img.height)).setScale(img.getData('s'));
            const badge = this.add.container(x + 54, y + 54).setDepth(D.tray + 0.3);
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
        this.speedBtn = this.add.image(sp.x, sp.y, 'btn_green').setOrigin(0).setDisplaySize(sp.w, sp.h).setDepth(D.hud)
            .setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                if (this.overlay) return;
                this.sfx('click');
                this.speedUp = !this.speedUp;
                this.speedBtn.setAlpha(this.speedUp ? 1 : 0.75);
            });
        this.speedBtn.setAlpha(0.75);
        // fast-forward glyph and "x2"
        const g = this.add.graphics().setDepth(D.hud + 0.1);
        const gx = sp.x + 30, gy = sp.y + sp.h * 0.44;
        for (const o of [0, 26]) {
            const tri = [new Phaser.Math.Vector2(gx + o, gy - 18), new Phaser.Math.Vector2(gx + o + 26, gy), new Phaser.Math.Vector2(gx + o, gy + 18)];
            g.lineStyle(5, 0x2e6b12).strokePoints(tri, true);
            g.fillStyle(0xffffff).fillPoints(tri, true);
        }
        this.text(sp.x + sp.w - 50, gy + 2, 'x2', 50, '#ffffff', '#2e6b12', 8).setDepth(D.hud + 0.1);
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
            if (!this.music) { this.music = this.sound.add('music', { loop: true, volume: 0.3 }); this.music.play(); }
        });
        box.add([shade, this.text(540, 960, 'Tap to play', 80), this.text(540, 1050, 'Swipe the sand to set it free', 38, '#fffbe8', '#5a3a20', 6)]);
        box.add(this.text(W - 20, H - 24, __APP_VERSION__, 24, '#fffbe8', null).setOrigin(1, 0.5));
        this.overlayBox = box;
    }

    // Settings (opened by the pause button): resume, restart, and a cheat to jump to any level.
    private showSettings() {
        this.overlay = 'settings';
        this.paused = true;
        const perRow = 5, bw = 112, bh = 100, gap = 20, top = 1010;
        const rows = Math.ceil(levelCount() / perRow);
        const bottom = top + rows * (bh + gap) + 40;
        const box = this.panel(460, bottom, 'Settings', '#ffffff');
        box.add(this.button(360, 600, 360, 130, 'Resume', null, () => this.closeOverlay()));
        box.add(this.button(360, 750, 360, 130, 'Restart', 0xff9f43, () => this.startLevel(this.levelIndex)));
        box.add(this.text(540, 955, 'Cheat: go to level', 40, '#7a4a24', null));
        const rowW = perRow * bw + (perRow - 1) * gap;
        for (let i = 0; i < levelCount(); i++) {
            const x = 540 - rowW / 2 + (i % perRow) * (bw + gap), y = top + Math.floor(i / perRow) * (bh + gap);
            const cur = i === this.levelIndex;
            const c = this.add.container(x + bw / 2, y + bh / 2);
            const g = this.add.graphics();
            g.fillStyle(cur ? 0x3f8f2a : 0x3c56a8).fillRoundedRect(-bw / 2, -bh / 2 + 8, bw, bh, 22);
            g.fillStyle(cur ? 0x6cc53b : 0x5b7be0).fillRoundedRect(-bw / 2, -bh / 2, bw, bh - 6, 22);
            c.add([g, this.text(0, -3, String(i + 1), 50, '#ffffff', '#2e2433', 8)]);
            c.setSize(bw, bh).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.sfx('click'); this.startLevel(i); });
            box.add(c);
        }
        this.overlayBox = box;
    }

    private showEnd() {
        this.overlay = 'end';
        this.swiping = false;
        const win = this.sim.state === 'win';
        const last = this.levelIndex >= levelCount() - 1;
        const box = this.panel(610, 1310, win ? (last ? 'All Done!' : 'Level Complete!') : 'Conveyor full!', win ? '#ffd23f' : '#ff6b81');
        if (!win) box.add(this.text(540, 790, 'Too much sand on the belt', 36, '#7a4a24', null));
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
        if (this.sound.locked) return;
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
