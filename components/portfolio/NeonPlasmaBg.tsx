'use client';

import React, { useEffect, useRef } from 'react';

export default function NeonPlasmaBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Vertex Shader
        const vsSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        // Fragment Shader - beautiful neon fractal plasma
        const fsSource = `
            precision highp float;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;

            // Neon Palette
            vec3 palette(in float t) {
                // Creates a glowing mix of deep purple, electric blue, and neon red
                vec3 a = vec3(0.1, 0.05, 0.2); // deep purple base
                vec3 b = vec3(0.5, 0.5, 0.5);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.0, 0.33, 0.67); // blue shift
                
                vec3 col = a + b * cos(6.28318 * (c * t + d));
                
                // Add a dash of red/pink
                col += vec3(0.8, 0.1, 0.3) * sin(t * 3.0) * 0.3;
                return col;
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
                vec2 uv0 = uv;
                
                // Subtle parallax based on mouse
                vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / u_resolution.y;
                uv -= mouse * 0.08;

                vec3 finalColor = vec3(0.0);

                // Use int for WebGL 1.0 compatibility
                for (int i = 0; i < 4; i++) {
                    uv = fract(uv * 1.4) - 0.5;

                    float d = length(uv) * exp(-length(uv0));

                    vec3 col = palette(length(uv0) + float(i) * 0.4 + u_time * 0.2);

                    d = sin(d * 8.0 + u_time) / 8.0;
                    d = abs(d);
                    d = pow(0.012 / d, 1.3);

                    finalColor += col * d;
                }
                
                // Increased brightness to ensure it's visible
                gl_FragColor = vec4(finalColor * 0.35, 1.0);
            }
        `;

        const compileShader = (source: string, type: number) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1, -1,
             1,  1,
            -1,  1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let targetMouseX = mouseX;
        let targetMouseY = mouseY;

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = e.clientX;
            targetMouseY = window.innerHeight - e.clientY; // Invert Y for WebGL
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            const time = (Date.now() - startTime) * 0.001;
            
            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform1f(timeLocation, time);
            gl.uniform2f(mouseLocation, mouseX, mouseY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(positionBuffer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                background: '#0a0510' // Deep dark background
            }}
        />
    );
}
