import { Reveal } from './Reveal';

/**
 * Mono "// label" eyebrow + bold display heading with a gradient accent word.
 */
export function SectionHeading({ eyebrow, title, accent, intro, align = 'center', id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`mb-10 flex max-w-3xl flex-col gap-3 md:mb-12 ${alignCls}`}>
      <span className="eyebrow">
        <span className="text-accent">{'// '}</span>
        {eyebrow}
      </span>
      <h2 id={id} className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {intro && <p className="max-w-xl text-base text-muted md:text-lg">{intro}</p>}
    </Reveal>
  );
}
