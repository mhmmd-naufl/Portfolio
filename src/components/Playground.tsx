import { useEffect, useRef } from 'react';

const GAP = 28;
const RADIUS = 150;
const PUSH = 26;
const EASE = 0.18;
const PURPLE = '124, 58, 237'; // #7C3AED — same as cursor

type Dot = { ox: number; oy: number; dx: number; dy: number };

function readInk(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  return v || '26 25 23';
}

// Signature field: a quiet grid of dots that repel from the cursor.
// Dots near the cursor glow purple (alpha follows proximity), the rest
// stay monochrome. Static render on touch / reduced-motion, loop pauses
// offscreen. Colors follow the theme via CSS vars.
// - bare: just the canvas, fills its positioned parent (hero background).
// - faint: dimmer base dots so whitespace stays airy.
export function Playground({ bare = false, faint = false }: { bare?: boolean; faint?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const still =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const host = (wrap.closest('section') ?? wrap) as HTMLElement;
    const baseAlpha = faint ? 0.16 : 0.28;

    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let ink = readInk();
    let mx = -9999;
    let my = -9999;
    let raf = 0;

    const build = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.floor(w / GAP);
      const rows = Math.floor(h / GAP);
      const offX = (w - cols * GAP) / 2 + GAP / 2;
      const offY = (h - rows * GAP) / 2 + GAP / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          dots.push({ ox: offX + i * GAP, oy: offY + j * GAP, dx: 0, dy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const px = d.ox + d.dx;
        const py = d.oy + d.dy;
        const dist = Math.hypot(px - mx, py - my);
        if (!still && dist < RADIUS) {
          const t = 1 - dist / RADIUS;
          ctx.fillStyle = `rgba(${PURPLE}, ${(t * 0.9).toFixed(3)})`;
          const s = 2.4;
          ctx.fillRect(px - s / 2, py - s / 2, s, s);
        } else {
          ctx.fillStyle = `rgba(${ink}, ${baseAlpha})`;
          ctx.fillRect(px - 0.8, py - 0.8, 1.6, 1.6);
        }
      }
    };

    const step = () => {
      for (const d of dots) {
        const px = d.ox + d.dx;
        const py = d.oy + d.dy;
        const x = px - mx;
        const y = py - my;
        const dist = Math.hypot(x, y);
        let tx = 0;
        let ty = 0;
        if (dist < RADIUS && dist > 0.01) {
          const t = 1 - dist / RADIUS;
          tx = (x / dist) * t * t * PUSH;
          ty = (y / dist) * t * t * PUSH;
        }
        d.dx += (tx - d.dx) * EASE;
        d.dy += (ty - d.dy) * EASE;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      ink = readInk();
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    const onResize = () => {
      build();
      if (still) draw();
    };

    build();
    window.addEventListener('resize', onResize);
    if (still) {
      draw();
      return () => window.removeEventListener('resize', onResize);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(wrap);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [faint]);

  const canvas = (
    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" />
  );

  if (bare) {
    return (
      <div
        ref={wrapRef as React.RefObject<HTMLDivElement>}
        aria-hidden="true"
        className="absolute inset-0"
      >
        {canvas}
      </div>
    );
  }

  return (
    <section ref={wrapRef} aria-label="Field" className="relative h-[100svh] overflow-hidden">
      {canvas}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex max-w-[1200px] items-center justify-between px-6 pt-24 font-mono text-[11px] uppercase tracking-widest text-muted md:px-10">
        <span>05 — Field</span>
        <span className="hidden md:block">move your cursor</span>
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto max-w-[1200px] px-6 font-mono text-[11px] uppercase tracking-widest text-muted md:px-10">
        repel — return
      </p>
    </section>
  );
}
