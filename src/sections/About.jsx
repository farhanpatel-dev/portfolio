import { m } from 'framer-motion';
import { profile, sections, skills, stats } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { CountUp } from '../components/CountUp';
import { Reveal, rise, stagger } from '../components/Reveal';

// "Technologies" stat is counted from the skills list so it never goes stale.
const techCount = skills.reduce((n, g) => n + g.items.length, 0);

export function About() {
  const s = sections.about;
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal>
              <p className="border-l-2 border-accent pl-6 font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
                {profile.summary}
              </p>
            </Reveal>
            {profile.aboutExtra && (
              <Reveal delay={0.1}>
                <p className="mt-6 pl-6 text-lg text-muted">{profile.aboutExtra}</p>
              </Reveal>
            )}
          </div>

          <m.dl
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((st) => {
              const value = st.value === 'auto' ? techCount : st.value;
              return (
                // dt comes first in the DOM (valid <dl>); flex-col-reverse shows the number on top
                <m.div key={st.label} variants={rise} className="glass lift flex flex-col-reverse rounded-xl p-5">
                  <dt className="mt-2 font-mono text-xs text-muted">{st.label}</dt>
                  <dd className="font-display text-4xl font-bold text-gradient">
                    <CountUp value={value} decimals={st.decimals ?? 0} suffix={st.suffix} />
                  </dd>
                </m.div>
              );
            })}
          </m.dl>
        </div>
      </div>
    </section>
  );
}
