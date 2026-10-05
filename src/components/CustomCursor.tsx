import { useEffect, useRef } from 'react';

// Minimalist custom cursor: a small solid purple square.
// Position is set synchronously inside the mousemove event (no rAF loop),
// so React re-renders elsewhere can never make it lag or jump.
// Tweak it yourself in src/index.css (.cursor-box).
// Active on hover-capable devices only, off with reduced-motion.
// Native cursor is hidden via .has-cursor (see index.css).

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor');

    let hot = false;

    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const next = !!t?.closest('a,button');
      if (next !== hot) {
        hot = next;
        document.documentElement.classList.toggle('cursor-hot', next);
      }
    };
    const leave = () => {
      if (dot.current) {
        dot.current.style.transform = 'translate(-100px, -100px)';
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor', 'cursor-hot');
    };
  }, []);

  return <div ref={dot} aria-hidden="true" className="cursor-box" />;
}
