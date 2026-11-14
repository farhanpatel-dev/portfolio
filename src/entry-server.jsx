// Used only at build time by scripts/prerender.mjs: renders the whole page to
// static HTML so content is visible before any JavaScript runs.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
