// Demo mode for marketing videos (?demo=<reel>): the game plays itself from a script while a
// hand shows each swipe and tap, cutting from one level to the next like a gameplay trailer
// (the next level slides in and pushes the last one out). The hand's swipes and taps go through
// the real game (the sand it crosses is freed, the boosters and buttons it taps act), so the clip
// shows real play; behind a cut the next level can be played on ahead at once, so a shot starts
// mid-level. Each reel runs a set length; its last 3 seconds are the end card (the last frame
// blurred and dimmed, the game's logo and a pulsing Play Now button). Record the page at
// 1080 x 1920 (or any 9:16 window).
import * as Phaser from 'phaser';
import { pickStroke } from '../game/bot';
import type { Sim } from '../game/sim';

/** What the demo needs from the game scene. */
export interface DemoHost {
    scene: Phaser.Scene;
    sim: () => Sim;
    /** Whether a panel is open ('end' after a win or loss), so play is held. */
    overlay: () => string | null;
    setSpeed: (on: boolean) => void;
    /** Start level i (0-based) at once, no panels. */
    goLevel: (i: number) => void;
    /** Play on for `sec` game seconds at once (the test bot's strokes, or 'jam' strokes), or
     * until `belt` blocks are on the belt or on their way to it. */
    fastForward: (sec: number, mode: 'play' | 'jam', belt?: number) => void;
    /** A booster is at work (the Fan's cannon, or Activate waiting for a nest): play is held. */
    busy: () => boolean;
    /** Where the named thing is on screen and how to tap it: 'booster:<i>', 'nest:<ci>,<ri>', or a
     * panel button ('continue', 'claim', 'free', 'coins', 'try'). Null when it is not there. */
    target: (name: string) => { x: number; y: number; tap: () => void } | null;
    /** A label in the game's font, centred on (x, y). */
    label: (x: number, y: number, str: string, size: number, color: string, stroke: string, thick: number) => Phaser.GameObjects.Text;
}

/** One step of a demo script. Steps run one after another. */
export type Step =
    | { wait: number }
    /** The hand swipes along these screen points, or picks a stroke: 'auto' where the test bot
     * would, 'varied' (see Demo.varied), 'jam' over colours no nest wants. */
    | { swipe: [number, number][] | 'auto' | 'varied' | 'jam' }
    /** The hand taps a target (see DemoHost.target). */
    | { tap: string }
    /** The hand keeps swiping for this many seconds, or until the level ends: 'varied' (the
     * default) strokes in turn down, across, up, diagonally and in zigzags over the picture
     * (see Demo.varied); 'play' where the test bot would; 'jam' over colours no nest wants, so
     * the conveyor fills (until it holds `belt` blocks, 20 by default). Unless `finish` (or
     * jamming), it stops with 30% of the picture left, so the shot can cut away before the win screen. */
    | { auto: number; mode?: 'varied' | 'play' | 'jam'; belt?: number; finish?: boolean }
    /** Wait until the game reaches this state (or `max` seconds); 'calm': no booster at work. */
    | { until: 'win' | 'lose' | 'end' | 'belt' | 'calm'; max: number; belt?: number }
    | { speed: boolean }
    /** Cut to level `cut` (0-based): it slides in from the right, pushing the last shot out to the
     * left. It is first played on `ff` seconds (or until `ffBelt` blocks are on the belt or on
     * their way), so the shot starts mid-level. */
    | { cut: number; ff?: number; ffMode?: 'play' | 'jam'; ffBelt?: number }
    /** The hand moves off screen. */
    | { hide: true };

/** The hand's kinds of stroke (see Demo.varied): down from the middle, diagonally down from the
 * left or the right, up from the bottom, along the bottom to the right or the left, a zigzag down. */
export type StrokeKind = 'down' | 'diagL' | 'diagR' | 'up' | 'sweepR' | 'sweepL' | 'zigzag';
const ALL_STROKES: StrokeKind[] = ['down', 'diagL', 'up', 'sweepR', 'diagR', 'sweepL', 'zigzag'];

/** A reel: the level it opens on, its length in seconds (from the tap that starts it, end card
 * included), the kinds of stroke the hand takes in turn (a kind listed twice comes twice as
 * often; all of them by default) and its steps. When the steps run out before the end card, the
 * hand keeps swiping. */
