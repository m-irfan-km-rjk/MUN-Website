'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Grid Motion (React Bits) adapted for this site: a tilted grid whose rows scroll endlessly in
 * alternating directions at different speeds. Each row's content is rendered twice so the loop is
 * seamless (the row slides exactly one copy, then repeats). Reduced-motion gets a static grid.
 *
 * `rows` is an array of arrays of React nodes (one array per row).
 */
const DURATIONS = [70, 90, 80, 100]; // seconds per loop, different per row for a layered feel

export default function GridMotion({ rows = [], gradientColor = 'rgba(88, 33, 25, 1)', children }) {
  const wrapRef = useRef(null);
  const rowRefs = useRef([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const els = rowRefs.current.filter(Boolean);
    if (reduced || !els.length) return undefined;

    const tweens = els.map((el, i) => {
      const left = i % 2 === 0; // alternate direction per row
      return gsap.fromTo(
        el,
        { xPercent: left ? 0 : -50 },
        { xPercent: left ? -50 : 0, duration: DURATIONS[i % DURATIONS.length], ease: 'none', repeat: -1 }
      );
    });

    // Don't animate while the section is off screen.
    const io = new IntersectionObserver(([entry]) => {
      tweens.forEach((t) => (entry.isIntersecting ? t.resume() : t.pause()));
    });
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      io.disconnect();
      tweens.forEach((t) => t.kill());
      gsap.set(els, { clearProps: 'transform' });
    };
  }, [reduced, rows]);

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
      {/* Oversized, tilted grid so rows never expose their edges. */}
      <div
        className="absolute left-1/2 top-1/2 grid h-[150%] w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] grid-cols-[minmax(0,1fr)] gap-2 sm:gap-3 md:gap-4"
        style={{ gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {rows.map((items, r) => (
          <div
            key={r}
            ref={(el) => {
              rowRefs.current[r] = el;
            }}
            className="flex h-full w-max min-w-0 gap-2 sm:gap-3 md:gap-4"
            style={{ willChange: 'transform' }}
          >
            {/* Two identical halves: the loop slides exactly one half. */}
            {[0, 1].map((half) => (
              <div key={half} className="flex h-full shrink-0 gap-2 sm:gap-3 md:gap-4">
                {items}
              </div>
            ))}
          </div>
        ))}
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
