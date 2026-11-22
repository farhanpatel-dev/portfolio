import { m } from 'framer-motion';
import { LuBriefcase, LuCalendar, LuMapPin } from 'react-icons/lu';
import { experience, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { external } from '../components/SocialLinks';

const ease = [0.22, 1, 0.36, 1];

/**
 * Role cards side by side on desktop (newest first), stacked on mobile.
 */
export function Experience() {
  const s = sections.experience;
  // Flatten company -> roles so every role is one card.
  const entries = experience.flatMap((co) => co.roles.map((role) => ({ ...role, company: co })));

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="experience-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <ol className="grid items-start gap-6 md:grid-cols-2">
          {entries.map((entry, i) => {
            const co = entry.company;
            return (
              <m.li
                key={`${co.company}-${entry.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
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
                <h3 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">{entry.title}</h3>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted">
                  <LuBriefcase className="h-4 w-4" aria-hidden="true" />
                  {co.url ? (
                    <a href={co.url} {...external} className="underline decoration-accent/50 underline-offset-4 hover:text-accent">
                      {co.company}
                    </a>
                  ) : (
                    co.company
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {entry.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </m.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