export interface DemoScene { title: string; level: number; length: number; strokes?: StrokeKind[]; steps: Step[] }

/**
 * The marketing reels, five of 30 seconds and two of 60: gameplay only, at x2 from the start, no
 * boosters, none played to the win. Each shows its own levels (0-based: level_1 is 0) with its
 * own mix of strokes. They show levels 11 to 20 (the pictures they were made with).
 */
export const DEMO_SCENES: Record<string, DemoScene> = {
    // mostly straight drops: levels 1, 14, 7, 3
    drops30: {
        title: 'Drops, 30 s', level: 0, length: 30, strokes: ['down', 'diagL', 'down', 'zigzag', 'down', 'diagR'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 13, ff: 15 }, { auto: 5 }, { cut: 6, ff: 20 }, { auto: 5 }, { cut: 2, ff: 10 }, { auto: 12 },
        ],
    },
    // mostly sweeps along the bottom: levels 12, 15, 2, 4
    sweeps30: {
        title: 'Sweeps, 30 s', level: 11, length: 30, strokes: ['sweepR', 'up', 'sweepL', 'down', 'sweepR', 'sweepL'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 14, ff: 10 }, { auto: 5 }, { cut: 1, ff: 12 }, { auto: 5 }, { cut: 3, ff: 8 }, { auto: 12 },
        ],
    },
    // mostly zigzags: levels 13, 6, 3, 1
    zigzag30: {
        title: 'Zigzags, 30 s', level: 12, length: 30, strokes: ['zigzag', 'up', 'zigzag', 'diagR', 'zigzag', 'down'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 5, ff: 20 }, { auto: 5 }, { cut: 2, ff: 10 }, { auto: 5 }, { cut: 0 }, { auto: 12 },
        ],
    },
    // mostly diagonals: levels 14, 4, 12, 7
    diagonals30: {
        title: 'Diagonals, 30 s', level: 13, length: 30, strokes: ['diagL', 'diagR', 'sweepR', 'diagR', 'diagL', 'up'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 3, ff: 8 }, { auto: 5 }, { cut: 11, ff: 3 }, { auto: 5 }, { cut: 6, ff: 20 }, { auto: 12 },
        ],
    },
    // mostly up from the bottom: levels 15, 2, 13, 6
    rises30: {
        title: 'Rises, 30 s', level: 14, length: 30, strokes: ['up', 'sweepL', 'up', 'down', 'up', 'zigzag'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 1, ff: 12 }, { auto: 5 }, { cut: 12, ff: 12 }, { auto: 5 }, { cut: 5, ff: 20 }, { auto: 12 },
        ],
    },
    // every kind of stroke in turn: levels 1, 13, 15, 7, 3, 12, 14, 6
    mix60: {
        title: 'Mix, 60 s', level: 0, length: 60, steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 12, ff: 12 }, { auto: 5.5 }, { cut: 14, ff: 10 }, { auto: 5.5 }, { cut: 6, ff: 20 }, { auto: 5.5 },
            { cut: 2, ff: 10 }, { auto: 5.5 }, { cut: 11, ff: 3 }, { auto: 5.5 }, { cut: 13, ff: 15 }, { auto: 5.5 },
            { cut: 5, ff: 20 }, { auto: 12 },
        ],
    },
    // levels 4, 3, 2, 7, 6, 15, 14, 13, 12, then level 1, about five seconds each
    tour60: {
        title: 'Tour, 60 s', level: 3, length: 60, strokes: ['zigzag', 'sweepL', 'diagR', 'up', 'down', 'sweepR', 'diagL'], steps: [
            { speed: true }, { wait: 0.3 }, { swipe: 'varied' }, { auto: 3 },
            { cut: 2, ff: 10 }, { auto: 4 }, { cut: 1, ff: 12 }, { auto: 4 }, { cut: 6, ff: 20 }, { auto: 4 },
            { cut: 5, ff: 20 }, { auto: 4 }, { cut: 14, ff: 10 }, { auto: 4 }, { cut: 13, ff: 15 }, { auto: 4 },
            { cut: 12, ff: 12 }, { auto: 4 }, { cut: 11, ff: 3 }, { auto: 4 }, { cut: 0 }, { auto: 10 },
        ],
    },
};

