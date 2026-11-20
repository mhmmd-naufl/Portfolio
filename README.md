# Muhammad Naufal Aulia — Portfolio

Minimalist single-page portfolio. Monochrome palette, editorial typography,
subtle motion. Dark by default, light mode included.

**Live:** https://mhmmd-naufl.pages.dev

## Stack

- React 18 · Vite · TypeScript · Tailwind CSS
- GSAP + ScrollTrigger (synced with Lenis smooth scroll)
- View Transitions API, PWA, print-ready ATS resume

## Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run lint     # eslint, zero warnings
```

Content lives in `src/data/content.ts` — projects, experience, bio, socials.
Project screenshots go in `public/projects/`.

## Deploy

Push to `main` → Cloudflare Pages builds and deploys automatically.

## License

[MIT](LICENSE)
