'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Simulate a powerful loading sequence
        const duration = 1800; // 1.8 seconds total
        const intervalTime = 30;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = '';
                }, 400); // Brief pause at 100% before fading out
            }
        }, intervalTime);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[99999] bg-[#020104] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* Center Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Abstract Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-24 h-24 mb-8 flex items-center justify-center"
                        >
                            {/* Outer rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-t-[#ff2020] border-r-transparent border-b-[#1e90ff] border-l-transparent"
                            ></motion.div>
                            
                            {/* Inner pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-2 rounded-full border border-dashed border-[#94a3b8]"
                            ></motion.div>
                            
                            {/* Core Symbol */}
                            <span className="font-mono text-3xl font-bold text-white tracking-tighter">
                                R<span className="text-[#ff2020]">T</span>
                            </span>
                        </motion.div>

                        {/* System Status */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col items-center gap-3 w-64"
                        >
                            <div className="w-full flex justify-between font-mono text-[10px] text-[#94a3b8] tracking-widest uppercase">
                                <span>SYSTEM.BOOT</span>
                                <span>{progress}%</span>
                            </div>
                            
                            {/* Progress Bar Container */}
                            <div className="w-full h-[2px] bg-[#1a0830] relative overflow-hidden">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1e90ff] to-[#ff2020]"
                                    style={{ width: `${progress}%` }}
                                ></motion.div>
                            </div>
                            
                            <div className="font-mono text-xs text-[#ff2020] tracking-[0.3em] mt-4 animate-pulse">
                                INITIALIZING
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
