// Renders the 3D nests, ants and sand blocks (Colony Flow's own meshes) with three.js into an
// offscreen canvas. The Phaser scene shows that canvas as a texture between the board layer
// and the UI layer. Phaser 4 has no 3D objects of its own, so three.js does this part.
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { H, W } from './layout';

const TILE_ELEV = 0.95, TILE_SQUASH = 1; // camera elevation for nests, height scale of the nest box (1 = as modelled)
const ANT_ELEV = 1.15, ANT_LEN = 74, CARRY_CUBE = 26;
const CUBE_ELEV = 0.95;
const OUTLINE_PX = 9;
/** The 3D layer renders below full resolution; it is uploaded to Phaser every frame. */
const RES = 0.75;

export interface Item3D {
    ref: object;
    kind: 'tile' | 'ant' | 'cube';
    /** Screen position: tiles use the centre of the top face, ants and cubes the ground point. */
    x: number; y: number;
    color: string | number;
    size?: number; ang?: number; carry?: number | null; alpha?: number; scale?: number;
    squash?: number; outline?: boolean;
}

interface Model { parts: THREE.BufferGeometry[]; size: THREE.Vector3 }
interface Live {
    root: THREE.Group; kind: Item3D['kind']; color: Item3D['color']; mats: THREE.Material[];
    body?: THREE.Group; s?: number; sq?: number; topLift?: number; outline?: THREE.Group;
    yaw?: THREE.Group; carry?: THREE.Group;
}

const meshes = (group: THREE.Group) => {
    const parts: THREE.BufferGeometry[] = [];
    group.traverse((o) => { if ((o as THREE.Mesh).isMesh) parts.push((o as THREE.Mesh).geometry); });
    return parts;
};

/** Centre the meshes on x/z, stand them on y = 0 and report their size. */
function prep(group: THREE.Group): Model {
    return prepShared([group])[0];
}

/** Like prep, for meshes that belong together (one shared offset, sized by the first group's set). */
function prepShared(groups: THREE.Group[]): Model[] {
    const sets = groups.map(meshes);
    const box = new THREE.Box3();
    for (const g of sets.flat()) { g.computeBoundingBox(); box.union(g.boundingBox!); }
    const c = box.getCenter(new THREE.Vector3());
    for (const g of sets.flat()) { g.translate(-c.x, -box.min.y, -c.z); g.computeVertexNormals(); }
    const size = box.getSize(new THREE.Vector3());
    return sets.map((parts) => ({ parts, size }));
}

function lambert(color: THREE.ColorRepresentation) {
    return new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, transparent: true });
}

