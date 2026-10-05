export function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

export function setDark(next: boolean): void {
  document.documentElement.classList.toggle('dark', next);
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light');
  } catch {
    // storage unavailable — theme still applies for this session
  }
  window.dispatchEvent(new CustomEvent('themechange'));
}
