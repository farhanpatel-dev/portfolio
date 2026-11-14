import { m, useScroll, useSpring } from 'framer-motion';

/** Thin Caramel -> gold bar at the very top that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-caramel via-champagne to-caramel"
    />
  );
}
