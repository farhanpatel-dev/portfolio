import { m, useReducedMotion } from 'framer-motion';
import { useHydrated } from '../hooks/useHydrated';
import { TypeAnimation } from 'react-type-animation';
import { LuArrowDown, LuDownload, LuMapPin } from 'react-icons/lu';
import { contact, profile } from '../data/portfolio';
import { Portrait } from '../components/Portrait';
import { SocialLinks } from '../components/SocialLinks';

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const words = profile.name.split(' ');
  // Build the typing sequence: each role, then a pause (ms).
  const sequence = profile.roles.flatMap((r) => [r, 2200]);
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;
  // Index of each word's first letter, so the stagger runs across the whole name.
  const wordStart = words.map((_, wi) => words.slice(0, wi).join('').length);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-28 pb-24"
    >
      {/* Background: Ivory -> Cream -> Sand radial with drifting blurred blobs */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,var(--color-ivory)_0%,var(--color-cream)_45%,var(--color-sand)_100%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,#4a3729_0%,#3a2b21_45%,#2e2119_100%)]" />
      <div aria-hidden="true" className="animate-drift-a absolute -left-24 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-latte/50 blur-[110px] dark:bg-latte/15" />
      <div aria-hidden="true" className="animate-drift-b absolute -right-16 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-champagne/30 blur-[120px] dark:bg-champagne/15" />
      {/* fade into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-bg" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow mb-6 inline-flex items-center gap-2"
          >
            <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {contact.location}
          </m.p>

          {/* Name, revealed letter by letter: each letter rises up through a
              mask (fully opaque, so it paints immediately; screen readers get
              the plain name from aria-label) */}
          <h1 aria-label={profile.name} className="font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-ink">
            {words.map((word, wi) => (
              <span
                key={word}
                aria-hidden="true"
                className={`inline-block overflow-hidden whitespace-nowrap pb-[0.14em] align-bottom ${wi === words.length - 1 ? 'text-gradient italic pr-3' : ''}`}
              >
                {word.split('').map((ch, ci) => {
                  const i = wordStart[wi] + ci;
                  return (
                    <m.span
                      key={`${ch}-${i}`}
                      className="inline-block"
                      initial={{ y: '105%', rotate: 6 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.045 }}
                    >
                      {ch}
                    </m.span>
                  );
                })}
                {wi < words.length - 1 && <span className="inline-block w-[0.28em]" />}
              </span>
            ))}
          </h1>

          {/* Typing role */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 h-9 font-display text-xl italic text-muted sm:text-2xl"
          >
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              {/* Static first role until hydrated (matches the prerendered HTML),
                  and permanently for visitors who prefer reduced motion. */}
              {hydrated && !reduce ? (
                <TypeAnimation sequence={sequence} wrapper="span" speed={45} deletionSpeed={65} repeat={Infinity} cursor />
              ) : (
                profile.roles[0]
              )}
            </span>
          </m.div>

          {/* Tagline is visible from the first paint (it's usually the
              largest text on screen, so it decides how fast the page feels). */}
          <m.p
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mx-auto mt-6 max-w-xl text-lg text-ink/75 lg:mx-0"
          >
            {profile.tagline}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#projects" className="btn-lux rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide">
              View My Work
            </a>
            <a href="#contact" className="btn-ghost rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide">
              Contact Me
            </a>
            <a
              href={resumeHref}
              download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide"
            >
              <LuDownload className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </m.div>
        </div>

        <m.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
        >
          <Portrait />
        </m.div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex"
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-current pt-2">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        <LuArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}
