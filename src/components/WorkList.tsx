import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/content';
import type { Project } from '../data/content';
import { Reveal } from './Reveal';

type Preview = { x: number; y: number; id: string } | null;

export function WorkList() {
  const [preview, setPreview] = useState<Preview>(null);
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
  }, []);

  const onRowMove = (e: React.MouseEvent, id: string) => {
    if (!hoverable.current) return;
    setPreview({ x: e.clientX, y: e.clientY, id });
  };

  const current: Project | undefined = preview
    ? projects.find((p) => p.id === preview.id)
    : undefined;

  return (
    <section id="work" className="py-28 md:py-40">
      <Reveal>
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight">
            <span className="mr-3 font-mono text-sm font-normal text-muted">02 /</span>
            Selected Work
          </h2>
          <span className="font-mono text-xs text-muted">({String(projects.length).padStart(2, '0')})</span>
        </div>
      </Reveal>

      <div onMouseLeave={() => setPreview(null)}>
        {projects.map((p) => (
          <Reveal key={p.id}>
            <div
              onMouseEnter={(e) => onRowMove(e, p.id)}
              onMouseMove={(e) => onRowMove(e, p.id)}
              className="group grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
            >
              <span className="font-mono text-xs text-muted md:col-span-1">{p.id}</span>
              <div className="md:col-span-7">
                {p.link ? (
                  <a
                    href={p.link}
                    className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2"
                  >
                    {p.title} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="block font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                    {p.title}
                  </span>
                )}
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">{p.summary}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="font-mono text-xs uppercase tracking-widest">
                  {p.category} — {p.year}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">{p.stack.join(' / ')}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {current && preview && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-40 hidden w-[320px] border border-line bg-base p-6 lg:block"
          style={{
            left: Math.min(preview.x + 24, window.innerWidth - 344),
            top: Math.max(preview.y - 140, 16),
          }}
        >
          <p className="font-mono text-xs text-muted">{current.id}</p>
          <p className="mt-2 font-display text-3xl font-medium tracking-tight">{current.title}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {current.category} — {current.year}
          </p>
        </div>
      )}
    </section>
  );
}
