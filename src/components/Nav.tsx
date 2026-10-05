import { useEffect, useState } from 'react';
import { profile } from '../data/content';
import { ScrambleText } from './ScrambleText';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#home', id: 'home', no: '01', label: 'Home' },
  { href: '#work', id: 'work', no: '02', label: 'Work' },
  { href: '#about', id: 'about', no: '03', label: 'About' },
  { href: '#contact', id: 'contact', no: '04', label: 'Contact' },
];

const observedIds = ['home', 'work', 'about', 'contact'];

export function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open ]);

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-base transition-colors ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
          <a href="#home" aria-label={profile.name} className="block">
            <img src="/logo.svg" alt="" className="h-7 w-auto" />
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === l.id
                    ? 'text-ink underline underline-offset-4'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <span>{l.no}</span> <ScrambleText text={l.label} />
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="font-mono text-xs uppercase tracking-widest text-muted md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-base px-6 py-5">
          <div className="flex items-center justify-between">
            <img src="/logo.svg" alt="" className="h-7 w-auto" />
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <button
                type="button"
                className="font-mono text-xs uppercase tracking-widest text-muted"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-6" aria-label="Mobile">
            {links.map((l) => (
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
            {profile.location} — {profile.status}
          </p>
        </div>
      )}
    </>
  );
}
