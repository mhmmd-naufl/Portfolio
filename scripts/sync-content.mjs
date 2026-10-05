// Pulls content from Supabase and writes src/data/content.ts.
// Skips gracefully when env is missing (local dev without keys).
// Keep the serializer in sync with AdminPanel.buildSource.
import { writeFile } from 'node:fs/promises';

const URL = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '').replace(/\/$/, '');
const KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!URL || !KEY) {
  console.log('[sync] Supabase env missing — keeping local content.ts');
  process.exit(0);
}

const esc = (s) =>
  String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
const str = (s) => `'${esc(s)}'`;

const res = await fetch(`${URL}/rest/v1/content?id=eq.1&select=data`, {
  headers: { apikey: KEY },
});
if (!res.ok) {
  console.error(`[sync] Supabase HTTP ${res.status} — keeping local content.ts`);
  process.exit(0);
}
const rows = await res.json();
const data = rows?.[0]?.data;
if (!data || !Array.isArray(data.projects)) {
  console.error('[sync] bad payload — keeping local content.ts');
  process.exit(0);
}

const L = [];
L.push('// Single source of truth for all site copy.');
L.push('// Edit here, never hardcode text in components.');
L.push('// Site language: English.');
L.push('// Synced from Supabase — edit via #admin, not by hand.');
L.push('');
L.push('export const profile = {');
for (const [k, v] of Object.entries(data.profile)) {
  if (k === 'socials') continue;
  L.push(`  ${k}: ${str(v)},`);
}
L.push('  socials: [');
for (const s of data.profile.socials ?? []) {
  L.push(`    { label: ${str(s.label)}, href: ${str(s.href)} },`);
}
L.push('  ],');
L.push('};');
L.push('');
L.push('export type Project = {');
L.push('  id: string;');
L.push('  title: string;');
L.push('  category: string;');
L.push('  year: string;');
L.push('  stack: string[];');
L.push('  summary: string;');
L.push('  image?: string;');
L.push('  link?: string;');
L.push('};');
L.push('');
L.push('export const projects: Project[] = [');
(data.projects ?? []).forEach((p, i) => {
  L.push('  {');
  L.push(`    id: ${str(`P.${String(i + 1).padStart(2, '0')}`)},`);
  L.push(`    title: ${str(p.title)},`);
  L.push(`    category: ${str(p.category)},`);
  L.push(`    year: ${str(p.year)},`);
  L.push(`    stack: [${(p.stack ?? []).map(str).join(', ')}],`);
  L.push(`    summary: ${str(p.summary)},`);
  if (p.image) L.push(`    image: ${str(p.image)},`);
  if (p.link) L.push(`    link: ${str(p.link)},`);
  L.push('  },');
});
L.push('];');
L.push('');
L.push('export const capabilities = [');
for (const c of data.capabilities ?? []) {
  L.push('  {');
  L.push(`    no: ${str(c.no)},`);
  L.push(`    title: ${str(c.title)},`);
  L.push(`    desc: ${str(c.desc)},`);
  L.push('  },');
}
L.push('];');
L.push('');
L.push('export const experiences = [');
for (const e of data.experiences ?? []) {
  L.push(`  { period: ${str(e.period)}, role: ${str(e.role)}, org: ${str(e.org)} },`);
}
L.push('];');
L.push('');
L.push('export const certifications = [');
for (const c of data.certifications ?? []) {
  L.push(`  ${str(c)},`);
}
L.push('];');
L.push('');
L.push('export const education = {');
for (const [k, v] of Object.entries(data.education ?? {})) {
  L.push(`  ${k}: ${str(v)},`);
}
L.push('};');
L.push('');

await writeFile(new URL('../src/data/content.ts', import.meta.url), L.join('\n'));
console.log('[sync] content.ts updated from Supabase');
