import {
  capabilities,
  certifications,
  education,
  experiences,
  profile,
  projects,
  tools,
} from '../data/content';

// ATS-friendly resume: single column, standard headings, real text.
// Screen-hidden, print-visible. Opened via window.print() -> Save as PDF.
export function ResumeDoc() {
  const linkedIn =
    profile.socials.find((s) => s.label === 'LinkedIn')?.href.replace('https://', '') ?? '';

  return (
    <div
      aria-hidden="true"
      className="resume-doc hidden bg-white font-[Arial,_Helvetica,_sans-serif] text-black print:block"
    >
      <h1 className="text-[24pt] font-bold leading-tight">{profile.name}</h1>
      <p className="mt-1 text-[12pt]">{profile.role}</p>
      <p className="mt-1 text-[10pt]">
        {profile.location} | {profile.email} | {profile.phone} | {linkedIn}
      </p>

      <h2 className="mb-1 mt-4 border-b border-black pb-1 text-[12pt] font-bold uppercase">
        Summary
      </h2>
      <p className="text-[10.5pt] leading-relaxed">{profile.bio}</p>

      <h2 className="mb-1 mt-4 border-b border-black pb-1 text-[12pt] font-bold uppercase">
        Experience
      </h2>
      {experiences.map((e) => (
        <div key={`${e.org}-${e.role}`} className="mb-2">
          <p className="text-[11pt] font-bold">
            {e.role} — {e.org}
          </p>
          <p className="text-[10pt]">{e.period}</p>
        </div>
      ))}

      <h2 className="mb-1 mt-4 border-b border-black pb-1 text-[12pt] font-bold uppercase">
        Selected Work
      </h2>
      {projects.map((p) => (
        <div key={p.id} className="mb-2">
          <p className="text-[11pt] font-bold">
            {p.title} ({p.category}, {p.year})
          </p>
          <p className="text-[10pt]">{p.summary}</p>
          <p className="text-[10pt]">Stack: {p.stack.join(', ')}</p>
        </div>
      ))}

      <h2 className="mb-1 mt-4 border-b border-black pb-1 text-[12pt] font-bold uppercase">
        Education
      </h2>
      <p className="text-[11pt] font-bold">{education.school}</p>
      <p className="text-[10pt]">
        {education.degree}, {education.gpa} ({education.period})
      </p>

      <h2 className="mb-1 mt-4 border-b border-black pb-1 text-[12pt] font-bold uppercase">
        Skills
      </h2>
      <p className="text-[10.5pt] leading-relaxed">{tools.join(', ')}</p>
      <p className="mt-1 text-[10.5pt] leading-relaxed">
        {capabilities.map((c) => c.title).join(' · ')} — {certifications.join('; ')}
      </p>
    </div>
  );
}
