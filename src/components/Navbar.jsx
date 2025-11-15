'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-y border-mid-blue/20">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center px-6 py-2 border-x border-mid-blue/20"
        >
          <Image
            src="/header1.png"
            alt="TKM MUN Logo"
            width={170}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center h-full">
          <Link
            href="https://forms.gle/yFk2MuzPctFHQC5g9"
            className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-4 border-r border-mid-blue/20"
          >
            Register
          </Link>
          <Link
            href="#about"
            className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-4 border-r border-mid-blue/20"
          >
            About
          </Link>
          <Link
            href="#committees"
            className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-4 border-r border-mid-blue/20"
          >
            Committees
          </Link>
          <Link
            href="#team"
            className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-4 border-r border-mid-blue/20"
          >
            Secretariat
          </Link>
          <Link
            href="#contact"
            className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-4 border-r border-mid-blue/20"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-light-gray/80 hover:text-white transition-colors duration-300 p-3 focus:outline-none"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background border-t border-mid-blue/20 flex flex-col text-center overflow-hidden"
          >
            {[
              { href: '#about', label: 'About' },
              { href: '#committees', label: 'Committees' },
              { href: '#team', label: 'Secretariat' },
              { href: '#contact', label: 'Contact' },
            ].map(({ href, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  className="block text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold py-4 border-b border-mid-blue/20"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;