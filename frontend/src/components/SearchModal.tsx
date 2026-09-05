'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, MapPin, ArrowRight, Mountain } from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { DifficultyBadge } from './DifficultyBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { trails } = useTrails();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredTrails = query.trim()
    ? trails.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.destination.toLowerCase().includes(query.toLowerCase()) ||
          t.district.toLowerCase().includes(query.toLowerCase()) ||
          t.features.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="text-slate-400 mr-3" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trails, mountains, waterfalls, destinations..."
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
              <X size={18} />
            </button>
          )}
          <button onClick={onClose} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <Mountain className="mx-auto mb-3 opacity-30 text-slate-400" size={40} />
              <p className="text-sm font-medium">Type to search across Sri Lanka’s top trails and mountain regions</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-xs text-slate-400">Popular:</span>
                {['Ella Rock', 'Knuckles', 'World’s End', 'Sri Pada', 'Waterfall'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#5C5CFF]/10 hover:text-[#5C5CFF] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && filteredTrails.length === 0 && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <p className="text-base font-semibold">No trails found matching &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-slate-400">Try searching by district like Ella, Matale, or Nuwara Eliya.</p>
            </div>
          )}

          {filteredTrails.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Found {filteredTrails.length} Matching Trails
              </p>
              {filteredTrails.map((trail) => (
                <Link
                  key={trail.id}
                  href={`/trails/${trail.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                    <Image src={trail.heroImage} alt={trail.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#5C5CFF] truncate">
                        {trail.name}
                      </h4>
                      <DifficultyBadge difficulty={trail.difficulty} size="sm" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-amber-400" />
                        {trail.destination}, {trail.district}
                      </span>
                      <span>•</span>
                      <span>{trail.distanceKm} km</span>
                      <span>•</span>
                      <span>{trail.estimatedDuration}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-[#5C5CFF] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
