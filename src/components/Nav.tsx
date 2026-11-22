import { useEffect, useRef, useState } from 'react';
import { useContent, useUi } from '../lib/i18n';
import { LangToggle } from './LangToggle';
import { ScrambleText } from './ScrambleText';
import { ThemeToggle } from './ThemeToggle';

const observedIds = ['home', 'work', 'about', 'contact'];

export function Nav() {
  const { profile } = useContent();
  const ui = useUi();
  const links = [
    { href: '#home', id: 'home', no: '01', label: ui.nav.home },
    { href: '#work', id: 'work', no: '02', label: ui.nav.work },
    { href: '#about', id: 'about', no: '03', label: ui.nav.about },
    { href: '#contact', id: 'contact', no: '04', label: ui.nav.contact },
  ];
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, ready: false });

  // Sliding indicator: measure the active link and glide a 2px ink
  // segment so it rests just under the link text.
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const link = container?.querySelector<HTMLElement>(`nav a[href="#${active}"]`);
      if (!container || !link) return;
      const c = container.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      setIndicator({
        left: r.left - c.left,
        top: r.bottom - c.top + 4,
        width: r.width,
        ready: true,
      });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const sections = observedIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base">
        <div
          ref={containerRef}
          className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10"
        >
          <a href="#home" aria-label={profile.name} className="block">
            <img src="/logo.svg" alt="" className="h-7 w-auto dark:invert" />
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label={ui.nav.primary}>
            {links.map(l => (
              <a
                key={l.id}
                href={l.href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === l.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span>{l.no}</span> <ScrambleText text={l.label} />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <LangToggle />
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="font-mono text-xs uppercase tracking-widest text-muted md:hidden"
            onClick={() => setOpen(true)}
            aria-label={ui.nav.openMenu}
          >
            {ui.nav.menu}
          </button>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute hidden h-[2px] bg-ink transition-[left,top,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${
              indicator.ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ left: indicator.left, top: indicator.top, width: indicator.width }}
          />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-base px-6 py-5">
          <div className="flex items-center justify-between">
            <img src="/logo.svg" alt="" className="h-7 w-auto dark:invert" />
            <div className="flex items-center gap-6">
              <LangToggle />
              <ThemeToggle />
              <button
                type="button"
                className="font-mono text-xs uppercase tracking-widest text-muted"
                onClick={() => setOpen(false)}
                aria-label={ui.nav.closeMenu}
              >
                {ui.nav.close}
              </button>
            </div>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-6" aria-label={ui.nav.mobile}>
            {links.map(l => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-medium tracking-tight"
              >
                <span className="mr-4 font-mono text-sm text-muted">{l.no}</span>
                <ScrambleText text={l.label} />
              </a>
            ))}
          </nav>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {profile.location} · {profile.status}
          </p>
        </div>
      )}
    </>
  );
}
