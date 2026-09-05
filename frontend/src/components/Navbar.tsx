'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ChevronRight
} from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { SearchModal } from './SearchModal';

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-slate-200/80 dark:border-slate-800 shadow-md py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5C5CFF] to-[#8080FF] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#5C5CFF]/30 group-hover:scale-105 transition-transform">
              ⛺
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-tight group-hover:text-[#5C5CFF] transition-colors">
                Ceylon Hiking Trails
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-400">
                Explore Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/10 dark:bg-slate-800/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 dark:border-slate-700/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5C5CFF] text-white shadow-md shadow-[#5C5CFF]/20'
                      : isScrolled
                      ? 'text-slate-700 dark:text-slate-200 hover:text-[#5C5CFF] dark:hover:text-[#5C5CFF]'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon size={14} />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`p-2.5 rounded-full transition-colors ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search trails"
            >
              <Search size={18} />
            </button>

            {/* Saved Trails */}
            <Link
              href="/saved"
              className={`relative p-2.5 rounded-full transition-colors ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Saved Trails"
            >
              <Heart size={18} />
              {savedTrailIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedTrailIds.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full transition-colors hidden sm:flex ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* User Profile */}
            <Link
              href="/profile"
              className={`p-2.5 rounded-full transition-colors hidden sm:flex ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="User Profile"
            >
              <User size={18} />
            </Link>

            {/* Primary CTA */}
            <Link
              href="/trails"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#5C5CFF] hover:bg-[#4B4BEE] text-white shadow-lg shadow-[#5C5CFF]/30 hover:scale-105 transition-all"
            >
              <span>Explore Trails</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                isScrolled
                  ? 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/10'
              }`}
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
