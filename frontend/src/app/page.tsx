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
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Users,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useTrails } from '../context/TrailsContext';
import { TrailCard } from '../components/TrailCard';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { GUIDES_DATA } from '../data/guidesData';

// Dynamic Leaflet Map Import with SSR disabled
const TrailMap = dynamic(() => import('../components/TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-[#F2EBE6] dark:bg-[#272421] rounded-3xl flex items-center justify-center text-[#777777] dark:text-[#999999]">
      Loading Interactive GIS Trail Map...
    </div>
  )
});

export default function HomePage() {
  const { trails } = useTrails();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0); // 1 of 5 index indicator
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredTrails = trails.filter((t) => t.isFeatured);

  const heroImages = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=90"
  ];

  const valueProps = [
    {
      title: 'Local Expertise',
      desc: 'Discover hidden trails and secret spots only accessible with our local guides.',
      icon: '/wehike_compass.png'
    },
    {
      title: 'Custom Itineraries',
      desc: 'From short walks to multi-day hikes, we tailor routes to match your needs and fitness level.',
      icon: '/wehike_boot.png'
    },
    {
      title: 'Safety & Reliability',
      desc: 'With modern equipment, trained guides, and support at every step, your safety is always our priority.',
      icon: '/wehike_helmet.png'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose your adventure',
      desc: 'Browse our curated collection of Sri Lanka’s top mountain, forest, and waterfall trails.',
      icon: Compass
    },
    {
      step: '02',
      title: 'Plan your journey',
      desc: 'Select preferred dates, difficulty level, gear options, and custom trail itineraries.',
      icon: Calendar
    },
    {
      step: '03',
      title: 'Hike with local experts',
      desc: 'Embark on unforgettable journeys with verified, certified Sri Lankan mountain guides.',
      icon: ShieldCheck
    }
  ];

  const travelArticles = [
    {
      id: 1,
      title: 'What to Pack for Your Next Adventure',
      category: 'Travel Tips',
      date: 'March 8, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Packing smart can make or break your trip. Here is a checklist to ensure you are prepared for mountain trails.'
    },
    {
      id: 2,
      title: 'My Unforgettable Journey in Knuckles Range',
      category: 'Gear Reviews',
      date: 'March 6, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Discover the most breathtaking routes in the misty Knuckles conservation area, perfect for all skill levels.'
    },
    {
      id: 3,
      title: 'Hidden Waterfalls You Need to Discover',
      category: 'Destination Guide',
      date: 'March 1, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Trek off the beaten path to explore secret cascades tucked away in Sri Lanka’s cloud forests.'
    }
  ];

  const testimonials = [
    {
      name: 'David L.',
      trip: 'Sierra Nevada Adventures, April 2025',
      text: 'The trip exceeded all my expectations! The Sierra Nevada itinerary was perfectly balanced between challenging hikes and relaxing moments to enjoy the views. Our guide was fantastic, sharing local stories and answering everyone’s questions. I’ve already recommended this trip to my friends and family!',
      rating: 5
    },
    {
      name: 'Sarah M.',
      trip: 'Horton Plains & World’s End Trek',
      text: 'The sunrise hike at Horton Plains was unforgettable. Having real-time trail updates and verified local guides gave us complete peace of mind. WeHike is now my go-to platform!',
      rating: 5
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 bg-[#FAF5F2] text-[#252525] font-sans">
      
      {/* =================================================== */}
      {/* 1. HERO BANNER (EXACT MATCH TO DESIGN SCREENSHOT) */}
      {/* =================================================== */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 lg:px-20 bg-[#0B0F17] text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90"
          alt="Hiker sitting on mountain peak in Sri Lanka"
          fill
          priority
          className="object-cover object-center sm:object-right opacity-90 scale-105"
        />

        {/* Dark Vignette and Gradient Overlay for Optimal Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent max-w-5xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-3xl my-auto space-y-7 pt-4">
          
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span>DISCOVER</span>
            <span className="text-[#F5B731]">•</span>
            <span>EXPLORE</span>
            <span className="text-[#F5B731]">•</span>
            <span>HIKE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight leading-[1.04] font-heading text-white">
            Find Your Next Trail <br />
            in <span className="text-[#F5B731]">Sri Lanka</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed font-normal">
            Explore mountains, waterfalls, forests, viewpoints and hidden trails across the island.
          </p>

          {/* Search Pill Input Bar */}
          <div className="max-w-xl pt-1">
            <div className="bg-white p-2 pl-5 rounded-full shadow-2xl flex items-center justify-between gap-3 text-slate-900">
              <div className="flex items-center gap-3 w-full">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  suppressHydrationWarning
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search trails, mountains, waterfalls..."
                  className="w-full bg-transparent py-1.5 text-xs sm:text-sm focus:outline-none placeholder-slate-400 font-medium text-slate-900"
                />
              </div>
              <Link
                href={heroSearch ? `/trails?search=${encodeURIComponent(heroSearch)}` : '/trails'}
                className="w-10 h-10 rounded-full bg-[#F5B731] hover:bg-[#E4A620] text-[#0B0F17] flex items-center justify-center shadow-md flex-shrink-0 transition-transform hover:scale-105"
              >
                <Search size={18} />
              </Link>
            </div>

            {/* Difficulty Filter Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4">
              <Link
                href="/trails?difficulty=Easy"
                className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                <span>Easy</span>
              </Link>
              <Link
                href="/trails?difficulty=Moderate"
                className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
                <span>Moderate</span>
              </Link>
              <Link
                href="/trails?difficulty=Difficult"
                className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm" />
                <span>Difficult</span>
              </Link>
              <Link
                href="/trails?difficulty=Extreme"
                className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                <span>Extreme</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Hero Stats & Scroll Indicator Bar */}
        <div className="relative z-10 pt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/15">
          <div className="flex items-center gap-8 sm:gap-12 text-xs font-medium text-white">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
                <Compass size={20} />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base block leading-tight">20+</span>
                <span className="text-[11px] text-white/70">Amazing Trails</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
                <Mountain size={20} />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base block leading-tight">9</span>
                <span className="text-[11px] text-white/70">Provinces</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F5B731]">
                <Users size={20} />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base block leading-tight">1000+</span>
                <span className="text-[11px] text-white/70">Happy Hikers</span>
              </div>
            </div>
          </div>

          {/* Scroll Down Pill Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 text-[11px] font-semibold">
            <div className="w-3.5 h-6 rounded-full border border-white/60 flex items-start justify-center p-0.5">
              <div className="w-1 h-1.5 bg-[#F5B731] rounded-full animate-bounce" />
            </div>
            <span>Scroll Down</span>
          </div>
        </div>

      </section>

      {/* =================================================== */}
      {/* 2. POPULAR HIKING TRAILS                            */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-heading">
              Popular Hiking Trails
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Handpicked trails for your next adventure in Sri Lanka.
            </p>
          </div>
          <Link
            href="/trails"
            className="text-xs font-bold text-[#E5A93C] hover:text-[#D4982B] flex items-center gap-1 group"
          >
            <span>View All Trails</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTrails.slice(0, 4).map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 3. EXPLORE BY DIFFICULTY                            */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-heading">
            Explore by Difficulty
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Find trails that match your adventure level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              level: 'Easy',
              desc: 'Perfect for beginners and families.',
              color: 'from-emerald-600 to-teal-800',
              img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
            },
            {
              level: 'Moderate',
              desc: 'A good challenge with great rewards.',
              color: 'from-amber-600 to-yellow-800',
              img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
            },
            {
              level: 'Difficult',
              desc: 'For experienced hikers.',
              color: 'from-orange-600 to-red-800',
              img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
            },
            {
              level: 'Extreme',
              desc: 'For the bold adventurers.',
              color: 'from-rose-700 to-slate-900',
              img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
            }
          ].map((item) => (
            <Link
              key={item.level}
              href={`/trails?difficulty=${encodeURIComponent(item.level)}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end p-6 text-white hover:shadow-2xl transition-all"
            >
              <Image src={item.img} alt={item.level} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black font-heading text-[#E5A93C]">
                  {item.level}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-white group-hover:text-[#E5A93C] transition-colors">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 5. FEATURED ADVENTURE BANNER                       */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-[#E6DFD9] shadow-2xl h-[420px] flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=90"
            alt="Knuckles Mountain Range Expedition"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          {/* Overlay Content Card */}
          <div className="relative z-10 p-8 sm:p-12 max-w-xl text-white space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-[#2D6A4F] text-white text-xs font-extrabold uppercase tracking-wider">
              Featured Adventure
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
              Knuckles Mountain Range Expedition
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              3 Days / 2 Nights — Trek through misty cloud forests, hidden waterfalls, and 34 isolated mountain peaks.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-white/90">
              <div>
                <span className="text-[#52B788] block text-[10px] uppercase font-bold">Difficulty</span>
                <span>Difficult</span>
              </div>
              <div>
                <span className="text-[#52B788] block text-[10px] uppercase font-bold">Distance</span>
                <span>28.5 km</span>
              </div>
              <div>
                <span className="text-[#52B788] block text-[10px] uppercase font-bold">Elevation</span>
                <span>+1,863 m</span>
              </div>
              <div>
                <span className="text-[#52B788] block text-[10px] uppercase font-bold">Starting Price</span>
                <span className="text-lg font-black text-white">$140</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/trails/knuckles-5-peaks-trek"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-xs font-extrabold bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white shadow-lg transition-all hover:scale-105"
              >
                Explore Adventure →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* 6. HOW IT WORKS (3 STEPS)                           */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-md mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-[#252525] font-heading">
            Your adventure starts here
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white p-8 rounded-3xl border border-[#E6DFD9] text-center space-y-4 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2D6A4F] flex items-center justify-center mx-auto text-xl font-black">
                  <Icon size={24} />
                </div>
                <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-widest block">
                  Step {step.step}
                </span>
                <h3 className="text-xl font-bold text-[#252525] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================== */}
      {/* 7. INTERACTIVE MAP SECTION                          */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F]">GIS Map Explorer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
              Discover Sri Lanka on the Map
            </h2>
          </div>
          <Link
            href="/map"
            className="px-6 py-3 rounded-full font-bold text-xs bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition-all shadow-md shadow-[#2D6A4F]/30 self-start md:self-auto"
          >
            Open Interactive GIS Map
          </Link>
        </div>

        <TrailMap trails={trails} height="480px" />
      </section>

      {/* =================================================== */}
      {/* 8. REVIEWS / TESTIMONIALS                           */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
            What hikers say
          </h2>
          <div className="flex items-center gap-2">
            <button suppressHydrationWarning className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-md hover:bg-[#1B4D3E] transition-colors cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <button suppressHydrationWarning className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-md hover:bg-[#1B4D3E] transition-colors cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#E6DFD9] shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#252525]">{t.name}</h4>
                  <span className="text-[10px] text-[#777777]">{t.trip}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
          <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
          <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
          <span className="w-2 h-2 rounded-full bg-[#E6DFD9]" />
        </div>
      </section>

      {/* =================================================== */}
      {/* 9. TRAVEL TIPS / BLOG ARTICLES                      */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] font-heading">
            Travel Tips
          </h2>
          <Link href="/community" className="text-xs font-bold text-[#2D6A4F] hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD9] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48">
                  <Image src={art.image} alt={art.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold">
                    {art.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-extrabold text-base text-[#252525] font-heading leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-[#777777] pt-2 border-t border-[#F2EBE6]">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#2D6A4F]" />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#777777]" />
                      {art.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-1">
                <button suppressHydrationWarning className="w-full py-2.5 rounded-full border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white font-extrabold text-xs transition-all cursor-pointer">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================== */}
      {/* 10. NEWSLETTER / READY FOR ADVENTURE CTA            */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#1B261C] text-white rounded-[2.5rem] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
              Ready for your next adventure?
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Find your trail, meet your guide and start exploring Sri Lanka.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
            {subscribed ? (
              <div className="w-full py-3 px-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>You’re subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <>
                <input
                  suppressHydrationWarning
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-6 py-3 rounded-full bg-white/10 text-white placeholder-white/50 text-xs border border-white/20 focus:outline-none focus:border-[#2D6A4F]"
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-extrabold text-xs shadow-md shadow-[#2D6A4F]/30 flex-shrink-0 transition-transform hover:scale-105"
                >
                  Get Started
                </button>
              </>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
