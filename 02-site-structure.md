# 02 — Site Structure (1 Page, 4 Section)

Semua anchor di 1 halaman. Nav bernomor seperti Gertix.

## Nav (fixed top, blur tipis)
- Kiri: logo/inisial `R—A` atau nama pendek
- Kanan: `01 Home`, `02 Work`, `03 About`, `04 Contact` (mono, 12px). Active = `underline + font-medium`.
- Mobile: logo + hamburger → fullscreen overlay, link besar display font.
- Border-bottom `1px line` hanya setelah scroll > 8px.

## 01 Hero (`#home`, experimental)
- Full `100svh`, konten nempel bawah (`justify-end`) — udara raksasa di atas.
- Ghost numeral `01` samar di background + label vertikal kiri (desktop).
- Headline 2 baris staggered (baris 2 indent `8vw`), `clamp(2.75rem, 9vw, 8rem)`.
- Meta bar bawah: role + status + `Scroll ↓`, divider dashed.

## 02 Selected Work (`#work`, experimental)
- Ghost numeral `02` samar kanan atas + rows selang-seling indent `6vw` (ganjil).
- Header: `02 / Selected Work` + count `(06)`.
- Pola: list rows, tiap row border-top `1px line`:
  `[P.01] [Judul Besar] [Category — Year] [↗]`
- Meta mono kanan. Hover: judul geser + kartu preview melayang (desktop saja, lihat `03-interactions.md`).
- Mobile: judul + meta stacked (tanpa indent, tanpa preview).
- Klik → link bila ada, teks statis bila belum (link/cover pending GitHub).

## 03 About / Capabilities (`#about`, experimental)
- Ghost numeral `03` samar kiri bawah.
- Kolom 1: foto portrait 4/5 (offset turun `mt-16` desktop, off-grid) + nama + role.
- Kolom 2: bio + 3 capabilities selang-seling indent `6vw`:
  - `IT — Backend FastAPI + Selenium, YOLOv8`
  - `Creative — Desain minimalis, branding, video, broadcast`
  - `Analytics — Analisis konten, timing/scoring, strategi konten`
- Bawah: experience list mono + education + certifications.

## 04 Contact Room / Footer (`#contact`, adaptasi Gertix)
- Footer = ruangan penutup setinggi `min-h-100svh`, selalu dark (`#131210` + `#EDE9E1`) di kedua mode — seperti footer gelap Gertix.
- Pola garis abstrak (lingkaran konsentris, garis silang, label mono `BWI—6.9S`, `[C] 2026`) tersingkap mengikuti cursor via radial mask + glow lembut. Touch: pola statis samar. Bukan animasi loop.
- Kiri: label `04 / Contact`, headline staggered (`together` indent `8vw`), email + tombol `Copy email`, status dot.
- Kanan (rata kanan, align bawah): inisial, alamat + telp mono uppercase, divider dashed, sosial.
- Bottom bar garis dashed atas-bawah: sitemap 01-04 (underline animasi scaleX), `© 2026`, live clock WIB, `Back to top ↑`.

## Mobile Rules
- Hero font `clamp` otomatis mengecil, nav jadi overlay.
- Hover-preview dimatikan di `<1024px`, pakai stacked image.
- Section padding `96-120px`, bukan 160px.
