import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { sections, skills } from '../data/portfolio';
import { brandVars, getTech } from '../data/techIcons';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

const ALL = 'All';

export function Skills() {
  const s = sections.skills;
  const categories = [ALL, ...skills.map((g) => g.category)];
  const [active, setActive] = useState(ALL);

  // Items for the selected tab, each tagged with its category.
  const visible = useMemo(() => {
    const groups = active === ALL ? skills : skills.filter((g) => g.category === active);
    return groups.flatMap((g) => g.items.map((name) => ({ name, category: g.category })));
  }, [active]);

  // Every official brand logo, de-duplicated, for the marquee strip.
  const marquee = useMemo(() => {
    const seen = new Set();
    return skills
      .flatMap((g) => g.items)
      .filter((n) => getTech(n).brand && !seen.has(getTech(n).Icon) && seen.add(getTech(n).Icon));
  }, []);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden bg-bg-alt/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="skills-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        {/* Category tabs */}
        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const selected = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  onClick={() => setActive(cat)}
                  className={`relative isolate rounded-lg px-4 py-2 font-mono text-[13px] transition-colors ${
                    selected ? 'text-on-accent' : 'border border-line text-muted hover:border-accent hover:text-ink'
                  }`}
                >
                  {selected && (
                    <m.span
                      layoutId="skill-tab"
                      className="absolute inset-0 -z-10 rounded-lg bg-linear-to-r from-[var(--btn-from)] to-[var(--btn-to)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Skill cards (the tabpanel wraps the list so the <ul> keeps list semantics) */}
        <div id="skills-panel" role="tabpanel" aria-label={`${active} skills`}>
        <m.ul
          layout
          className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map(({ name, category }, i) => {
              const { Icon } = getTech(name);
              return (
                <m.li
                  key={name}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.025, duration: 0.45 } }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                  style={brandVars(name)}
                  className="group glass lift flex items-center gap-3 rounded-xl px-4 py-3.5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-bg/70">
                    <Icon className="brand-hover h-[22px] w-[22px]" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium leading-tight text-ink">{name}</span>
                    {active === ALL && <span className="mt-0.5 truncate font-mono text-[0.68rem] text-muted">{category}</span>}
                  </span>
                </m.li>
              );
            })}
          </AnimatePresence>
        </m.ul>
        </div>
      </div>

      {/* Infinite logo marquee (decorative) */}
      <div aria-hidden="true" className="marquee relative mt-20 overflow-hidden border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-14">
          {[...marquee, ...marquee].map((name, i) => {
            const { Icon } = getTech(name);
            return (
              <span key={`${name}-${i}`} style={brandVars(name)} className="group flex items-center gap-3 text-muted">
                <Icon className="brand-hover h-7 w-7" />
                <span className="font-mono text-sm">{name}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
