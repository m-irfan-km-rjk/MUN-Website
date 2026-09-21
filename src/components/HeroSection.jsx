'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NewsSlider from './NewsFeed';

const REGISTER_URL = 'https://forms.gle/yFk2MuzPctFHQC5g9';

const Scrollwork = ({ flip }) => (
  <svg className={`h-6 w-32 fill-none stroke-current text-gold opacity-90 ${flip ? 'rotate-180' : ''}`} viewBox="0 0 120 20">
    <path
      className="scrollwork-path"
      d="M0,10 Q30,0 60,10 T120,10 Q90,20 60,10 T0,10 Z M60,5 Q70,9 85,7 M60,15 Q70,11 85,13"
      strokeWidth="1.2"
    />
  </svg>
);

const HeroSection = ({ newsList, loading }) => {
  return (
    <>
      <section id="home" className="relative pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded bg-parchment/80 border border-gold shadow-sm mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#775a01] animate-pulse">stars</span>
          <span className="font-display text-[10px] tracking-[0.25em] text-maroon-dark uppercase font-bold">
            Annual Diplomatic Convocation · MMXXV
          </span>
          <span className="material-symbols-outlined text-[16px] text-[#775a01] animate-pulse">stars</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero-title-gold font-cormorant text-6xl md:text-7xl lg:text-[80px] leading-tight tracking-[0.25em] uppercase font-bold my-1 select-none"
        >
          TKM MUN
        </motion.h1>

        <p className="font-cormorant italic text-2xl md:text-3xl text-gold font-semibold tracking-wider mt-1 mb-2 drop-shadow-[0_1px_3px_rgba(40,24,16,0.4)]">
          “Unire · Discere · Progredere”
        </p>

        <div className="flex items-center justify-center gap-4 w-full max-w-lg my-1">
          <Scrollwork />
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-maroon-dark text-cream border border-gold shadow-md">
            <span className="material-symbols-outlined text-[20px] text-gold-light">military_tech</span>
            <span className="material-symbols-outlined text-[22px] text-gold-light">shield</span>
            <span className="material-symbols-outlined text-[20px] text-gold-light">edit_note</span>
          </div>
          <Scrollwork flip />
        </div>

        <p className="text-lg text-ink max-w-2xl mt-1 font-medium">
          The Sovereign Model United Nations Conference of TKM College of Engineering, Kollam
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-7">
          <a
            href={REGISTER_URL}
            className="wax-gold-btn inline-flex items-center gap-2 bg-gold text-maroon-dark border border-gold-dark font-display text-xs uppercase tracking-[0.15em] px-10 py-4 rounded font-bold shadow-[0_0_15px_rgba(201,164,76,0.35)] hover:bg-[#d8b660] hover:shadow-[0_0_24px_rgba(201,164,76,0.65)] hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[20px]">history_edu</span>
            Register Now
          </a>
          <a
            href="#assemblies"
            className="wax-gold-btn group inline-flex items-center gap-2 bg-maroon-dark/60 text-gold-light border border-gold font-display text-xs uppercase tracking-[0.15em] px-10 py-4 rounded backdrop-blur-sm hover:bg-maroon-dark hover:border-gold-light"
          >
            Explore Committees
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-12 mb-16 relative z-10">
        <NewsSlider newsList={newsList} loading={loading} />
      </div>

      <div className="w-full flex items-center justify-center gap-4 max-w-5xl mx-auto px-6 py-6 relative z-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-gold" />
        <div className="flex items-center gap-2 text-gold">
          <span className="material-symbols-outlined text-[18px]">circle</span>
          <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
          <span className="material-symbols-outlined text-[18px]">circle</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold to-gold" />
      </div>
    </>
  );
};

export default HeroSection;
