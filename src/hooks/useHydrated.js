import { useEffect, useState } from 'react';

/**
 * False during prerendering and the first client render, true right after.
 * Use it for anything that depends on the browser (media queries, etc.) so
 * the first client render matches the prerendered HTML exactly.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
