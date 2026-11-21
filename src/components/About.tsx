import { capabilities, certifications, education, experiences, profile } from '../data/content';
import { DotPattern } from './DotPattern';
import { PortraitField } from './PortraitField';
import { Reveal } from './Reveal';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

export function About() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-3, 3]);

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onTiltEnd = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="about" className="relative overflow-hidden py-36 md:py-56">
      <DotPattern className="-z-10" />
      <Reveal>
        <div className="scrub-y border-b border-line pb-4">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium tracking-tight">
            <span className="mr-3 font-mono text-sm font-normal text-muted">03 /</span>
            About
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-4 md:mt-16">
          <motion.div
            onMouseMove={onTilt}
            onMouseLeave={onTiltEnd}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="will-change-transform"
          >
            <div className="relative">
              <img
                src="/portrait.jpg"
                alt="Portrait of Muhammad Naufal Aulia"
                loading="lazy"
                className="aspect-[4/5] w-full border border-line object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
              />
              <PortraitField />
            </div>
          </motion.div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
            {profile.name} — {profile.degree}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {profile.role}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            Download resume ↓
          </button>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed">{profile.bio}</p>
          </Reveal>

          <div className="mt-10">
            {capabilities.map((c, i) => (
              <Reveal key={c.no}>
                <div
                  className={`group grid gap-1 border-t border-line py-5 transition-transform duration-300 hover:translate-x-2 md:grid-cols-12 md:gap-6 ${
                    i % 2 === 1 ? 'md:ml-[6vw]' : ''
                  }`}
                >
                  <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-ink md:col-span-1">
                    {c.no}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight md:col-span-3">
                    {c.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted md:col-span-8">{c.desc}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-7">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Experience</h3>
          <div className="mt-4">
            {experiences.map((e, i) => (
              <Reveal key={`${e.org}-${e.role}`} delay={i * 60}>
                <div className="grid gap-1 border-t border-line py-4 transition-transform duration-300 hover:translate-x-2 md:grid-cols-12 md:gap-4">
                  <span className="font-mono text-[11px] text-muted md:col-span-4">{e.period}</span>
                  <div className="md:col-span-8">
                    <p className="font-medium">{e.role}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {e.org}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="md:col-span-5">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Education</h3>
            <p className="mt-4 font-medium">{education.school}</p>
            <p className="text-[15px] text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {education.gpa} · {education.period}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
              {education.achievement}
            </p>
          </Reveal>
          <Reveal>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
              Certifications
            </h3>
            <ul className="mt-4">
              {certifications.map(c => (
                <li
                  key={c}
                  className="border-t border-line py-3 font-mono text-xs uppercase tracking-widest"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
              Languages — {profile.languages}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
