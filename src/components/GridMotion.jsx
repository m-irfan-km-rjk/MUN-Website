'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Grid Motion (React Bits) adapted for this site: rows of tiles drift against each other as the
 * mouse moves; touch devices get a slow automatic drift; reduced-motion gets a static grid.
 * `items` are React nodes, row-major (ROWS x cols).
 */
const ROWS = 4;
const INERTIA = [0.6, 0.4, 0.3, 0.2];

export default function GridMotion({ items = [], cols = 7, gradientColor = 'rgba(88, 33, 25, 1)', children }) {
  const wrapRef = useRef(null);
  const rowRefs = useRef([]);
  const [mode, setMode] = useState('static'); // 'static' | 'mouse' | 'drift'

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touch = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setMode(reduce.matches ? 'static' : touch.matches ? 'drift' : 'mouse');
    update();
    reduce.addEventListener('change', update);
    touch.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      touch.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (mode === 'static' || !rows.length) return undefined;

    if (mode === 'drift') {
      // Slow back-and-forth drift, alternating direction per row.
      const tweens = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -50 : 50 },
          { x: i % 2 === 0 ? 50 : -50, duration: 16 + i * 3, ease: 'sine.inOut', repeat: -1, yoyo: true }
        )
      );
      return () => {
        tweens.forEach((t) => t.kill());
        gsap.set(rows, { clearProps: 'transform' });
      };
    }

    // Mouse: rows shift at different speeds/inertia. Only works while the section is on screen.
    let mouseX = window.innerWidth / 2;
    let visible = true;
    const maxMove = 220;
    const onMove = (e) => {
      mouseX = e.clientX;
    };
    const update = () => {
      if (!visible) return;
      rows.forEach((row, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const x = ((mouseX / window.innerWidth) * maxMove - maxMove / 2) * dir;
        gsap.to(row, { x, duration: 1.2 + INERTIA[i % INERTIA.length], ease: 'power2.out', overwrite: 'auto' });
      });
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    window.addEventListener('mousemove', onMove, { passive: true });
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('mousemove', onMove);
      io.disconnect();
      gsap.killTweensOf(rows);
      gsap.set(rows, { clearProps: 'transform' });
    };
  }, [mode, cols]);

  const grid = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, r) => (
        <div
          key={r}
          ref={(el) => {
            rowRefs.current[r] = el;
          }}
          className="grid gap-2 sm:gap-3 md:gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, willChange: 'transform' }}
        >
          {items.slice(r * cols, r * cols + cols).map((item, c) => (
            <div key={c} className="relative min-h-0">
              {item}
            </div>
          ))}
        </div>
      )),
    [items, cols]
  );

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
      {/* Oversized, tilted grid so rows can slide without exposing edges. */}
      <div
        className="absolute left-1/2 top-1/2 grid h-[150%] w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] grid-rows-4 gap-2 sm:gap-3 md:gap-4"
        aria-hidden="true"
      >
        {grid}
      </div>

      {/* Edges melt into the section background. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: `radial-gradient(ellipse 80% 75% at 50% 50%, transparent 62%, ${gradientColor} 100%)` }}
      />
      {children}
    </div>
  );
}
