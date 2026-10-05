import { profile } from '../data/content';
import { Reveal } from './Reveal';

export function Hero() {
  return (
    <section id="home" className="flex min-h-[92vh] flex-col justify-center">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Folio 2026 — {profile.location}
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          {profile.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.bio}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
      </Reveal>
    </section>
  );
}
