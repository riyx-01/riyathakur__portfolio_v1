'use client';

import React, { useState, useEffect, useMemo } from 'react';

// Character sets for Matrix Rain
const SYMBOLS = ['{', '}', '[', ']', '(', ')', ';', ':', '=', '+', '-', '*', '/', '%', '<', '>', '!', '&', '|', '~', '^', '?', '@', '#', '$', '0', '1'];
const KEYWORDS = ['PY', 'JS', 'CSS', 'HTML', 'SQL', 'API', 'GIT', 'AI', 'ML', 'DL', 'TF', 'KERAS', 'REACT', 'NODE', 'NEXT', 'FLASK', 'JAVA', 'LINUX', 'CLOUD', 'DATA', 'UX', 'UI', 'DEV', 'OPS'];

// 1. DATA
const CERTIFICATIONS = [
  // Technical & Programming
  { category: 'Technical & Programming', name: 'Crash Course on Python', issuer: 'Google', date: 'Dec 2023', skills: 'Python' },
  { category: 'Technical & Programming', name: 'Python using AI', issuer: 'AI for Techies', date: 'Jun 2025', credentialId: '30' },
  { category: 'Technical & Programming', name: 'Command Line in Linux', issuer: 'Coursera', date: 'Dec 2023', credentialId: '257YVB8AVJ6T', link: 'https://www.coursera.org/account/accomplishments/certificate/257YVB8AVJ6T' },
  { category: 'Technical & Programming', name: 'Cloud Computing', issuer: 'SWAYAM–NPTEL | IIT Kanpur', date: 'Apr 2026', skills: 'Cloud Computing' },
  { category: 'Technical & Programming', name: 'Computer Networks and Internet Protocol', issuer: 'NPTEL', date: 'Apr 2026', skills: 'Computer Networking' },
  
  // Data & Analytics
  { category: 'Data & Analytics', name: 'Data Visualization: Storytelling', issuer: 'NASBA', date: 'Jul 2026', skills: 'Data Visualization, Data Storytelling' },
  { category: 'Data & Analytics', name: 'Big Data Analytics with Hadoop and Apache Spark', issuer: 'NASBA', date: 'Jun 2026', skills: 'Big Data, Hadoop' },
  { category: 'Data & Analytics', name: 'Excel: Data Storytelling', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Excel, Data Storytelling' },
  { category: 'Data & Analytics', name: 'Ask Questions to Make Data-Driven Decisions', issuer: 'Coursera', date: 'Dec 2023', credentialId: 'LU22CTSQ65T6', skills: 'Databases', link: 'https://www.coursera.org/account/accomplishments/certificate/LU22CTSQ65T6' },
  { category: 'Data & Analytics', name: 'Foundations: Data, Data, Everywhere', issuer: 'Coursera', date: 'Sep 2023', credentialId: '8JRULGUNWHZT', skills: 'Databases', link: 'https://www.coursera.org/account/accomplishments/certificate/8JRULGUNWHZT' },
  
  // AI & Emerging Tech
  { category: 'AI & Emerging Tech', name: 'Introduction to Generative AI', issuer: 'Coursera', date: 'Sep 2023', credentialId: '6PWAKABR546Q', skills: 'Generative AI', link: 'https://www.coursera.org/account/accomplishments/certificate/6PWAKABR546Q' },
  
  // Design & UX
  { category: 'Design & UX', name: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Dec 2023', credentialId: 'U28UUECWE6JN', skills: 'UI Design', link: 'https://www.coursera.org/account/accomplishments/certificate/U28UUECWE6JN' },
  { category: 'Design & UX', name: 'Introduction To Figma', issuer: 'LearnTube.ai', date: 'Jul 2024', credentialId: 'INT-M-2-3059-975035', skills: 'Figma' },
  
  // Marketing & Leadership
  { category: 'Marketing & Leadership', name: 'Google Ads Display Certification', issuer: 'Google', date: 'Feb 2024', expires: 'Feb 2025', skills: 'Digital Marketing' },
  { category: 'Marketing & Leadership', name: 'Leadership Styles, Behaviors, and Approaches', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Leadership, Team Leadership' },
  { category: 'Marketing & Leadership', name: 'Event Planning Foundations', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Event Management, Event Planning' },
  { category: 'Marketing & Leadership', name: 'Event Planning Foundations (NASBA)', issuer: 'NASBA', date: 'Jun 2026', skills: 'Event Planning, Event Management' },
  
  // Professional Memberships
  { category: 'Professional Memberships', name: 'Indian Society for Technical Education', issuer: 'ISTE', date: 'Dec 2025 – Dec 2027', skills: 'Student Member' },
  
  // General
  { category: 'General', name: 'Typing certificate', issuer: 'Ratatype', date: 'Jul 2024', credentialId: '7340244' },
  { category: 'General', name: 'Basic French Course For Beginners', issuer: 'Cursa', date: 'Jul 2024', skills: 'French' },
];

const HACKATHONS = [
  { name: 'Codorra Hackathon 2026', issuer: 'Codorra Hackathon', date: 'Jun 2026', skills: 'Hackathon', type: 'competitive' },
  { name: 'International UAi HAWK-ATHON Certificate', issuer: 'HackwithIndia', date: 'Mar 2026', skills: 'Hackathon', type: 'competitive' },
  { name: 'National Level AI Hackathon 2026', issuer: 'RateFluencer', date: 'Jun 2026', skills: 'Hackathon', type: 'competitive' },
  { name: 'Certificate of Participation in Codorra 2026', issuer: 'Unstop', date: 'Jun 2026', credentialId: 'abb47410-8608-462d-9de3-4ed292db386a', type: 'participation' },
];

// Matrix Rain Component
const MatrixRain = () => {
  const [columns, setColumns] = useState<{ id: number; chars: string[]; delay: number; duration: number; left: number }[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const columnCount = window.innerWidth < 768 ? 15 : 40;
    const newCols = Array.from({ length: columnCount }).map((_, i) => {
      const charCount = Math.floor(Math.random() * 15) + 10;
      const chars = Array.from({ length: charCount }).map(() => {
        const useKeyword = Math.random() > 0.8;
        return useKeyword 
          ? KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]
          : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      });
      
      return {
        id: i,
        chars,
        delay: Math.random() * -5, // Start immediately with staggered offsets
        duration: Math.random() * 3 + 2, // 2s to 5s
        left: (i / columnCount) * 100,
      };
    });
    setColumns(newCols);
  }, []);

  return (
    <div className="matrix-rain-container" aria-hidden="true">
      {columns.map(col => (
        <div 
          key={col.id} 
          className="matrix-column"
          style={{ 
            left: `${col.left}%`, 
            animationDelay: `${col.delay}s`,
            animationDuration: `${col.duration}s`
          }}
        >
          {col.chars.map((char, charIdx) => {
            // Determine color based on requested probabilities
            const rand = Math.random();
            let colorClass = 'matrix-char-trail-blue';
            if (charIdx === 0) colorClass = 'matrix-char-head'; // Head is white
            else if (rand > 0.8) colorClass = 'matrix-char-trail-red'; // 20% red

            const opacity = charIdx === 0 ? 0.9 : Math.max(0.1, 1 - (charIdx / col.chars.length));

            return (
              <span 
                key={charIdx} 
                className={`matrix-char ${colorClass}`}
                style={{ opacity }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};


export default function CredentialsSection() {
  const [filter, setFilter] = useState('ALL');
  
  const FILTERS = ['ALL', 'GOOGLE', 'COURSERA', 'NPTEL', 'PMI', 'HACKATHONS'];

  const filteredCerts = useMemo(() => {
    if (filter === 'ALL') return CERTIFICATIONS;
    if (filter === 'HACKATHONS') return []; // Handled separately
    return CERTIFICATIONS.filter(cert => cert.issuer.toUpperCase().includes(filter));
  }, [filter]);

  const showHackathons = filter === 'ALL' || filter === 'HACKATHONS';

  return (
    <section className="relative w-full min-h-screen bg-[#0a0510] text-white overflow-hidden py-24 px-6 md:px-12 font-sans selection:bg-[#ff2020] selection:text-[#0a0510]">
      <MatrixRain />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <span className="font-mono text-[#1a0830] bg-[#1e90ff] px-2 py-1 text-sm font-bold w-fit rounded-sm tracking-wider">
            CREDENTIALS.LOG
          </span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Validated Competencies
          </h2>
        </header>

        {/* Filter Toggle */}
        <div className="flex flex-wrap gap-3 font-mono text-sm" role="group" aria-label="Credential filters">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`hardware-toggle px-4 py-2 rounded-sm uppercase font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] ${
                filter === f ? 'active' : 'text-[#888899] hover:text-white bg-[#1a0830] bg-opacity-40'
              }`}
            >
              [{f}]
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Certifications Ledger */}
          <div className="w-full lg:w-3/5 flex flex-col gap-8">
            {Object.entries(
              filteredCerts.reduce((acc, cert) => {
                if (!acc[cert.category]) acc[cert.category] = [];
                acc[cert.category].push(cert);
                return acc;
              }, {} as Record<string, typeof CERTIFICATIONS>)
            ).map(([category, certs]) => (
              <div key={category} className="flex flex-col gap-4">
                <h3 className="font-mono text-[#ff2020] text-sm uppercase tracking-widest border-b border-[#ffffff10] pb-2">
                  // {category}
                </h3>
                <div className="flex flex-col gap-1">
                  {certs.map((cert, idx) => {
                    const Container = cert.link ? 'a' : 'div';
                    const hoverColor = idx % 2 === 0 ? 'ledger-row-blue' : 'ledger-row-red';
                    
                    return (
                      <Container
                        key={idx}
                        href={cert.link}
                        target={cert.link ? "_blank" : undefined}
                        rel={cert.link ? "noopener noreferrer" : undefined}
                        tabIndex={0}
                        className={`ledger-row ${hoverColor} flex flex-col py-3 px-4 rounded-sm cursor-${cert.link ? 'pointer' : 'default'} group`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-semibold text-lg leading-tight group-hover:text-white text-gray-200">
                            {cert.name}
                          </h4>
                          <span className="font-mono text-xs text-[#888899] whitespace-nowrap pt-1">
                            {cert.date}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 font-mono text-xs text-[#888899]">
                          <span className="text-[#1e90ff]">[{cert.issuer}]</span>
                          {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                          {cert.skills && <span className="opacity-70">Skills: {cert.skills}</span>}
                          {cert.expires && <span className="opacity-70">Expires: {cert.expires}</span>}
                        </div>
                      </Container>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {filteredCerts.length === 0 && (
              <div className="font-mono text-[#888899] py-8 text-center italic">
                NO_RECORDS_FOUND
              </div>
            )}
          </div>

          {/* Right Column: Hackathons Stack */}
          {showHackathons && (
            <div className="w-full lg:w-2/5 flex flex-col gap-4 sticky top-24">
              <h3 className="font-mono text-[#ff2020] text-sm uppercase tracking-widest border-b border-[#ffffff10] pb-2 mb-2">
                // HACKATHONS_&_EVENTS
              </h3>
              
              {HACKATHONS.map((hack, idx) => (
                <div 
                  key={idx}
                  tabIndex={0}
                  className={`hackathon-block bg-[#1a0830] bg-opacity-30 border border-[#ffffff10] rounded-sm p-5 border-l-4 ${hack.type === 'competitive' ? 'border-l-[#ff2020]' : 'border-l-[#1e90ff]'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white leading-tight pr-4">
                      {hack.name}
                    </h4>
                  </div>
                  <div className="font-mono text-xs flex flex-col gap-1 text-[#888899]">
                    <span className="text-gray-300">ORG: {hack.issuer}</span>
                    <span>DATE: {hack.date}</span>
                    {hack.credentialId && <span>ID: {hack.credentialId}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
