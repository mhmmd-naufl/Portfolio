import { profile } from '../data/content';
import { Playground } from './Playground';
import { Reveal } from './Reveal';

export function Hero() {
  const [first, ...rest] = profile.tagline.split(' ');

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-28"
    >
      <Playground bare faint />
      {/* Ghost section numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-24 select-none font-display text-[26vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.04] dark:text-[#EDE9E1]/[0.06] md:text-[18vw]"
      >
        01
      </span>
      {/* Vertical side label */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl] md:left-10 md:block"
      >
        Folio 2026 — {profile.location}
      </span>

      <Reveal className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted md:hidden">
          Folio 2026 — {profile.location}
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.04em]">
          <span className="block">{first}</span>
          <span className="block md:ml-[8vw]">{rest.join(' ')}</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted md:ml-[8vw]">{profile.bio}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              className="font-mono text-sm uppercase tracking-widest underline underline-offset-4"
            >
              View work ↓
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-ink"
            >
              {profile.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>{profile.role}</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-current"
              aria-hidden="true"
            />
            {profile.status}
          </span>
          <span>Scroll ↓</span>
        </div>
      </Reveal>
    </section>
  );
}
