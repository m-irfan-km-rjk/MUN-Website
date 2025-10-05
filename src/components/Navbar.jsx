'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    // Using your theme's background color and a more fitting border color
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-y border-mid-blue/20">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Minimalist Logo */}
        <Link href="/" className="text-xl font-bold text-text-primary px-6 py-5 border-x border-mid-blue/20">
          TKM MUN
        </Link>
        
        {/* Navigation Links with Dividers using your theme's colors */}
        <div className="hidden md:flex items-center h-full">
          <Link href="#about" className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-6 border-r border-mid-blue/20">
            About
          </Link>
          <Link href="#committees" className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-6 border-r border-mid-blue/20">
            Committees
          </Link>
          <Link href="#team" className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-6 border-r border-mid-blue/20">
            Secretariat
          </Link>
          <Link href="#contact" className="text-light-gray/80 hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest font-semibold px-8 py-6 border-r border-mid-blue/20">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

