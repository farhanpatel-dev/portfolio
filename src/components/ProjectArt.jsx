/**
 * Generated thumbnail artwork, used while a project has no screenshot.
 * "fields": aerial farm parcels with highlighted stress zones and contour
 * lines, echoing the crop-stress project.
 */
export function ProjectArt({ title }) {
  // Deterministic parcel layout (no randomness, so it renders the same every time).
  const parcels = [
    [0, 0, 150, 110], [150, 0, 120, 70], [270, 0, 130, 120], [400, 0, 200, 90],
    [0, 110, 110, 130], [110, 110, 170, 90], [280, 120, 120, 110], [400, 90, 110, 150], [510, 90, 90, 150],
    [0, 240, 160, 140], [160, 200, 120, 180], [280, 230, 170, 150], [450, 240, 150, 140],
  ];
  const stressed = new Set([2, 6, 11]);
  return (
    <svg viewBox="0 0 600 380" role="img" aria-label={`Artwork for ${title}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pa-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3EBDD" />
          <stop offset="100%" stopColor="#E8D9C0" />
        </linearGradient>
        <pattern id="pa-rows" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#7A5C3E" strokeOpacity="0.12" strokeWidth="2" />
        </pattern>
        <radialGradient id="pa-stress" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#C9A227" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#B08A5B" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <rect width="600" height="380" fill="url(#pa-sky)" />
      {parcels.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="6"
            fill={i % 3 === 0 ? '#E8D9C0' : i % 3 === 1 ? '#D4BC96' : '#EFE3CE'} />
          <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="6" fill="url(#pa-rows)" />
          {stressed.has(i) && (
            <>
              <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="6" fill="url(#pa-stress)" />
              <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="6" fill="none" stroke="#7A5C3E" strokeWidth="1.5" strokeDasharray="6 5" />
            </>
          )}
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M -20 ${300 - i * 60} C 150 ${240 - i * 60}, 300 ${360 - i * 60}, 620 ${280 - i * 60}`}
          fill="none" stroke="#7A5C3E" strokeOpacity="0.18" strokeWidth="1" />
      ))}
    </svg>
  );
}
