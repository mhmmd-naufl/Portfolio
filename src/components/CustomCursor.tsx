import { useEffect, useRef } from 'react';

// Minimalist custom cursor: a small solid purple square.
// - Position is set synchronously inside mousemove (no rAF, no lag).
// - Constant size: no grow/shrink on hover, so nothing visually "jumps".
// - Composited on its own layer (will-change) to avoid paint jank.
// Tweak it yourself in src/index.css (.cursor-box).
// Active on hover-capable devices only, off with reduced-motion.
// Native cursor is hidden via .has-cursor (see index.css).

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor');

    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const leave = () => {
      if (dot.current) {
        dot.current.style.transform = 'translate(-100px, -100px)';
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={dot} aria-hidden="true" className="cursor-box" />;
}
