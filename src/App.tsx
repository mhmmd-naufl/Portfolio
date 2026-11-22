import { lazy, Suspense, useEffect, useState } from 'react';
import { gsap, reducedMotion } from './lib/gsap';
import { useUi } from './lib/i18n';
import { About } from './components/About';
import { CommandMenu } from './components/CommandMenu';
import { CustomCursor } from './components/CustomCursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { ResumeDoc } from './components/ResumeDoc';
import { SmoothScroll } from './components/SmoothScroll';
import { ToolsMarquee } from './components/ToolsMarquee';
import { WorkList } from './components/WorkList';

const AdminPanel = lazy(() => import('./components/AdminPanel'));

// Local content editor at #admin — dev builds only, never production.
function useAdmin(): boolean {
  const [admin, setAdmin] = useState(
    () => import.meta.env.DEV && window.location.hash === '#admin'
  );
  useEffect(() => {
    const onHash = () => setAdmin(import.meta.env.DEV && window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return admin;
}

// Subtle scroll-scrub parallax on `.scrub-y` elements: they drift ±28px
// across their section's transit, adding depth without distracting motion.
function useScrubParallax() {
  useEffect(() => {
    if (reducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>('.scrub-y');
    if (!els.length) return;
    const ctx = gsap.context(() => {
      els.forEach(el => {
        const trigger = el.closest('section, footer') ?? el;
        gsap.fromTo(
          el,
          { y: 28 },
          {
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}

export default function App() {
  const admin = useAdmin();
  const ui = useUi();
  useScrubParallax();

  if (admin) {
    return (
      <div className="min-h-screen bg-base font-sans text-ink">
        <Suspense
          fallback={
            <p className="p-10 font-mono text-xs uppercase tracking-widest">Loading editor…</p>
          }
        >
          <AdminPanel />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-ink">
      <div className="site-atmosphere" aria-hidden="true" />
      <SmoothScroll />
      <CustomCursor />
      <CommandMenu />
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <Nav />
      <ErrorBoundary>
        <main id="main" className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Hero />
          <WorkList />
          <About />
        </main>
      </ErrorBoundary>
      <ToolsMarquee />
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <ResumeDoc />
    </div>
  );
}
