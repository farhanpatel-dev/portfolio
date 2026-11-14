import { m } from 'framer-motion';
import { images, profile, sections, skills, stats } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { CountUp } from '../components/CountUp';
import { Reveal, rise, stagger } from '../components/Reveal';

// "Technologies" stat is counted from the skills list so it never goes stale.
const techCount = skills.reduce((n, g) => n + g.items.length, 0);

export function About() {
  const s = sections.about;
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="about-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Secondary image (or decorative placeholder) */}
          <Reveal className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -left-6 -top-6 h-full w-full rounded-[2rem] border border-accent/40" />
            <div className="glass relative overflow-hidden rounded-[2rem]">
              {images.about ? (
                <img src={images.about} alt={`${profile.name} at work`} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" width="640" height="800" />
              ) : (
                <ContourArt />
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="border-l-2 border-accent/60 pl-6 font-display text-2xl leading-snug text-ink md:text-3xl">
                {profile.summary}
              </p>
            </Reveal>
            {profile.aboutExtra && (
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg text-ink/75">{profile.aboutExtra}</p>
              </Reveal>
            )}

            <m.dl
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((st) => {
                const value = st.value === 'auto' ? techCount : st.value;
                return (
                  // dt comes first in the DOM (valid <dl>), flex-col-reverse shows the number on top
                  <m.div key={st.label} variants={rise} className="glass lift flex flex-col-reverse rounded-2xl p-5 text-center">
                    <dt className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">{st.label}</dt>
                    <dd className="font-display text-4xl text-gradient">
                      <CountUp value={value} decimals={st.decimals ?? 0} suffix={st.suffix} />
                    </dd>
                  </m.div>
                );
              })}
            </m.dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Decorative topographic-contour artwork (nod to the geospatial work). */
function ContourArt() {
  return (
    <svg viewBox="0 0 400 500" aria-hidden="true" className="aspect-[4/5] w-full">
      <defs>
        <linearGradient id="ca-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3EBDD" />
          <stop offset="100%" stopColor="#E8D9C0" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#ca-bg)" />
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx={210 + Math.sin(i) * 14} cy={240 + Math.cos(i * 0.7) * 12} rx={30 + i * 22} ry={22 + i * 17}
          fill="none" stroke={i % 4 === 0 ? '#B08A5B' : '#7A5C3E'} strokeOpacity={i % 4 === 0 ? 0.55 : 0.18} strokeWidth={i % 4 === 0 ? 1.4 : 1}
          transform={`rotate(${-18 + i * 2} 210 240)`} />
      ))}
      <circle cx="214" cy="238" r="6" fill="#C9A227" />
      <circle cx="214" cy="238" r="16" fill="none" stroke="#C9A227" strokeOpacity="0.5" />
    </svg>
  );
}
