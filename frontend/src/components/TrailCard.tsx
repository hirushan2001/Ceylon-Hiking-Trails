'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Navigation, Clock, Mountain } from 'lucide-react';
import { Trail } from '../types';
import { DifficultyBadge } from './DifficultyBadge';
import { RatingStars } from './RatingStars';
import { TrailConditionBadge } from './TrailConditionBadge';
import { useTrails } from '../context/TrailsContext';

interface TrailCardProps {
  trail: Trail;
  compact?: boolean;
}

export const TrailCard: React.FC<TrailCardProps> = ({ trail, compact = false }) => {
  const { isSaved, toggleSaveTrail } = useTrails();
  const saved = isSaved(trail.id);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Header */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={trail.heroImage}
          alt={trail.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <DifficultyBadge difficulty={trail.difficulty} size="sm" />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveTrail(trail.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              saved
                ? 'bg-rose-500 text-white shadow-md scale-105'
                : 'bg-black/30 text-white hover:bg-black/50 hover:scale-110'
            }`}
            aria-label="Save to favorites"
          >
            <Heart size={18} className={saved ? 'fill-white stroke-white' : ''} />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
            <MapPin size={13} className="text-amber-400" />
            <span className="truncate max-w-[140px]">{trail.destination}, {trail.district}</span>
          </div>
          <TrailConditionBadge status={trail.currentStatus} compact />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Link href={`/trails/${trail.slug}`} className="focus:outline-none">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#5C5CFF] transition-colors line-clamp-1">
                {trail.name}
              </h3>
            </Link>
            <RatingStars rating={trail.rating} reviewCount={trail.reviewCount} />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
            {trail.shortDescription}
          </p>
        </div>

        <div>
          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs mb-4">
            <div className="flex flex-col items-center justify-center text-center border-r border-slate-200 dark:border-slate-700/60 pr-1">
              <span className="text-slate-400 dark:text-slate-500 mb-0.5">
                <Navigation size={13} />
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{trail.distanceKm} km</span>
              <span className="text-[10px] text-slate-500">Distance</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-r border-slate-200 dark:border-slate-700/60 pr-1">
              <span className="text-slate-400 dark:text-slate-500 mb-0.5">
                <Clock size={13} />
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{trail.estimatedDuration.split(' ')[0]} h</span>
              <span className="text-[10px] text-slate-500">Duration</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-slate-400 dark:text-slate-500 mb-0.5">
                <Mountain size={13} />
              </span>
              <span className="font-bold text-slate-900 dark:text-white">+{trail.elevationGainMeters} m</span>
              <span className="text-[10px] text-slate-500">Elevation</span>
            </div>
          </div>

          {/* Action Footer */}
          <Link
            href={`/trails/${trail.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm bg-[#5C5CFF]/10 text-[#5C5CFF] hover:bg-[#5C5CFF] hover:text-white transition-all duration-200"
          >
            <span>Explore Trail</span>
            <Navigation size={14} className="rotate-45" />
          </Link>
        </div>
      </div>
    </div>
  );
};
