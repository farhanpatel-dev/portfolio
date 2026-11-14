import { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

/**
 * Small accent dot with a soft trailing ring.
 * Only on devices with a precise pointer and when reduced motion is off;
 * everyone else keeps the normal cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      setHovering(Boolean(target?.closest('a, button, [role="tab"], input, textarea, label')));
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <m.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-accent/70 bg-accent/5"
      />
      <m.div
        style={{ x, y }}
        animate={{ scale: hovering ? 0.5 : 1, opacity: visible ? 1 : 0 }}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent"
      />
    </div>
  );
}
