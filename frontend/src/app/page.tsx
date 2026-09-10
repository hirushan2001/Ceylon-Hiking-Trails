'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { TrailCard } from '../components/TrailCard';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { GUIDES_DATA } from '../data/guidesData';

// Dynamic Leaflet Map Import with SSR disabled
const TrailMap = dynamic(() => import('../components/TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-[#EFE8E1] dark:bg-[#24211E] rounded-3xl flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA]">
      Loading Interactive GIS Trail Map...
    </div>
  )
});

export default function HomePage() {
  const { trails } = useTrails();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeHeroSlide, setActiveHeroSlide] = useState(2); // 3 of 5 index indicator

  const featuredTrails = trails.filter((t) => t.isFeatured);

  const heroImages = [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=90"
  ];

  const valueProps = [
    {
      title: 'Local Expertise',
      desc: 'Explore hidden trails and secret spots only accessible with our local guides. They provide you with an authentic and unforgettable experience.',
      icon: '/wehike_compass.png'
    },
    {
      title: 'Custom Itineraries',
      desc: 'From short walks to multi-day hikes — we tailor routes to match your needs and fitness level, ensuring every moment is enjoyable.',
      icon: '/wehike_boot.png'
    },
    {
      title: 'Safety & Reliability',
      desc: 'With modern equipment, trained guides, and support at every step, your safety is always our top priority.',
      icon: '/wehike_helmet.png'
    }
  ];

  const testimonials = [
    {
      name: 'David L.',
      trip: 'Sierra Nevada Adventures, April 2025',
      text: 'This trip exceeded all my expectations! The Sierra Nevada itinerary was perfectly balanced between challenging hikes and relaxing moments to enjoy the views. Our guide was fantastic, sharing local stories and answering everyone’s questions. I’ve already recommended this trip to my friends and family!',
      rating: 5
    },
    {
      name: 'Sarah M.',
      trip: 'Horton Plains & World’s End Trek',
      text: 'The sunrise hike at Horton Plains was unforgettable. Having real-time trail updates and verified local guides gave us complete peace of mind. WeHike is now my go-to platform!',
      rating: 5
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 bg-[#F7F2EE] dark:bg-[#121110] text-[#18181B] dark:text-[#F7F2EE] font-sans">
      {/* =================================================== */}
      {/* 1. EXACT WEHIKE HERO SECTION (100% MATCH TO IMAGE)  */}
      {/* =================================================== */}
      <section className="pt-24 sm:pt-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Subtext, Search, Mountain Vector */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05] text-[#18181B] dark:text-white font-heading">
              Find adventures <br />
              with the best <br />
              local guiled
            </h1>

            {/* Sub-text */}
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] max-w-md leading-relaxed">
              Aliquam ut adipiscing neque nam congue. Pulvinar et orci urna facilisi pulvinar non.
            </p>

            {/* Search Input Box */}
            <div className="max-w-xs sm:max-w-sm pt-1">
              <div className="bg-white dark:bg-[#1C1A18] p-1.5 pl-5 rounded-full shadow-sm border border-[#E4DDD5] dark:border-[#2E2A26] flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search for adventures worldwide..."
                  className="w-full bg-transparent py-1.5 text-xs focus:outline-none placeholder-[#A1A1AA]"
                />
                <Link
                  href={heroSearch ? `/trails?search=${encodeURIComponent(heroSearch)}` : '/trails'}
                  className="w-8 h-8 rounded-full bg-[#EE5626] hover:bg-[#D64315] text-white flex items-center justify-center shadow-md shadow-[#EE5626]/30 flex-shrink-0 transition-transform hover:scale-105"
                >
                  <Search size={14} />
                </Link>
              </div>
            </div>

            {/* Subtle Mountain Sketch Background Illustration */}
            <div className="pt-6 pointer-events-none opacity-40">
              <svg width="240" height="90" viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 80L50 35L80 60L130 15L180 80" stroke="#71717A" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M100 80L140 40L170 65L220 25L235 80" stroke="#71717A" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

          {/* Right Column: Asymmetric Cutout Hero Image Frame */}
          <div className="lg:col-span-6 relative flex justify-end">
            <div className="relative w-full max-w-lg">
              
              {/* Asymmetric SVG Curved Mask Image Frame */}
              <div className="relative w-full h-[360px] sm:h-[450px] lg:h-[490px] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-xl border-4 border-white dark:border-[#1C1A18]">
                <Image
                  src={heroImages[activeHeroSlide]}
                  alt="Backpacker Hiker on Mountain Ridge"
                  fill
                  priority
                  className="object-cover transition-opacity duration-700"
                />
                
                {/* Simulated Notch Top Left Cutout curve */}
                <div className="absolute -top-1 -left-1 w-24 h-24 bg-[#F7F2EE] dark:bg-[#121110] rounded-br-[2.5rem] hidden lg:block" />
              </div>

              {/* Bottom Right Floating Carousel Controller Widget */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:right-4 bg-white/95 dark:bg-[#1C1A18]/95 backdrop-blur-md p-3 px-5 rounded-2xl shadow-xl border border-[#E4DDD5] dark:border-[#2E2A26] flex items-center gap-4">
                <span className="text-xs font-bold text-[#18181B] dark:text-white">
                  {activeHeroSlide + 1} <span className="text-[#71717A] text-[10px] font-normal">/ {heroImages.length}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
                    className="w-8 h-8 rounded-full bg-[#EE5626] text-white hover:bg-[#D64315] flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveHeroSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))}
                    className="w-8 h-8 rounded-full bg-[#EE5626] text-white hover:bg-[#D64315] flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* 2. EXACT WEHIKE WHY CHOOSE US (100% MATCH TO IMAGE) */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-[#18181B] dark:text-white font-heading">
            Why Choose Us
          </h2>
        </div>

        {/* 3 White Card Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="bg-white dark:bg-[#1C1A18] p-8 rounded-3xl border border-[#E4DDD5] dark:border-[#2E2A26] shadow-sm space-y-4 text-left transition-all hover:shadow-md"
            >
              {/* 3D Glossy Icon Image */}
              <div className="relative w-14 h-14">
                <Image
                  src={prop.icon}
                  alt={prop.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Card Title */}
              <h3 className="text-lg font-extrabold text-[#18181B] dark:text-white font-heading pt-2">
                {prop.title}
              </h3>

              {/* Card Description */}
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {prop.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 3. NEXT TRIPS / FEATURED TRAILS SECTION             */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white font-heading">
            Next Trips
          </h2>
          <Link
            href="/trails"
            className="text-xs font-bold text-[#EE5626] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 4. POPULAR DESTINATIONS GRID                        */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE5626]">Regional Highlights</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white font-heading">
            Popular Hiking Destinations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS_DATA.map((dest) => (
            <Link
              key={dest.id}
              href={`/trails?location=${encodeURIComponent(dest.name)}`}
              className="group relative h-72 rounded-3xl overflow-hidden border border-[#E4DDD5] dark:border-[#2E2A26] flex flex-col justify-end p-6 text-white shadow-md hover:shadow-xl transition-all"
            >
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold text-[#F7931E] uppercase tracking-wider">
                  {dest.district} District
                </span>
                <h3 className="text-2xl font-extrabold font-heading group-hover:text-[#F7931E] transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/20">
                  <span>{dest.trailsCount} Verified Trails</span>
                  <span>Best: {dest.bestMonths}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 5. INTERACTIVE MAP SECTION                          */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE5626]">GIS Map Explorer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white font-heading">
              Discover Sri Lanka on the Map
            </h2>
          </div>
          <Link
            href="/map"
            className="px-6 py-3 rounded-full font-bold text-xs bg-[#EE5626] text-white hover:bg-[#D64315] transition-all shadow-md shadow-[#EE5626]/30 self-start md:self-auto"
          >
            Open Interactive GIS Map
          </Link>
        </div>

        <TrailMap trails={trails} height="480px" />
      </section>

      {/* =================================================== */}
      {/* 6. TESTIMONIALS (EXACT WEHIKE DESIGN)               */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white font-heading">
            What Hikers Say
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-[#EE5626] text-white flex items-center justify-center shadow-md">
              <ChevronLeft size={18} />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#EE5626] text-white flex items-center justify-center shadow-md">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1C1A18] p-8 rounded-3xl border border-[#E4DDD5] dark:border-[#2E2A26] shadow-sm space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {t.text}
              </p>
              <div className="pt-2 border-t border-[#E4DDD5] dark:border-[#2E2A26]">
                <h4 className="font-bold text-sm text-[#18181B] dark:text-white">{t.name}</h4>
                <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">{t.trip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 7. VERIFIED LOCAL GUIDES SPOTLIGHT                   */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE5626]">Expert Guidance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white font-heading">
              Verified Local Hiking Guides
            </h2>
          </div>
          <Link href="/guides" className="font-bold text-xs text-[#EE5626] hover:underline">
            View All Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES_DATA.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-[#1C1A18] rounded-3xl p-6 border border-[#E4DDD5] dark:border-[#2E2A26] shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#EE5626]">
                    <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-[#18181B] dark:text-white">{guide.name}</h3>
                      <ShieldCheck size={16} className="text-[#EE5626]" />
                    </div>
                    <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] block">{guide.location}</span>
                    <span className="text-xs font-bold text-amber-500">⭐ {guide.rating} ({guide.reviewCount} hikes)</span>
                  </div>
                </div>

                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] line-clamp-3">
                  {guide.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E4DDD5] dark:border-[#2E2A26] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-bold block">Rate</span>
                  <span className="text-base font-extrabold text-[#18181B] dark:text-white">${guide.dailyRateUSD}/day</span>
                </div>
                <Link
                  href={`/guides`}
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[#EE5626] text-white hover:bg-[#D64315] transition-all"
                >
                  Book Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
