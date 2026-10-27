#!/usr/bin/env bash
# Assembles the GitHub Pages site: landing page at /, game at /demo/, docs at /docs/.
set -euo pipefail

rm -rf _site
npm run build
npm run docs:build

mkdir -p _site
cp site/index.html _site/
cp -R dist _site/demo
cp -R docs/.vitepress/dist _site/docs
