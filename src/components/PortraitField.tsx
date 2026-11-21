import { useEffect, useRef } from 'react';

const GAP = 24;
const RADIUS = 90;
const PUSH = 20;
const EASE = 0.15;
const PURPLE = '124, 58, 237'; // #7C3AED — same as cursor

type Dot = { ox: number; oy: number; dx: number; dy: number };

function readInk(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  return v ? v.replace(/\s+/g, ', ') : '18, 17, 15';
}

// Small interactive dot field pinned inside the portrait frame.
// Dots drift gently and repel/glow purple near the cursor. Static on
// touch / reduced-motion, loop pauses offscreen. Cheap: ~300 dots max.
export function PortraitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const still =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      const cols = Math.max(1, Math.floor(w / GAP));
      const rows = Math.max(1, Math.floor(h / GAP));
      const offX = (w - cols * GAP) / 2 + GAP / 2;
      const offY = (h - rows * GAP) / 2 + GAP / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          dots.push({ ox: offX + i * GAP, oy: offY + j * GAP, dx: 0, dy: 0 });
        }
      }
    };

    const drift = (d: Dot, t: number): [number, number] => [
      Math.sin(t * 0.5 + d.ox * 0.02 + d.oy * 0.015) * 2,
      Math.cos(t * 0.42 + d.ox * 0.012 - d.oy * 0.018) * 2,
    ];

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const [ax, ay] = drift(d, t);
        const px = d.ox + d.dx + ax;
        const py = d.oy + d.dy + ay;
        const dist = Math.hypot(px - mx, py - my);
        if (!still && dist < RADIUS) {
          const k = 1 - dist / RADIUS;
          ctx.fillStyle = `rgba(${PURPLE}, ${(k * 0.85).toFixed(3)})`;
          ctx.fillRect(px - 1.2, py - 1.2, 2.4, 2.4);
        } else {
          ctx.fillStyle = `rgba(${ink}, 0.22)`;
          ctx.fillRect(px - 0.7, py - 0.7, 1.4, 1.4);
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
          const k = 1 - dist / RADIUS;
          tx = (x / dist) * k * k * PUSH;
          ty = (y / dist) * k * k * PUSH;
        }
        d.dx += (tx - d.dx) * EASE;
        d.dy += (ty - d.dy) * EASE;
      }
      draw(performance.now() / 1000);
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

    const ro = new ResizeObserver(() => {
      build();
      if (still) draw();
    });

    build();
    ro.observe(wrap);
    if (still) {
      draw();
      return () => ro.disconnect();
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
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
