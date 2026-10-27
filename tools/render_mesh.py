"""Tiny software rasterizer: renders an OBJ (per group) to a shaded RGBA sprite.

usage: render_mesh.py mesh.obj out_prefix --pitch DEG --yaw DEG --size PX
Writes <out_prefix>_<group>.png per OBJ group plus <out_prefix>.png (all groups),
lit in white so the game can tint it with a multiply.
"""
import sys, argparse, numpy as np
from PIL import Image

def load_obj(path):
    V, N, groups, cur = [], [], {}, None
    for line in open(path):
        p = line.split()
        if not p: continue
        if p[0] == 'v': V.append([float(x) for x in p[1:4]])
        elif p[0] == 'vn': N.append([float(x) for x in p[1:4]])
        elif p[0] == 'g': cur = p[1]; groups.setdefault(cur, [])
        elif p[0] == 'f':
            idx = [int(t.split('/')[0]) - 1 for t in p[1:]]
            for i in range(1, len(idx) - 1):
                groups.setdefault(cur, []).append((idx[0], idx[i], idx[i + 1]))
    return np.array(V), np.array(N) if N else None, {k: np.array(v) for k, v in groups.items() if v}

def rot(pitch, yaw):
    a, b = np.radians(pitch), np.radians(yaw)
    Ry = np.array([[np.cos(b), 0, np.sin(b)], [0, 1, 0], [-np.sin(b), 0, np.cos(b)]])
    Rx = np.array([[1, 0, 0], [0, np.cos(a), -np.sin(a)], [0, np.sin(a), np.cos(a)]])
    return Rx @ Ry

def render(V, N, faces_by_group, pitch, yaw, size, ss=4, pad=0.06):
    R = rot(pitch, yaw)
    P = V @ R.T
    Nr = (N @ R.T) if N is not None else None
    allf = np.concatenate(list(faces_by_group.values()))
    used = np.unique(allf)
    mn, mx = P[used, :2].min(0), P[used, :2].max(0)
    span = (mx - mn).max() * (1 + 2 * pad)
    S = size * ss
    c = (mn + mx) / 2
    sx = (P[:, 0] - c[0]) / span * S + S / 2
    sy = (-(P[:, 1] - c[1])) / span * S + S / 2
    z = P[:, 2]
    zbuf = np.full((S, S), -1e9)
    shade = np.zeros((S, S))
    gid = np.full((S, S), -1, int)
    light = np.array([-0.35, 0.75, 0.55]); light /= np.linalg.norm(light)
    for g, (name, F) in enumerate(faces_by_group.items()):
        for f in F:
            x, y, zz = sx[f], sy[f], z[f]
            x0, x1 = int(max(0, np.floor(x.min()))), int(min(S - 1, np.ceil(x.max())))
            y0, y1 = int(max(0, np.floor(y.min()))), int(min(S - 1, np.ceil(y.max())))
            if x0 > x1 or y0 > y1: continue
            d = (y[1] - y[2]) * (x[0] - x[2]) + (x[2] - x[1]) * (y[0] - y[2])
            if abs(d) < 1e-9: continue
            gx, gy = np.meshgrid(np.arange(x0, x1 + 1) + 0.5, np.arange(y0, y1 + 1) + 0.5)
            w0 = ((y[1] - y[2]) * (gx - x[2]) + (x[2] - x[1]) * (gy - y[2])) / d
            w1 = ((y[2] - y[0]) * (gx - x[2]) + (x[0] - x[2]) * (gy - y[2])) / d
            w2 = 1 - w0 - w1
            m = (w0 >= 0) & (w1 >= 0) & (w2 >= 0)
            if not m.any(): continue
            zi = w0 * zz[0] + w1 * zz[1] + w2 * zz[2]
            if Nr is not None:
                n = w0[..., None] * Nr[f[0]] + w1[..., None] * Nr[f[1]] + w2[..., None] * Nr[f[2]]
            else:
                fn = np.cross(P[f[1]] - P[f[0]], P[f[2]] - P[f[0]]); n = np.broadcast_to(fn, gx.shape + (3,))
            n = n / (np.linalg.norm(n, axis=-1, keepdims=True) + 1e-9)
            n = np.where(n[..., 2:3] < 0, -n, n)  # face the camera regardless of winding
            lam = np.clip((n * light).sum(-1), 0, 1)
            rim = (1 - np.clip(n[..., 2], 0, 1)) ** 3
            s = 0.62 + 0.42 * lam - 0.12 * rim
            sub = zbuf[y0:y1 + 1, x0:x1 + 1]
            win = m & (zi > sub)
            sub[win] = zi[win]
            shade[y0:y1 + 1, x0:x1 + 1][win] = s[win]
            gid[y0:y1 + 1, x0:x1 + 1][win] = g
    return shade, gid

def to_img(shade, mask, size, ss):
    S = shade.shape[0]
    rgb = np.clip(shade * 255, 0, 255)
    a = mask.astype(float) * 255
    img = np.dstack([rgb, rgb, rgb, a]).astype(np.uint8)
    im = Image.fromarray(img, 'RGBA')
    # premultiply-safe downscale
    return im.resize((size, size), Image.LANCZOS)

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('obj'); ap.add_argument('out')
    ap.add_argument('--pitch', type=float, default=90); ap.add_argument('--yaw', type=float, default=0)
    ap.add_argument('--size', type=int, default=256)
    a = ap.parse_args()
    V, N, groups = load_obj(a.obj)
    shade, gid = render(V, N, groups, a.pitch, a.yaw, a.size)
    to_img(shade, gid >= 0, a.size, 4).save(a.out + '.png')
    for g, name in enumerate(groups):
        to_img(shade, gid == g, a.size, 4).save(f'{a.out}_{g}.png')
    print('groups', list(groups), 'written', a.out)
