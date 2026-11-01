'use client';

import { useEffect, useRef } from 'react';

export default function Atmosphere() {
  const canvasRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrame;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: window.innerWidth < 640 ? 25 : 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      velocityY: -(Math.random() * 0.25 + 0.05),
      velocityX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.y < -5) {
          particle.y = height + 5;
          particle.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 223, 154, ${particle.opacity})`;
        ctx.shadowColor = '#c9a44c';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <canvas id="gold-motes-canvas" ref={canvasRef} aria-hidden="true" />
      <div id="scroll-progress-container" title="Diplomatic Scroll Progress" aria-hidden="true">
        <div id="scroll-progress-fill" ref={fillRef} />
      </div>
    </>
  );
}
