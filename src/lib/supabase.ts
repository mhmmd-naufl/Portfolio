import type { Project } from '../data/content';
import {
  capabilities,
  education,
  experiences,
  profile,
} from '../data/content';

export type ContentBundle = {
  profile: typeof profile;
  projects: Project[];
  capabilities: typeof capabilities;
  experiences: typeof experiences;
  certifications: string[];
  education: typeof education;
};

const SUPA_URL = (
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''
).replace(/\/$/, '');
const SUPA_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';

export const SUPABASE_CONFIGURED = SUPA_URL.length > 0 && SUPA_KEY.length > 0;

async function supa(
  path: string,
  init: RequestInit & { token?: string },
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 12000);
  try {
    const headers: Record<string, string> = {
      apikey: SUPA_KEY,
      ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
    };
    if (init.body) headers['Content-Type'] = 'application/json';
    const res = await fetch(`${SUPA_URL}${path}`, { ...init, signal: ctrl.signal, headers });
    return res;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function signIn(email: string, password: string): Promise<string> {
  if (!SUPABASE_CONFIGURED) throw new Error('Supabase belum dikonfigurasi');
  const res = await supa('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('login gagal — cek email/password');
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error('login gagal');
  return json.access_token;
}

export async function loadRemote(): Promise<ContentBundle | null> {
  if (!SUPABASE_CONFIGURED) return null;
  try {
    const res = await supa('/rest/v1/content?id=eq.1&select=data', {});
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ data: ContentBundle }>;
    const data = rows?.[0]?.data;
    if (!data || !Array.isArray(data.projects)) return null;
    return data;
  } catch {
    return null;
  }
}

export async function saveRemote(data: ContentBundle, token: string): Promise<void> {
  const res = await supa('/rest/v1/content?id=eq.1', {
    method: 'PATCH',
    token,
    body: JSON.stringify({ data }),
  });
  if (res.status === 401 || res.status === 403) throw new Error('ditolak — login dulu');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function triggerHook(url: string): Promise<void> {
  const res = await fetch(url, { method: 'POST' });
  if (!res.ok) throw new Error(`hook HTTP ${res.status}`);
}
