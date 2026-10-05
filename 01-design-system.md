# 01 — Design System

Prinsip: ketenangan > keramaian. Bedakan lewat kerapian tipografi + data, bukan dekorasi.

## Warna: hitam-putih saja + dark/light mode
- Light (default): bg `#F7F5F0` (warm paper, nyaman di mata), ink `#1A1917` (soft black), muted `#6F6C66`, line `#E5E1D8`
- Dark: bg `#131210` (soft black, bukan pure), ink `#EDE9E1` (warm white), muted `#A3A099`, line `#2A2825`
- Aturan: tanpa warna aksen. Status aktif = `underline` / `font-semibold` / invert, bukan warna. Dot status pakai `currentColor` (ikut ink), bukan hijau.
- Jangan pakai pure `#FFFFFF` / `#000000` untuk area besar (silau). Pure hanya untuk teks kecil bila perlu.

Tailwind token (`darkMode: 'class'`):
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: { extend: { colors: {
    base: { DEFAULT: '#F7F5F0', dark: '#131210' },
    ink: { DEFAULT: '#1A1917', dark: '#EDE9E1' },
  } } }
}
// Praktis: pakai CSS variables + class .dark di <html>, atau token ganda light/dark di atas.
// Toggle: tombol mono `Light / Dark`, simpan di localStorage, default ikut prefers-color-scheme.
```

## Tipografi
- Heading: `Inter Tight`, tracking `-0.04em`, `font-weight 500-600`, line-height `0.95-1.05`
- Body: `Inter`, `16-18px`, line-height `1.6`
- Label/meta: mono `IBM Plex Mono / JetBrains Mono`, `11-12px`, uppercase, tracking `0.08em`
- Skala desktop: Hero `clamp(48px, 8vw, 128px)`, Section title `clamp(32px, 4vw, 56px)`, List item `clamp(24px, 3vw, 40px)`
- Plan B font: bila `Creato Display` ada, pakai sebagai display only via `@font-face`, fallback `Inter Tight`:
```css
@font-face {
  font-family: 'Creato Display';
  src: url('/src/assets/fonts/creato-display.woff2') format('woff2');
  font-weight: 500 700; font-display: swap;
}
.font-display { font-family: 'Creato Display', 'Inter Tight', Helvetica, Arial, sans-serif; }
```

## Spacing / Layout
- Max width `1200px`, padding x `24px` mobile / `40px` desktop
- Section padding Y: `120px` mobile / `160-200px` desktop
- Grid: 12 kolom desktop, 4 kolom mobile. Gap `24px`
- 1 ide per viewport. Jangan menumpuk 2 headline besar berdekatan.

## Elemen
- Border: `1px solid` line token saja (light `#E5E1D8` / dark `#2A2825`). No shadow, no gradient, no rounded besar (`rounded-none` / `rounded-sm`)
- Image: aspect `4/5` portrait atau `16/10` landscape, `grayscale` default → warna on hover, `object-cover`
- Link: underline offset `4px` on hover. State aktif = `underline + font-medium`, bukan warna beda
- Nomor: selalu mono, misal `01`, `P.01`, `[C]` untuk footer
- Theme toggle: tombol teks mono `Light / Dark` di nav, icon sun/moon garis tipis saja

## Contoh Base CSS
```css
@tailwind base; @tailwind components; @tailwind utilities;
body { @apply bg-[#F7F5F0] text-[#1A1917] antialiased; }
.dark body, .dark { background: #131210; color: #EDE9E1; }
::selection { background: #1A1917; color: #F7F5F0; }
.dark ::selection { background: #EDE9E1; color: #131210; }
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
```
