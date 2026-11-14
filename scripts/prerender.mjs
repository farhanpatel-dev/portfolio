// Build step 3 of 3 (see "build" in package.json):
// takes the server bundle from dist-ssr/, renders the page to HTML and
// injects it into dist/index.html so the site paints before JS loads.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(indexPath, 'utf8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('Placeholder <!--app-html--> not found in dist/index.html');
}

// Preload the three fonts used above the fold (Latin subset) so text doesn't
// reflow when they arrive. Vite hashes the file names, so look them up.
const assets = await readdir(path.join(root, 'dist', 'assets'));
const critical = [
  /^playfair-display-latin-400-normal-.*\.woff2$/,
  /^playfair-display-latin-400-italic-.*\.woff2$/,
  /^dm-sans-latin-wght-normal-.*\.woff2$/,
];
// Read the base path (e.g. /portfolio/) from the built script tag, so this
// follows `base` in vite.config.js automatically.
const base = template.match(/src="([^"]*)assets\/index-[^"]+\.js"/)?.[1] ?? '/';
const preloads = critical
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="${base}assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const html = template
  .replace('</head>', `    ${preloads}\n  </head>`)
  .replace('<!--app-html-->', render());
await writeFile(indexPath, html);
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
