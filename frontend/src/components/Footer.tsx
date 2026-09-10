import React from 'react';
import Link from 'next/link';
import { Mountain, MapPin, Shield, Compass, Heart, Globe, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#28282B] text-white pt-16 pb-10 rounded-t-[2.5rem] mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Vision */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center text-white font-black text-lg">
                ▲
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-heading">
                WeHike
              </span>
            </Link>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Explore hidden trails, custom itineraries, and verified local guides for Sri Lanka outdoor adventure.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/trails" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Menu</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>info@wehike.ro</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+0 333 333 3333</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Romania</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© Copyright 2025 WeHike.ro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Admin Portal</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
