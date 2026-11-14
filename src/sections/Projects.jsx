import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { LuCalendar, LuExternalLink } from 'react-icons/lu';
import { projects, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { TechBadge } from '../components/TechBadge';
import { ProjectArt } from '../components/ProjectArt';
import { external } from '../components/SocialLinks';

const ALL = 'All';

export function Projects() {
  const s = sections.projects;
  const [filter, setFilter] = useState(ALL);
  const techs = useMemo(() => [ALL, ...new Set(projects.flatMap((p) => p.tech))], []);
  const shown = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter));
  // A single project gets a wide "featured" layout; filters appear from 3 projects.
  const featured = projects.length === 1;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative bg-linear-to-b from-bg via-bg-alt to-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="projects-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        {projects.length > 2 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by technology">
            {techs.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                  filter === t ? 'btn-lux' : 'border border-line text-muted hover:border-accent hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <m.div layout className={featured ? '' : 'grid gap-8 md:grid-cols-2 xl:grid-cols-3'}>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.name} project={p} featured={featured} />
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, featured }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`glass lift group/card overflow-hidden rounded-[2rem] ${featured ? 'grid lg:grid-cols-[1.1fr_1fr]' : 'flex flex-col'}`}
    >
      {/* Thumbnail with zoom on hover */}
      <div className={`relative overflow-hidden ${featured ? 'min-h-72 lg:min-h-full' : 'aspect-[16/10]'}`}>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]">
          {p.image ? (
            <img src={p.image} alt={`Screenshot of ${p.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ) : (
            <ProjectArt title={p.name} />
          )}
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-espresso/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-10">
        {p.date && (
          <p className="eyebrow inline-flex items-center gap-2">
            <LuCalendar className="h-3.5 w-3.5" aria-hidden="true" />
            {p.date}
          </p>
        )}
        <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">{p.name}</h3>
        <p className="mt-4 text-ink/80">{p.description}</p>

        {p.highlights?.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink/75">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-linear-to-br from-caramel to-champagne" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t}>
              <TechBadge name={t} size="sm" />
            </li>
          ))}
        </ul>

        {/* Buttons only render when a link exists, so none are ever broken */}
        {(p.code || p.live) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.code && (
              <a href={p.code} {...external} className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
                <SiGithub className="h-4 w-4" aria-hidden="true" />
                Code
                <span className="sr-only"> for {p.name} (opens in a new tab)</span>
              </a>
            )}
            {p.live && (
              <a href={p.live} {...external} className="btn-lux inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
                <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                Live Demo
                <span className="sr-only"> of {p.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </m.article>
  );
}
