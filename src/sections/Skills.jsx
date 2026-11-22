import { sections, skills } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

/**
 * All skills visible at once: one row per resume category, items as plain text.
 */
export function Skills() {
  const s = sections.skills;

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading id="skills-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <Reveal>
          <dl className="divide-y divide-line border-y border-line">
            {skills.map((group) => (
              <div key={group.category} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-mono text-sm text-accent">{group.category}</dt>
                <dd className="text-[15px] leading-relaxed text-ink">
                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {group.items.map((item, i) => (
                      <li key={item}>
                        {item}
                        {i < group.items.length - 1 && <span aria-hidden="true" className="ml-2 text-muted">·</span>}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
