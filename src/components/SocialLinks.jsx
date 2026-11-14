import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { LuMail } from 'react-icons/lu';
import { contact } from '../data/portfolio';

/** Shared props for links that leave the site. */
export const external = { target: '_blank', rel: 'noopener noreferrer' };

/** Build the social list from portfolio.js, skipping any empty link. */
export function getSocials() {
  return [
    contact.linkedin && { label: 'LinkedIn', href: contact.linkedin, Icon: FaLinkedinIn, ext: true },
    contact.github && { label: 'GitHub', href: contact.github, Icon: SiGithub, ext: true },
    contact.email && { label: 'Email', href: `mailto:${contact.email}`, Icon: LuMail, ext: false },
  ].filter(Boolean);
}

/** Row of round icon links. */
export function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {getSocials().map(({ label, href, Icon, ext }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(ext ? external : {})}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_var(--glow)]"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
