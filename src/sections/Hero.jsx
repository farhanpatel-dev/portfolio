import { m, useReducedMotion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { LuArrowDown, LuDownload, LuMapPin, LuTerminal } from 'react-icons/lu';
import { contact, profile } from '../data/portfolio';
import { useHydrated } from '../hooks/useHydrated';
import { CodeCard } from '../components/CodeCard';
import { SocialLinks } from '../components/SocialLinks';

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const words = profile.name.split(' ');
  // Index of each word's first letter, so the stagger runs across the whole name.
  const wordStart = words.map((_, wi) => words.slice(0, wi).join('').length);
  // Typing sequence: each role, then a pause (ms).
  const sequence = profile.roles.flatMap((r) => [r, 2200]);
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-28 pb-24"
    >
      {/* Background glows (the dot grid comes from <body>) */}
      <div aria-hidden="true" className="animate-drift-a absolute -left-32 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[120px]" />
      <div aria-hidden="true" className="animate-drift-b absolute -right-24 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent-2/15 blur-[120px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-bg" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 text-center lg:text-left">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {profile.availability && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {profile.availability.toLowerCase()}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {contact.location}
            </span>
          </m.div>

          {/* Name, revealed letter by letter: each letter rises through a mask
              (fully opaque, so it paints immediately; screen readers get the
              plain name from aria-label). */}
          <h1 aria-label={profile.name} className="font-display text-[clamp(3rem,8.5vw,6.75rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {words.map((word, wi) => (
              <span
                key={word}
                aria-hidden="true"
                className={`inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom ${wi === words.length - 1 ? 'text-gradient' : ''}`}
              >
                {word.split('').map((ch, ci) => {
                  const i = wordStart[wi] + ci;
                  return (
                    <m.span
                      key={`${ch}-${i}`}
                      className="inline-block"
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.04 }}
                    >
                      {ch}
                    </m.span>
                  );
                })}
                {wi < words.length - 1 && <span className="inline-block w-[0.25em]" />}
              </span>
            ))}
          </h1>

          {/* Typing role, terminal style */}
          <div className="mt-6 flex h-8 items-center justify-center gap-2 font-mono text-base text-ink sm:text-xl lg:justify-start">
            <LuTerminal className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              {/* Static first role until hydrated (matches the prerendered HTML),
                  and permanently for visitors who prefer reduced motion. */}
              {hydrated && !reduce ? (
                <TypeAnimation sequence={sequence} wrapper="span" speed={50} deletionSpeed={70} repeat={Infinity} cursor={false} />
              ) : (
                profile.roles[0]
              )}
            </span>
            <span aria-hidden="true" className="animate-blink inline-block h-5 w-2.5 shrink-0 bg-accent" />
          </div>

          {/* Tagline is visible from the first paint (it's usually the largest
              text on screen, so it decides how fast the page feels). */}
          <m.p
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted lg:mx-0"
          >
            {profile.tagline}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#projects" className="btn-primary rounded-lg px-6 py-3 font-mono text-sm font-semibold">
              View my work
            </a>
            <a href="#contact" className="btn-ghost rounded-lg px-6 py-3 font-mono text-sm font-semibold">
              Contact me
            </a>
            <a
              href={resumeHref}
              download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
              className="btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-semibold"
            >
              <LuDownload className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
          className="relative mx-auto w-full min-w-0 max-w-xl"
        >
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-3xl bg-linear-to-br from-accent/20 via-transparent to-accent-2/20 blur-2xl" />
          <CodeCard />
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
