import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis smooth scroll: desktop wheel only, off with reduced-motion.
// Anchor links (#home/#work/...) and palette jumps ('app:goto') are
// animated via lenis.scrollTo with a -88px offset for the fixed nav.
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
    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (typeof id === 'string' && document.querySelector(id)) {
        lenis.scrollTo(id, { offset: -88, duration: 1.2 });
      }
    };
    document.addEventListener('click', onClick);
    window.addEventListener('app:goto', onGoto);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      window.removeEventListener('app:goto', onGoto);
      root.style.scrollBehavior = prev;
      lenis.destroy();
    };
  }, []);

  return null;
}
