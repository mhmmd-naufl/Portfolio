# AGENTS.md — aturan kerja di repo ini

## Identitas commit & push

- Semua commit harus ditulis atas nama pemilik proyek: `mhmmd-naufl <novalqwerty15@gmail.com>` (sudah di-set via `git config` lokal repo ini — jangan diubah).
- **DILARANG** menambahkan trailer atribusi AI: `Generated with Devin`, `Co-Authored-By: Devin`, `Co-Authored-By: Claude`, atau sejenisnya. Commit message hanya berisi pesan commit itu sendiri.
- **Jangan `git push` tanpa izin eksplisit** dari user di sesi itu.

## Verifikasi

- `npm run lint` dan `npm run build` sebelum commit bila mengubah `src/`.
- Konten bilingual: `src/data/content.ts` (EN, source of truth) dan `src/data/content.id.ts` (ID) harus tetap mirror — update keduanya untuk setiap project/content baru.
