import { useEffect, useRef, useState } from 'react';
import { useContent, useUi } from '../lib/i18n';
import type { Project } from '../data/content';
import { gsap, reducedMotion } from '../lib/gsap';
import { withViewTransition } from '../lib/theme';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';

type CardTarget = { x: number; y: number };

export function WorkList() {
  const { projects } = useContent();
  const ui = useUi();
  const [cardId, setCardId] = useState<string | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [open, setOpen] = useState<Project | null>(null);
  const hoverable = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<CardTarget>({ x: 0, y: 0 });
  const posRef = useRef<CardTarget>({ x: 0, y: 0 });

  useEffect(() => {
    hoverable.current = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
  }, []);

  // Preload preview images so the card never stalls on decode.
  useEffect(() => {
    projects.forEach(p => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, [projects]);

  // GSAP stagger reveal for rows — replaces per-row CSS reveal here.
  useEffect(() => {
    const list = listRef.current;
    if (!list || reducedMotion()) return;
    const rows = list.querySelectorAll<HTMLElement>('.work-row');
    const ctx = gsap.context(() => {
      gsap.from(rows, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: list, start: 'top 78%', once: true },
      });
    }, list);
    return () => ctx.revert();
  }, []);

  // Glide the preview card toward the cursor with a lerp loop — writes
  // transform directly so mousemove never triggers React re-renders.
  // Only runs while the card is visible; no idle rAF cost otherwise.
  useEffect(() => {
    if (!cardVisible) return;
    let raf = 0;
    const tick = () => {
      const el = cardRef.current;
      if (el) {
        const p = posRef.current;
        const t = targetRef.current;
        p.x += (t.x - p.x) * 0.16;
        p.y += (t.y - p.y) * 0.16;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cardVisible]);

  const cardPos = (e: React.MouseEvent): CardTarget => ({
    x: Math.min(e.clientX + 24, window.innerWidth - 344),
    y: Math.max(e.clientY - 140, 16),
  });

  const showCard = (e: React.MouseEvent, id: string) => {
    if (!hoverable.current) return;
    const pos = cardPos(e);
    targetRef.current = pos;
    if (!cardVisible) posRef.current = pos;
    setCardId(id);
    setCardVisible(true);
  };

  const moveCard = (e: React.MouseEvent) => {
    if (!hoverable.current) return;
    targetRef.current = cardPos(e);
  };

  const hideCard = () => setCardVisible(false);

  const openProject = (p: Project) => withViewTransition(() => setOpen(p));
  const closeProject = () => setOpen(null);

  const current: Project | undefined = cardId ? projects.find(p => p.id === cardId) : undefined;

  return (
    <section id="work" className="relative py-36 md:py-56">
      <Reveal>
        <div className="scrub-y flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium tracking-tight">
            <span className="mr-3 font-mono text-sm font-normal text-muted">02 /</span>
            {ui.work.title}
          </h2>
          <span className="font-mono text-xs text-muted">
            ({String(projects.length).padStart(2, '0')})
          </span>
        </div>
      </Reveal>

      <div ref={listRef} onMouseLeave={hideCard}>
        {projects.map((p, i) => (
          <div key={p.id} className="work-row">
            <div
              onClick={() => openProject(p)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(p);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${p.title} · ${ui.work.detailsAria}`}
              onMouseEnter={e => showCard(e, p.id)}
              onMouseMove={moveCard}
              className={`group grid cursor-pointer gap-2 border-b border-line py-6 transition-colors duration-300 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8 ${
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
                  {p.category} · {p.year}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-ink">
                  {p.stack.join(' / ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={cardRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[320px] will-change-transform lg:block"
      >
        {current && (
          <div
            key={current.id}
            className={`glass animate-modal-fade rounded-2xl border border-line p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              cardVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            {current.image && (
              <img
                key={current.id}
                src={current.image}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="animate-modal-fade mb-4 aspect-video w-full border border-line object-cover"
              />
            )}
            <p className="font-mono text-xs text-muted">{current.id}</p>
            <p className="mt-2 font-display text-3xl font-medium tracking-tight">{current.title}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {current.category} · {current.year}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest">Details →</p>
          </div>
        )}
      </div>

      <ProjectModal project={open} onClose={closeProject} />
    </section>
  );
}
