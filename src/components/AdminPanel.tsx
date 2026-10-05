import { useState } from 'react';
import {
  capabilities as defaultCapabilities,
  certifications as defaultCerts,
  education as defaultEducation,
  experiences as defaultExperiences,
  profile as defaultProfile,
  projects as defaultProjects,
} from '../data/content';
import type { Project } from '../data/content';

type Tab = 'profile' | 'projects' | 'site';

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
const str = (s: string) => `'${esc(s)}'`;

const cloneProfile = () => ({
  ...defaultProfile,
  socials: defaultProfile.socials.map(s => ({ ...s })),
});
const cloneProjects = (): Project[] => defaultProjects.map(p => ({ ...p, stack: [...p.stack] }));
const cloneCapabilities = () => defaultCapabilities.map(c => ({ ...c }));
const cloneExperiences = () => defaultExperiences.map(e => ({ ...e }));
const cloneEducation = () => ({ ...defaultEducation });

function buildSource(
  profile: ReturnType<typeof cloneProfile>,
  projects: Project[],
  capabilities: ReturnType<typeof cloneCapabilities>,
  experiences: ReturnType<typeof cloneExperiences>,
  certifications: string[],
  education: ReturnType<typeof cloneEducation>
): string {
  const L: string[] = [];
  L.push('// Single source of truth for all site copy.');
  L.push('// Edit here, never hardcode text in components.');
  L.push('// Site language: English.');
  L.push('// Generated via localhost #admin — review diff before committing.');
  L.push('');
  L.push('export const profile = {');
  L.push(`  name: ${str(profile.name)},`);
  L.push(`  initials: ${str(profile.initials)},`);
  L.push(`  role: ${str(profile.role)},`);
  L.push(`  location: ${str(profile.location)},`);
  L.push(`  email: ${str(profile.email)},`);
  L.push(`  phone: ${str(profile.phone)},`);
  L.push(`  tagline: ${str(profile.tagline)},`);
  L.push(`  bio: ${str(profile.bio)},`);
  L.push(`  status: ${str(profile.status)},`);
  L.push('  socials: [');
  profile.socials.forEach(s => {
    L.push(`    { label: ${str(s.label)}, href: ${str(s.href)} },`);
  });
  L.push('  ],');
  L.push('};');
  L.push('');
  L.push('export type Project = {');
  L.push('  id: string;');
  L.push('  title: string;');
  L.push('  category: string;');
  L.push('  year: string;');
  L.push('  stack: string[];');
  L.push('  summary: string;');
  L.push('  image?: string;');
  L.push('  link?: string;');
  L.push('};');
  L.push('');
  L.push('export const projects: Project[] = [');
  projects.forEach((p, i) => {
    const id = `P.${String(i + 1).padStart(2, '0')}`;
    L.push('  {');
    L.push(`    id: ${str(id)},`);
    L.push(`    title: ${str(p.title)},`);
    L.push(`    category: ${str(p.category)},`);
    L.push(`    year: ${str(p.year)},`);
    L.push(`    stack: [${p.stack.map(str).join(', ')}],`);
    L.push(`    summary: ${str(p.summary)},`);
    if (p.image) L.push(`    image: ${str(p.image)},`);
    if (p.link) L.push(`    link: ${str(p.link)},`);
    L.push('  },');
  });
  L.push('];');
  L.push('');
  L.push('export const capabilities = [');
  capabilities.forEach(c => {
    L.push('  {');
    L.push(`    no: ${str(c.no)},`);
    L.push(`    title: ${str(c.title)},`);
    L.push(`    desc: ${str(c.desc)},`);
    L.push('  },');
  });
  L.push('];');
  L.push('');
  L.push('export const experiences = [');
  experiences.forEach(e => {
    L.push(`  { period: ${str(e.period)}, role: ${str(e.role)}, org: ${str(e.org)} },`);
  });
  L.push('];');
  L.push('');
  L.push('export const certifications = [');
  certifications.forEach(c => {
    L.push(`  ${str(c)},`);
  });
  L.push('];');
  L.push('');
  L.push('export const education = {');
  L.push(`  school: ${str(education.school)},`);
  L.push(`  degree: ${str(education.degree)},`);
  L.push(`  gpa: ${str(education.gpa)},`);
  L.push(`  period: ${str(education.period)},`);
  L.push('};');
  L.push('');
  return L.join('\n');
}

