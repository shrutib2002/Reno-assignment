'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-purple-700 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" onClick={closeMenu} className="flex items-center text-white text-2xl font-bold hover:text-purple-200 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8v12h20V8L12 3zm0 2.236L19.464 9H4.536L12 5.236zM4 12v6h3v-6H4zm5 0v6h6v-6H9zm8 0v6h3v-6h-3z" />
          </svg>
          SchoolApp
        </Link>

        {/* Hamburger menu button for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-purple-300 rounded p-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/addSchool" onClick={closeMenu} className={`text-white text-lg hover:text-purple-200 transition-colors duration-200 py-1 px-3 rounded-md ${pathname === '/addSchool' ? 'font-semibold bg-purple-600' : ''}`}>
              Add School
          </Link>
          <Link href="/showSchools" onClick={closeMenu} className={`text-white text-lg hover:text-purple-200 transition-colors duration-200 py-1 px-3 rounded-md ${pathname === '/showSchools' ? 'font-semibold bg-purple-600' : ''}`}>
              Show Schools
          </Link>
        </div>
      </div>

      {/* Mobile menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800 mt-2 rounded-md py-2 space-y-2">
          <Link href="/addSchool" onClick={closeMenu} className={`block px-4 py-2 text-white hover:bg-purple-600 ${pathname === '/addSchool' ? 'font-semibold bg-purple-600' : ''}`}>
              Add School
          </Link>
          <Link href="/showSchools" onClick={closeMenu} className={`block px-4 py-2 text-white hover:bg-purple-600 ${pathname === '/showSchools' ? 'font-semibold bg-purple-600' : ''}`}>
              Show Schools
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
