'use client';

import React, { useState } from 'react';
import ProjectTicket, { ProjectTicketProps } from './ProjectTicket';

interface ProjectsDeckProps {
    projects: (ProjectTicketProps & {
        title: string;
        subtitle: string;
        stack: string;
        desc: string;
        features?: string;
        demo?: string;
        link?: string;
        linkText?: string;
        theme: 'blue' | 'red';
    })[];
}

export default function ProjectsDeck({ projects }: ProjectsDeckProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="projects-layout flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto">
            {/* Sidebar */}
            <div className="projects-sidebar w-full md:w-1/4 flex flex-col gap-2">
                <h3 className="text-xl font-bold font-mono text-white mb-4 border-b border-[#ffffff22] pb-2">PROJECTS.LOG</h3>
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                    {projects.map((proj, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`text-left px-4 py-3 font-mono text-sm transition-all duration-300 border-l-2 ${
                                activeIndex === idx
                                    ? `border-${proj.theme === 'blue' ? '[#1e90ff]' : '[#ff2020]'} bg-[#ffffff11] text-white font-bold`
                                    : 'border-transparent text-[#888899] hover:bg-[#ffffff05] hover:text-white'
                            }`}
                        >
                            <span className="opacity-50 mr-2">0{idx + 1}</span> {proj.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="projects-content w-full md:w-3/4 flex justify-center items-center">
                <ProjectTicket
                    index={activeIndex + 1}
                    title={projects[activeIndex].title}
                    subtitle={projects[activeIndex].subtitle}
                    stack={projects[activeIndex].stack}
                    desc={projects[activeIndex].desc}
                    features={projects[activeIndex].features}
                    demo={projects[activeIndex].demo}
                    link={projects[activeIndex].link}
                    linkText={projects[activeIndex].linkText}
                    theme={projects[activeIndex].theme}
                />
            </div>
        </div>
    );
}
