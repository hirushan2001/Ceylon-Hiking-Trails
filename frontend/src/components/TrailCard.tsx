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
    <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#1E1B18] border border-[#E7E0D8] dark:border-[#322D29] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Header */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#F3ECE4] dark:bg-[#26221F]">
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
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveTrail(trail.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              saved
                ? 'bg-[#E05326] text-white shadow-md scale-105'
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
            <MapPin size={13} className="text-[#F4A261]" />
            <span className="truncate max-w-[140px]">{trail.destination}, {trail.district}</span>
          </div>
          <TrailConditionBadge status={trail.currentStatus} compact />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Link href={`/trails/${trail.slug}`} className="focus:outline-none">
              <h3 className="font-bold text-lg text-[#1C1917] dark:text-white group-hover:text-[#E05326] transition-colors line-clamp-1 font-heading">
                {trail.name}
              </h3>
            </Link>
            <RatingStars rating={trail.rating} reviewCount={trail.reviewCount} />
          </div>

          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] line-clamp-2 mb-4">
            {trail.shortDescription}
          </p>
        </div>

        <div>
          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#F3ECE4]/70 dark:bg-[#26221F]/70 text-[#1C1917] dark:text-[#FAF5F0] text-xs mb-4">
            <div className="flex flex-col items-center justify-center text-center border-r border-[#E7E0D8] dark:border-[#322D29] pr-1">
              <span className="text-[#78716C] dark:text-[#A8A29E] mb-0.5">
                <Navigation size={13} />
              </span>
              <span className="font-bold text-[#1C1917] dark:text-white">{trail.distanceKm} km</span>
              <span className="text-[10px] text-[#78716C]">Distance</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-r border-[#E7E0D8] dark:border-[#322D29] pr-1">
              <span className="text-[#78716C] dark:text-[#A8A29E] mb-0.5">
                <Clock size={13} />
              </span>
              <span className="font-bold text-[#1C1917] dark:text-white">{trail.estimatedDuration.split(' ')[0]} h</span>
              <span className="text-[10px] text-[#78716C]">Duration</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[#78716C] dark:text-[#A8A29E] mb-0.5">
                <Mountain size={13} />
              </span>
              <span className="font-bold text-[#1C1917] dark:text-white">+{trail.elevationGainMeters} m</span>
              <span className="text-[10px] text-[#78716C]">Elevation</span>
            </div>
          </div>

          {/* Action Footer */}
          <Link
            href={`/trails/${trail.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold text-xs bg-[#E05326]/10 text-[#E05326] hover:bg-[#E05326] hover:text-white transition-all duration-200"
          >
            <span>Explore Trail</span>
            <Navigation size={14} className="rotate-45" />
          </Link>
        </div>
      </div>
    </div>
  );
};
