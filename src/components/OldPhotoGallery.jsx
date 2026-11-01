'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CircularCarousel from './CircularCarousel';

const items = Array.from({ length: 20 }, (_, index) => ({
  src: `/assets/event${index + 1}.jpg`,
  alt: `Past event photo ${index + 1}`,
  title: `Archive ${String(index + 1).padStart(2, '0')}`,
}));

export default function OldPhotoGallery() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);

  const step = (d) => {
    const next = (selected + d + items.length) % items.length;
    setSelected(next);
    setActive(next);
  };

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="gallery" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Archives of Diplomacy</span>
        <h2 className="text-4xl text-gold-light font-semibold mt-1 uppercase">Chronicles &amp; Commencements</h2>
        <p className="text-base text-muted mt-2">
          Echoes of diplomacy, impassioned debate, and momentous pacts from prior editions. Click the centred archive to inspect in the High Chamber Lightbox.
        </p>
      </div>

      <CircularCarousel
        items={items}
        activeIndex={active}
        onActiveChange={setActive}
        onItemClick={(i) => {
          setActive(i);
          setSelected(i);
        }}
        paused={selected !== null}
        label="Archives of Diplomacy photo carousel"
      />

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/85 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full aspect-[3/2] border-2 border-gold bg-ink p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 text-gold-light bg-maroon-dark/90 border border-gold/60 w-9 h-9 hover:bg-maroon-dark"
              >
                ✕
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-gold-light bg-maroon-dark/90 border border-gold/60 w-9 h-9 hover:bg-maroon-dark"
              >
                ‹
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gold-light bg-maroon-dark/90 border border-gold/60 w-9 h-9 hover:bg-maroon-dark"
              >
                ›
              </button>
              <div className="relative w-full h-full">
                <Image src={items[selected].src} alt={items[selected].alt} fill sizes="900px" className="object-cover" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
