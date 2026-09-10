'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Map,
  Sparkles,
  Users,
  Award,
  Heart,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  User,
  ShieldAlert,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { SearchModal } from './SearchModal';

import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { savedTrailIds, darkMode, toggleDarkMode, userProfile } = useTrails();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/' },
    { name: 'Trails', href: '/trails', icon: Compass },
    { name: 'Interactive Map', href: '/map', icon: Map },
    { name: 'Trail Finder', href: '/finder', icon: Sparkles },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Guides', href: '/guides', icon: Award }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Exact Ceylon Hiking Trails Logo */}
          <Logo />

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wide">
            <Link
              href="/"
              className={`relative py-1 transition-colors ${
                pathname === '/' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Explore
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
            <Link
              href="/trails"
              className={`relative py-1 transition-colors ${
                pathname === '/trails' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Trails
              {pathname === '/trails' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
            <Link
              href="/map"
              className={`relative py-1 transition-colors ${
                pathname === '/map' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Map
              {pathname === '/map' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
            <Link
              href="/destinations"
              className={`relative py-1 transition-colors ${
                pathname === '/destinations' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Destinations
              {pathname === '/destinations' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
            <Link
              href="/community"
              className={`relative py-1 transition-colors ${
                pathname === '/community' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Community
              {pathname === '/community' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
            <Link
              href="/guides"
              className={`relative py-1 transition-colors ${
                pathname === '/guides' ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              Guides
              {pathname === '/guides' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F5B731] rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 text-white/90 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Saved Heart Button with Yellow Badge */}
            <Link
              href="/saved"
              className="relative p-1.5 text-white/90 hover:text-white transition-colors"
              aria-label="Saved Trails"
            >
              <Heart size={19} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F5B731] text-[#0B0F17] text-[10px] font-black flex items-center justify-center shadow-sm">
                {savedTrailIds.length > 0 ? savedTrailIds.length : 3}
              </span>
            </Link>

            {/* User Profile Avatar with Dropdown Chevron */}
            <Link
              href="/profile"
              className="flex items-center gap-1.5 group"
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden border border-white/40 flex items-center justify-center text-xs font-bold text-white bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80)` }}
              />
              <ChevronDown size={14} className="text-white/70 group-hover:text-white transition-colors" />
            </Link>

            {/* Yellow CTA Button with Compass Icon */}
            <Link
              href="/trails"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold bg-[#F5B731] hover:bg-[#E4A620] text-[#0B0F17] shadow-md transition-transform hover:scale-105"
            >
              <Compass size={16} className="text-[#0B0F17]" />
              <span>Explore Trails</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#5C5CFF] text-white flex items-center justify-center font-bold">
                    ⛺
                  </div>
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">
                    Ceylon Trails
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Bar */}
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 my-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <div className="w-10 h-10 rounded-full bg-[#5C5CFF]/20 text-[#5C5CFF] flex items-center justify-center font-bold">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm">{userProfile.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {userProfile.trailsCompleted} Trails Completed
                  </div>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="space-y-1 my-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                        pathname === link.href
                          ? 'bg-[#5C5CFF] text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon size={18} />}
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight size={16} opacity={0.6} />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-200 dark:border-slate-800">
                <Link
                  href="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} className="text-rose-500" />
                    <span>Saved Trails</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500/10 text-rose-500 font-bold">
                    {savedTrailIds.length}
                  </span>
                </Link>

                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={18} className="text-amber-500" />
                    <span>Admin Dashboard</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/trails"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-xl text-sm font-bold bg-[#5C5CFF] text-white shadow-lg shadow-[#5C5CFF]/30"
              >
                Find Next Trail
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
