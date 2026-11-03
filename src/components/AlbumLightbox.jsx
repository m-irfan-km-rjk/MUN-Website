'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useReducedMotion } from 'framer-motion';
import CircularCarousel from './CircularCarousel';
import blurs from '@/data/blurs.json';

const PANEL_SIZES = '(min-width: 768px) 60vw, 100vw'; // matches the accordion cover (same cached file)
const CARD_SIZES = '(min-width: 640px) 440px, 70vw'; // matches the carousel card
const SLIDE_MS = 4;

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light';
const goldBtn =
  'flex h-11 w-11 items-center justify-center rounded border border-gold/70 bg-maroon-dark/80 text-xl text-gold-light transition-colors hover:bg-gold hover:text-maroon-dark';

/** One rolling digit: a 0-9 column that slides so the right number sits in the window. */
function Digit({ d }) {
  return (
    <span className="relative inline-block h-[1.25em] w-[0.66em] overflow-hidden align-bottom" aria-hidden="true">
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${d * 10}%)` }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1.25em] text-center leading-[1.25em]">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function Counter({ index, total }) {
  const width = String(total).length;
  const digits = String(index + 1).padStart(width, '0').split('');
  return (
    <span className="inline-flex items-center font-display text-sm tracking-[0.12em] text-cream">
      <span className="sr-only" aria-live="polite">{`Photo ${index + 1} of ${total}`}</span>
      {digits.map((c, i) => (
        <Digit key={i} d={Number(c)} />
      ))}
      <span aria-hidden="true" className="px-1.5 opacity-70">
        /
      </span>
      <span aria-hidden="true">{String(total).padStart(width, '0')}</span>
    </span>
  );
}

/** Zoomed view of the centre photo: scale 1.6, drag to pan, click (without dragging) to reset. */
function ZoomView({ rect, src, blur, onDone }) {
  const frame = useRef(null);
  const inner = useRef(null);
  const reduce = useReducedMotion();
  const done = useRef(false);

  useLayoutEffect(() => {
    gsap.fromTo(inner.current, { scale: 1 }, { scale: 1.6, duration: reduce ? 0 : 0.5, ease: 'power3.out' });
    return () => gsap.killTweensOf(inner.current);
  }, [reduce]);

  const leave = () => {
    if (done.current) return;
    done.current = true;
    gsap.to(inner.current, { scale: 1, x: 0, y: 0, duration: reduce ? 0 : 0.35, ease: 'power2.inOut', onComplete: onDone });
  };

  const onDown = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const x0 = gsap.getProperty(inner.current, 'x');
    const y0 = gsap.getProperty(inner.current, 'y');
    const maxX = (rect.width * 0.6) / 2;
    const maxY = (rect.height * 0.6) / 2;
    let moved = 0;
    const move = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      moved = Math.max(moved, Math.abs(dx), Math.abs(dy));
      gsap.set(inner.current, { x: gsap.utils.clamp(-maxX, maxX, x0 + dx), y: gsap.utils.clamp(-maxY, maxY, y0 + dy) });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      if (moved < 6) leave();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  return (
    <div
      ref={frame}
      role="button"
      tabIndex={0}
      aria-label="Zoomed photo. Drag to pan, press Enter or click to reset"
      onPointerDown={onDown}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), leave())}
      className={`fixed z-20 cursor-grab touch-none overflow-hidden rounded-[4px] border border-gold bg-maroon-dark shadow-[0_0_40px_6px_rgba(201,164,76,0.45)] active:cursor-grabbing ${ring}`}
      style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <Image src={src} alt="" fill sizes="(min-width: 640px) 900px, 140vw" draggable={false} className="pointer-events-none object-cover" {...(blur ? { placeholder: 'blur', blurDataURL: blur } : {})} />
      </div>
    </div>
  );
}

function Dialog({ album, origin, reduce, onCloseStart, onClosed }) {
  const items = useMemo(
    () => album.photos.map((src, i) => ({ src, blur: blurs[src], alt: `${album.title} photo ${i + 1}`, title: `${album.title} · ${i + 1}` })),
    [album]
  );
  const n = items.length;
  const startIndex = Math.max(0, album.photos.indexOf(album.cover));

  const [active, setActive] = useState(startIndex);
  const [playing, setPlaying] = useState(false);
  const [intro, setIntro] = useState(reduce || !origin ? undefined : 'hold');
  const [zoomRect, setZoomRect] = useState(null);
  const [fs, setFs] = useState(false);
  const [fsOK, setFsOK] = useState(false);
  // Thumbnails mount once the cover has landed, so opening doesn't have to build 30+ images in one frame.
  const [thumbs, setThumbs] = useState(Boolean(reduce || !origin));
  const [flyer, setFlyer] = useState({ src: origin?.src ?? album.cover, sizes: PANEL_SIZES });

  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const texRef = useRef(null);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const flyerRef = useRef(null);
  const thumbsRef = useRef(null);
  const indicatorRef = useRef(null);
  const ringRef = useRef(null);
  const closeRef = useRef(null);
  const closing = useRef(false);
  const step = useCallback((d) => setActive((a) => (a + d + n) % n), [n]);

  const centerRect = () => {
    const card = stageRef.current?.querySelector('.cc-item[data-current="true"] .cc-card');
    const r = card?.getBoundingClientRect();
    return r ? { left: r.left, top: r.top, width: r.width, height: r.height } : null;
  };

  // ---- Open: the clicked panel's cover flies to the carousel's centre slot while a circular reveal rises
  // from the click point; the other cards then fan out into the 3D arc.
  useEffect(() => {
    setFsOK(Boolean(document.fullscreenEnabled));
    const letters = () => gsap.utils.toArray('[data-ch]', rootRef.current);
    const ctx = gsap.context(() => {
      const cr = centerRect();
      if (reduce || !origin || !cr) {
        gsap.fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        gsap.set(texRef.current, { opacity: 0.14 });
        return;
      }
      const { rect: o, x, y } = origin;
      const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      gsap.set([stageRef.current, headerRef.current, footerRef.current], { opacity: 0 });
      gsap.set(flyerRef.current, { left: o.left, top: o.top, width: o.width, height: o.height, borderRadius: 8, opacity: 1, display: 'block' });
      gsap.timeline()
        .to(bgRef.current, { clipPath: `circle(${R}px at ${x}px ${y}px)`, duration: 0.9, ease: 'power3.inOut' }, 0)
        .to(texRef.current, { opacity: 0.16, duration: 1.2, ease: 'power1.out' }, 0.25)
        .to(flyerRef.current, { left: cr.left, top: cr.top, width: cr.width, height: cr.height, borderRadius: 4, duration: 0.85, ease: 'power3.inOut' }, 0.12)
        .add(() => {
          // Landed: hand over to the real carousel card and fan the others out.
          gsap.set(stageRef.current, { opacity: 1 });
          gsap.set(flyerRef.current, { display: 'none' });
          setIntro('play');
          setThumbs(true);
        }, 0.97)
        .fromTo(letters(), { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.045, ease: 'power3.out' }, 0.45)
        .fromTo(headerRef.current, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5)
        .fromTo(footerRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.0);
    }, rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Close: reverse of the open. Cards fold in, the photo flies back to its panel, the reveal collapses.
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setZoomRect(null);
    onCloseStart?.();
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    if (reduce || !origin) {
      gsap.to(rootRef.current, { opacity: 0, duration: 0.2, onComplete: onClosed });
      return;
    }
    const cr = centerRect();
    const dest = origin.getRect?.() ?? origin.rect;
    const { x, y } = origin;
    setIntro('out');
    setFlyer({ src: items[active]?.src ?? album.cover, sizes: CARD_SIZES });
    gsap.timeline({ onComplete: onClosed })
      .to([headerRef.current, footerRef.current], { opacity: 0, y: (i) => (i ? 30 : -14), duration: 0.3, ease: 'power2.in' }, 0)
      .add(() => {
        gsap.set(stageRef.current, { opacity: 0 });
        gsap.set(flyerRef.current, { display: 'block', opacity: 1, left: cr.left, top: cr.top, width: cr.width, height: cr.height, borderRadius: 4 });
      }, 0.42)
      .to(flyerRef.current, { left: dest.left, top: dest.top, width: dest.width, height: dest.height, borderRadius: 8, duration: 0.8, ease: 'power3.inOut' }, 0.45)
      .to(texRef.current, { opacity: 0, duration: 0.5 }, 0.45)
      .to(bgRef.current, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.85, ease: 'power3.inOut' }, 0.5)
      .to(flyerRef.current, { opacity: 0, duration: 0.25 }, 1.0);
  }, [active, album.cover, items, onClosed, onCloseStart, origin, reduce]);

  // Lock page scroll (restoring the exact scroll position afterwards).
  useEffect(() => {
    const y = window.scrollY;
    const prev = { body: document.body.style.overflow, html: document.documentElement.style.overflow };
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev.body;
      document.documentElement.style.overflow = prev.html;
      window.scrollTo(0, y);
    };
  }, []);

  const toggleZoom = useCallback(() => {
    setZoomRect((z) => (z ? null : centerRect()));
  }, []);

  // Esc, arrows (unless the carousel already handled them) and a focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
      } else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.defaultPrevented && n > 1) {
        setZoomRect(null);
        step(e.key === 'ArrowRight' ? 1 : -1);
      } else if (e.key === 'Tab' && dialogRef.current) {
        const f = [...rootRef.current.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), [tabindex="0"]')].filter((el) => el.getClientRects().length > 0);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!rootRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, close, step]);

  useEffect(() => {
    const on = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggleFs = () => (document.fullscreenElement ? document.exitFullscreen() : rootRef.current?.requestFullscreen?.());

  // Filmstrip: keep the active thumbnail centred and slide the gold underline to it.
  useEffect(() => {
    const box = thumbsRef.current;
    const el = box?.querySelector(`[data-thumb="${active}"]`);
    if (!box || !el) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    if (indicatorRef.current) indicatorRef.current.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active, reduce, intro, thumbs]);

  // Slideshow: a gold ring around the play button fills over SLIDE_MS, then the next photo.
  useEffect(() => {
    const c = ringRef.current;
    if (!c) return undefined;
    const len = 2 * Math.PI * 20;
    gsap.set(c, { strokeDasharray: len, strokeDashoffset: len });
    if (!playing || zoomRect || n < 2) return undefined;
    const t = gsap.to(c, { strokeDashoffset: 0, duration: SLIDE_MS, ease: 'none', onComplete: () => step(1) });
    return () => t.kill();
  }, [playing, active, zoomRect, n, step]);

  const stop = (e) => e.stopPropagation();
  const letters = [...album.title].map((c, i) => (
    <span key={i} data-ch className="inline-block will-change-transform">
      {c === ' ' ? ' ' : c}
    </span>
  ));

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200] overflow-y-auto" onClick={close}>
      {/* Maroon gradient + blur; the reveal circle grows from the click point. */}
      <div
        ref={bgRef}
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(70,22,16,0.985),rgba(20,0,0,0.99)_70%)]"
        style={origin && !reduce ? { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` } : undefined}
      />
      <div
        ref={texRef}
        className="pointer-events-none fixed inset-0 opacity-0 mix-blend-soft-light"
        style={{ backgroundImage: "url('/images/ceiling-fresco-tile.webp')", backgroundSize: '520px' }}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${album.title} photo album`}
        className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-4 sm:px-6"
      >
        <header ref={headerRef} className="flex items-start justify-between gap-4" onClick={stop}>
          <div>
            <h2 aria-label={album.title} className="font-cormorant text-2xl font-semibold uppercase tracking-[0.18em] text-gold-light sm:text-3xl">
              <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                {letters}
              </span>
            </h2>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light/80">{album.year ? `${album.year} Edition` : 'Archive'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Counter index={active} total={n} />
            {fsOK && (
              <button type="button" aria-label={fs ? 'Exit full screen' : 'Enter full screen'} aria-pressed={fs} onClick={toggleFs} className={`${goldBtn} ${ring}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {fs ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
                </svg>
              </button>
            )}
            <button ref={closeRef} type="button" aria-label="Close album" onClick={close} className={`${goldBtn} ${ring}`}>
              ✕
            </button>
          </div>
        </header>

        <div ref={stageRef} className="relative my-auto py-4" onClick={stop}>
          <CircularCarousel
            items={items}
            activeIndex={active}
            onActiveChange={setActive}
            onItemClick={toggleZoom}
            autoplay={false}
            showFooter={false}
            loadRadius={2}
            bend={0.6}
            tilt
            wheelAny
            introState={intro}
            label={`${album.title} photo carousel`}
          />
          {n > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={`${goldBtn} ${ring} absolute left-0 top-1/2 z-10 -translate-y-1/2`}>
                ‹
              </button>
              <button type="button" aria-label="Next photo" onClick={() => step(1)} className={`${goldBtn} ${ring} absolute right-0 top-1/2 z-10 -translate-y-1/2`}>
                ›
              </button>
            </>
          )}
        </div>

        {n > 1 && (
          <footer ref={footerRef} className="space-y-3 pb-2" onClick={stop}>
            <div className="flex justify-center">
              <button
                type="button"
                aria-pressed={playing}
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                onClick={() => setPlaying((p) => !p)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold-light transition-colors hover:bg-gold/15 ${ring}`}
              >
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
                  <circle ref={ringRef} cx="22" cy="22" r="20" fill="none" stroke="#c9a44c" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  {playing ? <path d="M3 2h3v10H3zM8 2h3v10H8z" /> : <path d="M3 1.5v11l9-5.5z" />}
                </svg>
              </button>
            </div>
            <div ref={thumbsRef} className="secretariat-scroll overflow-x-auto" role="group" aria-label="Photo thumbnails">
              <div className="relative flex w-max gap-2 pb-2" style={{ paddingInline: 'calc(50% - 34px)' }}>
                {thumbs && items.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    data-thumb={i}
                    aria-label={`Go to photo ${i + 1}`}
                    aria-current={i === active}
                    onClick={() => {
                      setZoomRect(null);
                      setActive(i);
                    }}
                    className={`relative h-12 w-[68px] shrink-0 overflow-hidden rounded-[4px] border transition-[opacity,border-color] ${ring} ${
                      i === active ? 'border-gold opacity-100' : 'border-gold/25 opacity-55 hover:opacity-100'
                    }`}
                  >
                    <Image src={item.src} alt="" fill sizes="68px" loading="lazy" className="object-cover" {...(item.blur ? { placeholder: 'blur', blurDataURL: item.blur } : {})} />
                  </button>
                ))}
                <span
                  ref={indicatorRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[68px] bg-gold shadow-[0_0_8px_rgba(201,164,76,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                />
              </div>
            </div>
          </footer>
        )}
      </div>

      {zoomRect && <ZoomView rect={zoomRect} src={items[active].src} blur={items[active].blur} onDone={() => setZoomRect(null)} />}

      {/* Shared element: the clicked cover, flying between its panel and the carousel's centre slot. */}
      {origin && !reduce && (
        <div
          ref={flyerRef}
          aria-hidden="true"
          className="pointer-events-none fixed z-30 overflow-hidden border border-gold bg-maroon-dark"
          style={{ left: origin.rect.left, top: origin.rect.top, width: origin.rect.width, height: origin.rect.height, borderRadius: 8 }}
        >
          <Image
            src={flyer.src}
            alt=""
            fill
            sizes={flyer.sizes}
            className="object-cover"
            {...(blurs[flyer.src] ? { placeholder: 'blur', blurDataURL: blurs[flyer.src] } : {})}
          />
        </div>
      )}
    </div>
  );
}

/** Full-screen album popup rendered through a portal. `open` = { album, origin } or null. */
export default function AlbumLightbox({ open, onCloseStart, onClosed }) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  if (!mounted || !open) return null;
  return createPortal(
    <Dialog key={open.album.id} album={open.album} origin={open.origin} reduce={reduce} onCloseStart={onCloseStart} onClosed={onClosed} />,
    document.body
  );
}
