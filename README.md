# Personal Website — Muhammad Naufal Aulia

> Portfolio & personal site of Muhammad Naufal Aulia — Creative Technologist based in BWI, ID.

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **Linting:** ESLint + Prettier
- **Deployment:** Cloudflare Pages (via GitHub Actions)
- **Analytics:** Cloudflare Web Analytics (privacy-friendly)

## Getting Started

### Prerequisites

- Node.js >= 20
- npm (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/mhmmd-naufl/personal-website.git
cd personal-website

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
├── public/                 # Static assets (copied to build output)
│   ├── _headers            # Cloudflare Pages security headers
│   ├── _redirects          # URL redirects
│   ├── favicon.ico
│   ├── og-image.png        # Social share image (1200x630)
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── styles/             # Global styles / Tailwind entry
│   ├── utils/              # Utility functions
│   ├── data/               # Profile data, projects data
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── .github/
│   ├── workflows/
│   │   └── deploy.yml      # CI/CD → Cloudflare Pages
│   └── dependabot.yml      # Auto-update dependencies
├── eslint.config.js
├── .prettierrc
├── .prettierignore
├── .editorconfig
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
├── LICENSE                 # MIT License
└── README.md
```

## Deployment

### Automatic (GitHub Actions)

Push to `main` branch → GitHub Actions builds & deploys to Cloudflare Pages automatically.

### Manual (Wrangler CLI)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy ./dist --project-name=personal-website
```

## Environment Variables

Set these in **Cloudflare Pages → Settings → Environment variables**:

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_VERSION` | Node.js version for build | Recommended (`20`) |
| `FORM_ENDPOINT` | Form submission endpoint (e.g., Formspree) | If using contact form |

## License

[MIT](LICENSE) © [Muhammad Naufal Aulia](https://github.com/mhmmd-naufl)
