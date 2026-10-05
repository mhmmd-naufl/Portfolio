import type { Project } from '../data/content';
import {
  capabilities,
  education,
  experiences,
  profile,
  projects,
} from '../data/content';

export type ContentBundle = {
  profile: typeof profile;
  projects: Project[];
  capabilities: typeof capabilities;
  experiences: typeof experiences;
  certifications: string[];
  education: typeof education;
};

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export const staticBundle: ContentBundle = {
  profile,
  projects,
  capabilities,
  experiences,
  certifications: [...certifications],
  education,
};

async function get<T>(path: string, token?: string): Promise<T> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      signal: ctrl.signal,
      headers: token ? { 'X-Admin-Token': token } : {},
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function loadContent(): Promise<ContentBundle | null> {
  if (!API_URL) return null;
  try {
    const json = await get<{ data: ContentBundle }>('/api/content');
    if (!json || !Array.isArray(json.data?.projects)) return null;
    return json.data;
  } catch {
    return null;
  }
}

export async function saveContent(data: ContentBundle, token: string): Promise<void> {
  if (!API_URL) throw new Error('VITE_API_URL belum diisi');
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`${API_URL}/api/content`, {
      method: 'PUT',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify({ data }),
    });
    if (res.status === 401) throw new Error('unauthorized — token salah?');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } finally {
    window.clearTimeout(timer);
  }
}
