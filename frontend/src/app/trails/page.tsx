'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid, List, Mountain, RotateCcw, X } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailCard } from '../../components/TrailCard';
import { FilterPanel, FilterValues } from '../../components/FilterPanel';
import { TrailDifficulty, TrailType, TrailFeature } from '../../types';

function TrailsContent() {
  const searchParams = useSearchParams();
  const { trails } = useTrails();

  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || 'All Destinations';
  const initialDifficulty = (searchParams.get('difficulty') as TrailDifficulty) || 'All';

  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: initialSearch,
    destination: initialLocation,
    difficulty: initialDifficulty,
    trailType: 'All',
    maxDistance: 25,
    maxDurationHours: 10,
    features: [],
    sortBy: 'popular'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      destination: 'All Destinations',
      difficulty: 'All',
      trailType: 'All',
      maxDistance: 25,
      maxDurationHours: 10,
      features: [],
      sortBy: 'popular'
    });
  };

  const filteredTrails = useMemo(() => {
    return trails
      .filter((trail) => {
        // Search text
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matches =
            trail.name.toLowerCase().includes(q) ||
            trail.destination.toLowerCase().includes(q) ||
            trail.district.toLowerCase().includes(q) ||
            trail.shortDescription.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Destination
        if (filters.destination !== 'All Destinations' && filters.destination !== 'All') {
          if (trail.destination.toLowerCase() !== filters.destination.toLowerCase()) {
            return false;
          }
        }

        // Difficulty
        if (filters.difficulty !== 'All') {
          if (trail.difficulty !== filters.difficulty) return false;
        }

        // Trail Type
        if (filters.trailType !== 'All') {
          if (trail.trailType !== filters.trailType) return false;
        }

        // Max Distance
        if (filters.maxDistance < 25 && trail.distanceKm > filters.maxDistance) {
          return false;
        }

        // Features
        if (filters.features.length > 0) {
          const hasAllFeatures = filters.features.every((f) => trail.features.includes(f as TrailFeature));
          if (!hasAllFeatures) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'distance_asc') return a.distanceKm - b.distanceKm;
        if (filters.sortBy === 'distance_desc') return b.distanceKm - a.distanceKm;
        if (filters.sortBy === 'elevation_desc') return b.elevationGainMeters - a.elevationGainMeters;
        return b.reviewCount - a.reviewCount; // popular
      });
  }, [trails, filters]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5C5CFF]">Trail Directory</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Hiking Trails in Sri Lanka
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Filter through mountains, cloud forests, waterfalls, and tea countryside routes.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            totalResults={filteredTrails.length}
          />
        </aside>

        {/* Results Column */}
        <main className="lg:col-span-8 space-y-6">
          {/* Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-2"
              >
                <SlidersHorizontal size={16} className="text-[#5C5CFF]" />
                <span>Filters</span>
                <span className="w-5 h-5 rounded-full bg-[#5C5CFF] text-white text-[10px] flex items-center justify-center">
                  {filteredTrails.length}
                </span>
              </button>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white">{filteredTrails.length}</strong> of {trails.length} Trails
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                aria-label="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                aria-label="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredTrails.length === 0 && (
            <div className="py-16 px-6 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <Mountain className="mx-auto text-slate-400 opacity-30" size={56} />
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                No trails match your current filters
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try adjusting your difficulty level, distance limits, or region selections to discover available hikes.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* Grid / List Results */}
          {filteredTrails.length > 0 && (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredTrails.map((trail) => (
                <TrailCard key={trail.id} trail={trail} compact={viewMode === 'list'} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl p-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Filter Trails</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              totalResults={filteredTrails.length}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 mt-6 rounded-xl bg-[#5C5CFF] text-white font-bold text-sm shadow-lg shadow-[#5C5CFF]/30"
            >
              Show {filteredTrails.length} Trails
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrailsPage() {
  return (
    <Suspense fallback={<div className="pt-28 text-center text-slate-500">Loading Trails Directory...</div>}>
      <TrailsContent />
    </Suspense>
  );
}
