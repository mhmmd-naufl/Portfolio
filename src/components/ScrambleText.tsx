import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*';
const DURATION = 450;

// Scrambles text on hover/focus, then resolves back.
// Skipped entirely with prefers-reduced-motion.
export function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const running = useRef(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const start = () => {
    if (running.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    running.current = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DURATION, 1);
      const n = Math.floor(p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        running.current = false;
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <span className={className} onMouseEnter={start} onFocus={start}>
      {display}
    </span>
  );
}
