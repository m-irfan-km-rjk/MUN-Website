'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/*
  OldPhotoGallery.jsx
  Displays club’s old activity photos in a responsive grid.
  Includes a simple lightbox popup.
*/

const images = [
  '/assets/event1.jpg',
  '/assets/event2.jpg',
  '/assets/event3.jpg',
  '/assets/event4.jpg',
  '/assets/event5.jpg',
  '/assets/event6.jpg',
  '/assets/event7.jpg',
  '/assets/event8.jpg',
  '/assets/event9.jpg',
];

export default function OldPhotoGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="old gallery" className="py-24 sm:py-32 bg-background border-t border-mid-blue/20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-12"
        >
          Glimpses of Our Past Events
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative cursor-pointer group"
              onClick={() => setSelected(src)}
            >
              <Image
                src={src}
                alt={'Event photo ${i + 1}'}
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-lg shadow-md group-hover:opacity-90 transition"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox popup */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <div className="relative max-w-3xl w-full p-4">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-4 text-white text-2xl font-bold z-10 bg-black/40 w-[30px] hover:bg-black/70 transition"
              >
                ✕
              </button>
              <Image
                src={selected}
                alt="Selected event"
                width={1000}
                height={700}
                className="object-cover w-full h-[400px] rounded-lg shadow-md group-hover:opacity-90 transition brightness-100"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}