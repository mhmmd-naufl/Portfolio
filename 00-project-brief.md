# 00 — Project Brief: Personal Portfolio Minimalis

## Tujuan

Website portfolio 1 halaman, minimalis, unik. Adaptasi dari `gertix.studio/studio/`, bukan clone.
Fokus: whitespace lega, tipografi besar, hitam-putih saja + mode gelap/terang.

## Referensi yang Diadaptasi

Diambil:

- Nav bernomor `01-04` + active state on scroll
- Hero 1 kalimat besar
- List/teks besar sebagai navigasi visual
- Footer compact (kontak + legal + waktu lokal)

Dibuang / tidak ditiru:

- Copy bahasa Jerman, section collective besar
- Marquee rame, gradient, shadow berat, carousel
- Multi-page (kita 1-page + anchor)

## Positioning

Pemilik: IT x Creative x Analytics.
Label: `Creative Technologist` / `IT — Creative — Analytics`.
Hero 1 kalimat, pilih satu nanti:

- `building calm interfaces.`
- `creative technologist working with data.`
- `IT, creative & analytics in one place.`

## Scope MVP

- `01 Hero`, `02 Selected Work (4-6)`, `03 About/Capabilities (3 kolom)`, `04 Contact/Footer`
- Responsive: mobile stacked, desktop hover-preview
- Tanpa backend. Form kontak = `mailto:` + tombol copy-email.
- Bahasa: Indonesia atau Inggris, pilih 1, konsisten.

## Non-Goals

- No blog, no CMS, no animasi berat
- Max 1 animasi per viewport
- Monokrom penuh: tanpa warna aksen. Bedakan state via underline/bold/invert + dark/light mode

## Tech Stack (wajib ikut AGENTS.md)

- Frontend: React (Vite) + Tailwind CSS
- Font: Inter Tight (heading) + Inter (body) + mono kecil (label). Creato Display opsional via `@font-face` bila ada file woff2.
- Animasi: CSS + IntersectionObserver saja. Tanpa framer-motion / gsap untuk MVP.
- Deploy: Vercel / Netlify / GitHub Pages, static.

## Struktur Repo

```
/
├── 00-project-brief.md
├── 01-design-system.md
├── 02-site-structure.md
├── 03-interactions.md
├── 04-content-template.md
├── 05-build-prompts.md
├── src/
│   ├── assets/fonts/   # opsional creato-display.woff2
│   ├── components/     # Nav, Hero, WorkList, About, Contact, Footer, Reveal
│   ├── data/content.ts # semua teks + project di sini
│   └── index.css       # token + base styles
```

## Definisi Selesai

- Lighthouse mobile > 90, tanpa gambar > 300KB
- Semua teks dari `src/data/content.ts`, bukan hardcode di JSX
- `prefers-reduced-motion` dihormati, keyboard navigable
