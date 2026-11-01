'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './CircularCarousel.css';

/**
 * Curved, infinitely looping image carousel (inspired by React Bits "Circular Gallery").
 * Pure DOM + transforms, no extra dependencies.
 *
 * Props
 *  - items:          [{ src, alt, title? }]            images to show
 *  - activeIndex:    number                            controlled centred item
 *  - onActiveChange: (index) => void                   fired when the carousel settles on an item
 *  - onItemClick:    (index) => void                   fired when the centred item is clicked
 *  - radius:         number (px, desktop)              size of the arc; smaller = tighter curve
 *  - bend:           number (radians per item)         angular gap between neighbours
 *  - autoplay:       boolean                           gentle auto-rotation (off for reduced motion)
 *  - autoplayDelay:  number (ms)
 *  - paused:         boolean                           externally pause autoplay (e.g. lightbox open)
 *  - label:          string                            aria-label for the carousel
 */
const wrapDelta = (d, n) => ((((d + n / 2) % n) + n) % n) - n / 2;
const mod = (i, n) => ((i % n) + n) % n;
const VISIBLE = 3.4;

export default function CircularCarousel({
  items,
  activeIndex = 0,
  onActiveChange,
  onItemClick,
  radius = 680,
  bend = 0.5,
  autoplay = true,
  autoplayDelay = 4500,
  paused = false,
  label = 'Photo archive carousel',
}) {
  const n = items.length;
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);
  const geo = useRef({ R: radius, step: bend, itemPx: 220 });
  const st = useRef({
    pos: activeIndex,
    target: activeIndex,
    vel: 0,
    dragging: false,
    moved: 0,
    raf: 0,
    last: 0,
    settled: activeIndex,
    wheelTimer: 0,
  });
  const reduced = useRef(false);
  const cb = useRef({ onActiveChange, onItemClick });
  cb.current = { onActiveChange, onItemClick };

  const [current, setCurrent] = useState(mod(activeIndex, n));
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const render = useCallback(() => {
    const { pos } = st.current;
    const { R, step } = geo.current;
    for (let i = 0; i < n; i++) {
      const el = nodeRefs.current[i];
      if (!el) continue;
      const d = wrapDelta(i - pos, n);
      const ad = Math.abs(d);
      if (ad > VISIBLE) {
        el.style.visibility = 'hidden';
        continue;
      }
      const a = d * step;
      const x = Math.sin(a) * R;
      const z = (Math.cos(a) - 1) * R;
      const rot = (-a * 180) / Math.PI;
      const near = Math.max(0, 1 - ad);
      const scale = 0.84 + 0.16 * near;
      el.style.visibility = 'visible';
      el.style.opacity = String(Math.max(0, 1 - ad * 0.26));
      el.style.zIndex = String(100 - Math.round(ad * 10));
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${rot.toFixed(
        2
      )}deg) scale(${scale.toFixed(3)})`;
      el.style.setProperty('--cc-near', near.toFixed(3));
    }
    const idx = mod(Math.round(pos), n);
    setCurrent((c) => (c === idx ? c : idx));
  }, [n]);

  const settle = useCallback(() => {
    const idx = mod(Math.round(st.current.pos), n);
    if (idx !== st.current.settled) {
      st.current.settled = idx;
      cb.current.onActiveChange?.(idx);
    }
  }, [n]);

  const tick = useCallback(
    (t) => {
      const s = st.current;
      const dt = Math.min(0.05, (t - (s.last || t)) / 1000);
      s.last = t;
      if (!s.dragging) {
        const diff = s.target - s.pos;
        if (reduced.current || Math.abs(diff) < 0.0008) {
          s.pos = s.target;
          render();
          s.raf = 0;
          s.last = 0;
          settle();
          return;
        }
        s.pos += diff * (1 - Math.exp(-dt * 7));
      }
      render();
      s.raf = requestAnimationFrame(tick);
    },
    [render, settle]
  );

  const start = useCallback(() => {
    if (!st.current.raf) st.current.raf = requestAnimationFrame(tick);
  }, [tick]);

  const goTo = useCallback(
    (delta) => {
      st.current.target = Math.round(st.current.target) + delta;
      start();
    },
    [start]
  );

  // Geometry follows the container width: single large item with a tighter curve on mobile.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const apply = () => {
      const w = el.clientWidth;
      const mobile = w < 640;
      geo.current = mobile
        ? { R: Math.min(radius, w * 0.55), step: bend * 1.5, itemPx: w * 0.7 }
        : { R: radius, step: bend, itemPx: Math.min(440, w * 0.36) };
      el.dataset.size = mobile ? 'sm' : 'lg';
      render();
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, bend, render]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reduced.current = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // External control (e.g. lightbox prev/next) animates the carousel to that item.
  useEffect(() => {
    const s = st.current;
    const want = mod(activeIndex, n);
    if (want === s.settled && want === mod(Math.round(s.target), n)) return;
    s.target = Math.round(s.target) + wrapDelta(want - Math.round(s.target), n);
    start();
  }, [activeIndex, n, start]);

  // Drag / swipe with inertia, then snap.
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const s = st.current;
    s.dragging = true;
    s.moved = 0;
    s.vel = 0;
    const startX = e.clientX;
    const startPos = s.pos;
    let lastX = startX;
    let lastT = performance.now();

    const move = (ev) => {
      const dx = ev.clientX - startX;
      s.moved = Math.max(s.moved, Math.abs(dx));
      const perItem = Math.max(80, geo.current.itemPx * 0.7);
      s.pos = startPos - dx / perItem;
      s.target = s.pos;
      const now = performance.now();
      const dtm = Math.max(1, now - lastT);
      const v = (-(ev.clientX - lastX) / perItem) / (dtm / 1000);
      s.vel = s.vel * 0.6 + v * 0.4;
      lastX = ev.clientX;
      lastT = now;
      start();
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      s.dragging = false;
      const flick = Math.max(-3, Math.min(3, s.vel * 0.22));
      s.target = Math.round(s.pos + flick);
      s.last = 0;
      start();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  // Horizontal wheel / trackpad (vertical wheel is left alone so the page still scrolls).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontal && !e.shiftKey) return;
      e.preventDefault();
      const s = st.current;
      s.target += (e.deltaX || e.deltaY) * 0.004;
      start();
      clearTimeout(s.wheelTimer);
      s.wheelTimer = setTimeout(() => {
        s.target = Math.round(s.target);
        start();
      }, 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(st.current.wheelTimer);
    };
  }, [start]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(-1);
    }
  };

  // Gentle autoplay: pauses on hover/focus/drag/lightbox, off for reduced motion.
  useEffect(() => {
    if (!autoplay || paused || hovered || focused || n < 2) return;
    if (reduced.current) return;
    const id = setInterval(() => {
      if (!st.current.dragging && !document.hidden) goTo(1);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, paused, hovered, focused, n, goTo]);

  useEffect(
    () => () => {
      cancelAnimationFrame(st.current.raf);
      st.current.raf = 0;
    },
    []
  );

  const onItemActivate = (i) => {
    if (st.current.moved > 6) return;
    const d = wrapDelta(i - Math.round(st.current.pos), n);
    if (d === 0) cb.current.onItemClick?.(i);
    else goTo(d);
  };

  const title = items[current]?.title ?? `Archive ${String(current + 1).padStart(2, '0')}`;

  return (
    <div
      className="cc-root"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="cc-stage" ref={stageRef} onPointerDown={onPointerDown}>
        {items.map((item, i) => {
          const isCurrent = i === current;
          return (
            <div
              key={item.src}
              ref={(el) => (nodeRefs.current[i] = el)}
              className="cc-item"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
            >
              <button
                type="button"
                className="cc-card"
                tabIndex={isCurrent ? 0 : -1}
                aria-label={isCurrent ? `Open ${item.alt} in the lightbox` : `Bring ${item.alt} to the centre`}
                onClick={() => onItemActivate(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 440px, 70vw"
                  loading="lazy"
                  draggable={false}
                  className="cc-img"
                />
                <span className="cc-dim" aria-hidden="true" />
                <span className="cc-glow" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>

      <p className="cc-caption font-display" aria-live="polite">
        {title}
      </p>
      <div className="cc-dots" aria-hidden="true">
        <button type="button" tabIndex={-1} className="cc-arrow" onClick={() => goTo(-1)}>
          ‹
        </button>
        <span>
          {String(current + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button type="button" tabIndex={-1} className="cc-arrow" onClick={() => goTo(1)}>
          ›
        </button>
      </div>
    </div>
  );
}
