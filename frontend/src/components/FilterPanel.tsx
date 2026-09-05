'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { TrailDifficulty, TrailType, TrailFeature } from '../types';

export interface FilterValues {
  searchQuery: string;
  destination: string;
  difficulty: TrailDifficulty | 'All';
  trailType: TrailType | 'All';
  maxDistance: number;
  maxDurationHours: number;
  features: TrailFeature[];
  sortBy: 'popular' | 'rating' | 'distance_asc' | 'distance_desc' | 'elevation_desc';
}

interface FilterPanelProps {
  filters: FilterValues;
  onChange: (updated: FilterValues) => void;
  onReset: () => void;
  totalResults: number;
}

const DESTINATION_OPTIONS = ['All Destinations', 'Ella', 'Knuckles', 'Horton Plains', 'Kandy', 'Matale', 'Ratnapura', 'Badulla'];

const DIFFICULTY_OPTIONS: (TrailDifficulty | 'All')[] = ['All', 'Easy', 'Moderate', 'Difficult', 'Extreme'];

const TRAIL_TYPES: (TrailType | 'All')[] = [
  'All',
  'Mountain',
  'Forest',
  'Waterfall',
  'Viewpoint',
  'Coastal',
  'Wildlife',
  'Cultural'
];

const FEATURE_CHIPS: TrailFeature[] = [
  'Waterfall',
  'Sunrise',
  'Sunset',
  'Camping',
  'Wildlife',
  'Photography',
  'Family Friendly',
  'Tea Plantations',
  'Historical Site'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const toggleFeature = (feat: TrailFeature) => {
    const exists = filters.features.includes(feat);
    const updated = exists
      ? filters.features.filter((f) => f !== feat)
      : [...filters.features, feat];
    onChange({ ...filters, features: updated });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#5C5CFF]" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Filter Trails</h3>
          <span className="text-xs bg-[#5C5CFF]/10 text-[#5C5CFF] font-bold px-2 py-0.5 rounded-full">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-500 transition-colors font-medium"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Destination Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Region / Destination
        </label>
        <select
          value={filters.destination}
          onChange={(e) => onChange({ ...filters, destination: e.target.value })}
          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
        >
          {DESTINATION_OPTIONS.map((dest) => (
            <option key={dest} value={dest === 'All Destinations' ? 'All' : dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Difficulty Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DIFFICULTY_OPTIONS.map((diff) => {
            const active = filters.difficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => onChange({ ...filters, difficulty: diff })}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  active
                    ? 'bg-[#5C5CFF] text-white border-[#5C5CFF] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#5C5CFF]/40'
                }`}
              >
                {diff === 'All' ? 'All Difficulties' : diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trail Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Trail Type
        </label>
        <select
          value={filters.trailType}
          onChange={(e) => onChange({ ...filters, trailType: e.target.value as TrailType | 'All' })}
          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
        >
          {TRAIL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === 'All' ? 'All Trail Types' : type}
            </option>
          ))}
        </select>
      </div>

      {/* Distance Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Max Distance
          </label>
          <span className="font-bold text-[#5C5CFF]">
            {filters.maxDistance >= 25 ? 'Any distance' : `Up to ${filters.maxDistance} km`}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="25"
          step="1"
          value={filters.maxDistance}
          onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
          className="w-full accent-[#5C5CFF]"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>2 km</span>
          <span>10 km</span>
          <span>25+ km</span>
        </div>
      </div>

      {/* Features Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Special Highlights
        </label>
        <div className="flex flex-wrap gap-1.5">
          {FEATURE_CHIPS.map((feat) => {
            const selected = filters.features.includes(feat);
            return (
              <button
                key={feat}
                onClick={() => toggleFeature(feat)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selected
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-amber-400/50'
                }`}
              >
                {selected && <Check size={12} />}
                <span>{feat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Option */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sort Results By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterValues['sortBy'] })}
          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="distance_asc">Shortest Distance</option>
          <option value="distance_desc">Longest Distance</option>
          <option value="elevation_desc">Highest Elevation Gain</option>
        </select>
      </div>
    </div>
  );
};
