'use client';

import React from 'react';
import { motion } from 'framer-motion';
const REGISTER_URL = 'https://forms.gle/SgrayHWqoxcks5S6A';

const Scrollwork = ({ flip }) => (
  <svg className={`h-6 w-32 fill-none stroke-current text-gold opacity-90 ${flip ? 'rotate-180' : ''}`} viewBox="0 0 120 20">
    {/* The larger wavy curve only (the two small inner strokes were removed). */}
    <path className="scrollwork-path" d="M0,10 Q30,0 60,10 T120,10 Q90,20 60,10 T0,10 Z" strokeWidth="1.2" />
  </svg>
);

const HeroSection = () => {
  return (
    <>
      <section id="home" className="relative pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative text-gold-light [text-shadow:0_2px_12px_rgba(36,19,15,0.9)] font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-tight tracking-[0.18em] sm:tracking-[0.25em] uppercase font-bold my-1 select-none break-words"
        >
          TKM MUN&apos;26
        </motion.h1>

        <p className="font-cormorant italic text-2xl md:text-3xl text-cream font-semibold tracking-wider mt-1 mb-2">
          “Root · Rise · Represent”
        </p>

        <div className="flex items-center justify-center gap-4 w-full max-w-lg my-1">
          <Scrollwork />
          <Scrollwork flip />
        </div>

        <p className="text-lg text-cream/90 max-w-2xl mt-1 font-medium">
          The Model United Nations Conference of TKM College of Engineering, Kollam
        </p>
        <p className="font-cormorant italic text-xl md:text-2xl text-cream/90 font-semibold mt-2">
          4th, 5th and 6th December · TKM College of Engineering, Kollam
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-7">
          <a
            href={REGISTER_URL}
            className="wax-gold-btn inline-flex items-center gap-2 bg-gradient-to-b from-[#E6C873] to-[#C9A24A] text-maroon-dark border border-[#9c7d35] font-display text-xs uppercase tracking-[0.15em] px-10 py-4 rounded font-bold shadow-[0_0_15px_rgba(230,200,115,0.35)] hover:from-[#f2dc96] hover:to-[#d4b052] hover:shadow-[0_0_28px_rgba(230,200,115,0.75)] hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[20px]">history_edu</span>
            Register Now
          </a>
          <a
            href="#assemblies"
            className="wax-gold-btn group inline-flex items-center gap-2 bg-transparent text-cream border border-cream/70 font-display text-xs uppercase tracking-[0.15em] px-10 py-4 rounded hover:bg-cream/10 hover:border-cream"
          >
            Explore Committees
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </section>

      <div className="w-full flex items-center justify-center gap-4 max-w-5xl mx-auto px-6 py-6 relative z-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-gold" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold to-gold" />
      </div>
    </>
  );
};

export default HeroSection;
