import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The site is served from https://farhanpatel-dev.github.io/portfolio/,
// so every asset URL needs the /portfolio/ prefix.
// If you rename the repo, change `base` to '/<new-repo-name>/'.
// For a <username>.github.io repo or a custom domain, use base: '/'.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  // React + framer-motion land around 500 kB minified (~165 kB gzipped).
  build: { chunkSizeWarningLimit: 600 },
});
