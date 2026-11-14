import { images, profile } from '../data/portfolio';

/**
 * Arched portrait frame with a slowly turning gold gradient ring.
 * Shows the profile photo from portfolio.js, or an elegant monogram
 * placeholder until one is added.
 */
export function Portrait() {
  return (
    <div className="relative mx-auto w-[min(58vw,240px)] sm:w-[min(50vw,300px)] lg:w-[min(78vw,360px)]">
      {/* soft glow */}
      <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-champagne/20 blur-3xl" />

      {/* rotating ring, clipped to the arch */}
      <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] p-[3px] shadow-[0_40px_80px_-40px_rgba(122,92,62,0.7)]">
        <div aria-hidden="true" className="gold-ring animate-spin-slow absolute -inset-1/2" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.35rem] bg-cream dark:bg-[#3a2b21]">
          {images.profile ? (
            <img
              src={images.profile}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover"
              width="720"
              height="900"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <MonogramArt />
          )}
        </div>
      </div>

      {/* floating availability label */}
      {profile.availability && (
        <div className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm text-ink">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-champagne" />
          </span>
          {profile.availability}
        </div>
      )}
    </div>
  );
}

/** Placeholder art: monogram on layered arches with fine gold lines. */
function MonogramArt() {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={`${profile.name} monogram`} className="h-full w-full">
      <defs>
        <radialGradient id="mg-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FAF6EF" />
          <stop offset="55%" stopColor="#F3EBDD" />
          <stop offset="100%" stopColor="#E8D9C0" />
        </radialGradient>
        <linearGradient id="mg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A5C3E" />
          <stop offset="55%" stopColor="#B08A5B" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#mg-bg)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${60 + i * 22} 500 V ${230 + i * 18} A ${140 - i * 22} ${140 - i * 22} 0 0 1 ${340 - i * 22} ${230 + i * 18} V 500`}
          fill="none"
          stroke="url(#mg-gold)"
          strokeOpacity={0.5 - i * 0.07}
          strokeWidth="1"
        />
      ))}
      <text
        x="200"
        y="300"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontStyle="italic"
        fontSize="132"
        fill="url(#mg-gold)"
      >
        {profile.initials}
      </text>
      <text x="200" y="350" textAnchor="middle" fontFamily="DM Sans Variable, DM Sans, sans-serif" fontSize="13" letterSpacing="6" fill="#7A5C3E">
        {profile.title.toUpperCase()}
      </text>
    </svg>
  );
}
