# Naufal N — identitas logo

Monogram **N** untuk **Muhammad Naufal Aulia** (Creative Technologist). Arah: konsep **C** dari
`../concepts.png`, dengan huruf **N** menggantikan **M**.

## Mark

Dua stem vertikal + satu diagonal, dengan ujung terpotong rata (bukan runcing/tumpul) supaya terasa
*dibangun*, bukan diketik. Geometri di `viewBox 0 0 256 256`:

| Bagian | Nilai |
| --- | --- |
| Tinggi cap | 194 (y 31–225) |
| Lebar mark | 192 (x 32–224) |
| Tebal stem | 40 |
| Diagonal | (72,31) → (184,161) → (184,225) → (72,95), ≈ 52,7° |

Mark lulus audit (100/100) dan terbaca jelas sampai 16 px; sudut, tebal, dan spasi konsisten.

## Warna

Tetap **monokrom penuh** sesuai design system — tanpa warna aksen.

| Peran | Hex |
| --- | --- |
| Ink (terang) | `#1A1917` |
| Paper | `#FAF9F7` |
| Reversed (footer/latar gelap) | `#EDE9E1` |
| Tile app icon | `#1A1917` |

## Aset di produksi (`public/`)

| File | Dipakai di |
| --- | --- |
| `logo.svg` | Nav (28 px) — ikut tema terang/gelap via `prefers-color-scheme` |
| `logo-inverse.svg` | Footer (32 px) — footer selalu gelap, jadi selalu versi putih |
| `favicon.svg` | Ikon tab (SVG, ikut tema) |
| `favicon-32.png`, `favicon.ico` | Fallback browser lama |
| `icon-192.png`, `icon-512.png`, `icon-512.svg` | PWA / manifest |
| `apple-touch-icon.png`, `apple-touch-icon-micro.png` | iOS |
| `og-image.png` | Kartu share sosial (1200×630) |

> Sebelumnya `logo.svg` memakai `currentColor` di dalam `<img>`, jadi **selalu hitam** — menghilang di
> footer gelap dan dark mode. Sekarang diperbaiki lewat media query di dalam SVG-nya.

## Aturan pakai

- **Clear space**: minimal 40 unit (≈ 15,6% sisi mark) di keempat sisi — setara tebal satu stem.
- **Ukuran minimum**: simbol 16 px; app icon 32 px.
- **Jangan**: meregang/memutar, menambah warna/aksen, memberi bayangan/gradient/outline, atau mengubah
  ketebalan stem.
- **Lockup**: simbol + nama disusun pakai tipografi situs (`Inter Tight` 500, tracking `-0.04em`), jarak
  horizontal = 40 unit. Wordmark belum dibuat sebagai path — masih teks.

## Regenerasi

```powershell
python scripts/make_icons.py                      # favicon / app icon / OG (Pillow)
python .opencode/skills/logo-design/scripts/export_variants.py final/naufal-n.svg `
  --title "Muhammad Naufal Aulia" --name naufal-n --icon-bg "#1A1917" --web-icons `
  --png 512 --out-dir final/dist
python .opencode/skills/logo-design/scripts/presentation_board.py final/presentation-spec.json `
  -o final/presentation.html --png-dir final/slides
```

## Catatan / belum selesai

- Bisa dikerjakan berikutnya: **lockup + stacked** (simbol + nama), halaman logo resmi, serta versi
  small-size yang disederhanakan bila suatu saat perlu < 16 px.
- Kartu OG memakai font sistem (Arial) sebagai fallback; bisa diganti `Inter Tight` bila di-render
  lewat browser.
- Pembersihan merek dagang (trademark) belum dilakukan — disarankan cek database merek & reverse image
  search sebelum dipakai komersial.
