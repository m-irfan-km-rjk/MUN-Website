'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Updated logo text */}
        <Link href="/" className="text-xl font-bold text-accent hover:text-text-primary transition-colors">
          TKM MUN 2025
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {/* Updated link list, no longer uppercase */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#home" className="text-light-gray/80 hover:text-white transition-colors duration-300">
              Home
            </Link>
            <Link href="#about" className="text-light-gray/80 hover:text-white transition-colors duration-300">
              About
            </Link>
            <Link href="#committees" className="text-light-gray/80 hover:text-white transition-colors duration-300">
              Committees
            </Link>
            <Link href="#team" className="text-light-gray/80 hover:text-white transition-colors duration-300">
              Secretariat
            </Link>
            <Link href="#contact" className="text-light-gray/80 hover:text-white transition-colors duration-300">
              Contact
            </Link>
          </div>
          {/* Added prominent Register button */}
          <Link href="#register" className="bg-mid-blue text-deep-navy font-bold text-sm py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

