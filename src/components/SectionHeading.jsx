import { Reveal } from './Reveal';

/**
 * Eyebrow label + large display heading with an italic gradient accent word.
 */
export function SectionHeading({ eyebrow, title, accent, intro, align = 'center', id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`mb-14 flex max-w-3xl flex-col gap-4 md:mb-20 ${alignCls}`}>
      <span className="eyebrow flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-accent" />
        {eyebrow}
        <span aria-hidden="true" className="h-px w-8 bg-linear-to-l from-transparent to-accent" />
      </span>
      <h2 id={id} className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
        {title}{' '}
        <em className="text-gradient pr-1 font-normal italic">{accent}</em>
      </h2>
      {intro && <p className="max-w-xl text-base text-ink/75 md:text-lg">{intro}</p>}
    </Reveal>
  );
}
