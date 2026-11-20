import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

// Lenis smooth scroll: desktop wheel only, off with reduced-motion.
// Anchor links (#home/#work/...) and palette jumps ('app:goto') are
// animated via lenis.scrollTo with a -88px offset for the fixed nav.
// GSAP ticker drives lenis.raf so ScrollTrigger scrub stays in sync.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

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
      gsap.ticker.remove(tick);
      document.removeEventListener('click', onClick);
      window.removeEventListener('app:goto', onGoto);
      root.style.scrollBehavior = prev;
      lenis.destroy();
    };
  }, []);

  return null;
}
