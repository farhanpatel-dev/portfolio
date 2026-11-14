import { useCallback, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'fp-theme';
const listeners = new Set();

/** Read a saved choice; storage can be blocked (private mode), so guard it. */
function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  listeners.forEach((l) => l());
}

// The inline script in index.html sets the class before first paint, so the
// <html> class is the source of truth on the client.
const getSnapshot = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
// The prerendered HTML is always built as "light"; React swaps to the real
// value right after hydration without a mismatch error.
const getServerSnapshot = () => 'light';
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/**
 * Light/dark theme.
 * - Follows the system setting until the visitor picks a theme themselves.
 * - Remembers an explicit choice in localStorage.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep following the OS preference while no explicit choice is stored.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!readStored()) apply(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
