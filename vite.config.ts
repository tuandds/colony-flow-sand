import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { type Plugin, defineConfig } from 'vite';
import config from './prototype.config.json';

const EDITS = fileURLToPath(new URL('./src/game/level-edits.json', import.meta.url));

/** Dev server only: the level editor saves its changes to the built-in levels here
 * (POST /__level-edits), one level per line, so they can be committed. */
function levelEdits(): Plugin {
    return {
        name: 'level-edits',
        configureServer(server) {
            server.middlewares.use('/__level-edits', (req, res) => {
                if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
                let body = '';
                req.on('data', (c) => (body += c));
                req.on('end', () => {
                    try {
                        const list = JSON.parse(body);
                        if (!Array.isArray(list) || !list.every((l) => l && /^builtin-\d+$/.test(l.id) && l.sand)) throw new Error('bad levels');
                        const text = '[\n' + list.map((l) => JSON.stringify(l)).join(',\n') + (list.length ? '\n' : '') + ']\n';
                        const written = readFileSync(EDITS, 'utf8') !== text;
                        if (written) writeFileSync(EDITS, text);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ written, count: list.length }));
                    } catch (e) { res.statusCode = 400; res.end(JSON.stringify({ error: String(e) })); }
                });
            });
        },
        // no reload of the open pages: the editor already has the levels and the game reads
        // this browser's copies; the next page load gets the new file
        handleHotUpdate({ file, server }) {
            if (file !== EDITS) return;
            for (const m of server.moduleGraph.getModulesByFile(file) ?? []) server.moduleGraph.invalidateModule(m);
            return [];
        }
    };
}

export default defineConfig({
    base: './',
    plugins: [levelEdits()],
    // Set by scripts/publish-site.sh ("latest" or a tag like "v0.2.0"); "dev" when run locally.
    define: { __APP_VERSION__: JSON.stringify(process.env.SITE_VERSION ?? 'dev') },
    server: { port: config.devPort },
    worker: { format: 'es' },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            // two pages: the game (index.html) and the level editor (editor.html -> /demo/editor.html on the site)
            input: {
                main: fileURLToPath(new URL('./index.html', import.meta.url)),
                editor: fileURLToPath(new URL('./editor.html', import.meta.url))
            },
            output: {
                manualChunks: (id) => (id.includes('node_modules/phaser') ? 'phaser' : undefined)
            }
        }
    }
});
