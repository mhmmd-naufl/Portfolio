import { useEffect, useState } from 'react';
import { Dither } from './Dither';

// Wrapper tipis: Dither statis monokrom di belakang semua konten.
// - waveColor di-resolve dari --ink → otomatis ikut light/dark theme.
// - opacity ~9%, fixed -z-30 (di belakang .site-atmosphere yang -z-20).

const inkColor = () => {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  return rgb ? `rgb(${rgb.replace(/\s+/g, ', ')})` : '#888888';
};

export function SubtleDither() {
  const [waveColor, setWaveColor] = useState(inkColor);

  useEffect(() => {
    const update = () => setWaveColor(inkColor());
    window.addEventListener('themechange', update);
    return () => window.removeEventListener('themechange', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -30, opacity: 0.09 }}
    >
      <Dither waveColor={waveColor} />
    </div>
  );
}
