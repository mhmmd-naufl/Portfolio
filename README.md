# Personal Website — Muhammad Naufal Aulia

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-black.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-black.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-black.svg)](https://tailwindcss.com/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-black.svg)](https://nodejs.org/)

> Minimalist single-page portfolio — monochrome, experimental typography, dark/light mode.

![Preview](public/og-image.png)

## Tech Stack

- **Framework:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS 3 (monochrome design tokens)
- **Motion:** Lenis smooth scroll, CSS reveals, canvas dot field, cmdk palette
- **PWA:** service worker (offline) + web manifest
- **Linting:** ESLint + Prettier
- **Deployment:** Cloudflare Pages (git integration)

## Getting Started

### Prerequisites

- Node.js >= 20, npm

### Installation

```bash
git clone https://github.com/mhmmd-naufl/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm run dev        # start dev server
npm run build      # production build to dist/
npm run preview    # preview the build locally

# Local content editor (dev only): npm run dev, then open http://localhost:5173/#admin
npm run lint       # eslint, zero warnings allowed
npm run format     # prettier write
```

## Project Structure

```
├── public/               # Static assets (copied to dist/)
│   ├── logo.svg          # brand mark (currentColor)
│   ├── favicon.svg       # adaptive tab icon + PNG fallbacks
│   ├── og-image.png      # social share image (1200x630)
│   ├── portrait.jpg      # about photo (optimized)
│   ├── 404.html          # custom error page
│   ├── _redirects        # SPA fallback
│   ├── _headers          # security headers
│   ├── robots.txt        # + sitemap.xml
│   └── site.webmanifest
├── scripts/
│   └── make_icons.py     # regenerate logo PNGs + OG card (Pillow)
├── src/
│   ├── components/       # Nav, Hero, WorkList, About, Footer, Playground,
│   │                     # CommandMenu, CustomCursor, ScrambleText, Reveal, …
│   ├── lib/
│   │   └── theme.ts      # dark/light state bus
│   ├── data/
│   │   └── content.ts    # ALL site copy — edit here
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         # theme tokens + effects
├── 00–06 *.md            # brief, design system, structure, interactions,
│                         # content template, prompts, data input
├── eslint.config.js
├── tailwind.config.js
└── vite.config.ts
```

## Deployment

Push to `main` → Cloudflare Pages builds & deploys automatically.

- Build command: `npm run build`
- Output directory: `dist`
- Env: `NODE_VERSION=20`

## License

[MIT](LICENSE) © [Muhammad Naufal Aulia](https://github.com/mhmmd-naufl)
