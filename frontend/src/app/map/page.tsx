'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Search, MapPin, SlidersHorizontal, Map, List, Navigation, ChevronRight, Heart } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { DifficultyBadge } from '../../components/DifficultyBadge';
import { RatingStars } from '../../components/RatingStars';
import { Trail } from '../../types';

// Dynamic Leaflet Map Import
const TrailMap = dynamic(() => import('../../components/TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400">
      Loading Full-Screen GIS Map...
    </div>
  )
});

export default function MapExplorerPage() {
  const { trails, isSaved, toggleSaveTrail } = useTrails();
  const [selectedTrail, setSelectedTrail] = useState<Trail | undefined>(trails[0]);
  const [search, setSearch] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  const filteredTrails = trails.filter((t) => {
    if (activeDifficulty !== 'All' && t.difficulty !== activeDifficulty) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden bg-slate-950 text-white">
      {/* Top Controls Bar */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2">
          <Map className="text-[#5C5CFF]" size={22} />
          <h1 className="font-extrabold text-lg sm:text-xl tracking-tight hidden sm:block">
            Sri Lanka Trail Map
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C5CFF]/20 text-[#5C5CFF]">
            {filteredTrails.length} Trails
          </span>
        </div>

        {/* Search & Difficulty Filter Pills */}
        <div className="flex items-center gap-2 flex-grow max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter map by trail or region..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
            />
          </div>

          <select
            value={activeDifficulty}
            onChange={(e) => setActiveDifficulty(e.target.value)}
            className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
          >
            <option value="All">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
            <option value="Extreme">Extreme</option>
          </select>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex sm:hidden items-center bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setMobileTab('map')}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${mobileTab === 'map' ? 'bg-[#5C5CFF] text-white' : 'text-slate-400'}`}
          >
            Map
          </button>
          <button
            onClick={() => setMobileTab('list')}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${mobileTab === 'list' ? 'bg-[#5C5CFF] text-white' : 'text-slate-400'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="flex-grow flex relative overflow-hidden">
        {/* Sidebar List (Desktop always visible, Mobile tab conditional) */}
        <aside
          className={`${
            mobileTab === 'list' ? 'flex' : 'hidden'
          } sm:flex w-full sm:w-[380px] lg:w-[420px] flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0 overflow-y-auto z-10 p-4 space-y-3`}
        >
          {filteredTrails.map((trail) => {
            const isSelected = selectedTrail?.id === trail.id;
            const saved = isSaved(trail.id);

            return (
              <div
                key={trail.id}
                onClick={() => setSelectedTrail(trail)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-[#5C5CFF] shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <img src={trail.heroImage} alt={trail.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-sm text-white truncate">{trail.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveTrail(trail.id);
                        }}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Heart size={14} className={saved ? 'fill-rose-500 text-rose-500' : ''} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-amber-400" />
                        {trail.destination}
                      </span>
                      <span>•</span>
                      <span>{trail.distanceKm} km</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <DifficultyBadge difficulty={trail.difficulty} size="sm" />
                      <Link
                        href={`/trails/${trail.slug}`}
                        className="text-[11px] font-bold text-[#5C5CFF] hover:underline flex items-center gap-0.5"
                      >
                        <span>View</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </aside>

        {/* GIS Map Viewer Container */}
        <main
          className={`${
            mobileTab === 'map' ? 'flex' : 'hidden'
          } sm:flex flex-grow relative h-full w-full`}
        >
          <TrailMap
            trails={filteredTrails}
            selectedTrailId={selectedTrail?.id}
            onSelectTrail={(t) => setSelectedTrail(t)}
            height="100%"
            zoomLevel={9}
          />
        </main>
      </div>
    </div>
  );
}
