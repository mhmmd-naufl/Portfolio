import { useState } from 'react';
import { SUPABASE_CONFIGURED, loadRemote, saveRemote, signIn, triggerHook } from '../lib/supabase';
import type { ContentBundle } from '../lib/supabase';

export function AdminCloud({
  getData,
  applyData,
}: {
  getData: () => ContentBundle;
  applyData: (b: ContentBundle) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem('supa_token') ?? '');
  const [hook, setHook] = useState(() => localStorage.getItem('deploy_hook') ?? '');
  const [status, setStatus] = useState(
    SUPABASE_CONFIGURED ? 'belum login' : 'offline — isi env Supabase dulu',
  );
  const [busy, setBusy] = useState(false);

  const login = async () => {
    if (!email.trim() || !password) {
      setStatus('isi email + password dulu');
      return;
    }
    setBusy(true);
    try {
      const t = await signIn(email.trim(), password);
      sessionStorage.setItem('supa_token', t);
      setToken(t);
      setPassword('');
      const b = await loadRemote();
      if (b) {
        applyData(b);
        setStatus('online — data Supabase dimuat');
      } else {
        setStatus('login ok — DB kosong, Save untuk isi pertama');
      }
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'login gagal');
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('supa_token');
    setToken('');
    setStatus('logout — mode lokal');
  };

  const load = async () => {
    setBusy(true);
    const b = await loadRemote();
    setBusy(false);
    if (b) {
      applyData(b);
      setStatus('online — data Supabase dimuat');
    } else {
      setStatus('gagal muat — cek koneksi/RLS');
    }
  };

  const save = async (publish: boolean) => {
    if (!token) {
      setStatus('login dulu');
      return;
    }
    setBusy(true);
    try {
      await saveRemote(getData(), token);
      if (publish) {
        if (!hook.trim()) {
          setStatus('saved ✓ — tapi hook URL kosong, tidak publish');
          return;
        }
        localStorage.setItem('deploy_hook', hook);
        try {
          await triggerHook(hook.trim());
          setStatus('published ✓ — Cloudflare rebuild ~1-2 mnt');
        } catch {
          await navigator.clipboard.writeText(`Invoke-RestMethod -Method Post "${hook.trim()}"`);
          setStatus('browser diblokir — perintah publish tercopy, paste di PowerShell');
        }
      } else {
        setStatus('saved ✓ ke Supabase');
      }
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'gagal menyimpan');
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full border border-line bg-transparent px-3 py-2 font-mono text-sm outline-none focus:border-muted placeholder:text-muted';

  return (
    <div className="border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Supabase — {SUPABASE_CONFIGURED ? (token ? 'login' : 'siap login') : 'no env'}
        </p>
        <p className="font-mono text-[11px] text-muted">{busy ? 'working…' : status}</p>
      </div>
      {!token ? (
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin email"
            autoComplete="username"
            className={inputCls}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === 'Enter') void login();
            }}
            className={inputCls}
          />
          <button
            type="button"
            onClick={login}
            disabled={busy}
            className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-base disabled:opacity-50"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="mt-3 grid gap-3">
          <input
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="Cloudflare deploy hook URL (untuk Publish)"
            spellCheck={false}
            className={`${inputCls} font-mono text-xs`}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={load}
              disabled={busy}
              className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink disabled:opacity-50"
            >
              Load
            </button>
            <button
              type="button"
              onClick={() => save(false)}
              disabled={busy}
              className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => save(true)}
              disabled={busy}
              className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-base disabled:opacity-50"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={logout}
              disabled={busy}
              className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink disabled:opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
        Save = tulis DB. Publish = save + rebuild Cloudflare. Offline = edit jalan, sync gagal.
      </p>
    </div>
  );
}
