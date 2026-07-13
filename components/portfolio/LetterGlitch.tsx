'use client';

import { useRef, useEffect, useMemo } from 'react';

interface LetterGlitchProps {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface LetterState {
  char: string;
  color: RGB;
  startColor: RGB;
  targetColor: RGB;
  colorProgress: number;
}

const LetterGlitch = ({
  glitchColors = ['#ff2020', '#1e90ff', '#888899', '#1a0830'],
  className = '',
  glitchSpeed = 75,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<LetterState[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());
  const isVisible = useRef(false);

  const lettersAndSymbols = Array.from(characters);

  // Optimizations: Increase character cell size to reduce grid resolution (60% fewer calculations)
  const fontSize = 16;
  const charWidth = 16;
  const charHeight = 26;

  const hexToRgb = (hex: string): RGB => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const cleanHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 30, g: 144, b: 255 }; // Default fallback to dodgerblue
  };

  // Pre-parse glitch colors once to avoid regex/string parsing inside the animation loop
  const parsedColors = useMemo<RGB[]>(() => {
    return glitchColors.map(color => hexToRgb(color));
  }, [glitchColors]);

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = (): RGB => {
    return parsedColors[Math.floor(Math.random() * parsedColors.length)];
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => {
      const col = getRandomColor();
      return {
        char: getRandomChar(),
        color: { ...col },
        startColor: { ...col },
        targetColor: { ...col },
        colorProgress: 1
      };
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Use a fixed resolution multiplier (capped at 1.5) to avoid excessive canvas sizes on high-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0 || !canvasRef.current) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = `rgb(${letter.color.r},${letter.color.g},${letter.color.b})`;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    // Lower transition intensity to 1.5% for background subtlety and performance
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.015));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      const newTarget = getRandomColor();
      letters.current[index].startColor = { ...letters.current[index].color };
      letters.current[index].targetColor = { ...newTarget };

      if (!smooth) {
        letters.current[index].color = { ...newTarget };
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.08;
        if (letter.colorProgress > 1) {
          letter.colorProgress = 1;
        }

        // Optimized numeric interpolation without string parses
        const progress = letter.colorProgress;
        letter.color = {
          r: Math.round(letter.startColor.r + (letter.targetColor.r - letter.startColor.r) * progress),
          g: Math.round(letter.startColor.g + (letter.targetColor.g - letter.startColor.g) * progress),
          b: Math.round(letter.startColor.b + (letter.targetColor.b - letter.startColor.b) * progress)
        };
        needsRedraw = true;
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    if (!isVisible.current) return;

    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        if (isVisible.current) animate();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    // Intersection Observer to run animation ONLY when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            animate();
          } else {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
              animationRef.current = null;
            }
          }
        });
      },
      { threshold: 0.02 } // Trigger when at least 2% is visible
    );

    observer.observe(canvas);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, parsedColors]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 0
  };

  const canvasStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
    opacity: 0.12
  };

  const outerVignetteStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(10,5,16,0) 50%, rgba(10,5,16,0.95) 100%)',
    zIndex: 1
  };

  const centerVignetteStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(10,5,16,0.5) 0%, rgba(10,5,16,0) 70%)',
    zIndex: 1
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default LetterGlitch;
