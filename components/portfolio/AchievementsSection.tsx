'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectTicket from './ProjectTicket';

const CERTIFICATIONS = [
  // TECHNICAL/
  { category: 'TECHNICAL/', name: 'Crash Course on Python', issuer: 'Google', date: 'Dec 2023', credentialId: 'D8VFMHVJW5DC', skills: 'Python', link: 'https://www.coursera.org/account/accomplishments/records/D8VFMHVJW5DC' },
  { category: 'TECHNICAL/', name: 'Python using AI', issuer: 'AI for Techies', date: 'Jun 2025', credentialId: '30', skills: 'Python, AI', link: 'https://certx.in/certificate/24529ebe-94a8-4d06-9c76-2b3957e1c588447819' },
  { category: 'TECHNICAL/', name: 'Command Line in Linux', issuer: 'Coursera', date: 'Dec 2023', credentialId: '257YVB8AVJ6T', skills: 'Linux' },
  { category: 'TECHNICAL/', name: 'Cloud Computing', issuer: 'SWAYAM–NPTEL | IIT Kanpur', date: 'Apr 2026', skills: 'Cloud Computing', link: 'https://drive.google.com/drive/u/1/folders/1CJPIVb02JXLGTqDJscZfEatueatYEUBA' },
  { category: 'TECHNICAL/', name: 'Computer Networks and Internet Protocol', issuer: 'NPTEL', date: 'Apr 2026', skills: 'Computer Networking', link: 'https://drive.google.com/drive/u/1/folders/1CJPIVb02JXLGTqDJscZfEatueatYEUBA' },
  
  // DATA_ANALYTICS/
  { category: 'DATA_ANALYTICS/', name: 'Data Visualization: Storytelling', issuer: 'NASBA', date: 'Jul 2026', skills: 'Data Visualization, Data Storytelling' },
  { category: 'DATA_ANALYTICS/', name: 'Big Data Analytics with Hadoop and Apache Spark', issuer: 'NASBA', date: 'Jun 2026', skills: 'Big Data, Hadoop' },
  { category: 'DATA_ANALYTICS/', name: 'Excel: Data Storytelling', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Excel, Data Storytelling' },
  { category: 'DATA_ANALYTICS/', name: 'Ask Questions to Make Data-Driven Decisions', issuer: 'Coursera', date: 'Dec 2023', credentialId: 'LU22CTSQ65T6', skills: 'Databases' },
  { category: 'DATA_ANALYTICS/', name: 'Foundations: Data, Data, Everywhere', issuer: 'Coursera', date: 'Sep 2023', credentialId: '8JRULGUNWHZT', skills: 'Databases' },
  
  // AI_ML/
  { category: 'AI_ML/', name: 'Introduction to Generative AI', issuer: 'Coursera', date: 'Sep 2023', credentialId: '6PWAKABR546Q', skills: 'Generative AI' },
  
  // DESIGN_UX/
  { category: 'DESIGN_UX/', name: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Dec 2023', credentialId: 'U28UUECWE6JN', skills: 'UI Design', link: 'https://www.coursera.org/account/accomplishments/records/U28UUECWE6JN' },
  { category: 'DESIGN_UX/', name: 'Introduction To Figma', issuer: 'LearnTube.ai', date: 'Jul 2024', credentialId: 'INT-M-2-3059-975035', skills: 'Figma' },
  
  // LEADERSHIP/
  { category: 'LEADERSHIP/', name: 'Google Ads Display Certification', issuer: 'Google', date: 'Feb 2024', expires: 'Feb 2025', skills: 'Digital Marketing' },
  { category: 'LEADERSHIP/', name: 'Leadership Styles, Behaviors, and Approaches', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Leadership, Team Leadership' },
  { category: 'LEADERSHIP/', name: 'Event Planning Foundations', issuer: 'Project Management Institute', date: 'Jun 2026', skills: 'Event Management, Event Planning' },
  { category: 'LEADERSHIP/', name: 'Event Planning Foundations (NASBA)', issuer: 'NASBA', date: 'Jun 2026', skills: 'Event Planning, Event Management' },
  
  // MEMBERSHIP/
  { category: 'MEMBERSHIP/', name: 'Indian Society for Technical Education — Student Member', issuer: 'ISTE', date: 'Dec 2025 – Dec 2027', status: 'ACTIVE' },
  
  // GENERAL/
  { category: 'GENERAL/', name: 'Typing certificate', issuer: 'Ratatype', date: 'Jul 2024', credentialId: '7340244' },
  { category: 'GENERAL/', name: 'Basic French Course For Beginners', issuer: 'Cursa', date: 'Jul 2024', skills: 'French', link: 'https://cursacertificates.s3.amazonaws.com/cert_01b73d04860730c31932f124c62dfbbe.png?time=1722162166' },

  // EDUCATION/
  { category: 'EDUCATION/', name: 'MCA (Master of Computer Applications)', issuer: 'BVIMIT, Mumbai', date: '2025 - 2027', status: 'PURSUING', skills: 'Information Technology & Software Engineering' },
  { category: 'EDUCATION/', name: 'BSc IT (Honours)', issuer: 'S. K. Somaiya Degree College, SVU, Mumbai', date: '2022 - 2025', status: '9.39 CGPA', skills: 'First-Class Honours' },
  { category: 'EDUCATION/', name: 'HSC (12th Grade)', issuer: 'S K Somaiya Vinay Mandir Junior College', date: '2020 - 2022', status: '64%', skills: 'Science Stream' },
  { category: 'EDUCATION/', name: 'SSC (10th Grade)', issuer: 'A.F.A.C. English School', date: '2019 - 2020', status: '88.40%', skills: 'General Curriculum' },

  // WORKSHOPS_&_SEMINARS/
  { category: 'WORKSHOPS_&_SEMINARS/', name: 'Spring Boot Application Design Workshop', issuer: 'BVIMIT | RBI IT Pvt. Ltd.', date: 'Dec 2025', status: 'COMPLETED', skills: 'Spring Boot, Java Application Architecture' },
  { category: 'WORKSHOPS_&_SEMINARS/', name: 'AI Models in Real-World Applications Seminar', issuer: 'BVIMIT', date: 'Mar 2026', status: 'COMPLETED', skills: 'AI Models, Practical Implementation' },
];

const HACKATHONS = [
  { name: 'Codorra Hackathon 2026 Certificate', issuer: 'Codorra Hackathon', date: 'Jun 2026', skills: 'Hackathon', type: 'competitive' },
  { name: 'International UAi HAWK-ATHON Certificate', issuer: 'HackwithIndia', date: 'Mar 2026', skills: 'Hackathon', type: 'competitive' },
  { name: 'National Level AI Hackathon 2026 Certificate', issuer: 'RateFluencer', date: 'Jun 2026', skills: 'Hackathon', type: 'competitive' }
];

export default function AchievementsSection() {
  const [filter, setFilter] = useState('ALL');
  const FILTERS = ['ALL', 'GOOGLE', 'COURSERA', 'NPTEL', 'HACKATHONS', 'EDUCATION', 'SEMINARS'];

  const filteredCerts = useMemo(() => {
    if (filter === 'ALL') return CERTIFICATIONS;
    if (filter === 'HACKATHONS') return [];
    if (filter === 'EDUCATION') return CERTIFICATIONS.filter(cert => cert.category === 'EDUCATION/');
    if (filter === 'SEMINARS') return CERTIFICATIONS.filter(cert => cert.category === 'WORKSHOPS_&_SEMINARS/');
    return CERTIFICATIONS.filter(cert => cert.issuer.toUpperCase().includes(filter));
  }, [filter]);

  const showHackathons = filter === 'ALL' || filter === 'HACKATHONS';

  return (
    <section id="achievements" className="relative w-full text-white overflow-hidden py-32 px-6 md:px-12 font-sans selection:bg-[#ff2020] selection:text-[#0a0510] min-h-screen" style={{ background: 'linear-gradient(to bottom, #0a0510 0%, #0d1b2a 50%, #0a0510 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e90ff]/10 via-transparent to-transparent z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-24">

        {/* 1. MILESTONES LEDGER */}
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-2">
            <span className="font-mono text-[#888899] text-sm tracking-[0.2em] uppercase">ACHIEVEMENTS</span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">TIMELINE LEDGER</h2>
          </header>

          <div className="relative pl-8 before:content-[''] before:absolute before:top-0 before:left-[3px] before:w-[1px] before:h-full before:bg-[#1a0830]">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-16 group">
              <div className="absolute top-1 -left-[2.1rem] w-3 h-3 bg-[#0a0510] border-2 border-[#1e90ff] rounded-full group-hover:bg-[#1e90ff] group-hover:shadow-[0_0_15px_rgba(30,144,255,0.5)] transition-all duration-300"></div>
              <h3 className="text-2xl font-bold mb-2 text-white">Technical Lead — Manthan Event</h3>
              <p className="text-[#888899] text-lg leading-relaxed">Directed end-to-end development lifecycle for Bharati Vidyapeeth flagship event&apos;s digital infrastructure, successfully serving 110+ concurrent users via Agile sprints and delivering production deployment securely.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative mb-16 group">
              <div className="absolute top-1 -left-[2.1rem] w-3 h-3 bg-[#0a0510] border-2 border-[#ff2020] rounded-full group-hover:bg-[#ff2020] group-hover:shadow-[0_0_15px_rgba(255,32,32,0.5)] transition-all duration-300"></div>
              <h3 className="text-2xl font-bold mb-2 text-white">MCA Candidate — BVIMIT Mumbai</h3>
              <p className="text-[#888899] text-lg leading-relaxed">Pursuing Master of Computer Applications (2025 – 2027) with deep specialization in advanced software architecture, systems engineering, and full-stack web applications.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="relative mb-16 group">
              <div className="absolute top-1 -left-[2.1rem] w-3 h-3 bg-[#0a0510] border-2 border-[#1e90ff] rounded-full group-hover:bg-[#1e90ff] group-hover:shadow-[0_0_15px_rgba(30,144,255,0.5)] transition-all duration-300"></div>
              <h3 className="text-2xl font-bold mb-2 text-white">The Hindu Change Maker Awards</h3>
              <p className="text-[#888899] text-lg leading-relaxed">Provided critical real-time video editing and post-production support during this nationally televised award ceremony in a high-pressure, time-constrained environment.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative mb-16 group">
              <div className="absolute top-1 -left-[2.1rem] w-3 h-3 bg-[#0a0510] border-2 border-[#ff2020] rounded-full group-hover:bg-[#ff2020] group-hover:shadow-[0_0_15px_rgba(255,32,32,0.5)] transition-all duration-300"></div>
              <h3 className="text-2xl font-bold mb-2 text-white">BSc IT (Honours) — S. K. Somaiya Degree College</h3>
              <p className="text-[#888899] text-lg leading-relaxed">Completed First-Class Honours degree in Information Technology with an outstanding 9.39/10 GPA, gaining comprehensive fundamentals in algorithm design and database systems.</p>
            </motion.div>

          </div>
        </div>

        {/* 2 & 3. CREDENTIALS & HACKATHONS */}
        <div className="flex flex-col gap-12 mt-12 border-t border-[#ffffff10] pt-24">
          <header className="flex flex-col gap-2">
            <span className="font-mono text-[#1e90ff] text-sm font-bold tracking-wider">
              &gt; CREDENTIALS.LOG
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Certifications & Qualifications
            </h2>
          </header>

          {/* Filter Toggle */}
          <div className="flex flex-wrap gap-3 font-mono text-sm" role="group" aria-label="Credential filters">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`transition-all duration-200 px-4 py-2 rounded-sm uppercase font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0510] ${filter === f
                  ? 'bg-[#1e90ff] text-[#0a0510] border-[#1e90ff] shadow-[0_0_10px_rgba(30,144,255,0.4)]'
                  : 'text-[#888899] hover:text-white bg-transparent border-[#ffffff26]'
                  }`}
              >
                [{f}]
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left Column: Certifications Ledger */}
            <div className="w-full lg:w-3/5 flex flex-col gap-12">
              {Object.entries(
                filteredCerts.reduce((acc, cert) => {
                  if (!acc[cert.category]) acc[cert.category] = [];
                  acc[cert.category].push(cert);
                  return acc;
                }, {} as Record<string, typeof CERTIFICATIONS>)
              ).map(([category, certs], catIdx) => (
                <div key={category} className="flex flex-col">
                  <h3 className="font-mono text-[#888899] text-sm uppercase tracking-widest border-b border-[#ffffff10] pb-2 mb-4">
                    &gt; {category}
                  </h3>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8 w-full">
                    {certs.map((cert, idx) => {
                      const isBlue = idx % 2 === 0;

                      return (
                          <div key={idx} className="w-full flex justify-center">
                              <ProjectTicket
                                  title={cert.name}
                                  subtitle={cert.issuer}
                                  stack={cert.date}
                                  desc={cert.credentialId ? cert.credentialId : 'VERIFIED CREDENTIAL'}
                                  features={cert.skills || 'General Proficiency'}
                                  demo={cert.status || (cert.expires ? `Expires: ${cert.expires}` : 'LIFETIME CREDENTIAL')}
                                  link={cert.link}
                                  linkText="VERIFY"
                                  theme={isBlue ? 'blue' : 'red'}
                                  index={idx + 1}
                                  typeLabel="Certificate"
                                  descLabel="Credential ID"
                                  featuresLabel="Skills"
                                  demoLabel="Status"
                              />
                          </div>
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
              <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:sticky lg:top-24">
                <header className="flex flex-col gap-2 mb-4">
                  <span className="font-mono text-[#ff2020] text-sm font-bold tracking-wider">
                    &gt; HACKATHONS.LOG
                  </span>
                  <h3 className="text-3xl font-bold uppercase tracking-tight">
                    BATTLE RECORDS
                  </h3>
                </header>

                <div className="flex flex-col gap-6 w-full max-w-full">
                  {HACKATHONS.map((hack, idx) => {
                    return (
                        <div key={idx} className="w-full flex justify-center">
                            <ProjectTicket
                                title={hack.name}
                                subtitle={hack.issuer}
                                stack={hack.date}
                                desc={(hack as any).credentialId ? (hack as any).credentialId : 'HACKATHON PARTICIPATION'}
                                features={hack.skills || 'Hackathon Event'}
                                demo={hack.type === 'competitive' ? 'COMPETITIVE 🏆' : 'PARTICIPANT 🏁'}
                                link={(hack as any).link}
                                linkText="VERIFY"
                                theme={hack.type === 'competitive' ? 'red' : 'blue'}
                                index={idx + 1}
                                typeLabel="Hackathon"
                                descLabel="Credential ID"
                                featuresLabel="Event Type"
                                demoLabel="Status"
                            />
                        </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
