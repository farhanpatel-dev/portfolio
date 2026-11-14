import { codeCard, contact, profile } from '../data/portfolio';

/**
 * Editor-window card for the hero: renders profile data from portfolio.js as
 * a small, syntax-highlighted Python class. Purely decorative (the same facts
 * appear in the page text), so it's hidden from screen readers.
 */

// Token helpers -> [className, text]
const k = (t) => ['text-code-key', t]; // keyword
const s = (t) => ['text-code-str', `"${t}"`]; // string
const f = (t) => ['text-code-fn', t]; // function / class name
const p = (t) => ['text-code-prop', t]; // attribute
const c = (t) => ['text-code-comment italic', t]; // comment
const o = (t) => ['text-muted', t]; // punctuation / operators
const sp = (n) => ['', ' '.repeat(n)];

/** Split a list into rows of `size` so long arrays wrap like formatted code. */
function rows(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** A Python list assignment spread over several lines. */
function listLines(name, items, perRow) {
  const r = rows(items, perRow);
  return [
    [sp(4), p(name), o(' = [')],
    ...r.map((row, ri) => [
      sp(8),
      ...row.flatMap((item, ii) => [s(item), o(ii < row.length - 1 || ri < r.length - 1 ? ', ' : ',')]),
    ]),
    [sp(4), o(']')],
  ];
}

export function CodeCard() {
  const lines = [
    [c(`# ${codeCard.filename}`)],
    [k('class '), f(codeCard.className), o(':')],
    [sp(4), p('name'), o(' = '), s(profile.name)],
    [sp(4), p('location'), o(' = '), s(contact.location)],
    ...listLines('focus', codeCard.focus, 1),
    ...listLines('stack', codeCard.stack, 2),
    [],
    [sp(4), k('def '), f('motto'), o('(self) -> '), k('str'), o(':')],
    [sp(8), k('return '), s(codeCard.motto)],
  ];

  return (
    <div aria-hidden="true" className="glass relative overflow-hidden rounded-2xl font-mono text-[11.5px] leading-6 sm:text-[13.5px]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-bg-alt/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md border border-line bg-bg px-3 py-0.5 text-xs text-ink">{codeCard.filename}</span>
        <span className="ml-auto text-xs text-muted">python</span>
      </div>

      {/* code */}
      <pre className="overflow-x-auto px-4 py-4">
        <code>
          {lines.map((tokens, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-6 shrink-0 select-none text-right text-muted/50">{i + 1}</span>
              <span className="whitespace-pre">
                {tokens.map(([cls, text], j) => (
                  <span key={j} className={cls}>{text}</span>
                ))}
                {i === lines.length - 1 && <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" />}
              </span>
            </div>
          ))}
        </code>
      </pre>

      {/* status bar */}
      <div className="flex items-center gap-4 border-t border-line bg-bg-alt/80 px-4 py-1.5 text-[11px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          main
        </span>
        <span>UTF-8</span>
        <span className="ml-auto">Python</span>
      </div>
    </div>
  );
}
