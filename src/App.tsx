import { lazy, Suspense, useEffect, useState } from 'react';
import { About } from './components/About';
import { CommandMenu } from './components/CommandMenu';
import { CustomCursor } from './components/CustomCursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { ResumeDoc } from './components/ResumeDoc';
import { SmoothScroll } from './components/SmoothScroll';
import { WorkList } from './components/WorkList';

const AdminPanel = lazy(() => import('./components/AdminPanel'));

// Local content editor at #admin — dev builds only, never production.
function useAdmin(): boolean {
  const [admin, setAdmin] = useState(
    () => import.meta.env.DEV && window.location.hash === '#admin',
  );
  useEffect(() => {
    const onHash = () => setAdmin(import.meta.env.DEV && window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return admin;
}

export default function App() {
  const admin = useAdmin();

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
    <div className="min-h-screen bg-base font-sans text-ink">
      <SmoothScroll />
      <CustomCursor />
      <CommandMenu />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <ErrorBoundary>
        <main id="main" className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Hero />
          <WorkList />
          <About />
        </main>
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <ResumeDoc />
    </div>
  );
}
