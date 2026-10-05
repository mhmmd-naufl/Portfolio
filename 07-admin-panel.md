# 07 — Admin Panel (local content editor)

## What

Form editor for all site copy. No backend, no database, no login — it only
runs on localhost and exports a new `src/data/content.ts`.

## Open

```sh
npm run dev
```

Then visit `http://localhost:5173/#admin`. Remove `#admin` from the URL to exit.
Production builds ignore the hash entirely (guarded by `import.meta.env.DEV`,
lazy-loaded chunk never fetched).

## Tabs

- **profile** — name, role, contacts, tagline, bio, socials (add/del).
- **projects** — add/del/reorder (↑↓), title, category, year, stack (comma),
  summary, optional image/link. IDs (`P.01…`) regenerate from order on export.
- **site** — capabilities, experiences, certifications, education.

## Apply changes

1. Edit → **Download content.ts** (or Copy source).
2. Replace `src/data/content.ts` with the file.
3. Run `npm run format`, restart dev, review.
4. Commit + push as usual.

## Limits

- No live preview (site reads the static file, not panel state).
- No image upload — place covers in `public/`, type the path.
- Validation is minimal: required text may be empty; check output before commit.
