import { useEffect, useState } from 'react';
import { profile, experience, education, skills, projects, capstone } from './data.js';

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function tabFromHash() {
  const id = window.location.hash.replace('#', '');
  return TABS.some((t) => t.id === id) ? id : 'about';
}

export default function App() {
  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
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

      <main key={tab} className="panel">
        {tab === 'about' && <About />}
        {tab === 'projects' && <Projects />}
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
    </>
  );
}

function Projects() {
  return (
    <section>
      <h1 className="page-title">Projects</h1>

      <h2 className="section-label">Capstone</h2>
      <a className="card capstone" href={capstone.url} target="_blank" rel="noreferrer">
        <div>
          <p className="eyebrow">{capstone.label}</p>
          <h2 className="capstone-name">{capstone.name}</h2>
          <span className="link-hint">View project ↗</span>
        </div>
        <div className="award">
          <span className="award-badge">🏆 {capstone.award}</span>
          <span className="muted">{capstone.awardDetail}</span>
        </div>
      </a>

      <h2 className="section-label">Professional Work</h2>
      <p className="lede">Selected work from fintech platforms at SoFi and Better.com.</p>
      <div className="project-grid">
        {projects.map((p) => (
          <article key={p.name} className="card project">
            <p className="eyebrow">{p.org}</p>
            <h2>{p.name}</h2>
            <div className="metric">
              <span className="metric-value">{p.metric}</span>
              <span className="muted">{p.metricLabel}</span>
            </div>
            <p className="muted">{p.description}</p>
            <div className="chips">
              {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
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
