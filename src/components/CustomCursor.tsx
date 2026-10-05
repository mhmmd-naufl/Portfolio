import { useEffect, useRef } from 'react';

// Minimalist custom cursor: a single dot that follows the mouse.
// Tweak it yourself in src/index.css (.cursor-dot).
// Active on hover-capable devices only, off with reduced-motion.
// Native cursor is hidden via .has-cursor (see index.css).

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor');

    let x = -100;
    let y = -100;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      document.documentElement.classList.toggle('cursor-hot', !!t?.closest('a,button'));
    };
    const loop = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor', 'cursor-hot');
    };
  }, []);

  return <div ref={dot} aria-hidden="true" className="cursor-dot" />;
}
