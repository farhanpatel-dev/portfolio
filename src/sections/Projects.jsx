import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { LuCalendar, LuChevronDown, LuExternalLink, LuFolderGit2 } from 'react-icons/lu';
import { projects, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { TechBadge } from '../components/TechBadge';
import { external } from '../components/SocialLinks';

export function Projects() {
  const s = sections.projects;
  // One project gets a centred wide card; two or more use a grid.
  const single = projects.length === 1;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative bg-bg-alt/60 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="projects-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />

        <m.div layout className={single ? 'mx-auto max-w-2xl' : `grid items-start gap-6 md:grid-cols-2 ${projects.length > 2 ? 'lg:grid-cols-3' : ''}`}>
          <AnimatePresence mode="popLayout">
            {projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const [open, setOpen] = useState(false);
  const listId = `highlights-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
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
      <div className="flex items-center gap-3 border-b border-line bg-bg-alt/80 px-4 py-2.5 font-mono text-xs">
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

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{p.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.description}</p>

        {/* Highlights stay collapsed so the cards stay short; still in the DOM for crawlers */}
        {p.highlights?.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
            >
              <LuChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
              {open ? 'Hide' : 'Key results'} ({p.highlights.length})
            </button>
            <ul id={listId} hidden={!open} className="mt-3 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-relaxed text-ink/85">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t}>
              <TechBadge name={t} size="sm" />
            </li>
          ))}
        </ul>

        {/* Buttons only render when a link exists, so none are ever broken */}
        {(p.code || p.live) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {p.code && (
              <a href={p.code} {...external} className="btn-ghost inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold">
                <SiGithub className="h-4 w-4" aria-hidden="true" />
                Code
                <span className="sr-only"> for {p.name} (opens in a new tab)</span>
              </a>
            )}
            {p.live && (
              <a href={p.live} {...external} className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold">
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
