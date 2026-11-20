// Single source of truth for all site copy.
// Edit here, never hardcode text in components.
// Site language: English (adapted from Indonesian CV).

export const profile = {
  name: 'Muhammad Naufal Aulia',
  initials: 'MNA',
  role: 'Full-Stack Developer & Digital Creator',
  degree: 'S.Tr.Kom.',
  languages: 'Indonesian (Native) · English (TOEIC: 610)',
  location: 'Banyuwangi, ID',
  email: 'novalqwerty15@gmail.com',
  phone: '089515758977',
  tagline: 'Technical precision. Visual clarity.',
  bio: 'D4 Software Engineering Technology graduate bridging backend systems and visual storytelling. Builds analytics and data-management platforms (FastAPI, PostgreSQL, Supabase, RBAC) while leading creative production — from 50+ visual assets and weekly content strategy to multi-camera live broadcasts across regional sports events. Turns technical complexity (AI, automation, computer vision) into functional, efficient, and visually clear digital solutions.',
  status: 'Open for collaboration',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mhmmd-naufl' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/mhmmd-naufl' },
    { label: 'Behance', href: 'https://behance.net/mhmmdnaufl' },
    { label: 'Instagram', href: 'https://instagram.com/mhmmd.naufl' },
  ],
};

export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  summary: string;
  story?: string; // case-study narrative, paragraphs split by \n\n
  image?: string; // e.g. '/projects/p01.jpg' — shown in the hover preview card
  gallery?: ProjectImage[]; // case-study modal
  link?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: 'P.01',
    title: 'Live-Auto-Cliper (Final Project)',
    category: 'Automation — Broadcasting',
    year: '2026',
    stack: ['Python', 'FastAPI', 'FFmpeg', 'React.js', 'OBS WebSocket'],
    summary:
      'Real-time football highlight clipping automation system based on audio spike detection (F1-Score 96.0%).',
    story:
      'Final project: an automation system that turns a live football broadcast into highlights with zero manual editing. It watches the OBS audio stream for crowd-reaction spikes, fires the replay buffer through OBS WebSocket, and lets FFmpeg cut the clip with pre/post-roll. Validated at 96.0% F1-Score on highlight detection — hours of scrubbing per match reduced to seconds.',
    image: '/projects/auto-clip.png',
    gallery: [{ src: '/projects/auto-clip.png', alt: 'Live-Auto-Cliper highlight output' }],
    link: 'https://github.com/mhmmd-naufl/Live-Auto-Cliper',
  },
  {
    id: 'P.02',
    title: 'VibeSift',
    category: 'AI — Full-Stack Web App',
    year: '2026',
    stack: ['Next.js', 'FastAPI', 'Spotify API', 'LiteLLM'],
    summary:
      'Open-source AI playlist curator: turns natural-language prompts into Spotify playlists via Audio Features and multi-provider LLM (BYOK).',
    story:
      'Open-source web app that turns natural-language prompts into Spotify playlists. Describe a mood — "acoustic songs for rainy days" — and the backend maps it to Audio Features through a multi-provider LLM (BYOK: Gemini, Groq, OpenAI, Anthropic, Ollama), filters the user\'s Liked Songs, and creates the playlist via the Spotify API. Next.js + FastAPI, designed to run 100% on free tiers, with the AI key never stored on the server.',
    link: 'https://github.com/mhmmd-naufl/VibeSift',
  },
  {
    id: 'P.03',
    title: 'Solea',
    category: 'Full-Stack Web App',
    year: '2025',
    stack: ['FastAPI', 'React.js', 'Supabase', 'UI/UX'],
    summary:
      'Multi-user operational full-stack app with Role-Based Access Control (RBAC), AI analytics integration, and clean UI.',
    story:
      'Production-grade operational system for a shoe-laundry business, replacing error-prone paper records with a centralized flow. Customers book multi-pair orders and track status with photo proof; technicians work from a queue; admins monitor revenue and commissions in real time; drop-point partners log outlet transactions. Built with FastAPI + React + Supabase — RLS on every table, Argon2id auth, RBAC across four roles, WhatsApp status notifications, audit logging, and automated backups. Live demo available.',
    image: '/projects/solea-dashboard.png',
    gallery: [
      { src: '/projects/solea-dashboard.png', alt: 'Solea admin dashboard with revenue analytics' },
      { src: '/projects/solea-detail-transaksi.png', alt: 'Solea transaction detail view' },
      { src: '/projects/solea-detail-tracking.png', alt: 'Solea order tracking detail' },
      { src: '/projects/solea-pengeluaran.png', alt: 'Solea expense tracking page' },
    ],
    link: 'https://github.com/mhmmd-naufl/Solea',
    demo: 'https://solea-ten-pi.vercel.app',
  },
  {
    id: 'P.04',
    title: 'Social Search App',
    category: 'Web — Analytics',
    year: '2025',
    stack: ['FastAPI', 'Python', 'MongoDB', 'Web Scraping'],
    summary:
      'Backend prototype for collecting, managing, and classifying public opinion data from social media (Diskominfo Banyuwangi).',
    story:
      'Analytics prototype for Diskominfo Banyuwangi to collect and classify public opinion from social media. Selenium-based TikTok scraping with fallback selectors and auto-scroll feeds background jobs with keyword deduplication; an Indonesian lexicon engine handles slang normalization, negation, multi-word phrases, and emoji; MongoDB upserts keep re-scrapes clean; the React frontend polls job progress and renders sentiment breakdowns.',
    image: '/projects/social-search-hasil.png',
    gallery: [
      { src: '/projects/social-search-home.png', alt: 'Social Search landing and query page' },
      { src: '/projects/social-search-hasil.png', alt: 'Social Search sentiment analysis results' },
      { src: '/projects/social-search-detail.png', alt: 'Social Search per-video detail view' },
    ],
    link: 'https://github.com/mhmmd-naufl/social_searchv2',
    demo: 'https://social-searchv2.vercel.app/',
  },
  {
    id: 'P.05',
    title: 'Computer Vision BIB Reader',
    category: 'AI — Computer Vision',
    year: '2025',
    stack: ['YOLOv8', 'ByteTrack', 'OCR', 'Python'],
    summary:
      'Pipeline prototype to automatically detect runners BIB numbers for participant data verification (Alzen Metro Data).',
    story:
      'Computer-vision pipeline that reads race bib numbers in real time. YOLOv8 detects runners, ByteTrack keeps track IDs stable through occlusion and fast motion, a Canny + contour stage isolates the bib card, an EasyOCR + Tesseract ensemble reads it with confidence-weighted temporal voting, and every read logs to a structured 12-column CSV — frame, timestamp, track ID, bbox and OCR confidence, occlusion flags — for post-run analysis.',
    link: 'https://github.com/mhmmd-naufl/OCR_BIBNumber',
  },
];

