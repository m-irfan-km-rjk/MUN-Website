'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-8xl font-medium text-text-primary mb-8 leading-tight"
          >
            TKM MUN: <span className="text-accent">The International Cricket Council</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-text-primary/80"
          >
            Where Global Strategy Meets Sportsmanship.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
