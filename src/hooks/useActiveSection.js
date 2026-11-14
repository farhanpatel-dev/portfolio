import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view, for highlighting the
 * matching navbar link. A section counts as active once it crosses a band
 * just below the navbar.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        // Pick the first section (in page order) that is inside the band.
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? '');
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
