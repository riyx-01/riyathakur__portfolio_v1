'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CyberGrid from './CyberGrid';

const SKILLS_DATA = [
    {
        title: "[PROGRAMMING.SYS]",
        theme: "red",
        skills: ["Python", "SQL", "JavaScript", "Java", "C", "HTML", "CSS", "R", "MS-Excel"]
    },
    {
        title: "[INTERFACE.SYS]",
        theme: "blue",
        skills: ["React.js", "Next.js", "Flask", "ASP.NET MVC", "Framer Motion", "WordPress", "Shopify", "Power BI", "Figma"]
    },
    {
        title: "[DATA_DEX]",
        theme: "red",
        skills: ["TensorFlow", "Keras", "OpenCV", "CNN/ResNet", "Pandas", "NumPy", "Scikit-learn", "Database Systems"]
    },
    {
        title: "[UTILITY.EXE]",
        theme: "blue",
        skills: ["Git/GitHub", "Vercel", "Netlify", "CI/CD", "VS Code", "Jupyter", "Agile/REST"]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="section relative skills-section overflow-hidden min-h-screen py-32">
            <CyberGrid />
            
            <div className="container relative z-10 max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header mb-16"
                >
                    <span className="subtitle font-mono text-[#ff2020] tracking-widest uppercase">TECH CORE</span>
                    <h2 className="heading text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">SKILLS</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {SKILLS_DATA.map((module, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className={`relative p-[2px] rounded-lg overflow-hidden group ${
                                module.theme === 'red' ? 'hover:shadow-[0_0_30px_rgba(255,32,32,0.2)]' : 'hover:shadow-[0_0_30px_rgba(30,144,255,0.2)]'
                            } transition-shadow duration-500`}
                        >
                            {/* Animated Gradient Border */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${
                                module.theme === 'red' ? 'from-[#ff2020] via-[#ff2020]/20 to-transparent' : 'from-[#1e90ff] via-[#1e90ff]/20 to-transparent'
                            } opacity-30 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            
                            {/* Card Content */}
                            <div className="relative h-full bg-[#0a0510]/90 backdrop-blur-xl rounded-lg p-8 border border-white/5 flex flex-col gap-6">
                                <h3 className={`font-mono text-xl md:text-2xl font-bold ${
                                    module.theme === 'red' ? 'text-[#ff2020]' : 'text-[#1e90ff]'
                                }`}>
                                    {module.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-3">
                                    {module.skills.map((skill, sIdx) => (
                                        <motion.span
                                            key={sIdx}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className={`px-4 py-2 font-mono text-sm md:text-base rounded-full border ${
                                                module.theme === 'red' 
                                                    ? 'border-[#ff2020]/30 text-white hover:bg-[#ff2020]/10 hover:border-[#ff2020]' 
                                                    : 'border-[#1e90ff]/30 text-white hover:bg-[#1e90ff]/10 hover:border-[#1e90ff]'
                                            } transition-colors cursor-default`}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
