import { m } from 'framer-motion';
import { LuDownload, LuMapPin } from 'react-icons/lu';
import { contact, profile } from '../data/portfolio';
import { CodeCard } from '../components/CodeCard';
import { SocialLinks } from '../components/SocialLinks';

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[85dvh] items-center pt-28 pb-20"
    >
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

          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1] tracking-tight text-ink">
            {profile.name}
          </h1>

          <p className="mt-5 font-mono text-base text-accent sm:text-lg">{profile.title}</p>

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
          <CodeCard />
        </m.div>
      </div>

    </section>
  );
}
