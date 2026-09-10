'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  MapPin,
  Heart,
  Download,
  Share2,
  Calendar,
  Navigation,
  Clock,
  Mountain,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Utensils,
  Hotel,
  Bus,
  MessageSquare,
  Plus
} from 'lucide-react';
import { useTrails } from '../../../context/TrailsContext';
import { DifficultyBadge } from '../../../components/DifficultyBadge';
import { RatingStars } from '../../../components/RatingStars';
import { TrailConditionBadge } from '../../../components/TrailConditionBadge';
import { TrailTimeline } from '../../../components/TrailTimeline';
import { PackingChecklist } from '../../../components/PackingChecklist';
import { WeatherWidget } from '../../../components/WeatherWidget';
import { ReportConditionModal } from '../../../components/ReportConditionModal';
import { WriteReviewModal } from '../../../components/WriteReviewModal';
import { TrailCard } from '../../../components/TrailCard';

// Dynamic Leaflet Map Import
const TrailMap = dynamic(() => import('../../../components/TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
      Loading GIS Route Map...
    </div>
  )
});

export default function TrailDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { trails, isSaved, toggleSaveTrail, userReviews, conditionReports } = useTrails();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const trail = trails.find((t) => t.slug === slug);

  if (!trail) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Trail Not Found</h2>
        <p className="text-slate-500">The trail slug &quot;{slug}&quot; could not be located.</p>
        <Link href="/trails" className="px-5 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-sm inline-block">
          Return to Trail Directory
        </Link>
      </div>
    );
  }

  const saved = isSaved(trail.id);
  const customReviews = userReviews[trail.id] || [];

  // GPX Download Generator
  const handleDownloadGPX = () => {
    const coordsXml = trail.route.coordinates
      .map(([lat, lon]) => `<trkpt lat="${lat}" lon="${lon}"><ele>1000</ele></trkpt>`)
      .join('\n');

    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Ceylon Hiking Trails - https://ceylonhikingtrails.com">
  <metadata>
    <name>${trail.name}</name>
    <desc>${trail.shortDescription}</desc>
  </metadata>
  <trk>
    <name>${trail.name}</name>
    <trkseg>
      ${coordsXml}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${trail.slug}.gpx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trail.name,
        text: trail.shortDescription,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const similarTrails = trails.filter((t) => t.id !== trail.id && (t.destination === trail.destination || t.difficulty === trail.difficulty)).slice(0, 3);

  return (
    <div className="bg-[#FAF8F5] text-slate-900 font-sans pb-24 min-h-screen">
      {/* 1. HERO BANNER CARD (EXACT IMAGE 1 MATCH) */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] sm:h-[480px] flex items-end p-6 sm:p-10 border border-slate-200">
          <Image
            src={trail.heroImage}
            alt={trail.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 w-full space-y-4 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/80 font-semibold">1 to 5 Destination</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
                  {trail.name}
                </h1>
                <div className="flex items-center gap-3 pt-1 text-xs text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#E5A93C]" />
                    {trail.district}, Sri Lanka
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-[#E5A93C]">
                    ★ {trail.rating} <span className="text-white/70 font-normal">({trail.reviewCount} reviews)</span>
                  </span>
                </div>
              </div>

              {/* Yellow Difficulty Pill Badge */}
              <div>
                <span className="px-4 py-1.5 rounded-full bg-[#E5A93C] text-[#0B0F17] font-black text-xs uppercase tracking-wider shadow-md">
                  {trail.difficulty}
                </span>
              </div>
            </div>

            {/* Translucent Key Stat Pills Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                <Navigation size={18} className="text-[#E5A93C]" />
                <div>
                  <span className="font-extrabold text-sm text-white block">{trail.distanceKm} km</span>
                  <span className="text-[10px] text-white/60 uppercase font-semibold">Distance</span>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                <Clock size={18} className="text-[#E5A93C]" />
                <div>
                  <span className="font-extrabold text-sm text-white block">{trail.estimatedDuration}</span>
                  <span className="text-[10px] text-white/60 uppercase font-semibold">Duration</span>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                <Mountain size={18} className="text-[#E5A93C]" />
                <div>
                  <span className="font-extrabold text-sm text-white block">+{trail.elevationGainMeters} m</span>
                  <span className="text-[10px] text-white/60 uppercase font-semibold">Elevation Gain</span>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#E5A93C]" />
                <div>
                  <span className="font-extrabold text-sm text-white block">{trail.highestElevationMeters} m</span>
                  <span className="text-[10px] text-white/60 uppercase font-semibold">Highest Point</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-8 border-b border-slate-200 overflow-x-auto pb-3 text-xs font-bold text-slate-500">
          <a href="#overview" className="text-slate-900 border-b-2 border-slate-900 pb-3">Overview</a>
          <a href="#route" className="hover:text-slate-900">Route</a>
          <a href="#conditions" className="hover:text-slate-900">Conditions</a>
          <a href="#weather" className="hover:text-slate-900">Weather</a>
          <a href="#safety" className="hover:text-slate-900">Safety</a>
          <a href="#packing" className="hover:text-slate-900">What to Bring</a>
          <a href="#reviews" className="hover:text-slate-900">Reviews</a>
          <a href="#photos" className="hover:text-slate-900">Photos</a>
          <a href="#nearby" className="hover:text-slate-900">Nearby</a>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* GIS Route Map Container */}
            <div id="route" className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-extrabold text-slate-900 text-sm">Interactive GIS Route</h3>
                <button
                  onClick={handleDownloadGPX}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Download size={14} className="text-[#5C5CFF]" />
                  <span>Download GPX</span>
                </button>
              </div>
              <TrailMap
                trails={[trail]}
                showRouteLine={true}
                activeTrailRoute={trail.route}
                height="380px"
                zoomLevel={12}
              />
            </div>

            {/* About This Trail */}
            <div id="overview" className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 font-heading">About This Trail</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {trail.description}
              </p>

              <div className="pt-2 space-y-3 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Trail Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700">
                  {trail.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Trail Status Box */}
            <div id="conditions" className="bg-[#EAF6F0] border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-black text-slate-900 text-sm font-heading">Trail Status</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
                  ✓
                </div>
                <div>
                  <span className="font-extrabold text-emerald-950 text-sm block">Trail Open</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Last updated 2 hours ago</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-emerald-950 font-medium pt-3 border-t border-emerald-200/50">
                <div className="flex items-center gap-2"><span>🌤️</span> <span>Light rain</span></div>
                <div className="flex items-center gap-2"><span>⚠️</span> <span>Slightly slippery</span></div>
                <div className="flex items-center gap-2"><span>✅</span> <span>Trail accessible</span></div>
                <div className="flex items-center gap-2"><span>💧</span> <span>Water available</span></div>
              </div>

              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-[#0B3B2B] hover:bg-[#07281D] text-white font-black text-xs transition-colors shadow-md"
              >
                Report Trail Condition
              </button>
            </div>

            {/* Weather Box */}
            <div id="weather" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm font-heading">Weather</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black text-slate-900">26°C</span>
                  <span className="text-xs text-slate-500 block font-medium">Partly cloudy</span>
                </div>
                <span className="text-3xl">⛅</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600 font-medium pt-3 border-t border-slate-100">
                <div className="flex justify-between"><span>Rain</span> <span className="font-bold text-slate-900">15% chance</span></div>
                <div className="flex justify-between"><span>Wind</span> <span className="font-bold text-slate-900">12 km/h W</span></div>
                <div className="flex justify-between"><span>Humidity</span> <span className="font-bold text-slate-900">78%</span></div>
              </div>
            </div>

            {/* Safety Information Box */}
            <div id="safety" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 font-heading">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Safety Information</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                {trail.safetyInformation.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIMILAR TRAILS */}
      {similarTrails.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <section className="pt-10 border-t border-slate-200 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 font-heading">Similar Trails You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarTrails.map((simTrail) => (
                <TrailCard key={simTrail.id} trail={simTrail} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Modals */}
      <ReportConditionModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        trailId={trail.id}
        trailName={trail.name}
      />
      <WriteReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        trailId={trail.id}
        trailName={trail.name}
      />
    </div>
  );
}
