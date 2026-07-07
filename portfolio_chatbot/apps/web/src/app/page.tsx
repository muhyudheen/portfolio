'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // --- Entire GSAP/DOM Script imported exactly ---
    // Make sure GSAP is ready
    if (typeof window === 'undefined' || !(window as any).gsap) return;
    
    // Prevent double init in dev mode
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    
    const isMobile = window.innerWidth <= 900;
    
    gsap.set(".cursor", { autoAlpha: 0 });
    gsap.set(".cursor-label", { autoAlpha: 0, scale: 0.8 });
    
    const plName = document.querySelector('.pl-name-inner');
    const plBar = document.querySelector('.pl-bar');
    const preloader = document.getElementById('preloader');
    
    const initAnimations = () => {
      gsap.to(".cursor", { autoAlpha: 1, duration: 0.3 });
      
      const tl = gsap.timeline();
      tl.to(plName, { y: "0%", duration: 0.8, ease: "power4.out" })
        .to(plBar, { width: "100%", duration: 0.9, ease: "cubic-bezier(0.76, 0, 0.24, 1)" }, "-=0.4")
        .to(preloader, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" })
        .fromTo(".nav-logo, .nav-right", { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .to(".hero-eyebrow span", { y: "0%", duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(".hero-title .tl span", { y: "0%", duration: 0.8, stagger: 0.08, ease: "power4.out" }, "-=0.4")
        .fromTo(".hero-desc", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(".pill", { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.3")
        .to(".sh-line", { height: 64, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .fromTo(".scroll-hint span", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "-=0.2")
        .add(() => {
          ScrollTrigger.refresh();
        });
        
      if(!isMobile) {
        ScrollTrigger.create({
          start: "top -50",
          end: 99999,
          toggleClass: { className: "scrolled", targets: "nav" }
        });
      }
      
      gsap.utils.toArray('.s-title .tl span').forEach((span: any) => {
        gsap.to(span, {
          y: "0%",
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: span.closest('.s-title'), start: "top 90%" }
        });
      });
      
      gsap.utils.toArray('.pcard').forEach((card: any, i: number) => {
        gsap.fromTo(card, { autoAlpha: 0, y: 40 }, {
          autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        });
        
        const count = card.querySelector('.pm-val');
        if (count && count.dataset.val) {
          const val = parseFloat(count.dataset.val);
          const isFloat = val % 1 !== 0;
          gsap.to(count, {
            innerHTML: val,
            duration: 1.5,
            ease: "power2.out",
            snap: { innerHTML: isFloat ? 0.1 : 1 },
            onUpdate: function() {
              if(isFloat) {
                count.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
              }
            },
            scrollTrigger: { trigger: card, start: "top 80%" }
          });
        }
      });
      
      gsap.fromTo(".about-bio p", { autoAlpha: 0, y: 20 }, {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-bio", start: "top 85%" }
      });
      
      gsap.utils.toArray('.exp-item, .award-item').forEach((item: any, i: number) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 15 }, {
          autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 90%" }
        });
      });
      
      gsap.utils.toArray('.skill-pill').forEach((pill: any, i: number) => {
        gsap.fromTo(pill, { autoAlpha: 0, scale: 0.9 }, {
          autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)",
          delay: i * 0.03,
          scrollTrigger: { trigger: ".skills-row", start: "top 90%" }
        });
      });
      
      const cTlItems = document.querySelectorAll('.contact-headline .tl span');
      if (cTlItems.length) {
        gsap.fromTo(cTlItems, { y: "110%" }, {
          y: "0%", duration: 0.8, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".contact-headline", start: "top 85%" }
        });
      }
    };
    
    if (document.readyState === 'complete') {
      initAnimations();
    } else {
      window.addEventListener('load', initAnimations);
      // fallback if load event already happened but state isn't complete
      setTimeout(initAnimations, 100);
    }
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorLabelText = document.getElementById('cursorLabelText');
    const hoverElements = document.querySelectorAll('[data-cursor]');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
    };
    
    const onMouseLeave = () => gsap.set(cursor, { autoAlpha: 0 });
    const onMouseEnter = () => gsap.set(cursor, { autoAlpha: 1 });
    
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    const raf = requestAnimationFrame;
    const renderCursor = () => {
      cursorX = mouseX;
      cursorY = mouseY;
      gsap.set(cursor, { x: cursorX, y: cursorY });
      raf(renderCursor);
    };
    raf(renderCursor);
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const type = el.getAttribute('data-cursor');
        document.body.classList.add('is-hovering');
        if (type === 'view') {
          if(cursorLabelText) cursorLabelText.textContent = 'View';
        } else if (type === 'external') {
          if(cursorLabelText) cursorLabelText.textContent = 'Open';
        } else {
          if(cursorLabelText) cursorLabelText.textContent = 'Click';
        }
        gsap.to(".cursor-label", { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(1.5)" });
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('is-hovering');
        gsap.to(".cursor-label", { autoAlpha: 0, scale: 0.8, duration: 0.2, ease: "power2.in" });
      });
    });
    
    // Theme Toggle
    const themeBtn = document.getElementById('themeToggle');
    const tIcon = themeBtn?.querySelector('.t-icon');
    const tLabel = themeBtn?.querySelector('.t-label');
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
       document.documentElement.setAttribute('data-theme', 'light');
       if(tIcon) tIcon.textContent = '☾';
       if(tLabel) tLabel.textContent = 'Dark';
    }
    
    themeBtn?.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        if(tIcon) tIcon.textContent = '☾';
        if(tLabel) tLabel.textContent = 'Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(tIcon) tIcon.textContent = '☀';
        if(tLabel) tLabel.textContent = 'Light';
      }
    });

    const copyBtn = document.querySelector('.copy-btn');
    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText('muhyudheenthengilan@gmail.com').then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('load', initAnimations);
      // Clean up gsap
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <main>
      <header id="hero">
        <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 9vw, 130px)' }}>
          <span className="tl"><span>Muhammed</span></span>
          <span className="tl"><span>Muhyudeen</span></span>
        </h1>
        
        <div className="hero-bottom">
          <p className="hero-desc">
            Machine Learning & Deep Learning Specialist combining advanced algorithms with autonomous systems. Focused on building intelligent, scalable, and agentic AI solutions that solve complex real-world problems.
          </p>
          
          <div className="hero-right">
            <div className="pill available">
              <div className="pill-dot"></div>
              Available for Work
            </div>
            <a href="#work" className="cv-btn" data-cursor="hover">
              View Work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="sh-line"></div>
        </div>
      </header>

      <div className="marquee-wrap">
        <div className="marquee-track">
          <div className="mq-item">Artificial Intelligence</div>
          <div className="mq-item">Machine Learning</div>
          <div className="mq-item">Gen AI</div>
          <div className="mq-item">PyTorch</div>
          <div className="mq-item">TensorFlow</div>
          <div className="mq-item">Neural Networks</div>
          <div className="mq-item">Deep Learning</div>
          <div className="mq-item">Large Language Models</div>
          <div className="mq-item">Computer Vision</div>
          <div className="mq-item">Predictive Modeling</div>
          
          <div className="mq-item">Artificial Intelligence</div>
          <div className="mq-item">Machine Learning</div>
          <div className="mq-item">Gen AI</div>
          <div className="mq-item">PyTorch</div>
          <div className="mq-item">TensorFlow</div>
          <div className="mq-item">Neural Networks</div>
          <div className="mq-item">Deep Learning</div>
          <div className="mq-item">Large Language Models</div>
          <div className="mq-item">Computer Vision</div>
          <div className="mq-item">Predictive Modeling</div>
        </div>
      </div>

      <section id="work">
        <div className="s-header">
          <div>
            <div className="s-label">Selected Projects</div>
            <h2 className="s-title">
              <span className="tl"><span>Featured</span></span>
              <span className="tl"><span>Work</span></span>
            </h2>
          </div>
          <div className="s-count">(03)</div>
        </div>

        <div className="projects">
          
          <a href="#" className="pcard p-caixabank" data-cursor="view">
            <div className="pcard-vis">
              <div className="pcard-bg"></div>
              <div className="blob blob1"></div>
              <div className="blob blob2"></div>
              {/* <div className="pcard-img-overlay"></div> */}
              <div className="p-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EDEDE8" strokeWidth="2">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="5 5 19 5 19 19"></polyline>
                </svg>
              </div>
            </div>
            <div className="pcard-info">
              <div className="pcard-top">
                <div className="tags">
                  <span className="tag">Next.js</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">A11y</span>
                </div>
              </div>
              <div className="pcard-mid">
                <div className="pcompany">CaixaBank</div>
                <h3 className="pname">Digital Banking Platform Redesign</h3>
                <div className="pyear">2023 — 2024</div>
              </div>
              <div className="pcard-bot">
                <div className="pmetrics">
                  <div className="pmetric">
                    <span className="pm-val" data-val="40">+0%</span>
                    <span className="pm-label">increase in task completion rate</span>
                  </div>
                  <div className="pmetric">
                    <span className="pm-val" data-val="1.5">0s</span>
                    <span className="pm-label">sec app load time improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="pcard p-gymondo1" data-cursor="view">
            <div className="pcard-vis">
              <div className="pcard-bg"></div>
              <div className="blob blob1"></div>
              <div className="blob blob2"></div>
              <div className="p-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EDEDE8" strokeWidth="2">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="5 5 19 5 19 19"></polyline>
                </svg>
              </div>
            </div>
            <div className="pcard-info">
              <div className="pcard-top">
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">Redux</span>
                  <span className="tag">Cypress</span>
                </div>
              </div>
              <div className="pcard-mid">
                <div className="pcompany">Gymondo</div>
                <h3 className="pname">Core Workout Experience UI</h3>
                <div className="pyear">2022 — 2023</div>
              </div>
              <div className="pcard-bot">
                <div className="pmetrics">
                  <div className="pmetric">
                    <span className="pm-val" data-val="2.5">0M</span>
                    <span className="pm-label">active daily users supported</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="pcard p-zattoo" data-cursor="view">
            <div className="pcard-vis">
              <div className="pcard-bg"></div>
              <div className="blob blob1"></div>
              <div className="blob blob2"></div>
              <div className="p-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EDEDE8" strokeWidth="2">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="5 5 19 5 19 19"></polyline>
                </svg>
              </div>
            </div>
            <div className="pcard-info">
              <div className="pcard-top">
                <div className="tags">
                  <span className="tag">Vue.js</span>
                  <span className="tag">RxJS</span>
                  <span className="tag">WebSockets</span>
                </div>
              </div>
              <div className="pcard-mid">
                <div className="pcompany">Zattoo</div>
                <h3 className="pname">Live TV Streaming Client</h3>
                <div className="pyear">2020 — 2022</div>
              </div>
              <div className="pcard-bot">
                <div className="pmetrics">
                  <div className="pmetric">
                    <span className="pm-val" data-val="60">0fps</span>
                    <span className="pm-label">consistent rendering performance</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', paddingBottom: '2rem', gridColumn: '1 / -1' }}>
            <a href="/showcase" className="cv-btn" data-cursor="hover" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', padding: '1rem 2rem', fontSize: '0.9rem' }}>
              View Full Showcase
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>
      </section>

      <section id="about">
        <div className="s-header">
          <div>
            <div className="s-label">About Me</div>
            <h2 className="s-title">
              <span className="tl"><span>Background</span></span>
            </h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            <p>I'm a Machine Learning and Agentic AI specialist focused on the intersection of <em>rigorous data science and intelligent autonomous systems.</em> Through my dual-track studies in Data Science and Mechanical Engineering at IIT Madras, I build predictive models that bridge theoretical mathematics with automated AI pipelines.</p>
            <p>Recently, I engineered a high-speed Weather Intel Bot using FastAPI, developed predictive models for Formula 1 pit stops in Kaggle competitions, and architected complex machine learning pipelines designed to solve advanced fluid dynamics and Navier-Stokes equations.</p>
            <p>My approach is rooted in robust pipeline engineering, leveraging deep learning architectures and backend frameworks like FastAPI when complexity demands it, while maintaining strict evaluation metrics and utilizing AI-native workflows within WSL to accelerate development.</p>
          </div>

          <div className="about-side">
            <div className="detail-group">
              <h4 className="detail-h">Experience</h4>
              <div className="exp-list">
                <div className="exp-item">
                  <div className="ei-l">
                    <span className="ei-co">CaixaBank</span>
                    <span className="ei-role">Senior Front End Developer</span>
                  </div>
                  <span className="ei-yr">23 — 24</span>
                </div>
                <div className="exp-item">
                  <div className="ei-l">
                    <span className="ei-co">Gymondo</span>
                    <span className="ei-role">Front End Developer</span>
                  </div>
                  <span className="ei-yr">22 — 23</span>
                </div>
                <div className="exp-item">
                  <div className="ei-l">
                    <span className="ei-co">Zattoo</span>
                    <span className="ei-role">Mid-Weight Web Developer</span>
                  </div>
                  <span className="ei-yr">20 — 22</span>
                </div>
                <div className="exp-item">
                  <div className="ei-l">
                    <span className="ei-co">NTT Data</span>
                    <span className="ei-role">Junior Frontend Developer</span>
                  </div>
                  <span className="ei-yr">18 — 20</span>
                </div>
              </div>
            </div>
            
            <div className="detail-group">
              <h4 className="detail-h">Core Stack</h4>
              <div className="skills-row">
                <span className="skill-pill">Python</span>
                <span className="skill-pill">PyTorch</span>
                <span className="skill-pill">TensorFlow</span>
                <span className="skill-pill">Keras</span>
                <span className="skill-pill">Colab</span>
                <span className="skill-pill">Kaggle</span>
                <span className="skill-pill">Sci-kit Learn</span>
                <span className="skill-pill">LangChain</span>
                <span className="skill-pill">XGBoost</span>
                <span className="skill-pill">LightGBM</span>
                <span className="skill-pill">HuggingFace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="s-label">Get in Touch</div>
        <h2 className="contact-headline">
          <span className="tl"><span>Let's build</span></span>
          <span className="tl"><span>something</span></span>
          <span className="tl"><span><a href="mailto:muhyudheenthengilan@gmail.com" data-cursor="hover">together.</a></span></span>
        </h2>

        <div className="contact-footer">
          <div className="cf-left">
            <div className="cf-email-row">
              <a href="mailto:muhyudheenthengilan@gmail.com" className="direct-email-link" data-cursor="hover">
                muhyudheenthengilan@gmail.com
              </a>
              <button className="copy-btn" aria-label="Copy email" title="Copy to clipboard" data-cursor="hover">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <p>Available for freelance opportunities.</p>
          </div>
          
          <div className="cf-right">
            <a href="https://www.linkedin.com/in/muhyudheen77" target="_blank" rel="noreferrer" data-cursor="external">LinkedIn</a>
            <a href="https://github.com/muhyudheen" target="_blank" rel="noreferrer" data-cursor="external">GitHub</a>
            <a href="#" data-cursor="hover">Resume (PDF)</a>
          </div>
        </div>
        
        <div className="copy">
          © {new Date().getFullYear()} Muhammed Muhyudeen. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
