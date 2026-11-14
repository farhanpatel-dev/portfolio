import { AnimatePresence, m } from 'framer-motion';
import { LuArrowUp } from 'react-icons/lu';
import { useScrolled } from '../hooks/useScrolled';

/** Floating button that appears after scrolling down. */
export function BackToTop() {
  const show = useScrolled(700);
  return (
    <AnimatePresence>
      {show && (
        <m.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="btn-lux fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full"
        >
          <LuArrowUp className="h-5 w-5" aria-hidden="true" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
