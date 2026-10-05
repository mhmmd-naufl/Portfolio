import { useEffect, useRef } from 'react';

// Subtle custom cursor: small dot + trailing ring.
// Tweak it yourself in src/index.css (.cursor-dot / .cursor-ring):
// size, color, ring grow on links (.cursor-hot).
// Active on hover-capable devices only, off with reduced-motion.
// Native cursor is hidden via .has-cursor (see index.css).

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor');

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
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
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
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

  return (
    <>
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
      <div ref={ring} aria-hidden="true" className="cursor-ring" />
    </>
  );
}
