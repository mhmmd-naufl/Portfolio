import { useEffect } from 'react';

// ReactBits ClickSpark — adaptasi global & minimal:
// - Bukan wrapper; listen pointerdown di document, hanya memicu burst pada
//   elemen yang punya atribut [data-spark] (saat ini: tombol Copy email).
// - Shape 'line' saja: 8 garis 1px, warna --ink, durasi ~520ms.
// - Mati total pada prefers-reduced-motion dan perangkat touch.

const SPARK_COUNT = 8;
const SPARK_RADIUS = 26;
const SPARK_LENGTH = 12;
const SPARK_WIDTH = 1;
const DURATION = 520;

interface Spark {
  angle: number;
  reach: number;
  scale: number;
  life: number;
}

interface Burst {
  x: number;
  y: number;
  start: number;
  color: string;
  sparks: Spark[];
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const inkColor = () => {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  return rgb ? `rgb(${rgb.replace(/\s+/g, ', ')})` : 'rgb(0, 0, 0)';
};

export function ClickSpark() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:300;pointer-events:none';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.remove();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bursts: Burst[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = (now: number) => {
      raf = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        const elapsed = now - burst.start;
        let alive = false;
        for (const spark of burst.sparks) {
          const life = DURATION * spark.life;
          const p = elapsed / life;
          if (p >= 1) continue;
          alive = true;
          const e = easeOut(Math.min(1, p));
          const dist = SPARK_RADIUS * spark.reach * e;
          const len = SPARK_LENGTH * spark.scale * Math.pow(1 - p, 1.6);
          const alpha = 1 - smoothstep(0.55, 1, p);
          const angle = spark.angle;
          const x1 = burst.x + Math.cos(angle) * dist;
          const y1 = burst.y + Math.sin(angle) * dist;
          const x2 = burst.x + Math.cos(angle) * (dist + Math.max(0.01, len));
          const y2 = burst.y + Math.sin(angle) * (dist + Math.max(0.01, len));
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = burst.color;
          ctx.lineWidth = SPARK_WIDTH;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        if (!alive) bursts.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (bursts.length) raf = requestAnimationFrame(frame);
    };

    const spawn = (x: number, y: number) => {
      const sparks: Spark[] = Array.from({ length: SPARK_COUNT }, (_, i) => {
        const base = (i / SPARK_COUNT) * Math.PI * 2;
        const jitter = (Math.random() - 0.5) * 0.35;
        return {
          angle: base + jitter,
          reach: 1 + (Math.random() - 0.5) * 0.7,
          scale: 1 + (Math.random() - 0.5) * 0.8,
          life: 1 + (Math.random() - 0.5) * 0.5
        };
      });
      bursts.push({ x, y, start: performance.now(), color: inkColor(), sparks });
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('[data-spark]')) return;
      spawn(event.clientX, event.clientY);
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointerdown', onPointerDown);
      canvas.remove();
    };
  }, []);

  return null;
}
