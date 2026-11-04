'use client';

import { useEffect, useRef } from 'react';

/**
 * Light floating gold dust behind the archive panels (canvas, < 40 particles).
 * Pauses when off screen, skips entirely for reduced motion, fewer particles on small screens.
 */
export default function GoldDust({ paused = false }) {
  const ref = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const kick = useRef(() => {});

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    const count = window.innerWidth < 640 ? 14 : 34;
    const dust = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.6,
      vy: -(Math.random() * 0.012 + 0.004),
      vx: (Math.random() - 0.5) * 0.006,
      a: Math.random() * 0.5 + 0.25,
      ph: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of dust) {
        p.x += p.vx * 0.06;
        p.y += p.vy * 0.06;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        const tw = 0.6 + 0.4 * Math.sin(t / 900 + p.ph);
        ctx.beginPath();
        ctx.fillStyle = `rgba(226, 192, 104, ${(p.a * tw * 0.55).toFixed(3)})`;
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = visible && !pausedRef.current ? requestAnimationFrame(draw) : 0;
    };
    kick.current = () => {
      if (visible && !raf) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!paused) kick.current();
  }, [paused]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