// Ant legs swing back and forth: vertices far from the body's centre line are pushed along the
// walking axis with a per-ant phase.
function antMaterial(color: THREE.ColorRepresentation, legSpan: number) {
    const m = lambert(color);
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
       transformed.y += abs(sin(uTime * 15.0 + uPhase + side)) * ${(legSpan * 0.06).toFixed(2)} * leg;`);
    };
    return m;
}

// Outline shell: a slightly larger copy of the nest drawn in white with only its back faces,
// so it shows as a rim around the nest. Scaling (rather than pushing vertices along their
// normals) keeps the rim clean on the hollow lid and box meshes.
function outlineMaterial() {
    return new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.BackSide, transparent: true });
}

export class ThreeLayer {
    readonly canvas = document.createElement('canvas');
    readonly TILE_SQUASH = TILE_SQUASH;
    private renderer: THREE.WebGLRenderer;
    private scene = new THREE.Scene();
    private camera = new THREE.OrthographicCamera(0, W, 0, -H, 1, 12000);
    private models: Record<'ant' | 'tile' | 'tileBase' | 'cube', Model> = {} as never;
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
        const names = ['ant', 'cube', 'nest_top', 'nest_base'];
        const [ant, cube, top, baseBox] = await Promise.all(names.map((n) => loader.loadAsync(`${base}assets/models/${n}.obj`)));
        // Colony Flow's nest is a lidded box: Box_v2_T (lid) on Box_v2_B (base)
        const [tile, tileBase] = prepShared([top, baseBox]);
        this.models = { ant: prep(ant), cube: prep(cube), tile, tileBase };
    }

    /** Screen height of a tile's top face. */
    tileFace(size: number) { return size * 0.92 * Math.sin(TILE_ELEV); }
    /** How far a tile's side shows below its top face. */
    tileTopLift(size: number, squash = TILE_SQUASH) {
        const M = this.models.tile;
        return M.size.y * ((size * 0.92) / M.size.x) * squash * Math.cos(TILE_ELEV);
    }

    private cubeMesh(color: THREE.ColorRepresentation, size: number) {
        const M = this.models.cube, s = size / M.size.x;
        const g = new THREE.Group();
        for (const p of M.parts) g.add(new THREE.Mesh(p, lambert(color)));
        g.scale.setScalar(s);
        return g;
    }

    private make(it: Item3D): Live {
        const root = new THREE.Group();
        const o: Live = { root, kind: it.kind, color: it.color, mats: [] };
        if (it.kind === 'tile') {
            const M = this.models.tile, s = ((it.size ?? 100) * 0.92) / M.size.x;
            const tilt = new THREE.Group(); tilt.rotation.x = TILE_ELEV;
            const sq = it.squash ?? TILE_SQUASH;
            const body = new THREE.Group(); body.scale.set(s, s * sq, s);
            for (const p of [...M.parts, ...this.models.tileBase.parts]) { const m = lambert(it.color); o.mats.push(m); body.add(new THREE.Mesh(p, m)); }
            // white outline that hugs the nest: an inflated copy showing only its inside faces
            const om = outlineMaterial();
            o.mats.push(om);
            const outline = new THREE.Group();
            for (const p of [...M.parts, ...this.models.tileBase.parts]) outline.add(new THREE.Mesh(p, om));
            body.add(outline);
            tilt.add(body); root.add(tilt);
            Object.assign(o, { body, s, sq, outline, topLift: M.size.y * s * sq * Math.cos(TILE_ELEV) });
            this.fitOutline(o);
        } else if (it.kind === 'ant') {
            const M = this.models.ant, s = ANT_LEN / M.size.z;
            const tilt = new THREE.Group(); tilt.rotation.x = ANT_ELEV;
            const yaw = new THREE.Group();
            const body = new THREE.Group(); body.scale.setScalar(s);
            M.parts.forEach((p, i) => {
                const m = i === 0 ? antMaterial(it.color, M.size.x / 2) : lambert('#ffffff');
                o.mats.push(m); body.add(new THREE.Mesh(p, m));
            });
            yaw.add(body);
            const carry = this.cubeMesh('#ffffff', CARRY_CUBE);
            carry.position.set(0, M.size.y * s * 1.05, M.size.z * s * 0.42);
            carry.visible = false;
            yaw.add(carry);
            tilt.add(yaw); root.add(tilt);
            o.yaw = yaw; o.carry = carry;
        } else {
            const tilt = new THREE.Group(); tilt.rotation.x = CUBE_ELEV;
            const c = this.cubeMesh(it.color, it.size ?? 50);
            c.traverse((m) => { const mat = (m as THREE.Mesh).material as THREE.Material | undefined; if (mat) o.mats.push(mat); });
            tilt.add(c); root.add(tilt);
        }
        this.scene.add(root);
        return o;
    }

    private dispose(o: Live) {
        this.scene.remove(o.root);
        for (const m of o.mats) m.dispose();
    }

    /** Size the outline copy so its rim is OUTLINE_PX wide on every side at the nest's current height. */
    private fitOutline(o: Live) {
        const M = this.models.tile, w = M.size.x, h = M.size.y;
        const padX = OUTLINE_PX / o.s!, padY = OUTLINE_PX / (o.s! * o.sq!);
        o.outline!.scale.set((w + 2 * padX) / w, (h + 2 * padY) / h, (M.size.z + 2 * padX) / M.size.z);
        o.outline!.position.y = -padY;
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
            let layer = 0, y = it.y;
            if (it.kind === 'tile') {
                // height eases between the tall front-row tile and the low tiles queued behind
                o.sq! += ((it.squash ?? TILE_SQUASH) - o.sq!) * 0.2;
                o.body!.scale.y = o.s! * o.sq!;
                o.topLift = this.models.tile.size.y * o.s! * o.sq! * Math.cos(TILE_ELEV);
                this.fitOutline(o);
                o.outline!.visible = !!it.outline;
                y = it.y + o.topLift * sc; layer = 2000;
            }
            if (it.kind === 'ant') { layer = 4000; o.yaw!.rotation.y = Math.PI / 2 - (it.ang ?? 0); }
            o.root.position.set(it.x, -y, layer + y * 0.2);
            o.root.scale.setScalar(sc);
            for (const m of o.mats) { m.opacity = alpha; if (m.userData.time) m.userData.time.value = time; }
            if (o.carry) {
                o.carry.visible = it.carry != null;
                if (it.carry != null) {
                    const color = it.carry;
                    o.carry.traverse((m) => { const mat = (m as THREE.Mesh).material as THREE.MeshLambertMaterial | undefined; if (mat) mat.color.set(color); });
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