/** The fingertip in img/hand.png (178 x 217): the hand points up and to the right. */
const TIP = { x: 150, y: 12 };
const HAND_SCALE = 0.85, MOVE_SPEED = 1200, SWIPE_SPEED = 550;
/** Seconds of end card at the end of every reel. */
const END_CARD = 3;

type Act = (dt: number) => boolean;

export class Demo {
    private hand: Phaser.GameObjects.Image;
    private ring: Phaser.GameObjects.Arc;
    private step = 0;
    /** The next kind of varied stroke (they take turns). */
    private kind = 0;
    private act: Act | null = null;
    /** When the reel started (s, on the clock the scene passes in: real time, so the clip's
     * length holds even when a cut's fast-forward stalls a frame, or the frame clock when
     * recording frame by frame), and whether the end card is up. */
    private t0 = -1;
    private card = false;

    constructor(private host: DemoHost, private demo: DemoScene) {
        const sc = host.scene;
        // above everything, panels included, so it can tap their buttons
        this.hand = sc.add.image(1180, 1500, 'hand').setOrigin(TIP.x / 178, TIP.y / 217).setScale(HAND_SCALE).setDepth(40);
        this.ring = sc.add.circle(0, 0, 40, 0xffffff, 0).setStrokeStyle(8, 0xffffff, 0.9).setDepth(39).setVisible(false);
    }

    /** `dt`: the game's frame time; `held`: play is held (a panel); `now`: the clock, in s. */
    update(dt: number, held: boolean, now: number) {
        if (this.card) return;
        if (this.t0 < 0) this.t0 = now;
        if (now - this.t0 >= this.demo.length - END_CARD) { this.endCard(); return; }
        if (held) return;
        // out of steps: keep swiping until the end card
        while (!this.act) this.act = this.begin(this.demo.steps[this.step++] ?? { auto: 1 });
        if (this.act(dt)) this.act = null;
    }

