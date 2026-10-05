import { capabilities, certifications, education, experiences, profile } from '../data/content';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section id="about" className="py-36 md:py-56">
      <Reveal>
        <div className="border-b border-line pb-4">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium tracking-tight">
            <span className="mr-3 font-mono text-sm font-normal text-muted">03 /</span>
            About
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-4">
          <div className="flex aspect-[4/5] items-center justify-center border border-line">
            <span className="font-display text-7xl font-medium tracking-tight text-muted">
              {profile.initials}
            </span>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
            {profile.name} — {profile.role}
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed">{profile.bio}</p>
          </Reveal>

          <div className="mt-10">
            {capabilities.map((c) => (
              <Reveal key={c.no}>
                <div className="grid gap-1 border-t border-line py-5 md:grid-cols-12 md:gap-6">
                  <span className="font-mono text-xs text-muted md:col-span-1">{c.no}</span>
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
            {experiences.map((e) => (
              <div
                key={`${e.org}-${e.role}`}
                className="grid gap-1 border-t border-line py-4 md:grid-cols-12 md:gap-4"
              >
                <span className="font-mono text-[11px] text-muted md:col-span-4">{e.period}</span>
                <div className="md:col-span-8">
                  <p className="font-medium">{e.role}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{e.org}</p>
                </div>
              </div>
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
          </Reveal>
          <Reveal>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
              Certifications
            </h3>
            <ul className="mt-4">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="border-t border-line py-3 font-mono text-xs uppercase tracking-widest"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
