import { useEffect, useRef } from 'react';
import { ScrollTrigger, reducedMotion } from '../lib/gsap';

// Hairline scroll progress pinned to the very top of the viewport.
// Driven by ScrollTrigger so it stays in sync with Lenis.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion() || !bar.current) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        if (bar.current) {
          bar.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left scale-x-0 bg-ink"
    />
  );
}