    /** The end card: the last frame (without the hand) blurs and dims, the logo pops in, then a
     * Play Now button that keeps growing and shrinking. */
    private endCard() {
        const sc = this.host.scene, W = 1080, H = 1920;
        this.card = true;
        this.hand.setVisible(false);
        this.ring.setVisible(false);
        (sc.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer).snapshot((img) => {
            if (sc.textures.exists('demo_end')) sc.textures.remove('demo_end');
            sc.textures.addImage('demo_end', img as HTMLImageElement);
            const shot = sc.add.image(0, 0, 'demo_end').setOrigin(0).setDisplaySize(W, H).setScrollFactor(0).setDepth(50);
            const blur = shot.enableFilters().filters!.internal.addBlur(1, 2, 2, 0);
            const dim = sc.add.rectangle(0, 0, W, H, 0x000000, 0).setOrigin(0).setScrollFactor(0).setDepth(51);
            sc.tweens.add({ targets: blur, strength: 2.5, duration: 400 });
            sc.tweens.add({ targets: dim, fillAlpha: 0.55, duration: 400 });
            const logo = sc.add.image(W / 2, 760, 'logo').setScrollFactor(0).setDepth(52).setScale(0);
            sc.tweens.add({ targets: logo, scale: 0.94, duration: 500, delay: 150, ease: 'Back.easeOut' });
            const btn = sc.add.container(W / 2, 1320).setScrollFactor(0).setDepth(52).setScale(0);
            btn.add([sc.add.image(0, 0, 'btn_continue'), this.host.label(0, -8, 'PLAY NOW', 76, '#ffffff', '#1f7a12', 10)]);
            sc.tweens.add({
                targets: btn, scale: 1.35, duration: 350, delay: 450, ease: 'Back.easeOut',
                onComplete: () => sc.tweens.add({ targets: btn, scale: 1.12, duration: 420, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' }),
            });
        });
    }

    private begin(s: Step): Act | null {
        const sim = this.host.sim();
        if ('wait' in s) { let t = s.wait; return (dt) => (t -= dt) <= 0; }
        if ('speed' in s) { this.host.setSpeed(s.speed); return null; }
        if ('hide' in s) return this.moveTo(1180, this.hand.y);
        if ('cut' in s) return this.cut(s);
        if ('tap' in s) return this.tap(s.tap);
        if ('swipe' in s) {
            const pts = s.swipe === 'varied' ? this.varied(sim, true) : s.swipe === 'auto' || s.swipe === 'jam' ? pickStroke(sim, s.swipe === 'jam' ? 'jam' : 'play') : s.swipe;
            return pts ? this.stroke(pts) : null;
        }
        if ('until' in s) {
            let t = s.max;
            return (dt) => {
                const sm = this.host.sim();
                const used = sm.slots.filter(Boolean).length;
                const ok = s.until === 'belt' ? used >= (s.belt ?? 16)
                    : s.until === 'calm' ? !this.host.busy()
                    : s.until === 'end' ? this.host.overlay() === 'end'
                    : sm.state === s.until && this.host.overlay() === 'end';
                return ok || (t -= dt) <= 0;
            };
        }
        // auto: the next stroke as soon as the bot would make one, until time is up or the level ends
        let t = s.auto, sub: Act | null = null;
        return (dt) => {
            t -= dt;
            const sm = this.host.sim();
            if (sub && !sub(dt)) return false;
            sub = null;
            if (t <= 0 || sm.state !== 'play' || this.host.overlay()) return true;
            // a shot that cuts away leaves the level unfinished (the win screen would hold the reel)
            if (!s.finish && s.mode !== 'jam' && sm.left < sm.total * 0.3) return true;
            if (s.mode === 'jam' && sm.slots.filter(Boolean).length >= (s.belt ?? 20)) return true;
            if (this.host.busy()) return false;
            const mode = s.mode ?? 'varied', pts = mode === 'varied' ? this.varied(sm) : pickStroke(sm, mode);
            if (pts) sub = this.stroke(pts);
            return false;
        };
    }

    /** A push: the last frame is kept as a picture, the new level is set up (and played on)
     * under it, then the picture slides out to the left as the camera brings the new level in
     * from the right. */
    private cut(s: { cut: number; ff?: number; ffMode?: 'play' | 'jam'; ffBelt?: number }): Act {
        const sc = this.host.scene, cam = sc.cameras.main, W = 1080, H = 1920, DUR = 0.5;
        let snap: Phaser.GameObjects.Image | null = null, waiting = true, t = 0;
        (sc.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer).snapshot((img) => {
            if (sc.textures.exists('demo_cut')) sc.textures.remove('demo_cut');
            sc.textures.addImage('demo_cut', img as HTMLImageElement);
            snap = sc.add.image(0, 0, 'demo_cut').setOrigin(0).setDisplaySize(W, H).setScrollFactor(0).setDepth(45);
            this.host.goLevel(s.cut);
            if (s.ff) this.host.fastForward(s.ff, s.ffMode ?? 'play', s.ffBelt);
            this.hand.setPosition(1180, 1300);
            cam.scrollX = -W;
            waiting = false;
        });
        return (dt) => {
            if (waiting) return false;
            t = Math.min(1, t + dt / DUR);
            const e = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
            cam.scrollX = -W * (1 - e);
            snap!.x = -W * e;
            if (t < 1) return false;
            snap!.destroy();
            cam.scrollX = 0;
            return true;
        };
    }

    /**
     * A stroke of the reel's next kind (see StrokeKind), so the play looks varied: down from the
     * middle to the bottom, diagonally down to the bottom from the left or the right, up from the
     * bottom, along the bottom left to right or right to left, or a zigzag down to the bottom.
     * Every stroke reaches the bottom of the sand under it, so the sand it frees runs out at once
     * (freed sand with fixed sand under it would only rest there). Of a dozen such strokes placed
     * at random over the picture's fixed sand, the one crossing the most sand that a front nest
     * wants (less what no nest wants) is taken; none while the belt is busy (so it never fills up), unless `now`.
     */
    private varied(s: Sim, now = false): [number, number][] | null {
        // blocks on the belt, waiting in the pipe, and still to come from loose sand
        const loose = Object.values(s.looseByColour()).reduce((a, b) => a + b, 0);
        const used = s.slots.filter(Boolean).length + s.pipe.length + loose / 64;
        if (!now && used > 8) return null;
        const G = s.G, want = new Set(s.cols.map((c) => c[0]).filter(Boolean).map((n) => n.color));
        // the picture's fixed sand, as a box on screen, and its lowest grain in each column
        let x0 = G, x1 = -1, y0 = G, y1 = -1;
        const low = new Array<number>(G).fill(-1);
        for (let p = 0; p < G * G; p++) if (s.key[p] && !s.loose[p]) {
            const x = p % G, y = (p / G) | 0;
            if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
            low[x] = y;
        }
        if (x1 < 0) return null;
        const sx = (x: number) => s.ox + (x + 0.5) * s.gsx, sy = (y: number) => s.oy + (y + 0.5) * s.gs;
        const L = sx(x0), R = sx(x1), T = sy(y0), w = R - L, h = sy(y1) - T, r = Math.random;
        /** Just under the lowest fixed sand near screen x. */
        const bottom = (x: number) => {
            const gx = Math.round((x - s.ox) / s.gsx - 0.5);
            let y = -1;
            for (let k = gx - 2; k <= gx + 2; k++) if (k >= 0 && k < G) y = Math.max(y, low[k]);
            return sy(y < 0 ? y1 : y) + s.gs * 2;
        };
        /** Points along the sand's bottom edge from screen x a to b, a little inside it. */
        const along = (a: number, b: number): [number, number][] => {
            const n = Math.max(2, Math.ceil(Math.abs(b - a) / 40)), pts: [number, number][] = [];
            for (let k = 0; k <= n; k++) { const x = a + ((b - a) * k) / n; pts.push([x, bottom(x) - s.gs * 4]); }
            return pts;
        };
        const shapes: Record<StrokeKind, () => [number, number][]> = {
            // down from the middle
            down: () => { const x = L + w * (0.25 + 0.5 * r()), y = T + h * (0.1 + 0.35 * r()), x2 = x + 30 * (r() - 0.5); return [[x, y], [x2, bottom(x2)]]; },
            // diagonally down from the left
            diagL: () => { const x = L + w * (0.05 + 0.3 * r()), y = T + h * (0.1 + 0.3 * r()), x2 = x + w * (0.25 + 0.2 * r()); return [[x, y], [x2, bottom(x2)]]; },
            // up from the bottom
            up: () => { const x = L + w * (0.1 + 0.8 * r()), b = bottom(x); return [[x, b], [x + 30 * (r() - 0.5), b - h * (0.45 + 0.3 * r())]]; },
            // along the bottom, left to right
            sweepR: () => { const x = L + w * 0.3 * r(); return along(x, x + w * (0.45 + 0.25 * r())); },
            // diagonally down from the right
            diagR: () => { const x = R - w * (0.05 + 0.3 * r()), y = T + h * (0.1 + 0.3 * r()), x2 = x - w * (0.25 + 0.2 * r()); return [[x, y], [x2, bottom(x2)]]; },
            // along the bottom, right to left
            sweepL: () => { const x = R - w * 0.3 * r(); return along(x, x - w * (0.45 + 0.25 * r())); },
            // a zigzag down to the bottom
            zigzag: () => {
                const x = L + w * (0.25 + 0.5 * r()), y = T + h * (0.1 + 0.2 * r()), k = 70, pts: [number, number][] = [];
                const b = bottom(x);
                for (let i = 0, n = 5; i <= n; i++) { const px = x + (i % 2 ? k : -k) / 2; pts.push([px, i === n ? bottom(px) : y + ((b - y) * i) / n]); }
                return pts;
            },
        };
        const kinds = this.demo.strokes ?? ALL_STROKES, shape = shapes[kinds[this.kind++ % kinds.length]];
        // how good a stroke is: wanted sand along it counts, unwanted sand counts against it
        const score = (pts: [number, number][]) => {
            let v = 0;
            for (let i = 0; i + 1 < pts.length; i++) {
                const [ax, ay] = pts[i], [bx, by] = pts[i + 1], n = Math.ceil(Math.hypot(bx - ax, by - ay) / 10);
                for (let k = 0; k <= n; k++) {
                    const gx = Math.floor((ax + ((bx - ax) * k) / n - s.ox) / s.gsx), gy = Math.floor((ay + ((by - ay) * k) / n - s.oy) / s.gs);
                    if (gx < 0 || gy < 0 || gx >= G || gy >= G) continue;
                    const p = gy * G + gx;
                    if (s.key[p] && !s.loose[p]) v += want.has(s.keys[s.key[p]]!) ? 1 : -0.6;
                }
            }
            return v;
        };
        let best: [number, number][] | null = null, bestV = 0;
        for (let i = 0; i < 12; i++) { const pts = shape(), v = score(pts); if (v > bestV) { bestV = v; best = pts; } }
        return best ?? pickStroke(s, 'play');
    }

    /** The hand glides to (x, y). */
    private moveTo(x: number, y: number): Act {
        const x0 = this.hand.x, y0 = this.hand.y, d = Math.hypot(x - x0, y - y0), dur = Math.max(0.15, d / MOVE_SPEED);
        let t = 0;
        return (dt) => {
            t = Math.min(1, t + dt / dur);
            const e = t * t * (3 - 2 * t);
            this.hand.setPosition(x0 + (x - x0) * e, y0 + (y - y0) * e);
            return t >= 1;
        };
    }

    /** Press, drag along the points (freeing the sand under the fingertip, as a real swipe does), release. */
    private stroke(pts0: [number, number][]): Act {
        // a one-point stroke becomes a short drag, so it reads as a swipe
        const pts = pts0.length > 1 ? pts0 : [[pts0[0][0] - 50, pts0[0][1] + 10], [pts0[0][0] + 50, pts0[0][1] - 10]] as [number, number][];
        const sim = () => this.host.sim();
        let phase = 0, move = this.moveTo(pts[0][0], pts[0][1]), i = 0, press = 0;
        return (dt) => {
            if (phase === 0) { if (!move(dt)) return false; phase = 1; press = 0; }
            if (phase === 1) {
                press += dt;
                this.hand.setScale(HAND_SCALE * (1 - 0.12 * Math.min(1, press / 0.08)));
                if (press < 0.08) return false;
                sim().endSwipe(); sim().swipeTo(pts[0][0], pts[0][1]);
                phase = 2;
            }
            if (phase === 2) {
                let left = SWIPE_SPEED * dt;
                while (left > 0 && i < pts.length - 1) {
                    const [tx, ty] = pts[i + 1], dx = tx - this.hand.x, dy = ty - this.hand.y, d = Math.hypot(dx, dy);
                    if (d <= left) { this.hand.setPosition(tx, ty); left -= d; i++; } else { this.hand.setPosition(this.hand.x + (dx / d) * left, this.hand.y + (dy / d) * left); left = 0; }
                    if (sim().state === 'play') sim().swipeTo(this.hand.x, this.hand.y);
                }
                if (i < pts.length - 1) return false;
                sim().endSwipe();
                phase = 3; press = 0;
            }
            press += dt;
            this.hand.setScale(HAND_SCALE * (0.88 + 0.12 * Math.min(1, press / 0.1)));
            return press >= 0.18;
        };
    }

    /** Move to a target, press with a ring, and tap it. */
    private tap(name: string): Act {
        let phase = 0, move: Act | null = null, t = 0;
        return (dt) => {
            const tg = this.host.target(name);
            if (!tg) return (t += dt) > 3; // not there (yet): give up after 3 s
            if (phase === 0) { move ??= this.moveTo(tg.x, tg.y); if (!move(dt)) return false; phase = 1; t = 0; }
            t += dt;
            this.hand.setScale(HAND_SCALE * (1 - 0.15 * Math.sin(Math.PI * Math.min(1, t / 0.25))));
            if (phase === 1 && t >= 0.12) {
                phase = 2;
                this.ring.setPosition(tg.x, tg.y).setVisible(true).setScale(0.4).setAlpha(1);
                this.host.scene.tweens.add({ targets: this.ring, scale: 1.4, alpha: 0, duration: 380, onComplete: () => this.ring.setVisible(false) });
                tg.tap();
            }
            return t >= 0.4;
        };
    }
}
