import { useEffect, useState } from 'react';
import type { Project } from '../data/content';

// Case-study modal: gallery + narrative + links. Esc / backdrop / Close
// dismiss; body scroll locked while open.
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => setIdx(0), [project]);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 400);
  };

  useEffect(() => {
    if (!project) return;
    setClosing(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) return null;

  const images = project.gallery ?? [];
  const current = images[idx];

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-ink/[0.08] px-4 py-8 backdrop-blur-sm transition-opacity duration-300 ${
        closing ? 'opacity-0' : 'animate-modal-fade opacity-100'
      }`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className={`no-scrollbar max-h-full w-full max-w-3xl overflow-y-auto border border-line bg-base ${
          closing ? 'animate-modal-exit' : 'animate-modal-pop'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-8">
          <p className="font-mono text-xs text-muted">
            {project.id} — {project.category} · {project.year}
          </p>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
          >
            Close ✕
          </button>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-8">
          <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{project.summary}</p>

          {project.story && (
            <div className="mt-6 space-y-4 border-t border-dashed border-line pt-6">
              {project.story.split('\n\n').map((para, i) => (
                <p key={i} className="max-w-2xl text-[15px] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}

          {images.length > 0 && (
            <div className="mt-8">
              {current && (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="animate-img-wipe w-full border border-line object-cover"
                />
              )}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {images.map((im, i) => (
                    <button
                      key={im.src}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={im.alt}
                      aria-pressed={i === idx}
                      className={`shrink-0 border transition-opacity ${
                        i === idx
                          ? 'border-ink opacity-100'
                          : 'border-line opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={im.src} alt="" className="h-14 w-24 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed border-line pt-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Stack — {project.stack.join(' / ')}
            </p>
            <span className="flex-1" />
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-base"
              >
                Live demo ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-base"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
