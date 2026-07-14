'use client';

import React, { useEffect, useRef } from 'react';

export default function TechAuroraBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

        const particles: { x: number, y: number, vx: number, vy: number, radius: number, baseAlpha: number }[] = [];
        const particleCount = Math.floor((width * height) / 15000); // Responsive density
        const connectionDistance = 150;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3, // Very slow
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.2 + 0.5,
                baseAlpha: Math.random() * 0.5 + 0.2
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx = -p.vx;
                if (p.y < 0 || p.y > height) p.vy = -p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(150, 200, 255, ${p.baseAlpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - (distance / connectionDistance)) * 0.15; // Very subtle lines
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ background: '#0a0510' }}>
            {/* Ambient Aurora Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[100px]" 
                 style={{ background: 'radial-gradient(circle, rgba(88,28,135,0.8) 0%, rgba(10,5,16,0) 70%)', animation: 'float 25s infinite ease-in-out alternate' }}></div>
            
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-15 blur-[120px]" 
                 style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(10,5,16,0) 70%)', animation: 'float-reverse 30s infinite ease-in-out alternate' }}></div>

            <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full opacity-10 blur-[90px]" 
                 style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.6) 0%, rgba(10,5,16,0) 70%)', animation: 'float 35s infinite ease-in-out alternate-reverse' }}></div>

            {/* Particle Network Overlay */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />

            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(8%, 12%) scale(1.1); }
                }
                @keyframes float-reverse {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-10%, -8%) scale(1.15); }
                }
            `}</style>
        </div>
    );
}
