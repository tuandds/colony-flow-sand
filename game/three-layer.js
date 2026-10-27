// WebGL layer that draws the 3D nests, ants and sand blocks between the 2D base
// canvas (board, sand, belt) and the 2D UI canvas (numbers, HUD, popups).
// game.js hands it a flat list of things to show every frame, in screen coordinates.
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const W = 1080, H = 1920;
const TILE_ELEV = 0.95, TILE_SQUASH = 0.33;  // camera elevation for nests, height squash of the double block
const ANT_ELEV = 1.15, ANT_LEN = 74, CARRY_CUBE = 32;
const CUBE_ELEV = 0.95;

const R3 = { ready: false };
window.R3 = R3;

let renderer, scene, camera;
const models = {};
const live = new Map();

function prep(group) {
  const parts = [];
  group.traverse(o => { if (o.isMesh) parts.push(o.geometry); });
  const box = new THREE.Box3();
  for (const g of parts) { g.computeBoundingBox(); box.union(g.boundingBox); }
  const c = box.getCenter(new THREE.Vector3());
  for (const g of parts) { g.translate(-c.x, -box.min.y, -c.z); g.computeVertexNormals(); }
  return { parts, size: box.getSize(new THREE.Vector3()) };
}

function lambert(color) {
  return new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, transparent: true });
}

