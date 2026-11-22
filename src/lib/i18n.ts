import { createContext, useContext } from 'react';
import * as en from '../data/content';
import * as id from '../data/content.id';

export type Lang = 'en' | 'id';
export type Content = typeof en;

export const content: Record<Lang, Content> = { en, id };

// Chrome strings (nav, buttons, headings, footer) are always English.
// Only Selected Work + About content is localized via content.id.ts.
export const ui = {
  skipToContent: 'Skip to content',
  nav: {
    home: 'Home',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primary: 'Primary',
    mobile: 'Mobile',
  },
  hero: {
    folio: 'Folio 2026',
    viewWork: 'View work ↓',
    scroll: 'Scroll ↓',
  },
  work: {
    title: 'Selected Work',
    detailsAria: 'details',
  },
  about: {
    title: 'About',
    portraitAlt: 'Portrait of Muhammad Naufal Aulia',
    downloadResume: 'Download resume ↓',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
  },
  footer: {
    heading1: "Let's work",
    heading2: 'together',
    copyEmail: 'Copy email',
    copied: 'Copied ✓',
    copyPrompt: 'Copy email:',
    resume: 'Resume ↓',
    sitemap: 'Sitemap',
    backToTop: 'Back to top ↑',
    language: 'Language',
  },
  command: {
    open: 'Open command menu',
    label: 'Site commands',
    placeholder: 'Type a command…',
    empty: 'No results.',
    goTo: 'Go to',
    actions: 'Actions',
    toggleTheme: 'Toggle theme',
    copyEmail: 'Copy email',
    openLink: 'Open',
    hint: '↑↓ navigate · enter select · esc close',
  },
  modal: {
    close: 'Close ✕',
    closeAria: 'Close',
    stack: 'Stack',
    liveDemo: 'Live demo ↗',
  },
  theme: {
    dark: 'Dark ●',
    light: 'Light ○',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  resume: {
    summary: 'Summary',
    experience: 'Experience',
    selectedWork: 'Selected Work',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    stack: 'Stack',
  },
};

export type Ui = typeof ui;

export const SITE_TITLE = 'Muhammad Naufal Aulia · Web Development & Digital Content';

export type I18n = {
  lang: Lang;
  setLang: (l: Lang) => void;
  content: Content;
  ui: Ui;
};

export const I18nContext = createContext<I18n | null>(null);

function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LangProvider>');
  return ctx;
}

// Localized site copy (profile, projects, experiences, ...) for the active language.
export function useContent(): Content {
  return useI18n().content;
}

// UI chrome strings (nav labels, buttons, headings) — always English.
export function useUi(): Ui {
  return useI18n().ui;
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const { lang, setLang } = useI18n();
  return { lang, setLang };
}
