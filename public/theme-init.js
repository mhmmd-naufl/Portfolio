// Runs synchronously in <head> before first paint to prevent theme flash.
// External file so CSP can stay `script-src 'self'` (no unsafe-inline).
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
