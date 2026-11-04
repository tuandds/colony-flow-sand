// Blocks lying loose as bodies: on a loose belt (variant 2) or in a yard (variant 3). On the belt: the belt drags each block along by friction, the
// blocks push each other apart where they crowd, the belt's two rims hold them on it, and a block
// that slides over the belt (pushed, or held back by the blocks ahead) rolls over the way it
// slides, coming to rest on a face. Round the belt's ends the belt turns, and so do the blocks
// riding on it. In the yard there is no belt: blocks dropped in slide, bump into each other and
// the yard's walls, roll, and come to rest. Plain 2D physics in screen px; the cubes are drawn
// turned by the body's angles.
import { BELT, BELT_SPEED } from './layout';

export interface Body {
    x: number; y: number; vx: number; vy: number;
    /** Turn about the cube's up axis (yaw) and its speed; its roll about the screen's x and y
     * axes (radians). */
    yaw: number; wy: number; rx: number; rz: number;
}

/** A block on a loose belt is BODY_R px round (its cube is twice that wide, LOOSE_CUBE). */
export const LOOSE_CUBE = 28, BODY_R = LOOSE_CUBE / 2;
/** How far a block's centre may stray from the belt's middle line: the band's half width, less
 * half the block (a cube may hang a little over the rim, as a 3D cube does). */
export const LANE = BELT.band / 2 - BODY_R * 0.5;
/** Friction: the most the belt can change a block's speed, px/s each second. Less than it takes
 * to round the belt's ends at speed (BELT_SPEED² / BELT.r, 1800), so round them the blocks slide
 * out against the outer rim and pile up there, then the belt takes them on again. */
const GRIP = 900;
/** Bumps: how much speed a block keeps along a hit (0 none, 1 all), and how hard a glancing hit
 * spins it; off a rim a block bounces back in harder. */
const BOUNCE = 0.15, SPIN_KICK = 0.035, RIM_BOUNCE = 0.6;
/** The belt jolts: now and then (TUMBLES times a second, on average) a block is knocked across
 * the belt, TUMBLE_V px/s or so, in or out, and tumbles over as it goes; so the blocks roll in and
 * out across the belt instead of staying where they landed. */
const TUMBLES = 0.9, TUMBLE_V = 150;
/** A block rolls only when it slides over the belt faster than this (px/s), and settles back on
 * a face when it stops. */
const ROLL_SLIP = 40;
const HALF_PI = Math.PI / 2;

/** Where (x, y) is on the belt: d, how far it is outward from the belt's middle line; u, the
 * outward direction there; and the belt's own speed there (vx, vy) and how fast it turns (w). */
export function beltAt(x: number, y: number) {
    const { cxL, cxR, cy, r } = BELT;
    let ux: number, uy: number, d: number, onArc = false;
    if (x >= cxL && x <= cxR) { uy = y < cy ? -1 : 1; ux = 0; d = (y - cy) * uy - r; }
    else {
        const cx = x < cxL ? cxL : cxR, dx = x - cx, dy = y - cy, dist = Math.hypot(dx, dy) || 1;
        ux = dx / dist; uy = dy / dist; d = dist - r; onArc = true;
    }
    // the belt runs clockwise on screen: its direction is the outward direction turned a quarter
    const tx = -uy, ty = ux, k = onArc ? (r + d) / r : 1;
    return { d, ux, uy, vx: tx * BELT_SPEED * k, vy: ty * BELT_SPEED * k, w: onArc ? BELT_SPEED / r : 0 };
}

