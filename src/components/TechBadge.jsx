import { brandVars, getTech } from '../data/techIcons';

/**
 * Pill with a tech logo. The icon sits in Mocha and turns its brand colour
 * on hover. `size="sm"` is used inside project cards.
 */
export function TechBadge({ name, size = 'md' }) {
  const { Icon } = getTech(name);
  const sm = size === 'sm';
  return (
    <span
      style={brandVars(name)}
      className={`group inline-flex items-center rounded-md border font-mono border-line bg-bg/60 text-ink/85 transition-colors hover:border-accent/60 ${
        sm ? 'gap-1.5 px-3 py-1 text-xs' : 'gap-2 px-4 py-2 text-sm'
      }`}
    >
      <Icon className={`brand-hover ${sm ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} aria-hidden="true" />
      {name}
    </span>
  );
}
