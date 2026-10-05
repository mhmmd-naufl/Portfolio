import { useEffect, useState } from 'react';
import { isDark, setDark } from '../lib/theme';

export function ThemeToggle() {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    const sync = () => setDarkState(isDark());
    sync();
    window.addEventListener('themechange', sync);
    return () => window.removeEventListener('themechange', sync);
  }, []);

  const toggle = () => setDark(!dark);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
    >
      {dark ? 'Dark ●' : 'Light ○'}
    </button>
  );
}
