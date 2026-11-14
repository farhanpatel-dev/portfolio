import { Reveal } from './Reveal';

/**
 * Mono "// label" eyebrow + bold display heading with a gradient accent word.
 */
export function SectionHeading({ eyebrow, title, accent, intro, align = 'center', id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`mb-14 flex max-w-3xl flex-col gap-4 md:mb-20 ${alignCls}`}>
      <span className="eyebrow">
        <span className="text-accent">{'// '}</span>
        {eyebrow}
      </span>
      <h2 id={id} className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {intro && <p className="max-w-xl text-base text-muted md:text-lg">{intro}</p>}
    </Reveal>
  );
}
