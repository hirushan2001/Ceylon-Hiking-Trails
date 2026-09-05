'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Search,
  MapPin,
  Compass,
  Map,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  CloudRain,
  ChevronRight
} from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { TrailCard } from '../components/TrailCard';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { GUIDES_DATA } from '../data/guidesData';
import { TrailDifficulty } from '../types';

// Dynamic Leaflet Map Import with SSR disabled
const TrailMap = dynamic(() => import('../components/TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
      Loading Interactive GIS Trail Map...
    </div>
  )
});

export default function HomePage() {
  const { trails, conditionReports, groupEvents } = useTrails();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState<TrailDifficulty | 'All'>('All');

  const featuredTrails = trails.filter((t) => t.isFeatured);

  const difficultyCategories = [
    { type: 'Easy' as TrailDifficulty, icon: '🟢', count: 4, desc: 'Gentle gradients, clear footpaths, perfect for beginners & families.' },
    { type: 'Moderate' as TrailDifficulty, icon: '🟡', count: 6, desc: 'Steady climbing through tea hills & pine switchbacks. Moderate fitness needed.' },
    { type: 'Difficult' as TrailDifficulty, icon: '🟠', count: 5, desc: 'Steep inclines, thousand-step climbs & high altitude weather exposure.' },
    { type: 'Extreme' as TrailDifficulty, icon: '🔴', count: 3, desc: 'Remote wilderness, cliff edges, heavy leeches & full-day ridge navigation.' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=2000&q=90"
            alt="Sri Lanka Mountain Trails Backdrop"
            fill
            priority
            className="object-cover object-center opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles size={14} className="text-amber-400" />
            <span>Sri Lanka’s Premier Hiking & Route Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
            Find Your Next Trail in <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8080FF] via-white to-amber-300">Sri Lanka</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore mountains, waterfalls, cloud forests, viewpoints, and hidden trails across the island.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="glass-panel p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-white/20">
              <div className="flex items-center gap-2 px-3 w-full text-slate-900 dark:text-white">
                <Search size={20} className="text-[#5C5CFF] flex-shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search Ella Rock, Knuckles, World's End, Waterfalls..."
                  className="w-full bg-transparent py-2.5 text-sm sm:text-base focus:outline-none placeholder-slate-400"
                />
              </div>
              <Link
                href={heroSearch ? `/trails?search=${encodeURIComponent(heroSearch)}` : '/trails'}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#5C5CFF] hover:bg-[#4B4BEE] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5C5CFF]/30 transition-all flex-shrink-0"
              >
                <span>Search Trails</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Difficulty Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold">
              <span className="text-slate-400">Quick Filters:</span>
              {(['Easy', 'Moderate', 'Difficult', 'Extreme'] as TrailDifficulty[]).map((diff) => (
                <Link
                  key={diff}
                  href={`/trails?difficulty=${diff}`}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all"
                >
                  <DifficultyBadge difficulty={diff} size="sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/trails"
              className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#5C5CFF] text-white hover:bg-[#4B4BEE] shadow-xl shadow-[#5C5CFF]/30 transition-all flex items-center gap-2"
            >
              <Compass size={18} />
              <span>Explore All Trails</span>
            </Link>
            <Link
              href="/map"
              className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Map size={18} />
              <span>Interactive Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED TRAILS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5C5CFF] uppercase tracking-wider mb-1">
              <TrendingUp size={16} />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Sri Lankan Trails
            </h2>
          </div>
          <Link
            href="/trails"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-[#5C5CFF] hover:underline"
          >
            <span>View All {trails.length} Trails</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Regional Highlights</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Popular Hiking Destinations
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From the misty highlands of Ella to the cloud forests of Horton Plains and ancient ridges of Knuckles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS_DATA.map((dest) => (
            <Link
              key={dest.id}
              href={`/trails?location=${encodeURIComponent(dest.name)}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 flex flex-col justify-end p-5 text-white"
            >
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  {dest.district} District
                </span>
                <h3 className="text-2xl font-extrabold group-hover:text-amber-300 transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-300 mt-2 pt-2 border-t border-white/20">
                  <span>{dest.trailsCount} Verified Trails</span>
                  <span>Best: {dest.bestMonths}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE BY DIFFICULTY */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C5CFF]">Trail Ratings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Explore Trails by Difficulty</h2>
            <p className="text-sm text-slate-400">
              Find routes tailored to your fitness level and technical experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {difficultyCategories.map((cat) => (
              <Link
                key={cat.type}
                href={`/trails?difficulty=${cat.type}`}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-[#5C5CFF] hover:bg-slate-800 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white">
                    {cat.count} Trails
                  </span>
                </div>
                <h3 className="font-extrabold text-xl group-hover:text-[#5C5CFF] transition-colors">
                  {cat.type}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C5CFF]">Interactive Map Explorer</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Discover Sri Lanka on the Map
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click any trail marker to view elevation specs, route paths, and distance metrics.
            </p>
          </div>
          <Link
            href="/map"
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#5C5CFF] text-white hover:bg-[#4B4BEE] transition-all flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <Map size={16} />
            <span>Open Full-Screen GIS Map</span>
          </Link>
        </div>

        <TrailMap trails={trails} height="480px" />
      </section>

      {/* 6. LATEST TRAIL CONDITIONS & WHY CEYLON TRAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Why Ceylon Hiking Trails */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Platform Features</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Why Ceylon Hiking Trails?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <ShieldCheck className="text-[#5C5CFF]" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Verified GPS & Elevation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Accurate GeoJSON coordinates, waypoints, and downloadable GPX files for all trails.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <CloudRain className="text-amber-500" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Live Trail Reports</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Real-time updates on rain, leech activity, slippery cliffs, and park access statuses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <Award className="text-emerald-500" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Verified Local Guides</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Connect directly with certified mountain guides for technical climbs like Knuckles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <Users className="text-rose-500" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Hiker Community</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Join weekend group treks, share photo logs, and leave reviews for fellow hikers.
              </p>
            </div>
          </div>
        </div>

        {/* Live Trail Conditions Stream */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700/60 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Latest Trail Conditions
              </h3>
              <Link href="/community" className="text-xs font-bold text-amber-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {conditionReports.map((report) => (
                <div key={report.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">{report.trailName}</span>
                    <span className="text-[10px] text-slate-400">{report.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">&quot;{report.notes}&quot;</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>By {report.reportedBy}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/report"
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-center font-bold text-xs border border-white/20 transition-all"
          >
            + Report Trail Condition
          </Link>
        </div>
      </section>

      {/* 7. VERIFIED LOCAL GUIDES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Expert Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Verified Local Hiking Guides
            </h2>
          </div>
          <Link href="/guides" className="font-bold text-sm text-[#5C5CFF] hover:underline">
            View All Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES_DATA.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#5C5CFF]">
                    <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{guide.name}</h3>
                      <ShieldCheck size={16} className="text-[#5C5CFF]" />
                    </div>
                    <span className="text-xs text-slate-500 block">{guide.location}</span>
                    <span className="text-xs font-bold text-amber-500">⭐ {guide.rating} ({guide.reviewCount} hikes)</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                  {guide.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {guide.specialties.slice(0, 2).map((spec) => (
                    <span key={spec} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">${guide.dailyRateUSD}/day</span>
                </div>
                <Link
                  href={`/guides`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5C5CFF] text-white hover:bg-[#4B4BEE] transition-all"
                >
                  Book Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL IMMERSIVE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#5C5CFF]/90 to-slate-950 p-8 sm:p-12 text-white shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Start Exploring Today</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your next adventure is waiting in Sri Lanka.
            </h2>
            <p className="text-sm text-slate-200">
              Discover verified route statistics, weather alerts, downloadable GPX data, and local guides for your next trek.
            </p>
          </div>
          <Link
            href="/trails"
            className="px-8 py-4 rounded-2xl font-extrabold text-sm bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-xl transition-all flex-shrink-0"
          >
            Explore Sri Lanka Trails →
          </Link>
        </div>
      </section>
    </div>
  );
}
