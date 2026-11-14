import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'fp-theme';
const listeners = new Set();

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  listeners.forEach((l) => l());
}

// The inline script in index.html sets the class before first paint, so the
// <html> class is the source of truth on the client.
const getSnapshot = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
// The prerendered HTML is built in the default (dark) theme; if a visitor
// saved "light", React swaps to it right after hydration without an error.
const getServerSnapshot = () => 'dark';
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/**
 * Light/dark theme. Dark is the default; a visitor's choice is remembered
 * in localStorage.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    apply(next);
  }, []);

  return { theme, toggle };
}
