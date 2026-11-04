// Renders the 3D ants and sand blocks (Colony Flow's own meshes) with three.js into an
// offscreen canvas. The Phaser scene shows that canvas as a texture between the board layer
// and the UI layer. Phaser 4 has no 3D objects of its own, so three.js does this part.
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { CUBE_ELEV } from './belt-physics';
import { H, W } from './layout';

const ANT_ELEV = 0.95, ANT_LEN = 74, CARRY_CUBE = 26;
/** The 3D layer renders below full resolution; it is uploaded to Phaser every frame. */
const RES = 1;

export interface Item3D {
    ref: object;
    kind: 'ant' | 'cube';
    /** Screen position: the ground point. */
    x: number; y: number;
    color: string | number;
    size?: number; ang?: number; carry?: number | null; alpha?: number; scale?: number;
    /** Cubes: (x, y) is the cube's centre, and it turns about its centre (blocks in flight).
     * Otherwise (x, y) is the point under the cube. */
    centered?: boolean;
    /** Cubes: a turn of the cube itself about its own centre, x/y/z in radians (blocks lying
     * loose on the belt, turned every which way). */
    spin?: [number, number, number];
    /** Cubes, and the cube an ant carries: shiny like jelly sweets, with a bright highlight where
     * the light hits (made so; changing it later has no effect). */
    shiny?: boolean;
    /** How far toward the camera (3D z) the item comes for each px lower on screen; 0.2 unless
     * given. Cubes lying on one ground (the yard) use GROUND_DEPTH, the true depth for the tipped
     * view, so their meshes meet as solid cubes and never pass into each other. */
    depthK?: number;
}
/** The true depth per screen px for things on the ground, seen tipped by CUBE_ELEV. */
export const GROUND_DEPTH = 1 / Math.tan(CUBE_ELEV);

interface Model { parts: THREE.BufferGeometry[]; size: THREE.Vector3 }
interface Live {
    root: THREE.Group; kind: Item3D['kind']; color: Item3D['color']; mats: THREE.Material[];
    yaw?: THREE.Group; carry?: THREE.Group;
    /** Cubes: the tilted group, and half the cube's size. */
    tilt?: THREE.Group; half?: number;
    /** Cubes: the group that turns the cube about its centre (Item3D.spin). */
    spin?: THREE.Group;
}

const meshes = (group: THREE.Group) => {
    const parts: THREE.BufferGeometry[] = [];
    group.traverse((o) => { if ((o as THREE.Mesh).isMesh) parts.push((o as THREE.Mesh).geometry); });
    return parts;
};

/** Centre the meshes on x/z, stand them on y = 0 and report their size. */
function prep(group: THREE.Group): Model {
    const parts = meshes(group), box = new THREE.Box3();
    for (const g of parts) { g.computeBoundingBox(); box.union(g.boundingBox!); }
    const c = box.getCenter(new THREE.Vector3());
    for (const g of parts) { g.translate(-c.x, -box.min.y, -c.z); g.computeVertexNormals(); }
    return { parts, size: box.getSize(new THREE.Vector3()) };
}

function lambert(color: THREE.ColorRepresentation) {
    return new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, transparent: true });
}

/** Ants are glossy, as in Colony Flow: a shiny material with a white highlight. */
function glossy(color: THREE.ColorRepresentation) {
    return new THREE.MeshPhongMaterial({ color, specular: 0x5a5a5a, shininess: 60, side: THREE.DoubleSide, transparent: true });
}

/** How much a shiny cube glows in its own colour. */
const JELLY_GLOW = 0.12;

/** Shiny cubes (Item3D.shiny): a strong white highlight and a little glow of their own colour, so
 * they look lit and glossy, like jelly sweets. */
function jelly(color: THREE.ColorRepresentation) {
    const c = new THREE.Color(color);
    return new THREE.MeshPhongMaterial({ color: c, specular: 0x6e6e6e, shininess: 45, emissive: c.clone().multiplyScalar(JELLY_GLOW), side: THREE.DoubleSide, transparent: true });
}

/** An ant's body colour: black is lifted just enough (to a near-black) that the light still
 * shapes the ant; it stays black to the eye. */
function antColor(color: THREE.ColorRepresentation) {
    const c = new THREE.Color(color), hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    if (hsl.l < 0.06) c.setHSL(hsl.h, hsl.s, 0.06);
    return c;
}

