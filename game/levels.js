// Sand pictures for the 10 levels. Each level paints an N x N grid of colour keys
// using simple shapes; cells left empty are not sand, so pictures can have any outline.
(function () {
  function makeGrid(n) {
    const g = [];
    for (let y = 0; y < n; y++) g.push(new Array(n).fill(null));
    return g;
  }
  function painter(g) {
    const n = g.length;
    const each = (test, k) => {
      for (let y = 0; y < n; y++)
        for (let x = 0; x < n; x++)
          if (test(x + 0.5, y + 0.5)) g[y][x] = k;
    };
    const sign = (ax, ay, bx, by, px, py) => (px - bx) * (ay - by) - (ax - bx) * (py - by);
    return {
      rect: (x0, y0, x1, y1, k) => each((x, y) => x >= x0 && x < x1 && y >= y0 && y < y1, k),
      circle: (cx, cy, r, k) => each((x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r, k),
      ellipse: (cx, cy, rx, ry, k, clip) =>
        each((x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 && (!clip || clip(x, y)), k),
      tri: (ax, ay, bx, by, cx, cy, k) =>
        each((x, y) => {
          const d1 = sign(x, y, ax, ay, bx, by), d2 = sign(x, y, bx, by, cx, cy), d3 = sign(x, y, cx, cy, ax, ay);
          const neg = d1 < 0 || d2 < 0 || d3 < 0, pos = d1 > 0 || d2 > 0 || d3 > 0;
          return !(neg && pos);
        }, k),
      // repaint only cells that already hold sand (details inside a silhouette)
      inside: (test, k) => each((x, y) => g[(y - 0.5) | 0][(x - 0.5) | 0] && test(x, y), k),
    };
  }

  const LEVELS = [
    {
      // Colony Flow level 1: one character per cell, '.' is empty
      name: 'Star', n: 13, chunk: [4, 7],
      colors: { o: '#f59a3a', y: '#fcd862', w: '#eef3f9' },
      rows: [
        '......o......',
        '.....oyo.....',
        '.....oyo.....',
        '....oyyyo....',
        'oooooyyyooooo',
        'oyyywwwwwyyyo',
        '.oyywwwwwyyo.',
        '..oyywwwyyo..',
        '...oywwwyo...',
        '..oyyyyyyyo..',
        '..oyyyoyyyo..',
        '.oyyoo.ooyyo.',
        '.ooo.....ooo.',
      ],
    },
    {
      // Colony Flow level 2
      name: 'Heart', n: 19, chunk: [4, 8],
      colors: { p: '#f27ec8', c: '#7fd6f2', y: '#fde272' },
      rows: [
        '...pppp.....pppp...',
        '..pppppp...pppppp..',
        '.pppppppp.pppppppp.',
        'pppcccpppppppcccppp',
        'ppcccccpppppcccccpp',
        'pcccccccpppcccccccp',
        'cccccccccpccccccccc',
        'cccccccyccccycccccc',
        'ccccccyyyccyyyccccc',
        'cccccyyyyyyyyyycccc',
        '.cccccyyyccyyycccc.',
        '..cccccyccccycccc..',
        '...pppcccccccppp...',
        '....pppppcppppp....',
        '.....ppppppppp.....',
        '......ppppppp......',
        '.......ppppp.......',
        '........ppp........',
        '.........p.........',
      ],
    },
    {
      // Colony Flow level 3 (sampled from a screenshot, one character per cell)
      name: 'Apple', n: 19, chunk: [5, 9], seed: 1, // seed picked so the nest order is solvable
      colors: { d: '#4f3d55', r: '#d8395a', l: '#ef8a90', w: '#f7f9fc', g: '#5fc463', y: '#c6ee6c' },
      rows: [
        '.......dddd....dd.',
        '.....ddgyyydd.dyyd',
        '...ddrrrgyyygdyyyd',
        '..drrlllrggggyyydd',
        '.drrlllrrrgygyydd.',
        '.drlllwwrrgyygggd.',
        'drllllwwrrgyyygyd.',
        'drlrwrrrrrgggggyyd',
        'drrrrrrrrrrrrrgyyd',
        'drrrrrrrrrrrrrdgyd',
        'drrrrrrrrrrrrrrdgd',
        'drrrrrrrrrrrrrrrdd',
        'drrrrrrrrrrrrrrrd.',
        'drrrrrrrrrrrrrrrd.',
        'drrrrrrrrrrrrrrd..',
        '.drrrrrrrrrrrrrd..',
        '.drrrrrrrrrrrrd...',
        '..ddrrrrrrrrdd....',
        '....dddddddd......',
      ],
    },
    {
      // Colony Flow level 4 (sampled from a screenshot)
      name: 'Mushroom House', n: 27, chunk: [6, 10],
      colors: { a: '#64566f', b: '#f7e77a', c: '#d34d6a', d: '#8be0f0', e: '#f9dec8', f: '#f3f8fb', g: '#b27060', h: '#82d482' },
      rows: [
        '.................aaaaa.....',
        '...........aaaaa.abbba.....',
        '.........aacccccaabbba.....',
        '.......aaccceeccccaaba.....',
        'ddddddacccceeeecccccaaddddd',
        'ddddaaccccceeaeccccccaadddd',
        'dddaeecccccceecccccccccaddd',
        'ddaeeeeccccccccccceeccccadd',
        'ddaeeaecccccccccceeeecccadd',
        'dacceeccceecccccceeaeccccad',
        'dacccccceeeecccccceecccccad',
        'dacccccceeaecccccccccccccad',
        'daccccccceeccccccccccccccad',
        'daccccccaaaaaaaaaaaccccccad',
        'ddacccaabbbbbbbbbbbaacccadd',
        'dddaaabbbbbbbbbbbbbbbaaaddd',
        'dddddabbbbbaaaaabbbbbaddddd',
        'dddddabbbbafffffabbbbaddddd',
        'dddddabbbafffffffabbbaddddd',
        'dddddabbbaffgggffabbbaddddd',
        'dddddabbbafggaggfabbbaddddd',
        'dddddabbbafggaggfabbbaddddd',
        'ddddhabbbafggaggfabbbahdhdd',
        'ddhhhabbbafffffffabbbahhhdd',
        'dhhhhhaaaaaaaaaaaaaaahhhhhd',
        'hhhhhhhhhhhhhhhhhhhhhhhhhhh',
      ],
    },
    {
      // Colony Flow level 5 (sampled from a screenshot)
      name: 'Mandala', n: 24, chunk: [6, 10],
      colors: { a: '#6f68c8', b: '#89ddf4', c: '#67566d', d: '#eea653', e: '#fbeaab', f: '#83d17d', g: '#ee8bd8', h: '#c957f7', i: '#f8d6ed' },
      rows: [
        '.......aaaaaaaaaa.......',
        '.....aaabbbbbbbbaaa.....',
        '....aabbbbccccbbbbaa....',
        '...aabbcccddddcccbbaa...',
        '..aabbcddeeeeeeddcbbaa..',
        '.aabbceeeddeddddeecbbaa.',
        '.abbcdeedddeddddeedcbba.',
        'aabcdeeddddddddddeedcbaa',
        'abbcdddeeffggffeededcbba',
        'abcdedddfggdhggfdddedcba',
        'abcdedddfgdiidgfdddedcba',
        'abcdedddgdihiiigdeeedcba',
        'abcdeeedghiiihdgdddedcba',
        'abcdedddfgdiidgfdddedcba',
        'abcdedddfgghdggfdddedcba',
        'abbcdedddffggffdedddcbba',
        'aabcdeededddeddddeedcbaa',
        '.abbcdeeddddedddeedcbba.',
        '.aabbceeddddeddeeecbbaa.',
        '..aabbcddeeeeeeddcbbaa..',
        '...aabbcccddddcccbbaa...',
        '....aabbbbccccbbbbaa....',
        '.....aaabbbbbbbbaaa.....',
        '.......aaaaaaaaaa.......',
      ],
    },
    {
      name: 'Big Tree', n: 22, chunk: [6, 10],
      colors: { g: '#4f9e3a', l: '#7cc957', b: '#8b5a2b', r: '#e53935' },
      paint(p) {
        p.rect(9.5, 12, 12.5, 20, 'b');
        p.ellipse(11, 20.2, 6, 1.4, 'l');
        p.circle(11, 7.5, 5.8, 'g'); p.circle(6.5, 10, 4, 'g'); p.circle(15.5, 10, 4, 'g');
        p.circle(8, 6, 1, 'r'); p.circle(14, 8, 1, 'r'); p.circle(10.5, 11, 1, 'r'); p.circle(5.5, 11, 0.9, 'r'); p.circle(16.5, 11.5, 0.9, 'r');
      },
    },
    {
      name: 'Goldfish', n: 22, chunk: [6, 10],
      colors: { o: '#ff8c42', y: '#ffc145', w: '#ffffff', k: '#2b2b3a', b: '#9be0ff' },
      paint(p) {
        p.tri(14.5, 11, 21, 5.5, 21, 16.5, 'y');
        p.tri(8, 7.5, 13, 7.5, 10.5, 4, 'y');
        p.ellipse(9.5, 11, 7.2, 5, 'o');
        p.ellipse(9.5, 15.6, 2.4, 1.2, 'y');
        p.circle(5.6, 10, 2.3, 'w'); p.rect(4.5, 8.5, 6.5, 11.5, 'k');
        p.circle(2.5, 4.5, 1.2, 'b'); p.circle(4.5, 2, 0.9, 'b');
      },
    },
    {
      name: 'Daisy', n: 24, chunk: [6, 11],
      colors: { w: '#ffffff', y: '#ffd21f', d: '#4f9e3a', l: '#8fd36a' },
      paint(p) {
        p.rect(11.3, 12, 12.7, 23, 'd');
        p.ellipse(8, 18.5, 3.6, 1.6, 'l'); p.ellipse(16, 16.5, 3.6, 1.6, 'l');
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          p.ellipse(12 + Math.cos(a) * 4.6, 8.5 + Math.sin(a) * 4.6, 2.4, 2.4, 'w');
        }
        p.circle(12, 8.5, 3.2, 'y');
      },
    },
    {
      name: 'Night Kitty', n: 24, chunk: [7, 12], order: 'onion', // eyes and nose sit inside the black head
      colors: { k: '#2f2d38', p: '#f58fa3', w: '#ffffff', g: '#7ad36b' },
      paint(p) {
        p.tri(4, 13, 10, 8, 4.5, 3, 'k'); p.tri(20, 13, 14, 8, 19.5, 3, 'k');
        p.ellipse(12, 14.5, 9, 7.8, 'k');
        p.tri(5.5, 10, 8.5, 8.2, 6, 5.5, 'p'); p.tri(18.5, 10, 15.5, 8.2, 18, 5.5, 'p');
        p.circle(8.5, 14, 2.7, 'w'); p.circle(15.5, 14, 2.7, 'w');
        p.circle(8.5, 14, 1.6, 'g'); p.circle(15.5, 14, 1.6, 'g');
        p.ellipse(12, 17.8, 1.4, 1, 'p');
      },
    },
    {
      name: 'Sail Away', n: 24, chunk: [7, 12],
      colors: { h: '#8b5a2b', w: '#ffffff', r: '#ff6b6b', b: '#2e86de', l: '#74b9ff' },
      paint(p) {
        p.ellipse(12, 20.5, 11, 2.6, 'b');
        p.inside((x, y) => (Math.floor(x + y * 0.5) % 5) === 0 && y > 19, 'l');
        p.tri(3.5, 15, 20.5, 15, 17, 19.5, 'h'); p.rect(7, 15, 17.5, 19.5, 'h');
        p.rect(11.4, 3, 12.6, 15, 'h');
        p.tri(12.6, 3.5, 12.6, 14, 19.5, 14, 'w'); p.tri(11.4, 5, 11.4, 14, 5.5, 14, 'w');
        p.tri(12.6, 0, 12.6, 3.6, 18.5, 1.8, 'r');
      },
    },
  ];

  window.buildLevel = function (i) {
    const L = LEVELS[i];
    const g = makeGrid(L.n);
    if (L.rows) L.rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') g[y][x] = ch; }));
    else L.paint(painter(g));
    return { name: L.name, n: L.n, chunk: L.chunk, colors: L.colors, grid: g, order: L.order, seed: L.seed };
  };
  window.LEVEL_COUNT = LEVELS.length;
})();
