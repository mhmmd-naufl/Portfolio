import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/content';
import type { Project } from '../data/content';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';

type Preview = { x: number; y: number; id: string } | null;

export function WorkList() {
  const [preview, setPreview] = useState<Preview>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
  }, []);

  const onRowMove = (e: React.MouseEvent, id: string) => {
    if (!hoverable.current) return;
    setPreview({ x: e.clientX, y: e.clientY, id });
  };

  const current: Project | undefined = preview
    ? projects.find(p => p.id === preview.id)
    : undefined;

  return (
    <section id="work" className="relative py-36 md:py-56">
      <Reveal>
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium tracking-tight">
            <span className="mr-3 font-mono text-sm font-normal text-muted">02 /</span>
            Selected Work
          </h2>
          <span className="font-mono text-xs text-muted">
            ({String(projects.length).padStart(2, '0')})
          </span>
        </div>
      </Reveal>

      <div onMouseLeave={() => setPreview(null)}>
        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <div
              onClick={() => setOpen(p)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(p);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${p.title} — details`}
              onMouseEnter={e => onRowMove(e, p.id)}
              onMouseMove={e => onRowMove(e, p.id)}
              className={`group grid cursor-pointer gap-2 border-b border-line py-6 transition-colors duration-300 hover:bg-ink/[0.02] md:grid-cols-12 md:items-baseline md:gap-6 md:py-8 ${
                i % 2 === 1 ? 'md:ml-[6vw]' : ''
              }`}
            >
              <span className="font-mono text-xs text-muted md:col-span-1">{p.id}</span>
              <div className="md:col-span-7">
                <span className="block font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {p.title}
                </span>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink/70">
                  {p.summary}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="font-mono text-xs uppercase tracking-widest">
                  {p.category} — {p.year}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-ink">
                  {p.stack.join(' / ')}
                </p>
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
          {current.image && (
            <img
              src={current.image}
              alt=""
              loading="lazy"
              className="mb-4 aspect-video w-full border border-line object-cover"
            />
          )}
          <p className="font-mono text-xs text-muted">{current.id}</p>
          <p className="mt-2 font-display text-3xl font-medium tracking-tight">{current.title}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {current.category} — {current.year}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest">Details →</p>
        </div>
      )}

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
