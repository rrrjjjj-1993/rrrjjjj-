'use client';

import { useEffect, useRef } from 'react';

const projects = [
  { number: '01', title: 'A different perspective.', category: 'BRAND FILM / CREATIVE DIRECTION', style: 'perspective' },
  { number: '02', title: 'Between the ordinary.', category: 'DIRECTOR’S WORK / VISUAL STORYTELLING', style: 'ordinary' },
  { number: '03', title: 'Beyond what is real.', category: 'AI EXPLORATIONS / DIGITAL IMAGERY', style: 'beyond' },
];

export default function Home() {
  const opening = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const render = () => {
      frame = 0;
      const section = opening.current;
      if (!section) return;
      const progress = media.matches ? 0 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / window.innerHeight));
      section.style.setProperty('--progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <main>
      <a href="#works" className="skip-link">Skip to selected works</a>
      <header className="site-header flex items-center justify-between">
        <a href="#home" className="wordmark" aria-label="Ryan Szeto, home">RS<span className="mark-dot">.</span></a>
        <nav aria-label="Main navigation" className="flex items-center gap-7 md:gap-10">
          <a href="#works">WORKS<span className="nav-count">03</span></a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT<span className="nav-arrow">↗</span></a>
        </nav>
      </header>

      <section id="home" ref={opening} className="opening" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <div className="hero-index"><span className="status-dot" /> INDEPENDENT CREATIVE · PORTFOLIO 2026</div>
          <div className="hero-visual" role="img" aria-label="Monochrome ocean waves, a conceptual image placeholder">
            <div className="ocean-image" />
            <span className="image-caption">FIG. 001 — A STUDY IN MOTION</span>
            <span className="image-cross">+</span>
          </div>
          <div className="hero-copy">
            <p className="hero-role">CREATIVE PLANNER / DIRECTOR</p>
            <h1 id="hero-title"><span>RYAN</span><span className="surname">SZETO<span className="name-period">.</span></span></h1>
          </div>
          <div className="hero-bottom">
            <p>Ideas with intention.<br /><span>Images that stay.</span></p>
            <a href="#works" className="scroll-link"><span>SCROLL TO EXPLORE</span><span className="scroll-arrow">↓</span></a>
            <span className="hero-coordinate">STRATEGY MEETS<br />MOVING IMAGE</span>
          </div>
          <span className="side-label">LOOK A LITTLE CLOSER</span>
        </div>
      </section>

      <section id="works" className="works-section" aria-labelledby="works-title">
        <div className="section-top flex justify-between items-center"><span>01 / SELECTED WORKS</span><span>A FEW THINGS TO COME ↙</span></div>
        <div className="works-heading"><h2 id="works-title">Selected<br /><span>perspectives.</span></h2><p>From the first idea to the final frame.<br />A selection of stories, experiments<br />and possibilities.</p></div>
        <div className="project-grid">
          {projects.map(project => <article className="project" key={project.number}>
            <div className={`project-image ${project.style}`}><span className="project-number">/{project.number}</span><span className="preview-badge">CONCEPT PREVIEW</span><span className="project-symbol" aria-hidden="true">{project.number === '01' ? '↗' : project.number === '02' ? '◯' : '✳'}</span></div>
            <div className="project-meta"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
            <p className="project-category">{project.category}</p>
          </article>)}
        </div>
        <p className="works-note">A portfolio in progress. Full projects coming soon.</p>
      </section>

      <section id="about" className="about-section"><span className="eyebrow">02 / THE APPROACH</span><p>I connect <em>ideas</em> with images.<br />Thoughtfully planned.<br />Distinctively directed.</p><span className="about-role">RYAN SZETO<br />CREATIVE PLANNER / DIRECTOR</span></section>
      <footer id="contact"><div><span className="eyebrow">03 / LET’S CONNECT</span><h2>Let’s make<br /><em>something matter.</em></h2><p className="contact-note">Available for creative planning & directing opportunities.<br />Contact details coming soon.</p></div><div className="footer-bottom flex justify-between"><span>© 2026 RYAN SZETO</span><a href="#home">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}
