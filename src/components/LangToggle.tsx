import { useLang, useUi } from '../lib/i18n';

// EN/ID language switch — sits next to ThemeToggle in the nav.
export function LangToggle() {
  const { lang, setLang } = useLang();
  const ui = useUi();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
      aria-label={`${ui.footer.language}: EN / ID`}
      className="font-mono text-xs uppercase tracking-widest"
    >
      <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
      <span className="text-muted"> / </span>
      <span className={lang === 'id' ? 'text-ink' : 'text-muted'}>ID</span>
    </button>
  );
}
