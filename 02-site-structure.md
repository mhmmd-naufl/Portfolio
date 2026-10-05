# 02 — Site Structure (1 Page, 4 Section)

Semua anchor di 1 halaman. Nav bernomor seperti Gertix.

## Nav (fixed top, blur tipis)
- Kiri: logo/inisial `R—A` atau nama pendek
- Kanan: `01 Home`, `02 Work`, `03 About`, `04 Contact` (mono, 12px). Active = `underline + font-medium`.
- Mobile: logo + hamburger → fullscreen overlay, link besar display font.
- Border-bottom `1px line` hanya setelah scroll > 8px.

## 01 Hero (`#home`, experimental)
- Full `100svh`, konten nempel bawah (`justify-end`) — udara raksasa di atas.
- Ghost numeral `01` raksasa di background + label vertikal kiri (desktop).
- Headline 2 baris staggered (baris 2 indent `16vw`), `clamp(3.5rem, 12vw, 11rem)`.
- Meta bar bawah: role + status + `Scroll ↓`, divider dashed.

## 02 Selected Work (`#work`)
- Header: `02 / Selected Work` + count `(06)` + link `Archive ↗` (opsional).
- Pola: list rows, tiap row border-top `1px line`:
  `[P.01] [Judul Besar] [Category — Year] [↗]`
- Meta mono kanan: `React / 2024`. Hover: judul geser `8px` + thumbnail melayang (desktop saja, lihat `03-interactions.md`).
- Mobile: judul + meta + thumbnail stacked 16:10 di bawah teks.
- Klik → modal sederhana atau halaman `/work/:slug` (MVP: modal saja).

## 03 About / Capabilities (`#about`)
- Header: `03 / About`.
- Kolom 1: foto portrait 4/5 grayscale + nama + `Creative Technologist`.
- Kolom 2: bio 2-3 kalimat + 3 capabilities:
  - `IT — Web dev, automation, n8n`
  - `Creative — UI, typography, prototyping`
  - `Analytics — dashboards, tracking, experiments`
- Kolom 3 (atau bawah): stack list mono + `Currently` status.

## 04 Contact Room / Footer (`#contact`, adaptasi Gertix)
- Footer = ruangan penutup setinggi `min-h-100svh`, selalu dark (`#131210` + `#EDE9E1`) di kedua mode — seperti footer gelap Gertix.
- Pola garis abstrak (lingkaran konsentris, garis silang, label mono `BWI—6.9S`, `P.01—P.06`) tersingkap mengikuti cursor via radial mask + glow lembut. Touch: pola statis samar. Bukan animasi loop.
- Kiri: label `04 / Contact`, headline raksasa `Let's work together`, email + tombol `Copy email`, status dot.
- Kanan (rata kanan, align bawah): inisial, alamat + telp mono uppercase, divider dashed, sosial.
- Bottom bar garis dashed atas-bawah: sitemap 01-04 (underline animasi scaleX), `© 2026`, live clock WIB, `Back to top ↑`.

## Mobile Rules
- Hero font `clamp` otomatis mengecil, nav jadi overlay.
- Hover-preview dimatikan di `<1024px`, pakai stacked image.
- Section padding `96-120px`, bukan 160px.
