import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap, reducedMotion } from '../lib/gsap';

// Magnetic hover: child drifts toward the cursor (max ~10px) and springs
// back on leave. Desktop hover only, disabled with reduced-motion.
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.35,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <span
      ref={ref}
      className="inline-block will-change-transform"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