/** One physics step of dt seconds for the bodies on the belt; rand gives the jolts. */
export function stepBodies(bodies: Body[], dt: number, rand: () => number) {
    for (const b of bodies) {
        const at = beltAt(b.x, b.y);
        if (rand() < TUMBLES * dt) {
            // toward the middle more often than away, so blocks thrown out at the ends come back
            const dir = rand() < 0.5 + Math.sign(at.d) * 0.25 ? -1 : 1, v = TUMBLE_V * (0.6 + rand() * 0.8);
            b.vx += at.ux * dir * v; b.vy += at.uy * dir * v;
            b.wy += (rand() - 0.5) * 8;
        }
        // friction: the belt pulls the block toward its own speed, and its turn toward the belt's
        const dvx = at.vx - b.vx, dvy = at.vy - b.vy, dv = Math.hypot(dvx, dvy), max = GRIP * dt;
        const k = dv > max ? max / dv : 1;
        b.vx += dvx * k; b.vy += dvy * k;
        b.wy += (at.w - b.wy) * Math.min(1, dt * 4);
        roll(b, dvx, dvy, BODY_R, dt);
        b.x += b.vx * dt; b.y += b.vy * dt; b.yaw += b.wy * dt;
    }
    collide(bodies, BODY_R);
    rims(bodies);
}

/** Rolling: sliding over the ground (dvx, dvy: the ground's speed less the block's) tips the block
 * over the way it slides; at rest it settles flat on its nearest face. */
function roll(b: Body, dvx: number, dvy: number, R: number, dt: number) {
    if (Math.hypot(dvx, dvy) > ROLL_SLIP) { b.rz -= (dvx / R) * dt * 0.7; b.rx += (dvy / R) * dt * 0.7; return; }
    const e = Math.min(1, dt * 10);
    b.rz += (Math.round(b.rz / HALF_PI) * HALF_PI - b.rz) * e;
    b.rx += (Math.round(b.rx / HALF_PI) * HALF_PI - b.rx) * e;
}

/** Blocks of radius R that overlap push apart (half each), losing the speed they had into each
 * other; a glancing hit spins them. */
function collide(bodies: Body[], R: number) {
    const D = R * 2;
    for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        for (let j = i + 1; j < bodies.length; j++) {
            const b = bodies[j], dx = b.x - a.x, dy = b.y - a.y;
            if (dx > D || dx < -D || dy > D || dy < -D) continue;
            const d2 = dx * dx + dy * dy;
            if (d2 >= D * D) continue;
            const d = Math.sqrt(d2) || 0.01, nx = d2 ? dx / d : 1, ny = d2 ? dy / d : 0, push = (D - d) / 2;
            a.x -= nx * push; a.y -= ny * push; b.x += nx * push; b.y += ny * push;
            const rvx = b.vx - a.vx, rvy = b.vy - a.vy, vn = rvx * nx + rvy * ny;
            if (vn < 0) {
                const j2 = (-(1 + BOUNCE) * vn) / 2;
                a.vx -= j2 * nx; a.vy -= j2 * ny; b.vx += j2 * nx; b.vy += j2 * ny;
                const vt = -rvx * ny + rvy * nx;
                a.wy += vt * SPIN_KICK; b.wy -= vt * SPIN_KICK;
            }
        }
    }
}

/** The belt's rims: a block is held within LANE of the belt's middle, losing its speed into the rim. */
function rims(bodies: Body[]) {
    for (const b of bodies) {
        const at = beltAt(b.x, b.y), over = Math.abs(at.d) - LANE;
        if (over <= 0) continue;
        const s = Math.sign(at.d);
        b.x -= at.ux * over * s; b.y -= at.uy * over * s;
        const vn = (b.vx * at.ux + b.vy * at.uy) * s;
        if (vn > 0) { b.vx -= at.ux * vn * s * (1 + RIM_BOUNCE); b.vy -= at.uy * vn * s * (1 + RIM_BOUNCE); }
    }
}

/** The yard (variant 3), in place of the conveyor: from the conveyor art's top (inside its border)
 * down to YARD_GAUGE (its fill gauge sits under it, above the nests), centred, and YARD_W wide, so
 * its 36 blocks (SLOTS) fill it when it is full. */
