import { useEffect, useState } from 'react';
import { isDark, setDark, withViewTransition } from '../lib/theme';
import { useUi } from '../lib/i18n';

export function ThemeToggle() {
  const [dark, setDarkState] = useState(false);
  const ui = useUi();

  useEffect(() => {
    const sync = () => setDarkState(isDark());
    sync();
    window.addEventListener('themechange', sync);
    return () => window.removeEventListener('themechange', sync);
  }, []);

  const toggle = () => withViewTransition(() => setDark(!dark));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? ui.theme.toLight : ui.theme.toDark}
      className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
    >
      {dark ? ui.theme.dark : ui.theme.light}
    </button>
  );
}
