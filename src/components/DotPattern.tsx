import { useId } from 'react';

// Static SVG dot grid with a radial mask that fades toward the edges.
// Pure SVG — no canvas, no rAF, cheap to render anywhere.
export function DotPattern({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const dots = `dots-${id}`;
  const fade = `fade-${id}`;
  const mask = `mask-${id}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full text-ink ${className}`}
    >
      <defs>
        <pattern id={dots} width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
        </pattern>
        <radialGradient id={fade} cx="50%" cy="42%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="55%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={mask}>
          <rect width="100%" height="100%" fill={`url(#${fade})`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${dots})`}
        mask={`url(#${mask})`}
        opacity="0.14"
      />
    </svg>
  );
}
