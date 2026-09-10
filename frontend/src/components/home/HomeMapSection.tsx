'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTrails } from '../../context/TrailsContext';

// Dynamic Leaflet Map Import with SSR disabled
const TrailMap = dynamic(() => import('../TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-[#F2EBE6] dark:bg-[#272421] rounded-3xl flex items-center justify-center text-[#777777] dark:text-[#999999]">
      Loading Interactive GIS Trail Map...
    </div>
  )
});

export function HomeMapSection() {
  const { trails } = useTrails();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F]">GIS Map Explorer</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
            Discover Sri Lanka on the Map
          </h2>
        </div>
        <Link
          href="/map"
          className="px-6 py-3 rounded-full font-bold text-xs bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition-all shadow-md shadow-[#2D6A4F]/30 self-start md:self-auto"
        >
          Open Interactive GIS Map
        </Link>
      </div>

      <TrailMap trails={trails} height="480px" />
    </section>
  );
}
