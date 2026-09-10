'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedAdventureSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="relative rounded-[2.5rem] overflow-hidden border border-[#E6DFD9] shadow-2xl h-[420px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=90"
          alt="Knuckles Mountain Range Expedition"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        {/* Overlay Content Card */}
        <div className="relative z-10 p-8 sm:p-12 max-w-xl text-white space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#2D6A4F] text-white text-xs font-extrabold uppercase tracking-wider">
            Featured Adventure
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
            Knuckles Mountain Range Expedition
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            3 Days / 2 Nights — Trek through misty cloud forests, hidden waterfalls, and 34 isolated mountain peaks.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-white/90">
            <div>
              <span className="text-[#52B788] block text-[10px] uppercase font-bold">Difficulty</span>
              <span>Difficult</span>
            </div>
            <div>
              <span className="text-[#52B788] block text-[10px] uppercase font-bold">Distance</span>
              <span>28.5 km</span>
            </div>
            <div>
              <span className="text-[#52B788] block text-[10px] uppercase font-bold">Elevation</span>
              <span>+1,863 m</span>
            </div>
            <div>
              <span className="text-[#52B788] block text-[10px] uppercase font-bold">Starting Price</span>
              <span className="text-lg font-black text-white">$140</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/trails/knuckles-5-peaks-trek"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-xs font-extrabold bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white shadow-lg transition-all hover:scale-105"
            >
              Explore Adventure →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
