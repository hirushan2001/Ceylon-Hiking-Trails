'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

const travelArticles = [
  {
    id: 1,
    title: 'What to Pack for Your Next Adventure',
    category: 'Travel Tips',
    date: 'March 8, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Packing smart can make or break your trip. Here is a checklist to ensure you are prepared for mountain trails.'
  },
  {
    id: 2,
    title: 'My Unforgettable Journey in Knuckles Range',
    category: 'Gear Reviews',
    date: 'March 6, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover the most breathtaking routes in the misty Knuckles conservation area, perfect for all skill levels.'
  },
  {
    id: 3,
    title: 'Hidden Waterfalls You Need to Discover',
    category: 'Destination Guide',
    date: 'March 1, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Trek off the beaten path to explore secret cascades tucked away in Sri Lanka’s cloud forests.'
  }
];

export function TravelTipsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
          Travel Tips
        </h2>
        <Link href="/community" className="text-xs font-bold text-[#2D6A4F] hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD9] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-48">
                <Image src={art.image} alt={art.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold">
                  {art.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-base text-[#252525] font-heading leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-[#777777] pt-2 border-t border-[#F2EBE6]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#2D6A4F]" />
                    {art.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#777777]" />
                    {art.readTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-1">
              <button suppressHydrationWarning className="w-full py-2.5 rounded-full border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white font-extrabold text-xs transition-all cursor-pointer">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
