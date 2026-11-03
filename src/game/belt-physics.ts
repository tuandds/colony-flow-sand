// A loose belt's blocks as bodies (variant 2): the belt drags each block along by friction, the
// blocks push each other apart where they crowd, the belt's two rims hold them on it, and a block
// that slides over the belt (pushed, or held back by the blocks ahead) rolls over the way it
// slides, coming to rest on a face. Round the belt's ends the belt turns, and so do the blocks
// riding on it. Plain 2D physics in screen px; the cubes are drawn turned by the body's angles.
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
        // rolling: sliding over the belt tips the block over the way it slides; at rest on the
        // belt it settles flat on its nearest face
        if (dv > ROLL_SLIP) { b.rz -= (dvx / BODY_R) * dt * 0.7; b.rx += (dvy / BODY_R) * dt * 0.7; }
        else {
            const e = Math.min(1, dt * 10);
            b.rz += (Math.round(b.rz / HALF_PI) * HALF_PI - b.rz) * e;
            b.rx += (Math.round(b.rx / HALF_PI) * HALF_PI - b.rx) * e;
        }
        b.x += b.vx * dt; b.y += b.vy * dt; b.yaw += b.wy * dt;
    }
    // blocks that overlap push apart (half each), losing the speed they had into each other; a
    // glancing hit spins them
    const D = BODY_R * 2;
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
    // the rims: a block is held within LANE of the belt's middle, losing its speed into the rim
    for (const b of bodies) {
        const at = beltAt(b.x, b.y), over = Math.abs(at.d) - LANE;
        if (over <= 0) continue;
        const s = Math.sign(at.d);
        b.x -= at.ux * over * s; b.y -= at.uy * over * s;
        const vn = (b.vx * at.ux + b.vy * at.uy) * s;
        if (vn > 0) { b.vx -= at.ux * vn * s * (1 + RIM_BOUNCE); b.vy -= at.uy * vn * s * (1 + RIM_BOUNCE); }
    }
}
