import { m } from 'framer-motion';
import { LuAward, LuCalendar, LuExternalLink, LuGraduationCap, LuMapPin } from 'react-icons/lu';
import { certifications, education, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { rise, stagger } from '../components/Reveal';
import { external } from '../components/SocialLinks';

export function Education() {
  const s = sections.education;
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="education-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-8 md:grid-cols-2"
        >
          {education.map((ed) => (
            <m.article key={ed.degree} variants={rise} className="glass lift relative overflow-hidden rounded-2xl p-8 sm:p-10">
              <LuGraduationCap aria-hidden="true" className="absolute -right-6 -top-6 h-40 w-40 text-accent/10" />
              <span className="accent-ring grid h-14 w-14 place-items-center rounded-xl p-px">
                <span className="grid h-full w-full place-items-center rounded-[11px] bg-bg">
                  <LuGraduationCap className="h-6 w-6 text-muted" aria-hidden="true" />
                </span>
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{ed.degree}</h3>
              <p className="mt-2 text-lg font-medium">
                {ed.url ? (
                  <a href={ed.url} {...external} className="text-gradient inline-flex items-center gap-1.5 hover:opacity-80">
                    {ed.institution}
                    <LuExternalLink className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="text-gradient">{ed.institution}</span>
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <LuCalendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {ed.start} – {ed.end}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {ed.location}
                </span>
              </div>
              {ed.detail && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-ink">
                  <LuAward className="h-4 w-4 text-muted" aria-hidden="true" />
                  {ed.detail}
                </p>
              )}
              {ed.coursework?.length > 0 && (
                <div className="mt-6">
                  <p className="eyebrow mb-3">Coursework</p>
                  <ul className="flex flex-wrap gap-2">
                    {ed.coursework.map((c) => (
                      <li key={c} className="rounded-md border border-line bg-bg/60 px-3 py-1 font-mono text-xs text-ink/85">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </m.article>
          ))}
        </m.div>

        {/* Certifications appear automatically once added in portfolio.js */}
        {certifications.length > 0 && (
          <div className="mt-16">
            <h3 className="eyebrow mb-6 text-center">Certifications</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c) => (
                <li key={c.name} className="glass lift rounded-2xl p-6">
                  <p className="font-display text-xl font-semibold text-ink">{c.name}</p>
                  <p className="mt-1 text-sm text-muted">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                  {c.url && (
                    <a href={c.url} {...external} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted underline decoration-accent/50 underline-offset-4 hover:text-accent">
                      View credential <LuExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
