import { useCallback, useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { profile } from '../data/content';
import { isDark, setDark } from '../lib/theme';

const sections = [
  { id: '#home', no: '01', label: 'Home' },
  { id: '#work', no: '02', label: 'Work' },
  { id: '#about', no: '03', label: 'About' },
  { id: '#contact', no: '04', label: 'Contact' },
];

async function copyEmail(): Promise<void> {
  try {
    await navigator.clipboard.writeText(profile.email);
  } catch {
    window.prompt('Copy email:', profile.email);
  }
}

// ⌘K palette: jump to sections, toggle theme, copy email, open socials.
export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goto = useCallback((id: string) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('app:goto', { detail: id }));
  }, []);

  const toggleTheme = useCallback(() => {
    setDark(!isDark());
    setOpen(false);
  }, []);

  const openLink = useCallback((href: string) => {
    window.open(href, '_blank', 'noreferrer');
    setOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed bottom-5 left-5 z-[60] border border-line bg-base px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
      >
        ⌘K
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 px-4 pt-[18vh]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md border border-line bg-base"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Site commands" loop>
              <Command.Input
                placeholder="Type a command…"
                className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-muted"
              />
              <Command.List className="max-h-[40vh] overflow-y-auto py-2">
                <Command.Empty className="px-4 py-3 font-mono text-xs text-muted">
                  No results.
                </Command.Empty>
                <Command.Group
                  heading="Go to"
                  className="px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  {sections.map((s) => (
                    <Command.Item
                      key={s.id}
                      value={`${s.no} ${s.label}`}
                      onSelect={() => goto(s.id)}
                      className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                    >
                      {s.no} {s.label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group
                  heading="Actions"
                  className="px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  <Command.Item
                    value="toggle theme"
                    onSelect={toggleTheme}
                    className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                  >
                    Toggle theme
                  </Command.Item>
                  <Command.Item
                    value="copy email"
                    onSelect={() => {
                      void copyEmail();
                      setOpen(false);
                    }}
                    className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                  >
                    Copy email
                  </Command.Item>
                  {profile.socials.map((s) => (
                    <Command.Item
                      key={s.label}
                      value={`open ${s.label}`}
                      onSelect={() => openLink(s.href)}
                      className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                    >
                      Open {s.label} ↗
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                ↑↓ navigate · enter select · esc close
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
