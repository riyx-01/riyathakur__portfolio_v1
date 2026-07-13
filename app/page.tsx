'use client';

import React, { useEffect } from 'react';
import AchievementsSection from '../components/portfolio/AchievementsSection';
import GlobalMatrixRain from '../components/portfolio/GlobalMatrixRain';
import SplashCursor from '../components/portfolio/SplashCursor';

export default function Home() {

  useEffect(() => {
    // 1. Gooey Nav Logic
    const navItems = document.querySelectorAll('.nav-item');
    const navBlob = document.getElementById('nav-blob');

    function updateNavBlob(activeItem: Element) {
        if (!activeItem || !navBlob) return;
        const itemRect = activeItem.getBoundingClientRect();
        const containerRect = activeItem.parentElement!.getBoundingClientRect();
        
        const leftOffset = itemRect.left - containerRect.left;
        const width = itemRect.width;
        
        navBlob.style.transform = `translateX(${leftOffset}px)`;
        navBlob.style.width = `${width}px`;
    }

    const initialActive = document.querySelector('.nav-item.active');
    if (initialActive) updateNavBlob(initialActive);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            updateNavBlob(item);
        });
    });

    const sections = document.querySelectorAll('.section, #achievements');
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeNav = document.querySelector(`.nav-item[href="#${id}"]`);
                if (activeNav) {
                    navItems.forEach(nav => nav.classList.remove('active'));
                    activeNav.classList.add('active');
                    updateNavBlob(activeNav);
                }
            }
        });
    }, observerOptions);
    sections.forEach(sec => sectionObserver.observe(sec));

    // 2. Projects Deck Drag/Wheel Scroll
    const deckWrapper = document.querySelector('.projects-deck-wrapper') as HTMLElement;
    if (deckWrapper) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      deckWrapper.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - deckWrapper.offsetLeft;
          scrollLeft = deckWrapper.scrollLeft;
      });
      deckWrapper.addEventListener('mouseleave', () => { isDown = false; });
      deckWrapper.addEventListener('mouseup', () => { isDown = false; });
      deckWrapper.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - deckWrapper.offsetLeft;
          const walk = (x - startX) * 2; 
          deckWrapper.scrollLeft = scrollLeft - walk;
      });
      deckWrapper.addEventListener('wheel', (e) => {
          if (e.deltaY !== 0) {
              e.preventDefault();
              deckWrapper.scrollLeft += e.deltaY;
          }
      }, { passive: false });
    }

    // 3. Magic Rings Cursor Effect (Removed in favor of SplashCursor)

    // 4. Balatro Effect Background Canvas
    const canvas = document.getElementById('balatro-canvas') as HTMLCanvasElement;
    let balatroFrameId: number;
    let resize: () => void = () => {};
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w: number, h: number;
      resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
      window.addEventListener('resize', resize);
      resize();

      let time = 0;
      const drawBalatro = () => {
          if (!ctx) return;
          time += 0.01;
          const gradient = ctx.createLinearGradient(0, 0, w, h);
          gradient.addColorStop(0, '#0a0510');
          gradient.addColorStop(0.5, '#1a0830');
          gradient.addColorStop(1, '#0a0510');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, w, h);
          
          ctx.globalCompositeOperation = 'screen';
          const drawOrb = (cx: number, cy: number, r: number, color: string) => {
              const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
              g.addColorStop(0, color);
              g.addColorStop(1, 'transparent');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(cx, cy, r, 0, Math.PI * 2);
              ctx.fill();
          };
          
          const x1 = w/2 + Math.sin(time) * w/3;
          const y1 = h/2 + Math.cos(time * 0.8) * h/3;
          drawOrb(x1, y1, w/2, 'rgba(255, 32, 32, 0.03)');
          
          const x2 = w/2 + Math.cos(time * 1.2) * w/3;
          const y2 = h/2 + Math.sin(time * 0.9) * h/3;
          drawOrb(x2, y2, w/2, 'rgba(30, 144, 255, 0.03)');
          
          ctx.globalCompositeOperation = 'source-over';
          balatroFrameId = requestAnimationFrame(drawBalatro);
      };
      drawBalatro();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(balatroFrameId);
    };
  }, []);

  return (
    <>
      <div className="scanline"></div>
      <canvas id="balatro-canvas"></canvas>
      <GlobalMatrixRain />
      <SplashCursor />
      
      <div className="scroll-container">
          {/* 1. HERO / HEADER SECTION */}
          <section id="hero" className="section hero-section">
              <div className="hero-bg-wrapper">
                  <video className="hero-bg-video" autoPlay loop muted playsInline>
                      <source src="/video/open.mp4" type="video/mp4" />
                  </video>
                  <div className="hero-overlay"></div>
              </div>
              <div className="container hero-content">
                  <h1 className="display-name">RIYA THAKUR</h1>
                  <h2 className="role-title">MCA CANDIDATE & FULL-STACK DEVELOPER</h2>
                  
                  <div className="hero-meta">
                      <span className="badge">MCA.DEV</span>
                      <span className="location">MUMBAI, INDIA</span>
                  </div>
                  
                  <p className="bio-summary">
                      Results-driven Information Technology specialist with First-Class Honours (9.39/10 GPA). Demonstrated expertise in architecting full-stack web applications, implementing deep learning solutions, and leading technical teams.
                  </p>
                  
                  <div className="auth-prompt" id="auth-prompt">
                      <span className="cursor">_</span>ACCESS GRANTED
                  </div>
              </div>
          </section>

          {/* 2. ABOUT / PERSPECTIVE SECTION */}
          <section id="about" className="section about-section">
              <div className="about-bg-wrapper">
                  <video className="about-bg-video" autoPlay loop muted playsInline>
                      <source src="/video/type.mp4" type="video/mp4" />
                  </video>
              </div>
              <div className="container">
                  <div className="section-header">
                      <span className="subtitle">BIO (Perspective Log v.2025)</span>
                      <h2 className="heading">ENGINEERING BETTER FUTURES</h2>
                  </div>
                  
                  <div className="about-grid">
                      <div className="about-text">
                          <p>Bridging academic excellence and professional execution. Eager to drive digital transformation initiatives utilizing modern frameworks and intelligent algorithms.</p>
                      </div>
                      
                      <div className="core-stats">
                          <div className="stat-point">
                              <span className="stat-label">IT GPA</span>
                              <span className="stat-value">9.39</span>
                          </div>
                          <div className="stat-point">
                              <span className="stat-label">GRADUATION YEAR</span>
                              <span className="stat-value">2025</span>
                          </div>
                      </div>
                  </div>

                  <div className="attributes-tags">
                      <div className="tag">ADAPTABLE</div>
                      <div className="tag">PROBLEM SOLVING</div>
                      <div className="tag">SCALABLE DESIGN</div>
                      <div className="tag">TEAM LEADERSHIP</div>
                  </div>
              </div>
          </section>

          {/* 3. TECH CORE / SKILLS SECTION */}
          <section id="skills" className="section skills-section">
              <div className="container">
                  <div className="section-header">
                      <span className="subtitle">TECH CORE</span>
                      <h2 className="heading">SYSTEM MODULES</h2>
                  </div>
                  
                  <div className="asymmetric-grid">
                      {/* Red Module */}
                      <div className="module red-module">
                          <div className="module-header">[PROGRAMMING.SYS]</div>
                          <ul className="skill-list">
                              <li>Python</li>
                              <li>SQL</li>
                              <li>JavaScript</li>
                              <li>Java</li>
                              <li>HTML</li>
                              <li>CSS</li>
                              <li>R</li>
                          </ul>
                      </div>
                      
                      {/* Blue Module */}
                      <div className="module blue-module">
                          <div className="module-header">[INTERFACE.SYS]</div>
                          <ul className="skill-list">
                              <li>Flask</li>
                              <li>ASP.NET</li>
                              <li>HTML5</li>
                              <li>CSS3</li>
                              <li>WordPress</li>
                          </ul>
                      </div>
                      
                      {/* Red Module */}
                      <div className="module red-module">
                          <div className="module-header">[DATA_DEX]</div>
                          <ul className="skill-list">
                              <li>TensorFlow</li>
                              <li>Keras</li>
                              <li>OpenCV</li>
                              <li>CNN/ResNet</li>
                              <li>Database Systems</li>
                          </ul>
                      </div>

                      {/* Blue Module */}
                      <div className="module blue-module">
                          <div className="module-header">[UTILITY.EXE]</div>
                          <ul className="skill-list">
                              <li>Git/GitHub</li>
                              <li>Figma</li>
                              <li>VS Code</li>
                              <li>Jupyter</li>
                              <li>Agile/REST</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </section>

          {/* 4. PROJECTS INTERFACE */}
          <section id="projects" className="section projects-section">
              <div className="container">
                  <div className="section-header">
                      <span className="subtitle">PROJECTS</span>
                      <h2 className="heading">MISSION SELECT</h2>
                  </div>
                  
                  <div className="projects-deck-wrapper">
                      <div className="projects-deck" id="projects-deck">
                          {/* Project 1 */}
                          <div className="project-card blue-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>DS Visualizer (DataStruct2.0)</h3>
                                      <span className="proj-subtitle">CORE VIZ ENGINE</span>
                                  </div>
                                  <div className="proj-stack">React, Three.js, Monaco, WASM</div>
                                  <p className="proj-desc">High-fidelity educational platform for visualizing complex data structures and algorithms in real-time with cinematic effects.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Real-Time Code-to-Viz Monaco integration; 3D Skeuomorphic BookReader with TTS; WASM-powered secure execution sandbox.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Advanced UI/UX, Three.js, Algorithm Engineering
                                  </div>
                                  <a href="https://ds-vis.vercel.app/" target="_blank" rel="noreferrer" className="proj-link blue-link">LAUNCH DEPLOYMENT</a>
                              </div>
                          </div>

                          {/* Project 2 */}
                          <div className="project-card red-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>Manthan Event Platform</h3>
                                      <span className="proj-subtitle">LIVE ARCHITECTURE</span>
                                  </div>
                                  <div className="proj-stack">Lead Developer (Next.js, Framer)</div>
                                  <p className="proj-desc">Directed end-to-end development lifecycle for my institutional flagship event, serving over 110 concurrent users.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Led planning and Agile sprints; Real-time performance analytics framework; Risk mitigation & production deployment.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Leadership, Teamwork, High-pressure production deployment
                                  </div>
                                  <a href="https://bvimitmanthan.vercel.app/" target="_blank" rel="noreferrer" className="proj-link red-link">LAUNCH DEPLOYMENT</a>
                              </div>
                          </div>

                          {/* Project 3 */}
                          <div className="project-card blue-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>Deepfake Detection</h3>
                                      <span className="proj-subtitle">ML / VISION</span>
                                  </div>
                                  <div className="proj-stack">Python, TensorFlow, ResNet-50, OpenCV</div>
                                  <p className="proj-desc">Production-ready deep learning pipeline achieving high accuracy in detecting manipulated visual media.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Transfer learning with ResNet-50; Grad-CAM visualization algorithms (heatmaps); Tensor quantization for latency optimization.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Machine learning, Computer vision, Containerized web deployments
                                  </div>
                              </div>
                          </div>

                          {/* Project 4 */}
                          <div className="project-card red-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>Breast Cancer CNN</h3>
                                      <span className="proj-subtitle">DIAGNOSTICS</span>
                                  </div>
                                  <div className="proj-stack">Python, TensorFlow, Keras, Scikit-learn</div>
                                  <p className="proj-desc">End-to-end deep learning solution for automated classification of breast tissue histology images with 88% accuracy.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Medical image preprocessing & augmentation; Convolutional Neural Network training; Hyperparameter optimization.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Deep learning fundamentals, Data preprocessing, Ensemble modeling
                                  </div>
                              </div>
                          </div>

                          {/* Project 5 */}
                          <div className="project-card blue-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>Student Management</h3>
                                      <span className="proj-subtitle">ARCHITECTURE</span>
                                  </div>
                                  <div className="proj-stack">ASP.NET MVC, C#, SQL Server, Bootstrap</div>
                                  <p className="proj-desc">Enterprise-grade web application facilitating student enrollment, course registration, and academic record management.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Robust relational DB with stored procedures; Secure authentication & password encryption; Stakeholder specification alignment.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Backend development, Advanced Database logic, Enterprise Architecture
                                  </div>
                                  <a href="https://youtu.be/4dxuX1xCP7E?si=EeSeAsrV-eLJu3Uk" target="_blank" rel="noreferrer" className="proj-link blue-link">LAUNCH DEMO</a>
                              </div>
                          </div>

                          {/* Project 6 */}
                          <div className="project-card red-theme">
                              <div className="card-inner">
                                  <div className="proj-header">
                                      <h3>Toontastic</h3>
                                      <span className="proj-subtitle">INTERFACE</span>
                                  </div>
                                  <div className="proj-stack">JavaScript, CSS, HTML5, Figma</div>
                                  <p className="proj-desc">Responsive single-page application created for users to seamlessly explore and search cartoon programming metadata.</p>
                                  <div className="proj-features">
                                      <strong>Features:</strong> Search cartoons by name & categories; Asynchronous data fetching & DOM logic; Clean responsive user interface.
                                  </div>
                                  <div className="proj-demo">
                                      <strong>Demonstrates:</strong> Frontend development skills, User interface design, Async operations
                                  </div>
                                  <a href="https://youtu.be/dC-n2tn1NYc?si=F7gB_ZNhCU_uousY" target="_blank" rel="noreferrer" className="proj-link red-link">LAUNCH DEMO</a>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="deck-controls">
                      <div className="deck-indicator" id="deck-progress"></div>
                  </div>
              </div>
          </section>

          {/* 5. ACHIEVEMENTS SECTION (Replaced with the new React Component!) */}
          <AchievementsSection />

          {/* 6. CONTACT & LINKS */}
          <section id="contact" className="section contact-section">
              <div className="container terminal-footer">
                  <div className="terminal-header">
                      <span>root@riya:~# ./contact.sh</span>
                  </div>
                  <div className="terminal-body">
                      <div className="contact-line">
                          <span className="c-key">EMAIL:</span> 
                          <a href="mailto:riyathakur155555@gmail.com" className="c-val hover-glitch" data-text="riyathakur155555@gmail.com">riyathakur155555@gmail.com</a>
                      </div>
                      <div className="contact-line">
                          <span className="c-key">GITHUB:</span> 
                          <span className="c-path">riyx-01 &rarr;</span>
                          <a href="https://github.com/riyx-01" target="_blank" rel="noreferrer" className="c-val hover-glitch" data-text="github.com/riyx-01">github.com/riyx-01</a>
                      </div>
                      <div className="contact-line">
                          <span className="c-key">LINKEDIN:</span> 
                          <span className="c-path">riyathakur01 &rarr;</span>
                          <a href="https://www.linkedin.com/in/riyathakur01" target="_blank" rel="noreferrer" className="c-val hover-glitch" data-text="linkedin.com/in/riyathakur01">linkedin.com/in/riyathakur01</a>
                      </div>
                      <div className="contact-line">
                          <span className="c-key">RESUME:</span> 
                          <span className="c-path">CV Link &rarr;</span>
                          <a href="https://riyathakur-cv.netlify.app" target="_blank" rel="noreferrer" className="c-val hover-glitch" data-text="riyathakur-cv.netlify.app">riyathakur-cv.netlify.app</a>
                      </div>
                      <div className="terminal-cursor">_</div>
                  </div>
              </div>
          </section>
      </div>

      {/* Navigation Bar: Custom interactive GooeyNav */}
      <nav className="gooey-nav">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{display: 'none'}}>
              <defs>
                  <filter id="gooey">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="gooey" />
                      <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                  </filter>
              </defs>
          </svg>
          <div className="nav-container">
              <div className="nav-blob" id="nav-blob"></div>
              <a href="#hero" className="nav-item active" data-index="0">Home</a>
              <a href="#about" className="nav-item" data-index="1">About</a>
              <a href="#skills" className="nav-item" data-index="2">Skills</a>
              <a href="#projects" className="nav-item" data-index="3">Projects</a>
              <a href="#achievements" className="nav-item" data-index="4">Achieve</a>
              <a href="#contact" className="nav-item" data-index="5">Contact</a>
          </div>
      </nav>
    </>
  );
}
