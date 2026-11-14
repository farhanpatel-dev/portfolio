import { m } from 'framer-motion';
import { LuBriefcase, LuCalendar, LuMapPin } from 'react-icons/lu';
import { experience, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { external } from '../components/SocialLinks';

const ease = [0.22, 1, 0.36, 1];

/**
 * Vertical timeline with a gold gradient line. On desktop, role cards
 * alternate left and right of the line; on mobile they stack on one side.
 */
export function Experience() {
  const s = sections.experience;
  // Flatten company -> roles so every role is one timeline entry.
  const entries = experience.flatMap((co) => co.roles.map((role) => ({ ...role, company: co })));

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="experience-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <ol className="relative">
          {/* the line */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-linear-to-b from-accent via-accent-2 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          {entries.map((entry, i) => {
            const right = i % 2 === 1;
            const co = entry.company;
            return (
              <li key={`${co.company}-${entry.title}`} className="relative mb-14 last:mb-0 md:grid md:grid-cols-2 md:gap-16">
                {/* node on the line: logo or initials badge */}
                <span
                  aria-hidden="true"
                  className="accent-ring absolute left-5 top-6 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-lg p-px shadow-[0_0_24px_-4px_var(--glow)] md:left-1/2"
                >
                  <span className="grid h-full w-full place-items-center rounded-[7px] bg-bg font-mono text-xs font-bold text-accent">
                    {co.initials}
                  </span>
                </span>

                <m.article
                  initial={{ opacity: 0, x: right ? 40 : -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease }}
                  className={`glass lift ml-14 rounded-3xl p-6 sm:p-8 md:ml-0 ${right ? 'md:col-start-2' : 'md:col-start-1'}`}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <LuCalendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {entry.start} – {entry.end}
                    </span>
                    {co.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {co.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{entry.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-2 text-base font-medium text-muted">
                    <LuBriefcase className="h-4 w-4" aria-hidden="true" />
                    {co.url ? (
                      <a href={co.url} {...external} className="underline decoration-accent/50 underline-offset-4 hover:text-accent">
                        {co.company}
                      </a>
                    ) : (
                      co.company
                    )}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {entry.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </m.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
