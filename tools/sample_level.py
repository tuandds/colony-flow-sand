"""Read a Colony Flow level screenshot (cube pixel art on the beige board) into a char grid.

usage: sample_level.py image.png [--cols N --rows M --x0 X --y0 Y --x1 X --y1 Y]
Finds the picture bounds and cube pitch, samples the top face of each cell, clusters the
colours and prints a palette plus one row of characters per grid row ('.' = empty).
"""
import sys, argparse
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('img'); ap.add_argument('--cols', type=int); ap.add_argument('--rows', type=int)
ap.add_argument('--x0', type=float); ap.add_argument('--x1', type=float)
ap.add_argument('--y0', type=float); ap.add_argument('--y1', type=float)
ap.add_argument('--face', type=float, default=0.42, help='where in a row the top face is sampled (0..1)')
ap.add_argument('--merge', type=float, default=38)
a = ap.parse_args()

im = np.asarray(Image.open(a.img).convert('RGB')).astype(int)
H, W, _ = im.shape
bg = np.array([243, 235, 222])
diff = np.abs(im - bg).sum(-1)
sat = im.max(-1) - im.min(-1)
mask = (sat > 60) | (im.max(-1) < 150)  # coloured or dark cubes, not the beige board
# ignore the board frame: keep the largest inner region
m2 = mask.copy(); m2[:, :int(W * 0.04)] = False; m2[:, int(W * 0.96):] = False; m2[:int(H * 0.04)] = False; m2[int(H * 0.96):] = False
ys, xs = np.where(m2)
x0 = a.x0 if a.x0 is not None else xs.min(); x1 = a.x1 if a.x1 is not None else xs.max() + 1
y0 = a.y0 if a.y0 is not None else ys.min(); y1 = a.y1 if a.y1 is not None else ys.max() + 1

def pitch(signal, lo, hi):
    s = signal - signal.mean()
    best, bl = -1e18, lo
    for lag in range(lo, hi):
        v = (s[:-lag] * s[lag:]).sum() / (len(s) - lag)
        if v > best: best, bl = v, lag
    return bl

lum = im.sum(-1).astype(float)
px = pitch(lum[int(y0):int(y1), int(x0):int(x1)].mean(0), 20, 45) if not a.cols else (x1 - x0) / a.cols
py = pitch(lum[int(y0):int(y1), int(x0):int(x1)].mean(1), 17, 40) if not a.rows else None
cols = a.cols or round((x1 - x0) / px)
px = (x1 - x0) / cols
rows = a.rows or round((y1 - y0 - px * 0.25) / py)
py = (y1 - y0) / (rows + 0.25)  # last row shows its front face below the top face
print(f'bounds x {x0:.0f}-{x1:.0f} y {y0:.0f}-{y1:.0f}  cols {cols} rows {rows}  pitch {px:.1f} x {py:.1f}', file=sys.stderr)

cells = []
for r in range(rows):
    row = []
    for c in range(cols):
        cx, cy = x0 + (c + 0.5) * px, y0 + (r + a.face) * py
        patch = im[int(cy - py * 0.15):int(cy + py * 0.15) + 1, int(cx - px * 0.18):int(cx + px * 0.18) + 1].reshape(-1, 3)
        col = np.median(patch, 0)
        row.append(None if np.abs(col - bg).sum() < 40 else col)
    cells.append(row)

pal = []
def find(col):
    for i, p in enumerate(pal):
        if np.abs(p[0] - col).sum() < a.merge: return i
    pal.append([col, 0]); return len(pal) - 1
letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
out = []
for row in cells:
    s = ''
    for col in row:
        if col is None: s += '.'; continue
        i = find(col); pal[i][1] += 1; s += letters[i]
    out.append(s)
for i, (col, n) in enumerate(pal):
    print(f"{letters[i]}: '#%02x%02x%02x'  ({n})" % tuple(int(v) for v in col))
for s in out: print(s)
