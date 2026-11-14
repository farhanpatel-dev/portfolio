import { m } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/**
 * Fade-and-rise when scrolled into view. Under prefers-reduced-motion,
 * <MotionConfig reducedMotion="user"> in App drops the movement and keeps
 * only the fade.
 */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent/child variants for staggered lists and grids. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
