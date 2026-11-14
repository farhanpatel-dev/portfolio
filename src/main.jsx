import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Self-hosted fonts (bundled woff2, no render-blocking third-party request).
import '@fontsource-variable/dm-sans';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/400-italic.css';
import './index.css';
import App from './App.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships prerendered HTML (see scripts/prerender.mjs),
// which React "hydrates". In `npm run dev` the root is empty, so render fresh.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
