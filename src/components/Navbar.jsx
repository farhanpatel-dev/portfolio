import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { LuMenu, LuX } from 'react-icons/lu';
import { navLinks, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { ThemeToggle } from './ThemeToggle';
import { SocialLinks } from './SocialLinks';

const ids = navLinks.map((l) => l.id);

/**
 * Sticky navbar: transparent at the top, frosted cream once scrolled.
 * Highlights the section in view; full-screen slide-in menu on mobile.
 */
export function Navbar({ theme, onToggleTheme }) {
  const scrolled = useScrolled(24);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Lock page scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-cream/75 shadow-[0_8px_30px_-20px_rgba(122,92,62,0.5)] backdrop-blur-xl dark:bg-espresso/75'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo: back to top */}
        {/* Accessible name = visible name + "back to top" (initials badge is decorative) */}
        <a href="#top" className="group flex items-center gap-3">
          <span aria-hidden="true" className="gold-ring grid h-10 w-10 place-items-center rounded-full p-[1.5px]">
            <span className="grid h-full w-full place-items-center rounded-full bg-bg font-display text-sm italic text-ink">
              {profile.initials}
            </span>
          </span>
          <span className="sr-only font-display text-lg tracking-wide text-ink sm:not-sr-only">{profile.name}</span>
          <span className="sr-only">, back to top</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative isolate rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-accent/40 bg-accent/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            <LuMenu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile full-screen menu: a sibling of <header>, because the header's
          backdrop blur would otherwise trap this fixed panel inside it. */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex h-dvh flex-col bg-linear-to-br from-ivory via-cream to-sand px-6 py-5 dark:from-espresso dark:via-[#3a2b21] dark:to-[#2a1e17] lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl italic text-ink">{profile.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink"
              >
                <LuX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-14 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 py-2 font-display text-4xl ${
                      active === link.id ? 'text-gradient italic' : 'text-ink'
                    }`}
                  >
                    <span className="font-sans text-xs tracking-[0.3em] text-muted">0{i + 1}</span>
                    {link.label}
                  </a>
                </m.li>
              ))}
            </ul>

            <div className="mt-auto border-t border-line pt-6">
              <SocialLinks />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
