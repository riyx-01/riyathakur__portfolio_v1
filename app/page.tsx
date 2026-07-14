'use client';

import React, { useEffect } from 'react';
import AchievementsSection from '../components/portfolio/AchievementsSection';
import ProjectsDeck from '../components/portfolio/ProjectsDeck';
import ProjectTicket from '../components/portfolio/ProjectTicket';
import SplashCursor from '../components/portfolio/SplashCursor';
import SkillsSection from '../components/portfolio/SkillsSection';
import ContactFlipCard from '../components/portfolio/ContactFlipCard';
import TechAuroraBg from '../components/portfolio/TechAuroraBg';

const projectsData = [
    {
        title: "DS Visualizer (DataStruct2.0)",
        subtitle: "CORE VIZ ENGINE",
        stack: "React, Three.js, Monaco, WASM",
        desc: "High-fidelity educational platform for visualizing complex data structures and algorithms in real-time with cinematic effects.",
        features: "Real-Time Code-to-Viz Monaco integration; 3D BookReader with TTS; WASM secure execution sandbox.",
        demo: "Advanced UI/UX, Three.js, Algorithm Engineering",
        link: "https://ds-vis.vercel.app/",
        linkText: "LAUNCH DEPLOYMENT",
        theme: "blue" as const
    },
    {
        title: "Manthan Event Platform",
        subtitle: "LIVE ARCHITECTURE",
        stack: "Next.js, Framer Motion, Agile, Production",
        desc: "Directed end-to-end development lifecycle for my institutional flagship event, serving over 110 concurrent users.",
        features: "Led planning & Agile sprints; Real-time performance analytics framework; Risk mitigation & live deployment.",
        demo: "Leadership, Teamwork, High-pressure production deployment",
        link: "https://bvimitmanthan.vercel.app/",
        linkText: "LAUNCH DEPLOYMENT",
        theme: "red" as const
    },
    {
        title: "Deepfake Detection",
        subtitle: "ML / VISION",
        stack: "Python, TensorFlow, ResNet-50, OpenCV",
        desc: "Production-ready deep learning pipeline achieving high accuracy in detecting manipulated visual media.",
        features: "Transfer learning with ResNet-50; Grad-CAM heatmaps; Tensor quantization for latency optimization.",
        demo: "Machine learning, Computer vision, Containerized web deployments",
        theme: "blue" as const
    },
    {
        title: "Breast Cancer CNN",
        subtitle: "DIAGNOSTICS",
        stack: "Python, TensorFlow, Keras, Scikit-learn",
        desc: "End-to-end deep learning solution for automated classification of breast tissue histology images with 88% accuracy.",
        features: "Medical image preprocessing & augmentation; CNN training; Hyperparameter optimization.",
        demo: "Deep learning fundamentals, Data preprocessing, Ensemble modeling",
        theme: "red" as const
    },
    {
        title: "Student Management",
        subtitle: "ARCHITECTURE",
        stack: "ASP.NET MVC, C#, SQL Server, Bootstrap",
        desc: "Enterprise-grade web application facilitating student enrollment, course registration, and academic record management.",
        features: "Relational DB with stored procedures; Secure authentication & password encryption.",
        demo: "Backend development, Advanced Database logic, Enterprise Architecture",
        link: "https://youtu.be/4dxuX1xCP7E?si=EeSeAsrV-eLJu3Uk",
        linkText: "LAUNCH DEMO",
        theme: "blue" as const
    },
    {
        title: "Toontastic",
        subtitle: "INTERFACE",
        stack: "JavaScript, CSS, HTML5, Figma",
        desc: "Responsive single-page application created for users to seamlessly explore and search cartoon programming metadata.",
        features: "Search cartoons by name & categories; Asynchronous data fetching & DOM logic; Clean responsive user interface.",
        demo: "Frontend development skills, User interface design, Async operations",
        link: "https://youtu.be/dC-n2tn1NYc?si=F7gB_ZNhCU_uousY",
        linkText: "LAUNCH DEMO",
        theme: "red" as const
    },
    {
        title: "BVIMIT College Website",
        subtitle: "WEB PORTAL & ADMIN",
        stack: "Next.js, React, TypeScript, Tailwind CSS, Three.js",
        desc: "Modern, high-performance web portal and administrative platform for भारती विद्यापीठ (BVIMIT) to streamline student admissions and campus information dissemination.",
        features: "Multi-tiered admin dashboard; interactive admissions queue; high-performance rendering.",
        demo: "Next.js Server Components, Relational Database integrations, Advanced UI layouts",
        theme: "blue" as const
    },
    {
        title: "ChatPulse WhatsApp BI",
        subtitle: "DATA INTELLIGENCE",
        stack: "Python, Streamlit, Pandas, Plotly, TextBlob",
        desc: "Privacy-first, local BI dashboard parsing and structuring 50,000+ WhatsApp messages in less than 0.3 seconds using optimized regex.",
        features: "TextBlob sentiment analysis; interactive Plotly charts; automated PDF/PPTX report generators.",
        demo: "Regular Expressions, Data Analysis, Natural Language Processing",
        link: "https://chatpulse.streamlit.app/",
        linkText: "LAUNCH DEPLOYMENT",
        theme: "red" as const
    },
    {
        title: "Shopify & Nyraa Marketing",
        subtitle: "DIGITAL CORE",
        stack: "WordPress, SEO, Responsive Design, Analytics",
        desc: "Designed responsive, conversion-focused blog and service websites with SEO content optimization and Google Analytics integrations.",
        features: "Conversion rate optimization (CRO); web analytics dashboard; responsive layout engines.",
        demo: "SEO Strategy, Web Design, Marketing Integrations",
        theme: "blue" as const
    },
    {
        title: "Employee Management System",
        subtitle: "FULL-STACK HR PLATFORM",
        stack: "React, TypeScript, Django DRF, Docker",
        desc: "A robust, full-stack Employee Management System designed to streamline HR operations, automated payroll, and financial advance tracking.",
        features: "Automated payroll processing; Advance validation; Auth0 JWT security; Dockerized deployment.",
        demo: "Enterprise Architecture, Decoupled Systems, Database Management",
        theme: "red" as const
    }
];

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

    }, []);

    return (
        <>
            <div className="scanline"></div>
            <SplashCursor />


            <div className="scroll-container">
                {/* 1. HERO / HEADER SECTION */}
                <section id="hero" className="section hero-section">
                    <div className="hero-bg-wrapper">
                        <video className="hero-bg-video" autoPlay loop muted playsInline>
                            <source src="/videos/open.mp4" type="video/mp4" />
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
                            <source src="/videos/type.mp4" type="video/mp4" />
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

                <SkillsSection />

                {/* 4. PROJECTS INTERFACE */}
                <section id="projects" className="section relative projects-section overflow-hidden">
                    <div className="hero-bg-wrapper absolute inset-0 z-0">
                        <video className="hero-bg-video w-full h-full object-cover opacity-30" autoPlay loop muted playsInline>
                            <source src="/videos/type.mp4" type="video/mp4" />
                        </video>
                        <div className="hero-overlay absolute inset-0 bg-[#0a0510]/80"></div>
                    </div>
                    <div className="container relative z-10">
                        <div className="section-header">
                            <span className="subtitle">By Riya Thakur</span>
                            <h2 className="heading">PROJECTS</h2>
                        </div>

                        <ProjectsDeck projects={projectsData} />
                    </div>
                </section>

                {/* 5. ACHIEVEMENTS SECTION (Replaced with the new React Component!) */}
                <AchievementsSection />

                {/* 6. CONTACT & LINKS */}
                <section id="contact" className="section relative contact-section min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#0a0510' }}>
                    <TechAuroraBg />
                    <div className="container relative z-10 terminal-footer mt-12 mb-24">
                        <div className="flex justify-center items-center w-full">
                            <ContactFlipCard />
                        </div>
                    </div>
                </section>

                {/* CYBERPUNK FOOTER */}
                <footer className="w-full relative z-20 bg-[#020104] border-t border-[#ff2020]/30 py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[#ff2020] font-mono text-xl font-bold tracking-widest">RIYA THAKUR</span>
                                <span className="text-[#94a3b8] font-mono text-sm tracking-widest mt-1">SYSTEM.ONLINE // {new Date().getFullYear()}</span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <a href="https://github.com/riyx-01" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#ff2020] transition-colors font-mono text-sm tracking-widest">
                                    [ GITHUB ]
                                </a>
                                <a href="https://www.linkedin.com/in/riyathakur01" target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-[#ff2020] transition-colors font-mono text-sm tracking-widest">
                                    [ LINKEDIN ]
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 text-center border-t border-[#ff2020]/10 pt-4">
                            <p className="text-[#475569] font-mono text-xs tracking-widest">
                                DESIGNED & ENGINEERED WITH <span>♥</span> IN MUMBAI
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Navigation Bar: Custom interactive GooeyNav */}
            <nav className="gooey-nav">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
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
