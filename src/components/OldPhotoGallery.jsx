'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/assets/event${n}.jpg`);

export default function OldPhotoGallery() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="gallery" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Archives of Diplomacy</span>
        <h2 className="text-4xl text-gold-light font-semibold mt-1 uppercase">Chronicles &amp; Commencements</h2>
        <p className="text-base text-muted mt-2">
          Echoes of diplomacy, impassioned debate, and momentous pacts from prior editions. Click any archive to inspect in the High Chamber Lightbox.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            onClick={() => setSelected(src)}
            className="group relative h-56 overflow-hidden rounded border border-gold/50 hover:border-gold-light transition-colors duration-500 shadow-md bg-maroon-dark cursor-pointer"
          >
            <Image
              src={src}
              alt={`Past event photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="ken-burns-img object-cover brightness-90 sepia-[0.35] group-hover:brightness-100 group-hover:sepia-0 transition-[filter] duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-70 pointer-events-none" />
            <span className="material-symbols-outlined absolute bottom-3 right-4 text-[20px] text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">visibility</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
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
              <div className="relative w-full h-full">
                <Image src={selected} alt="Selected event" fill sizes="900px" className="object-cover" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
