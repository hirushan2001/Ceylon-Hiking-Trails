'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const difficultyItems = [
  {
    level: 'Easy',
    desc: 'Perfect for beginners and families.',
    color: 'from-emerald-600 to-teal-800',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    level: 'Moderate',
    desc: 'A good challenge with great rewards.',
    color: 'from-amber-600 to-yellow-800',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    level: 'Difficult',
    desc: 'For experienced hikers.',
    color: 'from-orange-600 to-red-800',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    level: 'Extreme',
    desc: 'For the bold adventurers.',
    color: 'from-rose-700 to-slate-900',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
  }
];

export function ExploreDifficultySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-heading">
          Explore by Difficulty
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Find trails that match your adventure level.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {difficultyItems.map((item) => (
          <Link
            key={item.level}
            href={`/trails?difficulty=${encodeURIComponent(item.level)}`}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end p-6 text-white hover:shadow-2xl transition-all"
          >
            <Image src={item.img} alt={item.level} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-black font-heading text-[#E5A93C]">
                {item.level}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {item.desc}
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-white group-hover:text-[#E5A93C] transition-colors">
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
