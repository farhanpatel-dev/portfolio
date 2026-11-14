import { AnimatePresence, m } from 'framer-motion';
import { LuMoon, LuSun } from 'react-icons/lu';

/** Sun/moon toggle. */
export function ThemeToggle({ theme, onToggle, className = '' }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35 }}
        >
          {dark ? <LuSun className="h-[18px] w-[18px]" aria-hidden="true" /> : <LuMoon className="h-[18px] w-[18px]" aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
