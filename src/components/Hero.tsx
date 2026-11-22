import { useEffect, useRef } from 'react';
import { useContent, useUi } from '../lib/i18n';
import { gsap, reducedMotion } from '../lib/gsap';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';
import { TechText } from './TechText';

export function Hero() {
  const { profile } = useContent();
  const ui = useUi();
  const sectionRef = useRef<HTMLElement>(null);

  // Intro timeline: lines rise in staggered, then gentle parallax on scroll.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-line', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }).from(
        '.hero-fade',
        { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
        '-=0.5'
      );

      gsap.to('.hero-parallax', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-28"
    >
      {/* Vertical side label */}
      <span
        aria-hidden="true"
        className="hero-parallax absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl] md:left-10 md:block"
      >
        {ui.hero.folio} · {profile.location}
      </span>

      <Reveal className="relative">
        <p className="hero-fade font-mono text-xs uppercase tracking-[0.2em] text-muted md:hidden">
          {ui.hero.folio} · {profile.location}
        </p>
        <h1 className="mt-6">
          <div className="overflow-hidden pb-[0.08em]">
            <div className="hero-line">
              <TechText
                text={profile.tagline}
                align="left"
                labels={false}
                intro="assemble"
                introDuration={1.6}
                className="h-[clamp(120px,18vw,190px)] text-ink"
              />
            </div>
          </div>
        </h1>
        <div className="hero-fade mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-end">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a
                href="#work"
                className="inline-block border border-line px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-base"
              >
                {ui.hero.viewWork}
              </a>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-ink"
            >
              {profile.email}
            </a>
          </div>
        </div>
        <div className="hero-fade mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>{profile.role}</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-current"
              aria-hidden="true"
            />
            {profile.status}
          </span>
          <span>{ui.hero.scroll}</span>
        </div>
      </Reveal>
    </section>
  );
}
