# 04 — Content Template (Tinggal Isi)

Semua teks wajib dari `src/data/content.ts`. Jangan hardcode di JSX.

## Profil
```ts
export const profile = {
  name: 'Muhammad Naufal Aulia',
  initials: 'MNA',
  role: 'Creative Technologist',
  location: 'BWI, ID',
  email: 'novalqwerty15@gmail.com',
  tagline: 'keep minimalism.',
  bio: 'Lulusan D4 TRPL (IPK 3.63). Spesialis konten kreatif, visual branding, dan media sosial. 50+ aset visual & video untuk UMKM, brand lokal, dan pariwisata. [FINAL-KAN di 06-input-pengalaman.md]',
  status: 'Open for freelance',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mhmmd-naufl' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/mhmmd-naufl' },
    { label: 'Instagram', href: 'https://instagram.com/mhmmd.naufl' },
  ],
};
```

## Project (isi 4-6, jangan lebih)
```ts
export type Project = {
  id: string; title: string; category: string;
  year: string; stack: string[]; summary: string;
  image: string; link?: string;
};
export const projects: Project[] = [
  // Mapping usulan dari 3 PDF — final-kan di 06-input-pengalaman.md, pilih 4-5
  {
    id: 'P.01', title: 'Social Search App',
    category: 'Web — Analytics', year: '2025',
    stack: ['FastAPI', 'Python', 'Selenium'],
    summary: 'Backend FastAPI + scraping Selenium, dashboard web lokal analisis konten medsos (magang Kominfo).',
    image: '/images/work-social-search.jpg', link: '[PENDING GitHub]',
  },
  {
    id: 'P.02', title: 'Live Race Graphics',
    category: 'Broadcast — Data', year: '2025',
    stack: ['OBS', 'Live Graphics'],
    summary: 'Grafik data + rute live Tour de Banyuwangi Ijen 2025.',
    image: '/images/work-live-graphics.jpg', link: '[CEK]',
  },
  {
    id: 'P.03', title: 'Howheal Fun Run',
    category: 'Campaign — Social', year: '2025',
    stack: ['Figma', 'CapCut'],
    summary: 'Kampanye fun run 100+ peserta dari konsep hingga konten.',
    image: '/images/work-funrun.jpg', link: '[CEK]',
  },
  {
    id: 'P.04', title: 'Tourism Recaps',
    category: 'Video — Tourism', year: '2024',
    stack: ['CapCut'],
    summary: '30+ cinematic recap pariwisata Banyuwangi.',
    image: '/images/work-tourism.jpg', link: '[CEK]',
  },
  {
    id: 'P.05', title: 'UMKM Brand Kit',
    category: 'Branding', year: '2024',
    stack: ['Figma', 'Illustrator'],
    summary: 'Logo + flyer + instastory untuk klien lokal.',
    image: '/images/work-branding.jpg', link: '[PENDING]',
  },
  {
    id: 'P.06', title: 'BIB Reader',
    category: 'CV — YOLOv8', year: '2025',
    stack: ['YOLOv8', 'Python'],
    summary: '[CEK 1 kalimat fungsi] (Alzen, internal — cek izin publish).',
    image: '/images/work-bib-reader.jpg', link: '[PENDING]',
  },
];
```
- Judul max 3 kata. Summary max 140 karakter. Image max 300KB, `1600px` terpanjang.

## Capabilities (3 saja, selaras CV — final-kan di 06)
- `01 IT — Backend FastAPI + scraping Selenium (Social Search), YOLOv8 (BIB reader), dokumentasi teknis`
- `02 Creative — Desain minimalis, visual branding, video pendek, live broadcast multi-camera`
- `03 Analytics — Analisis konten (Social Search), timing/scoring event, strategi konten + Data Science cert`

## Checklist Foto
- Portrait `1200x1500px`, netral, grayscale via CSS
- Tiap project 1 cover `1600x1000px`, tanpa mockup berlebihan
