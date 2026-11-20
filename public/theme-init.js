// Runs synchronously in <head> before first paint to prevent theme flash.
// External file so CSP can stay `script-src 'self'` (no unsafe-inline).
(function () {
  try {
    var t = localStorage.getItem('theme');
    // Default dark — only explicit 'light' choice opts out.
    if (t !== 'light') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
