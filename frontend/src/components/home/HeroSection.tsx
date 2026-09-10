'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Compass, Mountain, Users } from 'lucide-react';

export function HeroSection() {
  const [heroSearch, setHeroSearch] = useState('');

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 lg:px-20 bg-[#0B0F17] text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90"
        alt="Hiker sitting on mountain peak in Sri Lanka"
        fill
        priority
        className="object-cover object-center sm:object-right opacity-90 scale-105"
      />

      {/* Dark Vignette and Gradient Overlay for Optimal Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent max-w-5xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-3xl my-auto space-y-7 pt-4">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
          <span>DISCOVER</span>
          <span className="text-[#F5B731]">•</span>
          <span>EXPLORE</span>
          <span className="text-[#F5B731]">•</span>
          <span>HIKE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight leading-[1.04] font-heading text-white">
          Find Your Next Trail <br />
          in <span className="text-[#F5B731]">Sri Lanka</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed font-normal">
          Explore mountains, waterfalls, forests, viewpoints and hidden trails across the island.
        </p>

        {/* Search Pill Input Bar */}
        <div className="max-w-xl pt-1">
          <div className="bg-white p-2 pl-5 rounded-full shadow-2xl flex items-center justify-between gap-3 text-slate-900">
            <div className="flex items-center gap-3 w-full">
              <Search size={18} className="text-slate-400 flex-shrink-0" />
              <input
                suppressHydrationWarning
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search trails, mountains, waterfalls..."
                className="w-full bg-transparent py-1.5 text-xs sm:text-sm focus:outline-none placeholder-slate-400 font-medium text-slate-900"
              />
            </div>
            <Link
              href={heroSearch ? `/trails?search=${encodeURIComponent(heroSearch)}` : '/trails'}
              className="w-10 h-10 rounded-full bg-[#F5B731] hover:bg-[#E4A620] text-[#0B0F17] flex items-center justify-center shadow-md flex-shrink-0 transition-transform hover:scale-105"
            >
              <Search size={18} />
            </Link>
          </div>

          {/* Difficulty Filter Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4">
            <Link
              href="/trails?difficulty=Easy"
              className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span>Easy</span>
            </Link>
            <Link
              href="/trails?difficulty=Moderate"
              className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
              <span>Moderate</span>
            </Link>
            <Link
              href="/trails?difficulty=Difficult"
              className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm" />
              <span>Difficult</span>
            </Link>
            <Link
              href="/trails?difficulty=Extreme"
              className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
              <span>Extreme</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Hero Stats & Scroll Indicator Bar */}
      <div className="relative z-10 pt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/15">
        <div className="flex items-center gap-8 sm:gap-12 text-xs font-medium text-white">
          {/* Stat 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
              <Compass size={20} />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base block leading-tight">20+</span>
              <span className="text-[11px] text-white/70">Amazing Trails</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
              <Mountain size={20} />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base block leading-tight">9</span>
              <span className="text-[11px] text-white/70">Provinces</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
              <Users size={20} />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base block leading-tight">1000+</span>
              <span className="text-[11px] text-white/70">Happy Hikers</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Pill Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 text-[11px] font-semibold">
          <div className="w-3.5 h-6 rounded-full border border-white/60 flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 bg-[#F5B731] rounded-full animate-bounce" />
          </div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
