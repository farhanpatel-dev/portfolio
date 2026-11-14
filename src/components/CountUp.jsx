import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/** Number that counts up from 0 the first time it scrolls into view. */
export function CountUp({ value, decimals = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  // Always start at 0 so the prerendered HTML and first client render match.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  // Screen readers get the final value; the animating digits are hidden from them.
  return (
    <span ref={ref}>
      <span className="sr-only">{`${value.toFixed(decimals)}${suffix}`}</span>
      <span aria-hidden="true">
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