const YARD_W = 745, YARD_GAUGE = 30;
export const YARD = { x0: 540 - YARD_W / 2, x1: 540 + YARD_W / 2, y0: BELT.cy - BELT.r - BELT.band / 2 + 8, y1: BELT.cy + BELT.r + BELT.band / 2 - 8 - YARD_GAUGE };
/** A cube in the yard is YARD_CUBE px wide (variant 1's blocks are 32). */
export const YARD_CUBE = 36;
/** In the yard a sliding block slows by this much a second (px/s each second). */
const YARD_DRAG = 450;

/** A bump tips a block in the yard over by this much (radians for each px/s of the hit), and it
 * rights itself in about 1 / YARD_RIGHT seconds. */
const YARD_TILT = 0.003, YARD_RIGHT = 9;
/** The cubes are drawn tipped toward the camera by CUBE_ELEV (three-layer), so the ground they
 * stand on is seen foreshortened: a px of ground front to back is GROUND_K px on screen. The yard
 * works in ground px (y / GROUND_K), so its cubes meet as their true squares. */
export const CUBE_ELEV = 0.95, GROUND_K = Math.sin(CUBE_ELEV);

/** Ground friction slows a cube's spin by this much (radians/s each second); friction between two
 * cubes rubbing at a bump is FRICTION times the push between them. */
const SPIN_DRAG = 14, FRICTION_K = 0.3;
/** The fastest a cube in the yard may spin (radians/s): a hard bump off a corner spins it no faster. */
const MAX_SPIN = 8;

/** One physics step of dt seconds for cubes `size` px wide in the yard: they slide flat on the
 * ground to a stop, turned only about their upright axis (yaw). Two cubes that overlap are pushed
 * apart as the turned squares they are (separating axes: along the axis they overlap least), and
 * the bump is a rigid-body impulse at the point where they touch (between the corner of each that
 * reaches furthest into the other): it changes their speeds and, by how far off their centres it
 * lands, their spin, with some friction along the faces; a square cube is hard to spin (its
 * moment of inertia is size² / 6). A bump also tips them a little, then they right themselves.
 * They bounce off the yard's walls. */
