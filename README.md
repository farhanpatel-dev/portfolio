# Farhan Patel · Portfolio

Personal portfolio site in a "Luxury Beige" design, built with React, Vite, Tailwind CSS and Framer Motion.

**Live:** https://farhanpatel-dev.github.io/portfolio/

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm run build      # production build into dist/ (prerendered HTML)
npm run preview    # serve the production build
```

Requires Node 20+.

## Update your content

All text, links and lists live in **`src/data/portfolio.js`**. Edit it, then:

```bash
git add -A
git commit -m "Update portfolio content"
git push
```

GitHub Actions rebuilds and redeploys automatically (about 1 to 2 minutes). Watch progress in the repo's **Actions** tab.

- An empty string (`''`) or `null` hides that item, so no broken links are shown.
- Skill and tech names get logos from `src/data/techIcons.js`. A new name with no entry there gets a generic icon; add an entry to give it a brand logo and colour.
- Replace `public/resume.pdf` to update the "Download Resume" file.

## Add your images

Put images in `src/assets/`, then import them at the top of `portfolio.js` (the import lines are already there, commented out).

| File | Where it shows | Recommended size |
| --- | --- | --- |
| `src/assets/profile.webp` | Hero portrait (arched frame) | 720 × 900 px, portrait, WebP |
| `src/assets/about.webp` | About section | 640 × 800 px, portrait, WebP |
| `src/assets/projects/cropwatch.webp` | Crop-stress project card | 1200 × 750 px (16:10), WebP |
| `src/assets/logos/*.webp` (optional) | Company badge in Experience | 96 × 96 px, square |

Until you add them, the site shows designed placeholders: an "FP" monogram arch, contour artwork and generated field-map artwork.

To convert a photo to WebP: `npx sharp-cli -i photo.jpg -o src/assets/profile.webp resize 720 900` (or use squoosh.app).

## Contact form

The form works out of the box by opening the visitor's email app with the message pre-filled. To receive messages directly instead:

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form id (the part after `formspree.io/f/`).
3. Paste it into `contact.formspreeId` in `portfolio.js` and push.

## Deployment

### GitHub Actions (default)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Backup: gh-pages branch

```bash
npm run deploy     # builds, then pushes dist/ to a gh-pages branch
```

Then set **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.

### Repo name and `base`

The site is served from `/portfolio/`, so `vite.config.js` sets `base: '/portfolio/'`.

- Renamed the repo? Set `base` to `'/<new-name>/'` and update the URLs in `index.html`, `public/robots.txt`, `public/sitemap.xml` and `profile.siteUrl`.
- Using a `<username>.github.io` repo or a custom domain? Set `base: '/'`.

## Custom domain (optional)

1. Add a file `public/CNAME` containing just your domain, e.g. `farhanpatel.dev`.
2. Set `base: '/'` in `vite.config.js` and update the site URLs listed above.
3. At your DNS provider:
   - Apex domain (`farhanpatel.dev`): four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Subdomain (`www.farhanpatel.dev`): a `CNAME` record pointing to `farhanpatel-dev.github.io`.
4. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is issued.

## How it's built

- **Prerendering:** `npm run build` renders the page to static HTML (`scripts/prerender.mjs`), so content appears before JavaScript loads, then React hydrates it.
- **Fonts:** Playfair Display and DM Sans are self-hosted via `@fontsource`, and the above-the-fold files are preloaded.
- **Animation:** Framer Motion's animation engine loads lazily (`LazyMotion`). All motion respects `prefers-reduced-motion`.
- **Theme:** light/dark follows the system setting until the visitor toggles it, and the choice is remembered.
- **Link previews:** `public/og-image.png` (1200 × 630) is generated from `tools/og-image.html`.

```
portfolio/
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
├── public/                        # favicon, og-image, resume.pdf, robots, sitemap
├── scripts/prerender.mjs          # build-time static HTML
├── tools/                         # sources for og-image.png and PNG favicons
├── src/
│   ├── data/portfolio.js          # ← all site content
│   ├── data/techIcons.js          # tech name → logo + brand colour
│   ├── components/                # Navbar, cursor, cards, buttons, artwork…
│   ├── sections/                  # Hero, About, Skills, Experience, Projects…
│   ├── hooks/                     # theme, active section, scroll state
│   ├── App.jsx · main.jsx · entry-server.jsx
│   └── index.css                  # Tailwind theme, palette, utilities
├── index.html                     # SEO, Open Graph, structured data
└── vite.config.js
```
