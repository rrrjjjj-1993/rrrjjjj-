'use client';

import { useEffect, useRef } from 'react';
import WorkList from './components/WorkList';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import works from '../lib/works.json';

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
      <Cursor />
      <a href="#works" className="skip-link">跳至作品</a>
      <header className="site-header flex items-center justify-between">
        <a href="#home" className="wordmark" aria-label="Ryan Szeto, home">RYAN SZETO</a>
        <nav aria-label="Main navigation" className="flex items-center gap-7 md:gap-10">
          <a href="#works">WORKS</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <section id="home" ref={opening} className="opening" aria-labelledby="hero-title">
        <div className="hero-sticky">
          
          <div className="hero-visual" role="img" aria-label="黑白波纹背景">
            <div className="ocean-image" />
            
            <span className="image-cross">+</span>
          </div>
          <div className="hero-copy">
            
            <h1 id="hero-title"><span>RYAN</span><span className="surname">SZETO<span className="name-period">.</span></span></h1>
          </div>
          <div className="hero-bottom">
            
            <a href="#works" className="scroll-link"><span>向下浏览作品</span><span className="scroll-arrow">↓</span></a>
            
          </div>
          
        </div>
      </section>

      <section id="works" className="works-section" aria-labelledby="works-title">
        <div className="works-heading"><h2 id="works-title">WORKS</h2></div>
        <WorkList />
      </section>
      <section id="about" className="about-section about-expanded" aria-labelledby="about-title">
        <h2 id="about-title" className="about-title">ABOUT</h2>
        <div className="about-content">
          <div className="about-intro"><h3>Ryan Szeto <span>/ 司徒荣健</span></h3><div className="about-position">创意策划 / 导演</div><p>专注品牌广告、产品影像与数字营销内容，兼顾创意表达与制作落地。从理解品牌需求、提炼产品卖点，到脚本提案、拍摄与后期，能够把一个想法推进为完整的影像作品。</p></div>
          <div className="about-career"><h4>从业经历</h4><p>曾任蓝月亮视频制作经理，带领 5 人团队，参与并推动 50 余条品牌 TVC，合作项目涉及刘雯、彭于晏、杨澜及中国国家跳水队。</p><p>担任《只此青绿》访谈纪录片的创意策划与导演，近年来持续探索 AI 品牌短片与动画叙事。</p></div>
          <div className="about-skills"><h4>核心能力</h4><dl><div><dt>创意策划</dt><dd>提炼品牌与产品卖点，完成创意提案、脚本及分镜。</dd></div><div><dt>导演制作</dt><dd>把控拍摄、后期与成片质量。</dd></div><div><dt>项目统筹</dt><dd>协调团队与供应商，管理预算、进度和交付。</dd></div><div><dt>日语与 AI</dt><dd>日语可作为工作语言，具备 AI 影像创作实践。</dd></div></dl></div>
        </div>
      </section>
      <Contact />

    </main>
  );
}