export function stepYard(bodies: Body[], dt: number, size: number) {
    const h = size / 2, e = Math.min(1, dt * YARD_RIGHT);
    for (const b of bodies) {
        const v = Math.hypot(b.vx, b.vy), k = v > YARD_DRAG * dt ? (v - YARD_DRAG * dt) / v : 0;
        b.rx -= b.rx * e; b.rz -= b.rz * e;
        b.vx *= k; b.vy *= k;
        b.wy -= Math.sign(b.wy) * Math.min(Math.abs(b.wy), SPIN_DRAG * dt);
        b.wy = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, b.wy));
        b.x += b.vx * dt; b.y += b.vy * dt; b.yaw += b.wy * dt;
        // to the ground
        b.y /= GROUND_K; b.vy /= GROUND_K;
    }
    // each cube's square: its two axes, u = (cos, -sin) and v = (sin, cos) of its yaw
    const ax = bodies.map((b) => { const c = Math.cos(b.yaw), s = Math.sin(b.yaw); return [c, -s, s, c]; });
    const reach = (i: number, nx: number, ny: number) => h * (Math.abs(ax[i][0] * nx + ax[i][1] * ny) + Math.abs(ax[i][2] * nx + ax[i][3] * ny));
    const far = size * Math.SQRT2;
    for (let it = 0; it < 2; it++) for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        for (let j = i + 1; j < bodies.length; j++) {
            const b = bodies[j], dx = b.x - a.x, dy = b.y - a.y;
            if (dx > far || dx < -far || dy > far || dy < -far) continue;
            let best = Infinity, nx = 0, ny = 0;
            for (const [px, py] of [[ax[i][0], ax[i][1]], [ax[i][2], ax[i][3]], [ax[j][0], ax[j][1]], [ax[j][2], ax[j][3]]]) {
                const d = dx * px + dy * py, over = reach(i, px, py) + reach(j, px, py) - Math.abs(d);
                if (over <= 0) { best = 0; break; }
                if (over < best) { best = over; nx = d < 0 ? -px : px; ny = d < 0 ? -py : py; }
            }
            if (best <= 0) continue;
            const push = best / 2;
            a.x -= nx * push; a.y -= ny * push; b.x += nx * push; b.y += ny * push;
            // where they touch: between a's corner furthest toward b and b's furthest toward a
            const corner = (k: number, c: Body, sx: number, sy: number) => {
                const [ux, uy, vx, vy] = ax[k], su = Math.sign(ux * sx + uy * sy) || 1, sv = Math.sign(vx * sx + vy * sy) || 1;
                return [c.x + h * (su * ux + sv * vx), c.y + h * (su * uy + sv * vy)];
            };
            const [pax, pay] = corner(i, a, nx, ny), [pbx, pby] = corner(j, b, -nx, -ny);
            const cx = (pax + pbx) / 2, cy = (pay + pby) / 2;
            const rax = cx - a.x, ray = cy - a.y, rbx = cx - b.x, rby = cy - b.y;
            // in this plane (x right, y toward the camera) a turn of w turns the cube by -w of yaw
            const wa = -a.wy, wb = -b.wy;
            const vax = a.vx - wa * ray, vay = a.vy + wa * rax, vbx = b.vx - wb * rby, vby = b.vy + wb * rbx;
            const rvx = vbx - vax, rvy = vby - vay, vn = rvx * nx + rvy * ny;
            if (vn >= 0) continue;
            const I = (size * size) / 6, ca = rax * ny - ray * nx, cb = rbx * ny - rby * nx;
            const jn = (-(1 + BOUNCE) * vn) / (2 + (ca * ca) / I + (cb * cb) / I);
            // friction along the faces, at most FRICTION_K of the push
            const tx = -ny, ty = nx, vt = rvx * tx + rvy * ty, ta = rax * ty - ray * tx, tb = rbx * ty - rby * tx;
            let jt = -vt / (2 + (ta * ta) / I + (tb * tb) / I);
            jt = Math.max(-FRICTION_K * jn, Math.min(FRICTION_K * jn, jt));
            const Jx = jn * nx + jt * tx, Jy = jn * ny + jt * ty;
            a.vx -= Jx; a.vy -= Jy; b.vx += Jx; b.vy += Jy;
            // a takes -J at ra, b takes J at rb; each turns by r x J / I (yaw the other way)
            a.wy += (rax * Jy - ray * Jx) / I; b.wy -= (rbx * Jy - rby * Jx) / I;
            const tk = Math.min(0.5, jn * YARD_TILT);
            a.rz += nx * tk; a.rx -= ny * tk; b.rz -= nx * tk; b.rx += ny * tk;
        }
    }
    // the walls (a cube's reach across depends on its turn). The cube is drawn 0.36 of its size
    // below its body (Game), standing on its square: it shows from its square's back edge, raised
    // by its height (size * cos CUBE_ELEV on screen), down to its square's front edge, and all of
    // that must stay inside the yard's rim
    const gy0 = (YARD.y0 - size * 0.36 + size * Math.cos(CUBE_ELEV)) / GROUND_K, gy1 = (YARD.y1 - size * 0.36) / GROUND_K;
    bodies.forEach((b, i) => {
        const r = h * (Math.abs(ax[i][0]) + Math.abs(ax[i][1]));
        if (b.x < YARD.x0 + r) { b.x = YARD.x0 + r; if (b.vx < 0) b.vx *= -RIM_BOUNCE; }
        if (b.x > YARD.x1 - r) { b.x = YARD.x1 - r; if (b.vx > 0) b.vx *= -RIM_BOUNCE; }
        if (b.y < gy0 + r) { b.y = gy0 + r; if (b.vy < 0) b.vy *= -RIM_BOUNCE; }
        if (b.y > gy1 - r) { b.y = gy1 - r; if (b.vy > 0) b.vy *= -RIM_BOUNCE; }
        // back to the screen
        b.y *= GROUND_K; b.vy *= GROUND_K;
    });
}
