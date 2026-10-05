# 03 — Interactions (5 inti + 1 signature)

Aturan keras: max 1 animasi per viewport, durasi `0.5-0.7s`, easing `ease-out`, hormati `prefers-reduced-motion`.

## 1. Numbered Nav + Active on Scroll

- Link `01-04` mono. Active section via IntersectionObserver → `underline + font-medium` (tanpa ganti warna).
- Smooth scroll: `scroll-behavior: smooth; scroll-margin-top: 88px` per section.
- Tanpa underline animasi aneh. Cukup warna.

## 2. Work List Hover Preview (signature)

- Desktop `≥1024px` + `hover:hover` saja:
  - Row hover → floating `320x400px` image ikut cursor (`transform: translate`), opacity 0→1, `150ms`.
  - Judul `translate-x-2`, arrow muncul.
- Mobile/touch: tidak ada floating. Thumbnail `16/10` selalu tampil di bawah teks.
- Implementasi: 1 komponen `WorkList`, preload image `loading="lazy"`, jangan fetch on hover.
- Aksesibilitas: row adalah `<a>` fokusable, focus tampilkan thumbnail juga.

## 3. Live Footnote (analytics feel)

- Footer mono: `JAKARTA, ID — HH:MM:SS WIB` update per detik via `setInterval`, format `Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Asia/Jakarta'})`.
- Tambahan: `Available for freelance` + dot pulse CSS pakai `currentColor` (monokrom, bukan hijau).
- Murah, 1 re-render kecil, tidak ganggu performa.

## 4. Whitespace Reveal (sekali saja)

- Class `.reveal` → `.is-visible` via 1 hook `useReveal()` (IntersectionObserver, threshold `0.15`, unobserve setelah tampil).
- Gerak: `opacity 0→1 + translateY(16px)`, `0.6s`. Hero headline pakai varian `translateY(24px)` on load.
- Jangan pakai stagger lebih dari `3 item, delay 60ms`.

```tsx
// components/Reveal.tsx
import { useEffect, useRef } from 'react';
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

## 5. Copy Email + Status

- Tombol `Copy email` → `navigator.clipboard.writeText`, feedback `Copied ✓` 1.5s, fallback `prompt` bila clipboard diblokir.
- Status dot: `<span class="w-2 h-2 rounded-full bg-current animate-pulse" />` + teks `Open for projects`.
- Tidak ada toast library. Cukup teks inline.

## Yang Dilarang

- No marquee, no parallax, no preloader, no page transition.
- Cursor: single dot minimalis (`CustomCursor.tsx` + `.cursor-dot`). Lihat komentar di file untuk utak-atik.
- Link nav header/footer: scramble teks saat hover/focus, kembali normal setelahnya (`ScrambleText.tsx`). Nonaktif bila reduced-motion.

## 6. Dot Field (signature, hero background)

- Background hero: grid titik canvas 2D (`gap 28px`), faint agar whitespace tetap lega.
- Titik menjauh dari cursor (radius `150px`, maks `26px`, easing `0.18`), balik elastis. Dekat cursor ungu `#7C3AED` (alpha ikut jarak), sisanya ink redup.
- Implementasi `Playground.tsx` (props `bare` + `faint`): rAF pause saat offscreen, statis bila touch/reduced-motion, warna dari CSS vars.
