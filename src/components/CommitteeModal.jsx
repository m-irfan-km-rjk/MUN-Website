'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const REGISTER_URL = 'https://forms.gle/SgrayHWqoxcks5S6A';
const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light';

function Dialog({ committee, origin, reduce, onClose }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const x = origin?.x ?? 0;
  const y = origin?.y ?? 0;
  const R = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // Lock page scroll (restoring the exact position), move focus into the dialog.
  useEffect(() => {
    const sy = window.scrollY;
    const prev = { body: document.body.style.overflow, html: document.documentElement.style.overflow };
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev.body;
      document.documentElement.style.overflow = prev.html;
      window.scrollTo(0, sy);
    };
  }, []);

  // Esc to close + focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab' && rootRef.current) {
        const f = [...rootRef.current.querySelectorAll('a[href], button:not([disabled])')].filter((el) => el.getClientRects().length > 0);
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
  }, [onClose]);

  const open = reduce ? { opacity: 1 } : { opacity: 1, clipPath: `circle(${R}px at ${x}px ${y}px)` };
  const start = reduce ? { opacity: 0 } : { opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` };

  return (
    <motion.div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(14,6,5,0.9)] p-3 sm:p-6"
      initial={start}
      animate={open}
      exit={reduce ? { opacity: 0 } : { opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` }}
      transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.76, 0, 0.24, 1] }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="committee-modal-title"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: reduce ? 0 : 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-xl border-2 border-gold bg-oxblood shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Header (stays visible while the board scrolls) */}
        <header className="flex items-start gap-4 border-b border-gold/40 bg-panel px-5 py-4 sm:px-8 sm:py-5">
          <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-gold bg-maroon-dark sm:h-16 sm:w-16">
            <Image src={committee.logoUrl} alt="" fill sizes="64px" className="object-contain p-2" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light">{committee.name} · The Executive Board</p>
            <h2 id="committee-modal-title" className="mt-0.5 font-cormorant text-xl font-semibold leading-snug text-cream sm:text-3xl">
              {committee.fullName}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close executive board"
            onClick={onClose}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border border-gold/70 text-lg text-gold-light transition-colors hover:bg-gold hover:text-maroon-dark ${ring}`}
          >
            ✕
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <p className="max-w-3xl font-cormorant text-lg italic text-gold-light sm:text-xl">“{committee.agenda}”</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/85">{committee.description}</p>
          <p className="mt-3 text-sm text-cream">
            <span className="mr-2 font-display text-[10px] uppercase tracking-wider text-gold-light">Allocations</span>
            {committee.allocations}
          </p>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gold/40" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light">Meet the board</span>
            <span className="h-px flex-1 bg-gold/40" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committee.executiveBoard.map((m) => (
              <article key={m.name} className="overflow-hidden rounded-lg border border-gold/50 bg-maroon-card shadow-lg">
                <div className="relative h-56 overflow-hidden bg-[#120b09]">
                  {m.imageUrl ? (
                    <Image src={m.imageUrl} alt={m.name} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" className="object-cover object-center" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3f261e] to-[#120b09] font-cormorant text-6xl font-bold text-gold-light">
                      {m.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-cormorant text-2xl text-cream">{m.name}</h3>
                  <p className="mt-0.5 font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">{m.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/80">{m.biography}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={REGISTER_URL}
              className={`rounded border border-[#9c7d35] bg-gradient-to-b from-[#E6C873] to-[#C9A24A] px-8 py-3 font-display text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark shadow-[0_0_12px_rgba(230,200,115,0.3)] transition-shadow hover:shadow-[0_0_22px_rgba(230,200,115,0.7)] ${ring}`}
            >
              Register for this committee
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Executive-board popup (portal). `open` = { committee, origin: { x, y } } or null; the reveal grows from the click point. */
export default function CommitteeModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{open && <Dialog key={open.committee.slug} committee={open.committee} origin={open.origin} reduce={reduce} onClose={onClose} />}</AnimatePresence>,
    document.body
  );
}

/** Small helper hook: tracks the open committee and the button to return focus to. */
export function useCommitteeModal() {
  const [open, setOpen] = useState(null);
  const trigger = useRef(null);
  const show = useCallback((committee, e) => {
    trigger.current = e.currentTarget;
    const r = e.currentTarget.getBoundingClientRect();
    const keyboard = e.detail === 0;
    setOpen({ committee, origin: { x: keyboard ? r.left + r.width / 2 : e.clientX, y: keyboard ? r.top + r.height / 2 : e.clientY } });
  }, []);
  const hide = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }, []);
  return { open, show, hide };
}
