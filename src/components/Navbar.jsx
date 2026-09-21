'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#assemblies', label: 'Committees' },
  { href: '#secretariat', label: 'Secretariat' },
  { href: '#contact', label: 'Contact' },
];

const REGISTER_URL = 'https://forms.gle/yFk2MuzPctFHQC5g9';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-maroon-dark/95 backdrop-blur-md border-b border-gold/80 shadow-[0_4px_20px_rgba(40,24,16,0.35)]">
      <div className="h-20 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex flex-col">
          <span className="font-display text-sm text-gold-light tracking-[0.2em] uppercase font-bold leading-none">TKM MUN</span>
          <span className="font-display text-[10px] text-[#d1c5b2] tracking-[0.25em] uppercase mt-1 leading-none">Collegium Diplomaticum</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-display text-xs uppercase tracking-[0.15em] text-[#d1c5b2] hover:text-gold-light transition-colors py-1 border-b border-transparent hover:border-gold/60"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={REGISTER_URL}
            className="wax-gold-btn hidden sm:block font-display text-[10px] uppercase tracking-[0.18em] text-gold-light border border-gold px-4 py-1.5 rounded hover:bg-gold hover:text-maroon-dark shadow-[0_0_12px_rgba(201,164,76,0.15)] hover:shadow-[0_0_18px_rgba(201,164,76,0.45)]"
          >
            Register
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-gold-light p-2 focus:outline-none"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-maroon-dark border-t border-gold/20 flex flex-col text-center overflow-hidden"
          >
            {[...links, { href: REGISTER_URL, label: 'Register' }].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="block font-display text-xs uppercase tracking-[0.25em] text-[#d1c5b2] hover:text-gold-light py-4 border-b border-gold/15"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
