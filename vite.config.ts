import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import config from './prototype.config.json';

export default defineConfig({
    base: './',
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
