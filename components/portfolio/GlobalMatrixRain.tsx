'use client';

import React, { useState, useEffect } from 'react';

const SYMBOLS = ['{', '}', '[', ']', '(', ')', ';', ':', '=', '+', '-', '*', '/', '%', '<', '>', '!', '&', '|', '~', '^', '?', '@', '#', '$', '0', '1'];
const KEYWORDS = ['PY', 'JS', 'CSS', 'HTML', 'SQL', 'API', 'GIT', 'AI', 'ML', 'DL', 'TF', 'KERAS', 'REACT', 'NODE', 'NEXT', 'FLASK', 'JAVA', 'LINUX', 'CLOUD', 'DATA', 'UX', 'UI', 'DEV', 'OPS'];

interface ColumnData {
  id: number;
  chars: string[];
  delay: number;
  duration: number;
  left: number;
}

export default function GlobalMatrixRain() {
  const [columns, setColumns] = useState<ColumnData[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // 35-40 vertical columns generated programmatically
    const columnCount = window.innerWidth < 768 ? 15 : 38;
    const newCols = Array.from({ length: columnCount }).map((_, i) => {
      const charCount = Math.floor(Math.random() * 20) + 15;
      const chars = Array.from({ length: charCount }).map(() => {
        const useKeyword = Math.random() > 0.8;
        return useKeyword 
          ? KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]
          : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      });
      
      return {
        id: i,
        chars,
        delay: Math.random() * -5, // negative animation-delay for stagger
        duration: Math.random() * 2.5 + 2.5, // duration 2.5s to 5s
        left: (i / columnCount) * 100,
      };
    });
    setColumns(newCols);
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ opacity: 0.18, zIndex: -1, background: '#0a0510' }} 
      aria-hidden="true"
    >
      {columns.map(col => (
        <div 
          key={col.id} 
          className="matrix-column-global absolute flex flex-col items-center text-center whitespace-pre-wrap leading-tight"
          style={{ 
            left: `${col.left}%`, 
            top: '-10%',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            animation: `fall ${col.duration}s linear infinite`,
            animationDelay: `${col.delay}s`
          }}
        >
          {col.chars.map((char, charIdx) => {
            const rand = Math.random();
            let color = '#1e90ff'; // 70% blue
            let opacity = 0.5;
            let textShadow = '0 0 5px rgba(30, 144, 255, 0.5)';

            if (charIdx === 0) {
              // 10% head is white
              color = '#ffffff';
              opacity = 0.9;
              textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
            } else if (rand > 0.77) {
              // roughly 20% red
              color = '#ff2020';
              opacity = 0.3;
              textShadow = '0 0 5px rgba(255, 32, 32, 0.5)';
            } else {
              // adjust blue opacity trailing
              opacity = Math.max(0.1, 0.7 - (charIdx / col.chars.length));
            }

            return (
              <span 
                key={charIdx} 
                style={{ color, opacity, textShadow }}
                className="transition-opacity duration-100"
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
