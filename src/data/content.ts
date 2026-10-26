// Single source of truth for all site copy.
// Edit here, never hardcode text in components.
// Site language: English (adapted from Indonesian CV).

export const profile = {
  name: 'Muhammad Naufal Aulia',
  initials: 'MNA',
  role: 'Full-Stack Developer & Digital Creator',
  location: 'Banyuwangi, ID',
  email: 'novalqwerty15@gmail.com',
  phone: '089515758977',
  tagline: 'Technical precision. Visual clarity.',
  bio: 'D4 Software Engineering Technology graduate combining backend/automation programming logic with visual storytelling. Experienced in building analytics and data management systems (FastAPI, PostgreSQL), while leading creative content production and live broadcasting. Capable of bridging technical complexity (AI, automation, database) with aesthetic design values to create functional, efficient, and visually appealing digital solutions.',
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

export const projects: Project[] = [
  {
    id: 'P.01',
    title: 'Live-Auto-Cliper (Final Project)',
    category: 'Automation — Broadcasting',
    year: '2026',
    stack: ['Python', 'FastAPI', 'FFmpeg', 'React.js', 'OBS WebSocket'],
    summary: 'Real-time football highlight clipping automation system based on audio spike detection (F1-Score 96.0%).',
  },
  {
    id: 'P.02',
    title: 'Komang SAC Business Management',
    category: 'Full-Stack Web App',
    year: '2025',
    stack: ['FastAPI', 'React.js', 'Supabase', 'UI/UX'],
    summary: 'Multi-user operational full-stack app with Role-Based Access Control (RBAC), AI analytics integration, and clean UI.',
  },
  {
    id: 'P.03',
    title: 'Rentalyzer',
    category: 'Rental Management System',
    year: '2025',
    stack: ['FastAPI', 'React.js', 'PostgreSQL', 'OpenRouter AI'],
    summary: 'End-to-end rental platform with analytics dashboard, scheduling automation, and multi-model AI integration for automatic business summaries.',
  },
  {
    id: 'P.04',
    title: 'Social Search App',
    category: 'Web — Analytics',
    year: '2025',
    stack: ['FastAPI', 'Python', 'MongoDB', 'Web Scraping'],
    summary: 'Backend prototype for collecting, managing, and classifying public opinion data from social media (Diskominfo Banyuwangi).',
  },
  {
    id: 'P.05',
    title: 'Computer Vision BIB Reader',
    category: 'AI — Computer Vision',
    year: '2025',
    stack: ['YOLOv8', 'ByteTrack', 'OCR', 'Python'],
    summary: 'Pipeline prototype to automatically detect runners BIB numbers for participant data verification (Alzen Metro Data).',
  },
];

export const capabilities = [
  {
    no: '01',
    title: 'IT & System Development',
    desc: 'Python, React.js, FastAPI, PostgreSQL, Supabase, API Integration.',
  },
  {
    no: '02',
    title: 'AI & Data Automation',
    desc: 'YOLOv8 (Computer Vision), FFmpeg, OpenRouter AI, Web Scraping.',
  },
  {
    no: '03',
    title: 'Creative & Media',
    desc: 'Visual Branding, Video Production, Multi-camera Live Broadcast, Event Timing, Graphic Design.',
  },
];

export const experiences = [
  { 
    period: 'Jan 2025 — Sep 2026', 
    role: 'Technical Broadcast & Computer Vision Intern', 
    org: 'CV. Alzen Metro Data' 
  },
  { 
    period: 'Feb 2025 — Jun 2025', 
    role: 'Software Engineer Intern', 
    org: 'Diskominfo Banyuwangi' 
  },
  { 
    period: 'Sep 2024 — Dec 2025', 
    role: 'Social Media Specialist', 
    org: 'Howheal SAC' 
  },
  { 
    period: 'Jan 2024 — Jun 2026', 
    role: 'Freelance Graphic Designer & Video Editor', 
    org: 'Self Employed' 
  },
  { 
    period: 'Jan 2024 — Jun 2026', 
    role: 'Freelance Content Creator', 
    org: 'Visitbanyuwangi.id' 
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
  'Languages: Indonesian (Native), English (TOEIC: 610)',
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
  achievement: 'Ketua Angkatan Jurusan Bisnis dan Informatika 2022',
};
