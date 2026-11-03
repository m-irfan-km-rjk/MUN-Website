'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/assets/cultural-zv4318.jpg",
  "/assets/cultural-zv4293.jpg",
  "/assets/cultural-zv4255.jpg",
  "/assets/cultural-dsc00042.jpg",
];

export default function CulturalGallery() {
  return (
    <section id="culturals" className="max-w-7xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-10">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">After the Resolutions</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Last MUN Cultural Night</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <motion.div key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`relative overflow-hidden rounded-lg border border-gold/50 bg-maroon-dark h-72 sm:h-80 md:h-96 ${index === 0 ? "sm:col-span-2 md:col-span-2" : ""}`}>
            <Image src={src} alt={`TKM MUN Cultural Night ${index + 1}`} fill sizes="(min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent pt-20 pb-5 px-5 text-cream font-cormorant text-xl">
              Cultural Night · TKM MUN
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
