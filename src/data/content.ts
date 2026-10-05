// Single source of truth for all site copy.
// Edit here, never hardcode text in components.
// Site language: English.

export const profile = {
  name: 'Muhammad Naufal Aulia',
  initials: 'MNA',
  role: 'Web Development & Digital Content',
  location: 'Banyuwangi, ID',
  email: 'novalqwerty15@gmail.com',
  phone: '089515758977',
  tagline: 'keep minimalism.',
  bio: 'Software Engineering student at the intersection of technology and creativity — from simple web systems to visual stories. 50+ visual assets, 30+ tourism videos, live broadcast data for national events. Exploring data and AI.',
  status: 'Open for collaboration',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mhmmd-naufl' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/mhmmd-naufl' },
    { label: 'Behance', href: 'https://behance.net/mhmmdnaufl' },
    { label: 'Instagram', href: 'https://instagram.com/mhmmd.naufl' },
  ],
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  summary: string;
  image?: string;
  link?: string;
};

// Links/covers pending — cari di GitHub. Row tanpa link tampil sebagai teks biasa.
export const projects: Project[] = [
  {
    id: 'P.01',
    title: 'Social Search App',
    category: 'Web — Analytics',
    year: '2025',
    stack: ['FastAPI', 'Python', 'Selenium'],
    summary:
      'FastAPI backend + Selenium scraping, local web dashboard for social content analysis (Kominfo internship).',
  },
  {
    id: 'P.02',
    title: 'Live Race Graphics',
    category: 'Broadcast — Data',
    year: '2025',
    stack: ['OBS', 'Live Graphics'],
    summary: 'Live data graphics + stage profiles for Tour de Banyuwangi Ijen 2025.',
  },
  {
    id: 'P.03',
    title: 'Howheal Fun Run',
    category: 'Campaign — Social',
    year: '2025',
    stack: ['Figma', 'CapCut'],
    summary: 'Fun-run campaign with 100+ participants, from concept to content.',
  },
  {
    id: 'P.04',
    title: 'Tourism Recaps',
    category: 'Video — Tourism',
    year: '2024',
    stack: ['CapCut'],
    summary: '30+ cinematic tourism recaps across Banyuwangi.',
  },
  {
    id: 'P.05',
    title: 'UMKM Brand Kit',
    category: 'Branding',
    year: '2024',
    stack: ['Figma', 'Illustrator'],
    summary: 'Logo + flyers + instastories for local clients.',
  },
  {
    id: 'P.06',
    title: 'BIB Reader',
    category: 'CV — YOLOv8',
    year: '2025',
    stack: ['YOLOv8', 'Python'],
    summary: 'Race BIB reader (Alzen internal project — publish pending approval).',
  },
];

export const capabilities = [
  {
    no: '01',
    title: 'IT',
    desc: 'FastAPI backend + Selenium scraping (Social Search), YOLOv8 (BIB reader), technical documentation.',
  },
  {
    no: '02',
    title: 'Creative',
    desc: 'Minimalist design, visual branding, short video, multi-camera live broadcast.',
  },
  {
    no: '03',
    title: 'Analytics',
    desc: 'Content analysis (Social Search), event timing & scoring, content strategy. Data Science cert.',
  },
];

export const experiences = [
  { period: 'Jul 2025 — now', role: 'Software Engineer (intern)', org: 'Alzen Metro Data' },
  { period: 'Jul 2025 — Feb 2026', role: 'Broadcast Data & Camera', org: 'Alzen Metro Data' },
  {
    period: 'Feb — Jun 2025',
    role: 'Independent Intern (Social Search)',
    org: 'Kominfo Banyuwangi',
  },
  { period: 'Sep 2024 — Dec 2025', role: 'Social Media Specialist', org: 'Howheal.sac' },
  { period: 'Jun 2023 — Jun 2024', role: 'Content Creator', org: 'Visitbanyuwangi.id' },
  { period: 'Jan 2024 — now', role: 'Freelance Designer & Video Editor', org: 'Self Employed' },
];

export const certifications = [
  'BNSP Junior Mobile Programmer',
  'Data Science (Fresh Graduate Academy)',
  'Intro to Data Analytics',
  'Belajar Dasar Pemrograman Web',
  'EF SET 65/100 (C1)',
];

export const tools = [
  'Figma',
  'Adobe Illustrator',
  'Canva',
  'CapCut',
  'OBS Studio',
  'FastAPI',
  'Python',
  'Selenium',
  'YOLOv8',
  'Git',
];

export const education = {
  school: 'Politeknik Negeri Banyuwangi',
  degree: 'D4 Teknologi Rekayasa Perangkat Lunak',
  gpa: '3.63/4.00',
  period: '2022 — 2026',
};