// Ant legs swing back and forth: vertices far from the body's centre line are pushed along the
// walking axis with a per-ant phase, and the body bobs a little with each step.
function antMaterial(color: THREE.ColorRepresentation, legSpan: number) {
    const m = glossy(antColor(color));
    m.userData.time = { value: 0 };
    m.userData.phase = { value: Math.random() * 6.28 };
    m.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = m.userData.time;
        sh.uniforms.uPhase = m.userData.phase;
        sh.vertexShader = 'uniform float uTime; uniform float uPhase;\n' + sh.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
       float leg = smoothstep(${(legSpan * 0.3).toFixed(2)}, ${(legSpan * 0.85).toFixed(2)}, abs(position.x));
       float side = position.x > 0.0 ? 0.0 : 3.14159;
       transformed.z += sin(uTime * 15.0 + uPhase + side + position.z * 0.7) * ${(legSpan * 0.18).toFixed(2)} * leg;
       transformed.y += abs(sin(uTime * 15.0 + uPhase + side)) * ${(legSpan * 0.06).toFixed(2)} * leg;
       transformed.y += abs(sin(uTime * 15.0 + uPhase)) * ${(legSpan * 0.04).toFixed(2)} * (1.0 - leg);`);
    };
    return m;
}

export class ThreeLayer {
    readonly canvas = document.createElement('canvas');
    private renderer: THREE.WebGLRenderer;
    private scene = new THREE.Scene();
    private camera = new THREE.OrthographicCamera(0, W, 0, -H, 1, 12000);
    private models: Record<'ant' | 'cube', Model> = {} as never;
    private live = new Map<object, Live>();

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(Math.round(W * RES), Math.round(H * RES), false);
        this.camera.position.set(0, 0, 6000);
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x9a7a5a, 1.9));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(-0.4, 0.8, 1);
        this.scene.add(sun);
    }

    async load(base: string) {
        const loader = new OBJLoader();
        const [ant, cube] = await Promise.all(['ant', 'cube'].map((n) => loader.loadAsync(`${base}assets/models/${n}.obj`)));
        this.models = { ant: prep(ant), cube: prep(cube) };
    }

    private cubeMesh(color: THREE.ColorRepresentation, size: number, shiny = false) {
        const M = this.models.cube, s = size / M.size.x;
        const g = new THREE.Group();
        for (const p of M.parts) g.add(new THREE.Mesh(p, shiny ? jelly(color) : lambert(color)));
        g.scale.setScalar(s);
        return g;
    }

    private make(it: Item3D): Live {
        const root = new THREE.Group();
        const o: Live = { root, kind: it.kind, color: it.color, mats: [] };
        if (it.kind === 'ant') {
            const M = this.models.ant, s = ANT_LEN / M.size.z;
            const tilt = new THREE.Group(); tilt.rotation.x = ANT_ELEV;
            const yaw = new THREE.Group();
            const body = new THREE.Group(); body.scale.setScalar(s);
            M.parts.forEach((p, i) => {
                const m = i === 0 ? antMaterial(it.color, M.size.x / 2) : glossy('#ffffff');
                o.mats.push(m); body.add(new THREE.Mesh(p, m));
            });
            yaw.add(body);
            const carry = this.cubeMesh('#ffffff', CARRY_CUBE, it.shiny);
            carry.position.set(0, M.size.y * s * 1.05, M.size.z * s * 0.42);
            carry.visible = false;
            yaw.add(carry);
            tilt.add(yaw); root.add(tilt);
            o.yaw = yaw; o.carry = carry;
        } else {
            const tilt = new THREE.Group(); tilt.rotation.x = CUBE_ELEV;
            o.tilt = tilt; o.half = (it.size ?? 50) / 2;
            const c = this.cubeMesh(it.color, it.size ?? 50, it.shiny);
            c.traverse((m) => { const mat = (m as THREE.Mesh).material as THREE.Material | undefined; if (mat) o.mats.push(mat); });
            // the cube stands on y = 0: the spin group sits at its centre, so it turns about it
            const spin = new THREE.Group();
            spin.position.y = o.half; c.position.y = -o.half;
            spin.add(c); tilt.add(spin); root.add(tilt);
            o.spin = spin;
        }
        this.scene.add(root);
        return o;
    }

    private dispose(o: Live) {
        this.scene.remove(o.root);
        for (const m of o.mats) m.dispose();
    }

    /** Draw this frame's objects; anything not listed is removed. */
    render(items: Item3D[], time: number) {
        const seen = new Set<object>();
        for (const it of items) {
            let o = this.live.get(it.ref);
            if (o && (o.kind !== it.kind || o.color !== it.color)) { this.dispose(o); o = undefined; }
            if (!o) { o = this.make(it); this.live.set(it.ref, o); }
            seen.add(it.ref);
            const sc = it.scale ?? 1, alpha = it.alpha ?? 1;
            let layer = 0;
            const y = it.y;
            if (it.kind === 'ant') { layer = 4000; o.yaw!.rotation.y = Math.PI / 2 - (it.ang ?? 0); }
            // cubes turn about the screen axis (the Fan's whirl); 0 when not given
            if (it.kind === 'cube') {
                o.root.rotation.z = it.ang ?? 0;
                const [sx, sy, sz] = it.spin ?? [0, 0, 0];
                o.spin!.rotation.set(sx, sy, sz);
                // centred: shift the cube so its middle (half its size up the tilted cube) is on
                // the anchor point, which the turn then goes about
                const h = it.centered ? o.half! : 0;
                o.tilt!.position.set(0, -h * Math.cos(CUBE_ELEV), -h * Math.sin(CUBE_ELEV));
            }
            o.root.position.set(it.x, -y, layer + y * (it.depthK ?? 0.2));
            o.root.scale.setScalar(sc);
            for (const m of o.mats) { m.opacity = alpha; if (m.userData.time) m.userData.time.value = time; }
            if (o.carry) {
                o.carry.visible = it.carry != null;
                if (it.carry != null) {
                    const color = it.carry;
                    // a shiny (jelly) cube's glow follows its colour too
                    o.carry.traverse((m) => {
                        const mat = (m as THREE.Mesh).material as THREE.MeshLambertMaterial | THREE.MeshPhongMaterial | undefined;
                        if (!mat) return;
                        mat.color.set(color);
                        if (mat instanceof THREE.MeshPhongMaterial) mat.emissive.set(color).multiplyScalar(JELLY_GLOW);
                    });
                }
            }
        }
        for (const [ref, o] of this.live) if (!seen.has(ref)) { this.dispose(o); this.live.delete(ref); }
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        for (const o of this.live.values()) this.dispose(o);
        this.live.clear();
    }
}
