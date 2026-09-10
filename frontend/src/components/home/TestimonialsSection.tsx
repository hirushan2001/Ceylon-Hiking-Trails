'use client';

import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'David L.',
    trip: 'Sierra Nevada Adventures, April 2025',
    text: 'The trip exceeded all my expectations! The Sierra Nevada itinerary was perfectly balanced between challenging hikes and relaxing moments to enjoy the views. Our guide was fantastic, sharing local stories and answering everyone’s questions. I’ve already recommended this trip to my friends and family!',
    rating: 5
  },
  {
    name: 'Sarah M.',
    trip: 'Horton Plains & World’s End Trek',
    text: 'The sunrise hike at Horton Plains was unforgettable. Having real-time trail updates and verified local guides gave us complete peace of mind. WeHike is now my go-to platform!',
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
          What hikers say
        </h2>
        <div className="flex items-center gap-2">
          <button suppressHydrationWarning className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-md hover:bg-[#1B4D3E] transition-colors cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <button suppressHydrationWarning className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-md hover:bg-[#1B4D3E] transition-colors cursor-pointer">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-3xl border border-[#E6DFD9] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#252525]">{t.name}</h4>
                <span className="text-[10px] text-[#777777]">{t.trip}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              "{t.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Carousel Pagination Dots */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
        <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
        <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
        <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
      </div>
    </section>
  );
}
