'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Compass } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailCard } from '../../components/TrailCard';

export default function SavedTrailsPage() {
  const { trails, savedTrailIds } = useTrails();

  const savedTrails = trails.filter((t) => savedTrailIds.includes(t.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Personal Bucket List</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Saved Trails & Collections
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your bookmarked hiking routes for future Sri Lanka adventures.
        </p>
      </div>

      {savedTrails.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Heart className="mx-auto text-rose-400 opacity-40" size={56} />
          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
            No saved trails in your collection
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click the heart icon on any trail card across the platform to save it here for quick offline reference.
          </p>
          <Link
            href="/trails"
            className="px-6 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-[#5C5CFF]/30"
          >
            <Compass size={16} />
            <span>Discover Trails</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      )}
    </div>
  );
}
