import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { I18nContext, SITE_TITLE, content, ui } from './i18n';
import type { Lang } from './i18n';

function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // storage unavailable — fall through to browser detection
  }
  return window.navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem('lang', l);
    } catch {
      // storage unavailable — language still applies for this session
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = SITE_TITLE;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, content: content[lang], ui }}>
      {children}
    </I18nContext.Provider>
  );
}
