'use client';

import { useEffect, useRef } from 'react';

// Floating gold motes, a soft mouse-following vignette and a gold scroll-progress rail.
export default function Atmosphere() {
  const canvasRef = useRef(null);
  const fillRef = useRef(null);
  const vignetteRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    const count = window.innerWidth < 640 ? 25 : 55;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -5) { m.y = h + 5; m.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 223, 154, ${m.a})`;
        ctx.shadowColor = '#c9a44c';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    };
    const onMove = (e) => {
      const v = vignetteRef.current;
      if (!v) return;
      v.style.setProperty('--mouse-x', `${e.clientX}px`);
      v.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas id="gold-motes-canvas" ref={canvasRef} aria-hidden="true" />
      <div id="mouse-vignette" ref={vignetteRef} aria-hidden="true" />
      <div id="scroll-progress-container" title="Diplomatic Scroll Progress" aria-hidden="true">
        <div id="scroll-progress-fill" ref={fillRef} />
      </div>
    </>
  );
}
