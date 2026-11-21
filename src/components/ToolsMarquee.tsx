import { tools } from '../data/content';
import { Reveal } from './Reveal';

// Infinite tools strip between About and Contact. Pure CSS marquee,
// pauses on hover, static under prefers-reduced-motion.
export function ToolsMarquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {tools.map(t => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t}</span>
          <span aria-hidden="true" className="text-ink/25">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <Reveal>
      <div className="group overflow-hidden border-y border-line py-5">
        <div className="animate-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </Reveal>
  );
}
