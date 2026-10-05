import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis smooth scroll: desktop wheel only, off with reduced-motion.
// Anchor links (#home/#work/...) are intercepted and animated via
// lenis.scrollTo with a -88px offset for the fixed nav.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      if (!document.querySelector(hash)) return;
      e.preventDefault();
      lenis.scrollTo(hash, { offset: -88, duration: 1.2 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      root.style.scrollBehavior = prev;
      lenis.destroy();
    };
  }, []);

  return null;
}
