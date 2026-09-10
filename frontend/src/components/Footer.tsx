'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1C1A] text-white pt-16 pb-12 rounded-t-[2.5rem] mt-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative">
        
        {/* Floating Back to Top Button at Top Right */}
        <button
          suppressHydrationWarning
          onClick={scrollToTop}
          className="absolute -top-20 right-6 lg:right-12 w-12 h-12 rounded-full bg-white text-[#1E1C1A] flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} className="stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xs text-white/50 leading-relaxed max-w-xs pt-1">
              Explore breathtaking mountain trails, hidden waterfalls and unforgettable adventures across Sri Lanka.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white text-sm mb-4 font-heading">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/trails" className="hover:text-white transition-colors">Menu</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white text-sm mb-4 font-heading">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-white/60">
              <li className="flex items-center gap-2">
                <span>✉</span>
                <a href="mailto:info@wehike.io" className="hover:text-white">info@wehike.io</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+03333333333" className="hover:text-white">+0 333 333 3333</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Romania</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 pt-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#2D6A4F] transition-colors" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#2D6A4F] transition-colors" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white text-sm mb-4 font-heading">
              Adventures
            </h4>
            <ul className="space-y-2.5 text-white/60">
              <li><Link href="/trails" className="hover:text-white transition-colors">Featured Trails</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Local Guides</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Travel Tips</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© Copyright 2026 WeHike.io All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-[10px]"
            >
              Admin Portal →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

