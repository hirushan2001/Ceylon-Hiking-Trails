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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-slate-800">
      {/* Filters Title & Reset Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-extrabold text-slate-900 text-lg">Filters</h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-[#E5A93C] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Location Selectors */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Location
        </label>
        <div className="space-y-2">
          <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium focus:outline-none">
            <option>Province</option>
            <option>Central Province</option>
            <option>Uva Province</option>
            <option>Sabaragamuwa</option>
          </select>
          <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium focus:outline-none">
            <option>District</option>
            <option>Badulla</option>
            <option>Nuwara Eliya</option>
            <option>Matale</option>
            <option>Kandy</option>
          </select>
          <select
            value={filters.destination}
            onChange={(e) => onChange({ ...filters, destination: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium focus:outline-none"
          >
            {DESTINATION_OPTIONS.map((dest) => (
              <option key={dest} value={dest === 'All Destinations' ? 'All' : dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Difficulty Radio Filters */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Difficulty
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          {[
            { label: 'Easy', badge: 'bg-emerald-500' },
            { label: 'Moderate', badge: 'bg-amber-500' },
            { label: 'Difficult', badge: 'bg-orange-500' },
            { label: 'Extreme', badge: 'bg-rose-500' }
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900"
            >
              <input
                type="radio"
                name="difficulty"
                checked={filters.difficulty === item.label}
                onChange={() => onChange({ ...filters, difficulty: item.label as TrailDifficulty })}
                className="w-4 h-4 accent-[#E5A93C] cursor-pointer"
              />
              <span className={`w-2.5 h-2.5 rounded-full ${item.badge}`} />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance Radio List */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Distance
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          {[
            { label: 'Under 5 km', val: 5 },
            { label: '5 - 10 km', val: 10 },
            { label: '10 - 20 km', val: 20 },
            { label: '20+ km', val: 25 }
          ].map((dist) => (
            <label key={dist.label} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="distance"
                checked={filters.maxDistance === dist.val}
                onChange={() => onChange({ ...filters, maxDistance: dist.val })}
                className="w-4 h-4 accent-[#E5A93C] cursor-pointer"
              />
              <span>{dist.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Radio List */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Duration
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          {[
            { label: 'Under 2 hours', hrs: 2 },
            { label: '2 - 4 hours', hrs: 4 },
            { label: '4 - 8 hours', hrs: 8 },
            { label: '8+ hours', hrs: 10 }
          ].map((dur) => (
            <label key={dur.label} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="duration"
                checked={filters.maxDurationHours === dur.hrs}
                onChange={() => onChange({ ...filters, maxDurationHours: dur.hrs })}
                className="w-4 h-4 accent-[#E5A93C] cursor-pointer"
              />
              <span>{dur.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Trail Type Checkboxes */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Trail Type
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          {TRAIL_TYPES.filter((t) => t !== 'All').map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
              <input
                type="checkbox"
                checked={filters.trailType === type}
                onChange={() =>
                  onChange({
                    ...filters,
                    trailType: filters.trailType === type ? 'All' : (type as TrailType)
                  })
                }
                className="w-4 h-4 accent-[#E5A93C] rounded cursor-pointer"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features Checkboxes */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Features
        </label>
        <div className="space-y-2 text-xs font-medium text-slate-700">
          {FEATURE_CHIPS.map((feat) => (
            <label key={feat} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
              <input
                type="checkbox"
                checked={filters.features.includes(feat)}
                onChange={() => toggleFeature(feat)}
                className="w-4 h-4 accent-[#E5A93C] rounded cursor-pointer"
              />
              <span>{feat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters CTA Button */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-extrabold transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
