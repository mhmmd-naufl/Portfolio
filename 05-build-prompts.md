# 05 — Build Prompts (Paste Berurutan)

Pakai berurutan. Setiap prompt berdiri sendiri. Ganti aksen bila perlu.

## P1 — Init
```
Buatkan Vite React TS + Tailwind di folder ini. Ikuti 00-project-brief.md dan 01-design-system.md.
Buat tailwind.config.js darkMode 'class' dengan token monokrom (light bg #FAF9F7 ink #1A1917 / dark bg #131210 ink #EDE9E1), font Inter Tight + Inter + mono. Tanpa warna aksen.
Buat src/index.css, src/data/content.ts dari 04-content-template.md, komponen Reveal + ThemeToggle (localStorage + prefers-color-scheme).
Buat src/index.css, src/data/content.ts dari 04-content-template.md, komponen Reveal.
Jangan install framer-motion/gsap.
```

## P2 — Nav + Hero (experimental)
```
Buatkan Nav + Hero sesuai 02-site-structure.md dan 03-interactions.md No.1+4.
Nav fixed, link 01-04 smooth scroll + active underline via IntersectionObserver, mobile overlay, scramble hover.
Hero 100svh bottom-anchored, ghost numeral 01, label vertikal, headline staggered 2 baris.
Hormati prefers-reduced-motion.
```

## P3 — Work List
```
Buatkan WorkList sesuai 02 + 03 No.2. Row P.01 dst border-top, meta mono, hover geser 8px.
Desktop >=1024px floating preview 320x400 ikut cursor. Mobile stacked image 16:10.
Data dari src/data/content.ts. Row adalah <a> fokusable.
```

## P4 — About
```
Buatkan About 3 kolom sesuai 02: foto 4/5 grayscale, bio, 3 capabilities IT/Creative/Analytics + stack mono.
Bungkus tiap blok dengan Reveal. Section padding 160px desktop / 120px mobile.
```

## P5 — Contact + Footer
```
Buatkan footer room + hapus Contact section terpisah sesuai 02 (footer = #contact setinggi min-100svh, selalu dark).
Pola SVG abstrak + radial mask ikut cursor (vars --mx/--my via ref, tanpa re-render), glow lembut, fallback statis di touch.
Kiri: headline + email + copy-email + status. Kanan: alamat/telp + divider dashed + sosial. Bar bawah dashed: sitemap + clock WIB + back to top.
Hapus src/components/Contact.tsx dan penggunaannya di App.
```

## P6 — Polish
```
Audit: hapus shadow/gradient, cek kontras, image <300KB lazy, Lighthouse mobile >90,
keyboard focus visible, reduced-motion off-kan semua animasi, ejaan konsisten.
```

## P7 — Deploy
```
Buatkan README deploy ke Vercel/Netlify (static, build: npm run build, dist/).
Tambahkan .gitignore Vite standar. Pastikan font fallback jalan tanpa file creato.
```