export const capabilities = [
  {
    no: '01',
    title: 'Fullstack Development',
    desc: 'Python, FastAPI, React.js, PostgreSQL, Supabase, API Integration, RBAC.',
  },
  {
    no: '02',
    title: 'Creative & Media',
    desc: 'Visual Branding, Video Production, Multi-camera Live Broadcast, Event Timing, Graphic Design.',
  },
];

export const experiences = [
  {
    period: 'Nov 2025 — Sep 2026',
    role: 'Technical Broadcast & Timing System (Freelance)',
    org: 'CV. Alzen Metro Data',
  },
  {
    period: 'Jul 2025 — Nov 2025',
    role: 'Software Engineering Intern',
    org: 'CV. Alzen Metro Data',
  },
  {
    period: 'Feb 2025 — Jun 2025',
    role: 'Software Engineer Intern',
    org: 'Diskominfo Banyuwangi',
  },
  {
    period: 'Sep 2024 — Dec 2025',
    role: 'Social Media Specialist',
    org: 'Howheal SAC',
  },
  {
    period: 'Jan 2024 — Jun 2026',
    role: 'Freelance Graphic Designer & Video Editor',
    org: 'Self Employed',
  },
  {
    period: 'Jun 2023 — Jun 2024',
    role: 'Freelance Content Creator',
    org: 'Visitbanyuwangi.id',
  },
  {
    period: 'Jan 2024 — Jan 2025',
    role: 'Head, Media Communications & Information Dept.',
    org: 'HMJ Bisnis dan Informatika — Polinema',
  },
];

export const certifications = [
  'BNSP Pemrogram Mobile Pratama (Junior Mobile Programmer)',
  'Data Science - Fresh Graduate Academy (Digital Talent Scholarship)',
  'Intro to Data Analytics - RevoU',
  'Basic Proficiency in KNIME Analytics Platform - KNIME',
  'Python Introduction for Data Analysis - MySkill',
  'Belajar Back-End Pemula dengan JavaScript - Dicoding Indonesia',
  'Belajar Dasar Pemrograman Web - Dicoding Indonesia',
  'Belajar Dasar Pemrograman JavaScript - Dicoding Indonesia',
];

export const tools = [
  'OBS Studio',
  'Figma',
  'Adobe Illustrator',
  'CapCut',
  'VN',
  'Google Workspace',
  'FastAPI',
  'React.js',
  'PostgreSQL',
  'Supabase',
  'YOLOv8',
  'FFmpeg',
];

export const education = {
  school: 'Politeknik Negeri Banyuwangi',
  degree: 'D4 Teknologi Rekayasa Perangkat Lunak',
  gpa: '3.63/4.00',
  period: '2022 — 2026',
  // Catatan: Jika komponen UI Anda belum menampilkan field 'achievement',
  // Anda bisa menggabungkannya ke string 'degree' atau menambahkan field ini di komponen About/Education.
  achievement: 'Head of Informatics & Business Student Association — 2022',
};
