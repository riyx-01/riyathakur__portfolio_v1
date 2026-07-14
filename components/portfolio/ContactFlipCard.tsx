'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import ProjectTicket from './ProjectTicket';

export default function ContactFlipCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const controls = useAnimation();
    const rotateY = useMotionValue(0);

    // Sync initial state
    useEffect(() => {
        controls.set({ rotateY: 0 });
    }, [controls]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.x < -threshold && !isFlipped) {
            // Dragged left -> flip to back
            setIsFlipped(true);
            controls.start({ rotateY: -180, transition: { type: "spring", stiffness: 200, damping: 20 } });
        } else if (info.offset.x > threshold && isFlipped) {
            // Dragged right -> flip to front
            setIsFlipped(false);
            controls.start({ rotateY: 0, transition: { type: "spring", stiffness: 200, damping: 20 } });
        } else {
            // Spring back
            controls.start({ rotateY: isFlipped ? -180 : 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        }
    };

    const handleFlipToBack = () => {
        setIsFlipped(true);
        controls.start({ rotateY: -180, transition: { type: "spring", stiffness: 200, damping: 20 } });
    };

    const handleFlipToFront = () => {
        setIsFlipped(false);
        controls.start({ rotateY: 0, transition: { type: "spring", stiffness: 200, damping: 20 } });
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-[450px] md:h-[600px] py-4 md:py-12" style={{ perspective: 2000 }}>
            <motion.div
                className="w-full h-full relative cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d', rotateY }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDrag={(e, info) => {
                    const currentBase = isFlipped ? -180 : 0;
                    rotateY.set(currentBase + info.offset.x / 3);
                }}
                onDragEnd={handleDragEnd}
                animate={controls}
            >
                {/* FRONT FACE */}
                <div 
                    className="absolute inset-0 flex items-center justify-center font-sans"
                    style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        pointerEvents: isFlipped ? 'none' : 'auto' 
                    }}
                >
                    <div 
                        className="scale-95 md:scale-100 lg:scale-110 transition-transform duration-300 flex flex-col items-center gap-12"
                        onPointerDown={(e) => {
                            // Don't prevent drag if they click empty space, but allow clicking links
                            const target = e.target as HTMLElement;
                            if (target.tagName === 'A' || target.closest('a')) {
                                e.stopPropagation();
                            }
                        }}
                    >
                        <ProjectTicket
                            title="Contact Protocol"
                            subtitle="COMMUNICATION"
                            stack="Email, GitHub, LinkedIn, Resume"
                            desc={<a href="mailto:riyathakur155555@gmail.com" className="text-lg md:text-xl font-bold text-white hover:text-[#ff2020] transition-colors underline relative z-50">riyathakur155555@gmail.com</a>}
                            features={<a href="https://github.com/riyx-01" target="_blank" rel="noreferrer" className="text-lg md:text-xl font-bold text-white hover:text-[#ff2020] transition-colors underline relative z-50">github.com/riyx-01</a>}
                            demo={<a href="https://www.linkedin.com/in/riyathakur01" target="_blank" rel="noreferrer" className="text-lg md:text-xl font-bold text-white hover:text-[#ff2020] transition-colors underline relative z-50">linkedin.com/in/riyathakur01</a>}
                            link="https://riyathakur.netlify.app/"
                            linkText="VIEW RESUME"
                            theme="red"
                            index="CT"
                            typeLabel="Contact"
                            descLabel="Email"
                            featuresLabel="GitHub"
                            demoLabel="LinkedIn"
                        />

                        {/* Manual Flip Button */}
                        <button 
                            onClick={handleFlipToBack}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag conflict
                            className="z-50 px-8 py-3 border border-[#ff2020] bg-[#0a0510]/80 text-[#ff2020] hover:bg-[#ff2020] hover:text-black font-mono text-sm tracking-widest transition-colors rounded-sm shadow-[0_0_15px_rgba(255,32,32,0.3)]"
                        >
                            REVEAL TERMINAL &gt;
                        </button>
                    </div>
                </div>

                {/* BACK FACE */}
                <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                        transform: 'rotateY(-180deg)', // IMPORTANT: must match the direction of the flip (-180)
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        pointerEvents: isFlipped ? 'auto' : 'none' 
                    }}
                >
                    <div className="ticket-wrapper red-theme w-full h-full p-2 max-w-[450px] mx-auto md:max-w-none" style={{ transform: 'none' }}>
                        <div className="ticket w-full h-full border border-[#ff2020]/50 bg-[#1a0830]/95 backdrop-blur-xl p-4 md:p-8 shadow-[0_0_30px_rgba(255,32,32,0.3)] rounded-lg flex flex-col justify-between relative overflow-hidden">
                            {/* Matrix Rain effect on the back */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
                            
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-4 md:gap-8">
                                <div>
                                    <h2 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold text-[#ff2020] tracking-widest mb-2 md:mb-4">
                                        ACCESS GRANTED
                                    </h2>
                                    <p className="text-sm sm:text-base md:text-xl text-[#94a3b8] font-mono px-2">
                                        &gt; Identity verified. Awaiting transmission...
                                    </p>
                                </div>
                                
                                <a 
                                    href="https://riyathakur.netlify.app/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="inline-block mt-4 md:mt-8 px-6 py-3 md:px-12 md:py-4 border-2 border-[#ff2020] text-[#ff2020] hover:bg-[#ff2020] hover:text-black transition-all duration-300 font-mono text-base md:text-2xl font-bold rounded-sm shadow-[0_0_15px_rgba(255,32,32,0.4)] hover:shadow-[0_0_30px_rgba(255,32,32,0.8)] relative z-50 cursor-pointer"
                                >
                                    [ VIEW RESUME ]
                                </a>
                            </div>
                            
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 font-mono text-[10px] md:text-xs text-[#ff2020]/50">&lt; BACKEND_ONLINE /&gt;</div>
                            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 font-mono text-[10px] md:text-xs text-[#ff2020]/50 animate-pulse">SECURE</div>
                        </div>
                    </div>

                    {/* Manual Un-Flip Button */}
                    <button 
                        onClick={handleFlipToFront}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-50 px-4 py-2 border border-[#ff2020] bg-[#0a0510]/80 text-[#ff2020] hover:bg-[#ff2020] hover:text-black font-mono text-xs md:text-sm tracking-widest transition-colors rounded-sm shadow-[0_0_15px_rgba(255,32,32,0.3)] cursor-pointer"
                    >
                        &lt; BACK
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
