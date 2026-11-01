'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const images = [7, 8, 9].map((number) => `/assets/event${number}.jpg`);

export default function CulturalGallery() {
  return (
    <section id="culturals" className="max-w-7xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-10">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">After the Resolutions</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Last MUN Cultural Night</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <motion.div key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`relative overflow-hidden rounded-lg border border-gold/50 bg-maroon-dark ${index === 0 ? "md:col-span-2 h-96" : "h-96"}`}>
            <Image src={src} alt={`TKM MUN Cultural Night ${index + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent pt-20 pb-5 px-5 text-cream font-cormorant text-xl">
              Cultural Night · TKM MUN
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
