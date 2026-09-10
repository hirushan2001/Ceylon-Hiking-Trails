'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailCard } from '../TrailCard';

export function PopularTrailsSection() {
  const { trails } = useTrails();
  const featuredTrails = trails.filter((t) => t.isFeatured);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-heading">
            Popular Hiking Trails
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Handpicked trails for your next adventure in Sri Lanka.
          </p>
        </div>
        <Link
          href="/trails"
          className="text-xs font-bold text-[#E5A93C] hover:text-[#D4982B] flex items-center gap-1 group"
        >
          <span>View All Trails</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredTrails.slice(0, 4).map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </section>
  );
}
