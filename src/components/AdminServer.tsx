import { useEffect, useState } from 'react';
import { API_URL, loadContent, saveContent } from '../lib/api';
import type { ContentBundle } from '../lib/api';

export function AdminServer({
  getData,
  applyData,
}: {
  getData: () => ContentBundle;
  applyData: (b: ContentBundle) => void;
}) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') ?? '');
  const [status, setStatus] = useState('checking…');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!API_URL) {
      setStatus('offline — isi VITE_API_URL dulu');
      return;
    }
    loadContent().then((b) => {
      if (!alive) return;
      if (b) {
        applyData(b);
        setStatus('online — data server dimuat');
      } else {
        setStatus('offline — pakai data lokal');
      }
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = async () => {
    setBusy(true);
    setStatus('checking…');
    const b = await loadContent();
    setBusy(false);
    if (b) {
      applyData(b);
      setStatus('online — data server dimuat');
    } else {
      setStatus(API_URL ? 'offline — server mati?' : 'offline — isi VITE_API_URL dulu');
    }
  };

  const save = async () => {
    if (!token.trim()) {
      setStatus('isi admin token dulu');
      return;
    }
    setBusy(true);
    try {
      localStorage.setItem('admin_token', token);
      await saveContent(getData(), token);
      setStatus('saved ✓');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'gagal menyimpan');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Server — {API_URL || 'no API'}
        </p>
        <p className="font-mono text-[11px] text-muted">{busy ? 'working…' : status}</p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted">
            Admin token
          </span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ADMIN_TOKEN"
            autoComplete="off"
            className="w-full border border-line bg-transparent px-3 py-2 font-mono text-sm outline-none focus:border-muted"
          />
        </label>
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={reload}
            disabled={busy}
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink disabled:opacity-50"
          >
            Load
          </button>
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-base disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
        Backend: uvicorn server.main:app --reload --port 8000 --env-file server/.env
      </p>
    </div>
  );
}
