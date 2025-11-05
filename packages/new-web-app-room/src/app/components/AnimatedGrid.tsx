'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 40;
    let animationOffset = 0;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation offset
      animationOffset += 0.5;
      
      // Set grid line style
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.15)'; // Orange with transparency
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      for (let x = (animationOffset % gridSize) - gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = (animationOffset % gridSize) - gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Add some animated dots at grid intersections
      ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
      const time = Date.now() * 0.001;
      
      for (let x = (animationOffset % gridSize) - gridSize; x < canvas.width + gridSize; x += gridSize) {
        for (let y = (animationOffset % gridSize) - gridSize; y < canvas.height + gridSize; y += gridSize) {
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(time + distance * 0.01) * 0.5 + 0.5;
          const radius = wave * 2 + 1;
          
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' }}
    />
  );
}
