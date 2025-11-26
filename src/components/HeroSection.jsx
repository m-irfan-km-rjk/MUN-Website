'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NewsSlider from './NewsFeed';

const HeroSection = ({ newsList }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto text-center z-10 flex flex-col h-full justify-center pt-20 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-9xl font-bold tracking-tight mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-text-primary/80 drop-shadow-lg">
                TKM MUN
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-3xl text-text-primary/90 font-light tracking-wide mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Where Global Strategy Meets <span className="text-accent font-medium">Sportsmanship</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={() => window.location.href = 'https://forms.gle/yFk2MuzPctFHQC5g9'}
              className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(85,136,163,0.5)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-accent/50 rounded-full group-hover:border-accent transition-colors duration-300" />
              <span className="relative text-lg font-medium text-white tracking-wider group-hover:text-accent transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                Register Now
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* News Bar (Replaces Scroll Indicator) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 px-4 z-20"
      >
        <NewsSlider newsList={newsList} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