// Ant legs swing back and forth: vertices far from the body's centre line are
// pushed along the walking axis with a per-ant phase.
function antMaterial(color, legSpan) {
  const m = lambert(color);
  m.userData.time = { value: 0 };
  m.userData.phase = { value: Math.random() * 6.28 };
  m.onBeforeCompile = sh => {
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

// Outline shell: vertices pushed out along their normals (y compensated for the tile's
// squash so the line is even all round), drawn back faces only so it shows as a rim.
const OUTLINE_PX = 9;
function outlineMaterial(thick, sq) {
  const m = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.BackSide, transparent: true });
  m.userData.sq = { value: sq };
  m.onBeforeCompile = sh => {
    sh.uniforms.uSq = m.userData.sq;
    sh.vertexShader = 'uniform float uSq;\n' + sh.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       transformed += normalize(normal) * vec3(${thick.toFixed(4)}, ${thick.toFixed(4)} / uSq, ${thick.toFixed(4)});`);
  };
  return m;
}

function cubeMesh(color, size) {
  const M = models.cube, s = size / M.size.x;
  const g = new THREE.Group();
  for (const p of M.parts) g.add(new THREE.Mesh(p, lambert(color)));
  g.scale.setScalar(s);
  return g;
}

function make(it) {
  const root = new THREE.Group();
  const o = { root, kind: it.kind, color: it.color, mats: [] };
  if (it.kind === 'tile') {
    const M = models.tile, s = (it.size * 0.92) / M.size.x;
    const tilt = new THREE.Group(); tilt.rotation.x = TILE_ELEV;
    const sq = it.squash ?? TILE_SQUASH;
    const body = new THREE.Group(); body.scale.set(s, s * sq, s);
    for (const p of M.parts) { const m = lambert(it.color); o.mats.push(m); body.add(new THREE.Mesh(p, m)); }
    // white outline that hugs the tile: an inflated copy showing only its inside faces
    const om = outlineMaterial(OUTLINE_PX / s, sq);
    o.mats.push(om); o.outlineMat = om;
    const outline = new THREE.Group();
    for (const p of M.parts) outline.add(new THREE.Mesh(p, om));
    body.add(outline);
    tilt.add(body); root.add(tilt);
    Object.assign(o, { body, s, sq, outline });
    o.topLift = M.size.y * s * sq * Math.cos(TILE_ELEV);
  } else if (it.kind === 'ant') {
    const M = models.ant, s = ANT_LEN / M.size.z;
    const tilt = new THREE.Group(); tilt.rotation.x = ANT_ELEV;
    const yaw = new THREE.Group();
    const body = new THREE.Group(); body.scale.setScalar(s);
    M.parts.forEach((p, i) => {
      const m = i === 0 ? antMaterial(it.color, M.size.x / 2) : lambert('#ffffff');
      o.mats.push(m); body.add(new THREE.Mesh(p, m));
    });
    yaw.add(body);
    o.carry = cubeMesh('#ffffff', CARRY_CUBE);
    o.carry.position.set(0, M.size.y * s * 1.05, M.size.z * s * 0.42);
    o.carry.visible = false;
    yaw.add(o.carry);
    tilt.add(yaw); root.add(tilt);
    o.yaw = yaw;
  } else {
    const tilt = new THREE.Group(); tilt.rotation.x = CUBE_ELEV;
    const c = cubeMesh(it.color, it.size);
    c.traverse(m => m.material && o.mats.push(m.material));
    tilt.add(c); root.add(tilt);
  }
  scene.add(root);
  return o;
}

function dispose(o) {
  scene.remove(o.root);
  for (const m of o.mats) m.dispose();
}

R3.init = async function (canvas) {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(0, W, 0, -H, 1, 12000);
  camera.position.set(0, 0, 6000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9a7a5a, 1.9));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(-0.4, 0.8, 1); scene.add(sun);
  const loader = new OBJLoader();
  const load = n => new Promise((res, rej) => loader.load('assets/models/' + n + '.obj', res, undefined, rej));
  const [ant, tile, cube] = await Promise.all(['ant', 'tile', 'cube'].map(load));
  models.ant = prep(ant); models.tile = prep(tile); models.cube = prep(cube);
  // screen size of a tile: top face height and how far its side shows below the top face
  R3.tileFace = size => size * 0.92 * Math.sin(TILE_ELEV);
  R3.tileTopLift = (size, squash = TILE_SQUASH) => models.tile.size.y * ((size * 0.92) / models.tile.size.x) * squash * Math.cos(TILE_ELEV);
  R3.TILE_SQUASH = TILE_SQUASH;
  R3.ready = true;
};

R3.resize = function (cssW, cssH, dpr) {
  if (!renderer) return;
  renderer.setPixelRatio(dpr);
  renderer.setSize(cssW, cssH, false);
};

// items: { ref, kind: 'tile'|'ant'|'cube', x, y, color, size?, ang?, carry?, alpha?, scale? }
// x/y are screen coordinates: for tiles the centre of the top face, for ants and cubes the ground point.
R3.render = function (items, time) {
  const seen = new Set();
  for (const it of items) {
    let o = live.get(it.ref);
    if (o && (o.kind !== it.kind || o.color !== it.color)) { dispose(o); o = null; }
    if (!o) { o = make(it); live.set(it.ref, o); }
    seen.add(it.ref);
    const sc = it.scale ?? 1, alpha = it.alpha ?? 1;
    let layer = 0, y = it.y;
    if (it.kind === 'tile') {
      // height eases between the tall front-row tile and the low tiles queued behind
      const want = it.squash ?? TILE_SQUASH;
      o.sq += (want - o.sq) * 0.2;
      o.body.scale.y = o.s * o.sq;
      o.topLift = models.tile.size.y * o.s * o.sq * Math.cos(TILE_ELEV);
      o.outlineMat.userData.sq.value = o.sq;
      o.outline.visible = !!it.outline;
      y = it.y + o.topLift * sc; layer = 2000;
    }
    if (it.kind === 'ant') { layer = 4000; o.yaw.rotation.y = Math.PI / 2 - it.ang; }
    o.root.position.set(it.x, -y, layer + y * 0.2);
    o.root.scale.setScalar(sc);
    for (const m of o.mats) { m.opacity = alpha; if (m.userData.time) m.userData.time.value = time; }
    if (o.carry) {
      o.carry.visible = !!it.carry;
      if (it.carry) o.carry.traverse(m => m.material && m.material.color.set(it.carry));
    }
  }
  for (const [ref, o] of live) if (!seen.has(ref)) { dispose(o); live.delete(ref); }
  renderer.render(scene, camera);
};
