import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content';
import { ScrambleText } from './ScrambleText';
import { Reveal } from './Reveal';

const sitemap = [
  { href: '#home', no: '01', label: 'Home' },
  { href: '#work', no: '02', label: 'Work' },
  { href: '#about', no: '03', label: 'About' },
  { href: '#contact', no: '04', label: 'Contact' },
];

function useWibClock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function Footer() {
  const time = useWibClock();
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      window.prompt('Copy email:', profile.email);
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer
      id="contact"
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[#131210] text-[#EDE9E1]"
    >
      {/* Abstract line pattern — revealed around cursor (Gertix adapt, monochrome) */}
      <svg
        aria-hidden="true"
        className="footer-pattern pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
      >
        <g opacity="0.16">
          <circle cx="1050" cy="120" r="90" />
          <circle cx="1050" cy="120" r="160" />
          <circle cx="1050" cy="120" r="240" />
          <circle cx="1050" cy="120" r="330" />
          <circle cx="120" cy="700" r="70" />
          <circle cx="120" cy="700" r="140" />
          <circle cx="120" cy="700" r="220" />
          <line x1="0" y1="620" x2="1200" y2="620" />
          <line x1="0" y1="180" x2="1200" y2="180" />
          <line x1="820" y1="0" x2="820" y2="800" />
          <line x1="0" y1="0" x2="1200" y2="800" />
          <rect x="880" y="480" width="220" height="140" />
          <text x="852" y="52" fill="currentColor" stroke="none" fontSize="11" fontFamily="monospace">
            BWI—6.9S
          </text>
          <text x="990" y="640" fill="currentColor" stroke="none" fontSize="11" fontFamily="monospace">
            [C] 2026
          </text>
        </g>
      </svg>
      {/* Soft glow following cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[32rem] w-[32rem] rounded-full bg-white/[0.05] blur-3xl"
        style={{
          left: 'var(--mx, 50%)',
          top: 'var(--my, 38%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col px-6 py-16 md:px-10">
        <div className="grid flex-1 gap-12 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col justify-center md:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                04 / Contact
              </p>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.03em]">
                Let&apos;s work
                <br />
                together
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="u-line font-display text-xl font-medium tracking-tight md:text-2xl"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="border border-white/25 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                >
                  {copied ? 'Copied ✓' : 'Copy email'}
                </button>
              </div>
              <p className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
                <span
                  className="inline-block h-2 w-2 animate-pulse rounded-full bg-current"
                  aria-hidden="true"
                />
                {profile.status}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:self-end md:text-right">
            <Reveal>
              <p className="font-display text-2xl font-medium tracking-tight">{profile.initials}</p>
              <address className="mt-3 font-mono text-xs uppercase not-italic leading-relaxed tracking-widest text-white/60">
                {profile.name}
                <br />
                {profile.location} — {profile.phone}
              </address>
              <hr className="my-5 border-t border-dashed border-white/25" />
              <ul className="space-y-2">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="u-line font-mono text-xs uppercase tracking-widest text-white/70"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-y border-dashed border-white/25 px-2 py-4">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Sitemap">
              {sitemap.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="u-line font-mono text-xs uppercase tracking-widest"
                >
                  <span>{l.no}</span> <ScrambleText text={l.label} />
                </a>
              ))}
            </nav>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">
              © 2026 {profile.name}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">
              {profile.location} — {time} WIB
            </p>
            <a href="#home" className="u-line font-mono text-[11px] uppercase tracking-widest">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
