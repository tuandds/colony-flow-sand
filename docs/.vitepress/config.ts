import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitepress';

// Project settings live in prototype.config.json at the repo root.
const project = JSON.parse(readFileSync(new URL('../../prototype.config.json', import.meta.url), 'utf8'));

// Versioned builds set these (see scripts/publish-site.sh); defaults match the latest site.
const SITE: string = project.pagesUrl;
const base = process.env.DOCS_BASE ?? `${project.basePath}/docs/`;
const version = process.env.SITE_VERSION ?? 'latest';
const versions = (process.env.DOCS_VERSIONS ?? '').split(',').filter(Boolean);
const demo = `${new URL(SITE).origin}${base.replace(/docs\/$/, 'demo/')}`;

export default defineConfig({
    title: project.title,
    description: `Documentation for ${project.title}`,
    base,
    cleanUrls: true,
    ignoreDeadLinks: 'localhostLinks',
    themeConfig: {
        nav: [
            { text: 'Game Design', link: '/gdd/' },
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Play', link: demo },
            {
                text: version,
                items: [
                    { text: 'latest', link: `${SITE}/docs/` },
                    ...versions.map((v) => ({ text: v, link: `${SITE}/${v}/docs/` })),
                    { text: 'All versions', link: `${SITE}/#versions` }
                ]
            }
        ],
        outline: { level: [2, 3] },
        sidebar: {
            '/gdd/': [
                { text: 'Game Design Document', items: [{ text: 'Contents', link: '/gdd/' }] },
                {
                    text: 'I. Gameplay',
                    items: [
                        { text: '1. Core gameplay', link: '/gdd/core-gameplay' },
                        { text: '2. User Flow & UI', link: '/gdd/user-flow-ui' },
                        { text: '3. Booster', link: '/gdd/booster' },
                        { text: '4. Obstacles', link: '/gdd/obstacles' },
                        { text: '5. FTUE & Tutorial', link: '/gdd/ftue-tutorial' },
                        { text: '6. Levels', link: '/gdd/levels' },
                        { text: '7. Level design rules', link: '/gdd/level-design' }
                    ]
                },
                {
                    text: 'II. Production',
                    items: [
                        { text: '8. Roadmap & open questions', link: '/gdd/roadmap' },
                        { text: '9. Changelog', link: '/gdd/changelog' }
                    ]
                }
            ],
            '/guide/': [
                {
                    text: 'Developer guide',
                    items: [
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Level Editor', link: '/guide/level-editor' },
                        { text: 'Demo Videos', link: '/guide/demo-videos' },
                        { text: 'Deployment', link: '/guide/deployment' },
                        { text: 'Game Design Document →', link: '/gdd/' }
                    ]
                }
            ]
        },
        footer: { message: `${project.title} · ${version}` },
        search: { provider: 'local' },
        socialLinks: [{ icon: 'github', link: `https://github.com/${project.repo}` }]
    }
});
