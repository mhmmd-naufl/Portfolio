import { useCallback, useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useContent, useUi } from '../lib/i18n';
import { isDark, setDark, withViewTransition } from '../lib/theme';

async function copyEmail(email: string, promptLabel: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    window.prompt(promptLabel, email);
  }
}

// ⌘K palette: jump to sections, toggle theme, copy email, open socials.
export function CommandMenu() {
  const { profile } = useContent();
  const ui = useUi();
  const [open, setOpen] = useState(false);
  const sections = [
    { id: '#home', no: '01', label: ui.nav.home },
    { id: '#work', no: '02', label: ui.nav.work },
    { id: '#about', no: '03', label: ui.nav.about },
    { id: '#contact', no: '04', label: ui.nav.contact },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(v => !v);
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
    withViewTransition(() => setDark(!isDark()));
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
        aria-label={ui.command.open}
        className="glass fixed bottom-5 left-5 z-[60] hidden rounded-md border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink [@media(hover:hover)]:block"
      >
        ⌘K
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/[0.08] px-4 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass w-full max-w-md rounded-2xl border border-line"
            onClick={e => e.stopPropagation()}
          >
            <Command label={ui.command.label} loop>
              <Command.Input
                placeholder={ui.command.placeholder}
                className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-muted"
              />
              <Command.List className="max-h-[40vh] overflow-y-auto py-2">
                <Command.Empty className="px-4 py-3 font-mono text-xs text-muted">
                  {ui.command.empty}
                </Command.Empty>
                <Command.Group
                  heading={ui.command.goTo}
                  className="px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  {sections.map(s => (
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
                  heading={ui.command.actions}
                  className="px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  <Command.Item
                    value={`toggle theme ${ui.command.toggleTheme}`}
                    onSelect={toggleTheme}
                    className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                  >
                    {ui.command.toggleTheme}
                  </Command.Item>
                  <Command.Item
                    value={`copy email ${ui.command.copyEmail}`}
                    onSelect={() => {
                      void copyEmail(profile.email, ui.footer.copyPrompt);
                      setOpen(false);
                    }}
                    className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                  >
                    {ui.command.copyEmail}
                  </Command.Item>
                  {profile.socials.map(s => (
                    <Command.Item
                      key={s.label}
                      value={`open ${s.label} ${ui.command.openLink}`}
                      onSelect={() => openLink(s.href)}
                      className="cursor-pointer px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted data-[selected=true]:bg-ink data-[selected=true]:text-base"
                    >
                      {ui.command.openLink} {s.label} ↗
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                {ui.command.hint}
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
