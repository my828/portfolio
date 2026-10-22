import { useEffect, useState } from 'react';
import { profile, experience, education, skills, projects, capstone, hobbies } from './data.js';

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const allProjects = [...projects, capstone];

// Hash routes: #about, #projects, #projects/<slug>, #contact
function routeFromHash() {
  const [id, slug] = window.location.hash.replace('#', '').split('/');
  const tab = TABS.some((t) => t.id === id) ? id : 'about';
  const project = tab === 'projects' && slug ? allProjects.find((p) => p.slug === slug) : null;
  return { tab, project };
}

export default function App() {
  const [{ tab, project }, setRoute] = useState(routeFromHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="shell">
      <header className="header">
        <a href="#about" className="brand">
          <span className="brand-mark">MY</span>
          <span>{profile.name}</span>
        </a>
        <nav className="tabs" role="tablist">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              role="tab"
              aria-selected={tab === t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </header>

      <main key={project ? project.slug : tab} className="panel">
        {tab === 'about' && <About />}
        {tab === 'projects' && (project ? <ProjectDetail project={project} /> : <Projects />)}
        {tab === 'contact' && <Contact />}
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · {profile.location}
      </footer>
    </div>
  );
}

function About() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">{profile.title} · {profile.location}</p>
        <h1>
          Building <span className="accent">event-driven</span>, high-scale systems.
        </h1>
        <p className="lede">{profile.summary}</p>
        <div className="actions">
          <a className="btn primary" href="#projects">View projects</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
      </section>

      <section className="grid-2">
        <div className="card">
          <h2>Experience</h2>
          <ul className="timeline">
            {experience.map((e) => (
              <li key={e.company}>
                <div className="row">
                  <strong>{e.company}</strong>
                  <span className="muted mono">{e.dates}</span>
                </div>
                <span className="muted">{e.role}</span>
              </li>
            ))}
          </ul>
          <h2 className="spaced">Education</h2>
          <strong>{education.school}</strong>
          <p className="muted">{education.degree}</p>
        </div>

        <div className="card">
          <h2>Skills</h2>
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skill-group">
              <h3>{group}</h3>
              <div className="chips">
                {items.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card hobbies">
        <h2>Outside of Work</h2>
        <div className="hobby-grid">
          {hobbies.map((h) => (
            <div key={h.name} className="hobby">
              {h.image ? (
                <img
                  className="hobby-icon hobby-img"
                  src={h.image}
                  alt=""
                  style={h.imageBg ? { background: h.imageBg } : undefined}
                />
              ) : (
                <span className="hobby-icon" aria-hidden="true">{h.icon}</span>
              )}
              <div>
                <strong>{h.name}</strong>
                <p className="muted">{h.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Projects() {
  return (
    <section>
      <h1 className="page-title">Projects</h1>

      <h2 className="section-label">Professional Work</h2>
      {/* <p className="lede">Selected work from fintech platforms at SoFi and Better.com.</p> */}
      <div className="project-grid">
        {projects.map((p) => {
          const Card = p.slug ? 'a' : 'article';
          return (
          <Card
            key={p.name}
            href={p.slug ? `#projects/${p.slug}` : undefined}
            className={`card project ${p.slug ? 'clickable' : ''}`}
          >
            <p className="eyebrow">{p.org}</p>
            <h2>{p.name}</h2>
            {p.metric && (
              <div className="metric">
                <span className="metric-value">{p.metric}</span>
                <span className="muted">{p.metricLabel}</span>
              </div>
            )}
            <p className="muted">{p.description}</p>
            <div className="chips">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            {p.slug && <span className="link-hint">Read more →</span>}
          </Card>
          );
        })}
      </div>

      <h2 className="section-label">Capstone</h2>
      <a className="card capstone" href={`#projects/${capstone.slug}`}>
        <div>
          <p className="eyebrow">{capstone.label}</p>
          <h2 className="capstone-name">{capstone.name}</h2>
          <p className="muted capstone-desc">{capstone.description}</p>
          <p className="capstone-role">
            <span className="muted">Role:</span> {capstone.role}
          </p>
          <div className="chips">
            {capstone.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <span className="link-hint">Read more →</span>
        </div>
        <div className="award">
          <span className="award-badge">🏆 {capstone.award}</span>
          <span className="muted">{capstone.awardDetail}</span>
        </div>
      </a>
    </section>
  );
}

// Matches metrics like −40%, +50%, $100M+, 10K+, 2×, ~$4, ~2 months, 2–3 years, 130+.
const NUMBER_RE = /([~+−$]*\d[\d,.]*(?:[–-]\d+)?[KMB]?[%×+]*(?:\s(?:months?|weeks?|minutes?|years?|products))?)/g;

function highlightNumbers(text) {
  return text.split(NUMBER_RE).map((part, i) =>
    i % 2 ? <span key={i} className="num">{part}</span> : part
  );
}

// Sections with no content are hidden in production; in dev they show a
// placeholder so missing details are easy to spot.
function DetailSection({ title, filled, children }) {
  if (!filled && !import.meta.env.DEV) return null;
  return (
    <section className="detail-section">
      <h2 className="section-label">{title}</h2>
      {filled ? children : <p className="draft-note">Draft: not filled in yet. Hidden on the live site.</p>}
    </section>
  );
}

function ProjectDetail({ project: p }) {
  return (
    <article className="detail">
      <a href="#projects" className="back-link">← All projects</a>

      <header className="detail-header">
        <p className="eyebrow">{p.label || p.org}</p>
        <h1 className="page-title">{p.name}</h1>
        {p.metric && (
          <div className="metric">
            <span className="metric-value">{p.metric}</span>
            <span className="muted">{p.metricLabel}</span>
          </div>
        )}
        {p.award && (
          <div className="award">
            <span className="award-badge">🏆 {p.award}</span>
            <span className="muted">{p.awardDetail}</span>
          </div>
        )}
        <div className="chips">
          {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        {p.url && (
          <div>
            <a className="btn primary" href={p.url} target="_blank" rel="noreferrer">
              Visit live site ↗
            </a>
          </div>
        )}
      </header>

      <DetailSection title="The Problem" filled={!!p.problem}>
        <p className="detail-text">{p.problem}</p>
        {p.role && <p className="detail-role"><span className="muted">My role:</span> {p.role}</p>}
      </DetailSection>

      {p.solution && (
        <DetailSection title="The Solution" filled>
          <p className="detail-text">{p.solution}</p>
        </DetailSection>
      )}

      <DetailSection title="Architecture" filled={p.architecture?.length > 0}>
        <ol className="arch-flow">
          {p.architecture?.map((node) => (
            <li key={node.label} className="arch-node">
              <strong>{node.label}</strong>
              <span className="muted">{node.detail}</span>
            </li>
          ))}
        </ol>
      </DetailSection>

      <DetailSection title="Technical Challenges" filled={p.challenges?.length > 0}>
        <ul className="detail-list">
          {p.challenges?.map((c) => {
            const i = c.indexOf(': ');
            return (
              <li key={c}>
                {i > 0 ? <><strong>{c.slice(0, i)}:</strong> {c.slice(i + 2)}</> : c}
              </li>
            );
          })}
        </ul>
      </DetailSection>

      <DetailSection title="Impact" filled={p.impact?.length > 0}>
        <ul className="impact-list">
          {p.impact?.map((i) => <li key={i} className="card">{highlightNumbers(i)}</li>)}
        </ul>
      </DetailSection>

      {p.lesson && (
        <DetailSection title="Lesson Learned" filled>
          <blockquote className="lesson">{p.lesson}</blockquote>
        </DetailSection>
      )}

      <a href="#projects" className="back-link bottom">← All projects</a>
    </article>
  );
}

function Contact() {
  const [copied, setCopied] = useState('');

  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      /* clipboard unavailable — link still works */
    }
  };

  const items = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { label: 'LinkedIn', value: 'linkedin.com/in/minyang828', href: profile.linkedin },
  ];

  return (
    <section className="contact">
      <h1 className="page-title">Let's talk.</h1>
      <p className="lede">
        Open to software engineering roles. The fastest way to reach me is email.
      </p>
      <div className="contact-list">
        {items.map((i) => (
          <div key={i.label} className="card contact-item">
            <span className="eyebrow">{i.label}</span>
            <a href={i.href} target={i.label === 'LinkedIn' ? '_blank' : undefined} rel="noreferrer">
              {i.value}
            </a>
            {i.label !== 'LinkedIn' && (
              <button className="copy" onClick={() => copy(i.value, i.label)}>
                {copied === i.label ? 'Copied ✓' : 'Copy'}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