function Field({
  label,
  value,
  onChange,
  lines = 1,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  lines?: number;
}) {
  const cls =
    'w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-muted';
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted">
        {label}
      </span>
      {lines > 1 ? (
        <textarea
          value={value}
          rows={lines}
          onChange={e => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function RowButton({
  children,
  onClick,
  danger,
}: {
  children: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-2 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
        danger ? 'border-line text-muted hover:text-ink' : 'border-line text-muted hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

const blankProject = (): Project => ({
  id: '',
  title: 'New Project',
  category: '',
  year: '2025',
  stack: [],
  summary: '',
});

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('profile');
  const [profile, setProfile] = useState(cloneProfile);
  const [projects, setProjects] = useState<Project[]>(cloneProjects);
  const [capabilities, setCapabilities] = useState(cloneCapabilities);
  const [experiences, setExperiences] = useState(cloneExperiences);
  const [certifications, setCertifications] = useState<string[]>([...defaultCerts]);
  const [education, setEducation] = useState(cloneEducation);
  const [copied, setCopied] = useState(false);

  const source = buildSource(
    profile,
    projects,
    capabilities,
    experiences,
    certifications,
    education
  );

  const resetAll = () => {
    setProfile(cloneProfile());
    setProjects(cloneProjects());
    setCapabilities(cloneCapabilities());
    setExperiences(cloneExperiences());
    setCertifications([...defaultCerts]);
    setEducation(cloneEducation());
  };

  const download = () => {
    const blob = new Blob([source], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.ts';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt('Copy content.ts:', source.slice(0, 200) + '… (too long — use Download)');
    }
  };

  const setP = (patch: Partial<ReturnType<typeof cloneProfile>>) =>
    setProfile(p => ({ ...p, ...patch }));

  const move = (arr: Project[], i: number, dir: -1 | 1): Project[] => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return arr;
    const next = [...arr];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  };

  return (
    <div className="min-h-screen bg-base font-sans text-ink">
      <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Admin — localhost only, never in production
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Content editor</h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {(['profile', 'projects', 'site'] as Tab[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                tab === t ? 'border-ink bg-ink text-base' : 'border-line text-muted hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          {tab === 'profile' && (
            <>
              <Field label="Name" value={profile.name} onChange={v => setP({ name: v })} />
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Initials"
                  value={profile.initials}
                  onChange={v => setP({ initials: v })}
                />
                <Field label="Role" value={profile.role} onChange={v => setP({ role: v })} />
                <Field
                  label="Location"
                  value={profile.location}
                  onChange={v => setP({ location: v })}
                />
                <Field label="Email" value={profile.email} onChange={v => setP({ email: v })} />
                <Field label="Phone" value={profile.phone} onChange={v => setP({ phone: v })} />
                <Field label="Status" value={profile.status} onChange={v => setP({ status: v })} />
              </div>
              <Field label="Tagline" value={profile.tagline} onChange={v => setP({ tagline: v })} />
              <Field label="Bio" value={profile.bio} onChange={v => setP({ bio: v })} lines={4} />
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                  Socials
                </p>
                <div className="space-y-3">
                  {profile.socials.map((s, i) => (
                    <div key={i} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                      <Field
                        label="Label"
                        value={s.label}
                        onChange={v =>
                          setProfile(p => ({
                            ...p,
                            socials: p.socials.map((x, j) => (j === i ? { ...x, label: v } : x)),
                          }))
                        }
                      />
                      <Field
                        label="URL"
                        value={s.href}
                        onChange={v =>
                          setProfile(p => ({
                            ...p,
                            socials: p.socials.map((x, j) => (j === i ? { ...x, href: v } : x)),
                          }))
                        }
                      />
                      <div className="flex items-end pb-1">
                        <RowButton
                          danger
                          onClick={() =>
                            setProfile(p => ({
                              ...p,
                              socials: p.socials.filter((_, j) => j !== i),
                            }))
                          }
                        >
                          del
                        </RowButton>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <RowButton
                    onClick={() =>
                      setProfile(p => ({ ...p, socials: [...p.socials, { label: '', href: '' }] }))
                    }
                  >
                    + social
                  </RowButton>
                </div>
              </div>
            </>
          )}

          {tab === 'projects' && (
            <>
              {projects.map((p, i) => (
                <div key={i} className="space-y-4 border border-line p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-muted">
                      P.{String(i + 1).padStart(2, '0')} (auto id)
                    </p>
                    <div className="flex gap-2">
                      <RowButton onClick={() => setProjects(ps => move(ps, i, -1))}>↑</RowButton>
                      <RowButton onClick={() => setProjects(ps => move(ps, i, 1))}>↓</RowButton>
                      <RowButton
                        danger
                        onClick={() => setProjects(ps => ps.filter((_, j) => j !== i))}
                      >
                        del
                      </RowButton>
                    </div>
                  </div>
                  <Field
                    label="Title"
                    value={p.title}
                    onChange={v =>
                      setProjects(ps => ps.map((x, j) => (j === i ? { ...x, title: v } : x)))
                    }
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Category"
                      value={p.category}
                      onChange={v =>
                        setProjects(ps => ps.map((x, j) => (j === i ? { ...x, category: v } : x)))
                      }
                    />
                    <Field
                      label="Year"
                      value={p.year}
                      onChange={v =>
                        setProjects(ps => ps.map((x, j) => (j === i ? { ...x, year: v } : x)))
                      }
                    />
                  </div>
                  <Field
                    label="Stack (comma separated)"
                    value={p.stack.join(', ')}
                    onChange={v =>
                      setProjects(ps =>
                        ps.map((x, j) =>
                          j === i
                            ? {
                                ...x,
                                stack: v
                                  .split(',')
                                  .map(s => s.trim())
                                  .filter(Boolean),
                              }
                            : x
                        )
                      )
                    }
                  />
                  <Field
                    label="Summary"
                    value={p.summary}
                    onChange={v =>
                      setProjects(ps => ps.map((x, j) => (j === i ? { ...x, summary: v } : x)))
                    }
                    lines={2}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Image path (optional)"
                      value={p.image ?? ''}
                      onChange={v =>
                        setProjects(ps =>
                          ps.map((x, j) => (j === i ? { ...x, image: v || undefined } : x))
                        )
                      }
                    />
                    <Field
                      label="Link (optional)"
                      value={p.link ?? ''}
                      onChange={v =>
                        setProjects(ps =>
                          ps.map((x, j) => (j === i ? { ...x, link: v || undefined } : x))
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <RowButton onClick={() => setProjects(ps => [...ps, blankProject()])}>
                + project
              </RowButton>
            </>
          )}

          {tab === 'site' && (
            <>
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                  Capabilities
                </p>
                <div className="space-y-3">
                  {capabilities.map((c, i) => (
                    <div
                      key={i}
                      className="grid gap-3 border border-line p-4 md:grid-cols-[auto_1fr]"
                    >
                      <Field
                        label="No"
                        value={c.no}
                        onChange={v =>
                          setCapabilities(cs => cs.map((x, j) => (j === i ? { ...x, no: v } : x)))
                        }
                      />
                      <div className="space-y-3">
                        <Field
                          label="Title"
                          value={c.title}
                          onChange={v =>
                            setCapabilities(cs =>
                              cs.map((x, j) => (j === i ? { ...x, title: v } : x))
                            )
                          }
                        />
                        <Field
                          label="Desc"
                          value={c.desc}
                          onChange={v =>
                            setCapabilities(cs =>
                              cs.map((x, j) => (j === i ? { ...x, desc: v } : x))
                            )
                          }
                          lines={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                  Experience
                </p>
                <div className="space-y-3">
                  {experiences.map((e, i) => (
                    <div key={i} className="grid gap-3 border border-line p-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <Field
                          label="Period"
                          value={e.period}
                          onChange={v =>
                            setExperiences(es =>
                              es.map((x, j) => (j === i ? { ...x, period: v } : x))
                            )
                          }
                        />
                        <Field
                          label="Role"
                          value={e.role}
                          onChange={v =>
                            setExperiences(es =>
                              es.map((x, j) => (j === i ? { ...x, role: v } : x))
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                        <Field
                          label="Org"
                          value={e.org}
                          onChange={v =>
                            setExperiences(es => es.map((x, j) => (j === i ? { ...x, org: v } : x)))
                          }
                        />
                        <div className="flex items-end pb-1">
                          <RowButton
                            danger
                            onClick={() => setExperiences(es => es.filter((_, j) => j !== i))}
                          >
                            del
                          </RowButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <RowButton
                    onClick={() => setExperiences(es => [...es, { period: '', role: '', org: '' }])}
                  >
                    + experience
                  </RowButton>
                </div>
              </div>
              <Field
                label="Certifications (one per line)"
                value={certifications.join('\n')}
                onChange={v =>
                  setCertifications(
                    v
                      .split('\n')
                      .map(s => s.trim())
                      .filter(Boolean)
                  )
                }
                lines={5}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="School"
                  value={education.school}
                  onChange={v => setEducation(e => ({ ...e, school: v }))}
                />
                <Field
                  label="Degree"
                  value={education.degree}
                  onChange={v => setEducation(e => ({ ...e, degree: v }))}
                />
                <Field
                  label="GPA"
                  value={education.gpa}
                  onChange={v => setEducation(e => ({ ...e, gpa: v }))}
                />
                <Field
                  label="Period"
                  value={education.period}
                  onChange={v => setEducation(e => ({ ...e, period: v }))}
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
          <button
            type="button"
            onClick={download}
            className="border border-ink bg-ink px-4 py-2 font-mono text-base text-xs uppercase tracking-widest"
          >
            Download content.ts
          </button>
          <button
            type="button"
            onClick={copy}
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
          >
            {copied ? 'Copied ✓' : 'Copy source'}
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
          >
            Reset
          </button>
        </div>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
          Replace src/data/content.ts with the export → run npm run format → restart dev. Exit:
          remove #admin from the URL.
        </p>
      </div>
    </div>
  );
}
