import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { LuCalendar, LuExternalLink, LuFolderGit2 } from 'react-icons/lu';
import { projects, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { TechBadge } from '../components/TechBadge';
import { external } from '../components/SocialLinks';

const ALL = 'All';

export function Projects() {
  const s = sections.projects;
  const [filter, setFilter] = useState(ALL);
  const techs = useMemo(() => [ALL, ...new Set(projects.flatMap((p) => p.tech))], []);
  const shown = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter));
  // One project gets a centred wide card; two or more use a grid.
  const single = projects.length === 1;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative bg-bg-alt/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="projects-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        {/* Technology filter appears once there are 3+ projects */}
        {projects.length > 2 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by technology">
            {techs.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
                  filter === t ? 'btn-primary' : 'border border-line text-muted hover:border-accent hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <m.div layout className={single ? 'mx-auto max-w-4xl' : 'grid gap-8 md:grid-cols-2 xl:grid-cols-3'}>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass lift flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Terminal-style header: repo path + quick links */}
      <div className="flex items-center gap-3 border-b border-line bg-bg-alt/80 px-5 py-3 font-mono text-xs">
        <LuFolderGit2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate text-muted">
          <span className="text-accent">~/</span>
          {p.repoPath || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        </span>
        {p.date && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-muted">
            <LuCalendar className="h-3.5 w-3.5" aria-hidden="true" />
            {p.date}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{p.name}</h3>
        <p className="mt-4 text-muted">{p.description}</p>

        {p.highlights?.length > 0 && (
          <ul className="mt-6 space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tech stack">
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
              <a href={p.code} {...external} className="btn-ghost inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold">
                <SiGithub className="h-4 w-4" aria-hidden="true" />
                Code
                <span className="sr-only"> for {p.name} (opens in a new tab)</span>
              </a>
            )}
            {p.live && (
              <a href={p.live} {...external} className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold">
                <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
                <span className="sr-only"> of {p.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </m.article>
  );
}
