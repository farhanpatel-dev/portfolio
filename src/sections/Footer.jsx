import { navLinks, profile } from '../data/portfolio';
import { SocialLinks } from '../components/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-sm">
            <a href="#top" className="font-display text-3xl font-bold text-ink">
              {profile.name.split(' ')[0]} <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
            </a>
            <p className="mt-3 text-muted">{profile.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="font-mono text-muted transition-colors hover:text-accent">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row">
          {/* year is computed at build time and again in the browser */}
          <p suppressHydrationWarning>© {year} {profile.name}. All rights reserved.</p>
          <p>Built with React, Tailwind CSS and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
