# Personal Website — Muhammad Naufal Aulia

Portfolio 1 halaman, minimalis, monokrom + dark/light mode. Adaptasi dari `gertix.studio/studio/`.
Stack: React (Vite) + Tailwind CSS. Tanpa backend.

## Jalankan lokal

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # output di dist/
npm run preview # cek hasil build
```

## Deploy

Repo ini static, bisa di mana saja:

- **Vercel:** import repo → framework preset `Vite` → build `npm run build`, output `dist`. Jadi otomatis.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** `npm run build`, serve folder `dist/` (via action atau manual).

Tidak perlu env variable. Font diambil dari Google Fonts saat runtime (tetap tampil dengan fallback Helvetica/Arial bila offline).

## Error handling

- App ini 1 halaman tanpa router, jadi tidak ada 404 in-app.
- **Vercel:** `vercel.json` me-rewrite semua path ke `/index.html`.
- **Netlify:** `public/_redirects` me-rewrite semua path ke `/index.html` (status 200).
- **GitHub Pages / host statis lain:** `public/404.html` tampil untuk URL yang tidak ada (monokrom, ikut dark mode sistem, link balik ke `/`).

## Ubah konten

Satu file saja: `src/data/content.ts` (profil, projects P.01–P.06, capabilities, experiences, sertifikat).
Sumber kebenaran data: `06-input-pengalaman.md`. Status link/cover project: pending (cari di GitHub).

## Font Creato Display (opsional)

Bila punya file `creato-display.woff2`, taruh di `src/assets/fonts/`, lalu uncomment blok `@font-face` di `src/index.css`. Heading otomatis pakai Creato, fallback Inter Tight bila file tidak ada.

## Struktur

```
src/
├── data/content.ts          # semua teks — edit di sini
├── components/              # Nav, Hero, WorkList, About, Contact, Footer, Reveal, ThemeToggle
├── App.tsx
├── main.tsx
└── index.css                # token tema + reveal + reduced-motion
00–06 *.md                   # brief, design system, struktur, interaksi, template, prompt, input data
```
