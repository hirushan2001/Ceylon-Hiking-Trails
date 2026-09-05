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
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. BREADCRUMBS & TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#5C5CFF]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/trails" className="hover:text-[#5C5CFF]">Trails</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 dark:text-white font-bold">{trail.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
          >
            <Share2 size={14} />
            <span>{copiedToast ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => toggleSaveTrail(trail.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              saved
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
            }`}
          >
            <Heart size={14} className={saved ? 'fill-white' : ''} />
            <span>{saved ? 'Saved' : 'Save Trail'}</span>
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DifficultyBadge difficulty={trail.difficulty} size="md" />
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                <MapPin size={13} className="text-amber-400" />
                {trail.destination}, {trail.district} • {trail.province}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {trail.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <RatingStars rating={trail.rating} reviewCount={trail.reviewCount} size={20} />
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl">
          <div className="md:col-span-2 relative h-full bg-slate-200">
            <Image src={trail.heroImage} alt={trail.name} fill priority className="object-cover" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            {trail.gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative w-full h-full bg-slate-200">
                <Image src={img} alt={`${trail.name} ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. KEY STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <div className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-0">
          <Navigation className="mx-auto text-[#5C5CFF] mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance</span>
          <span className="font-extrabold text-base text-slate-900 dark:text-white">{trail.distanceKm} km</span>
        </div>
        <div className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-0">
          <Clock className="mx-auto text-amber-500 mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Duration</span>
          <span className="font-extrabold text-base text-slate-900 dark:text-white">{trail.estimatedDuration}</span>
        </div>
        <div className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-0">
          <Mountain className="mx-auto text-emerald-500 mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Elevation Gain</span>
          <span className="font-extrabold text-base text-slate-900 dark:text-white">+{trail.elevationGainMeters} m</span>
        </div>
        <div className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-0">
          <ShieldCheck className="mx-auto text-rose-500 mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Point</span>
          <span className="font-extrabold text-base text-slate-900 dark:text-white">{trail.highestElevationMeters} m</span>
        </div>
        <div className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-0">
          <Calendar className="mx-auto text-purple-500 mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Season</span>
          <span className="font-bold text-xs text-slate-900 dark:text-white">{trail.bestSeason}</span>
        </div>
        <div className="p-2">
          <MapPin className="mx-auto text-blue-500 mb-1" size={20} />
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Trail Type</span>
          <span className="font-bold text-xs text-slate-900 dark:text-white">{trail.trailType}</span>
        </div>
      </div>

      {/* 4. MAIN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Overview, Map, Timeline, Checklist) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <section className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Trail Overview</h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {trail.description}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {trail.features.map((feat) => (
                <span
                  key={feat}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#5C5CFF]/10 text-[#5C5CFF] dark:bg-[#5C5CFF]/20"
                >
                  ✨ {feat}
                </span>
              ))}
            </div>
          </section>

          {/* Interactive GIS Route Map */}
          <section className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Interactive Trail Route Map</h2>
                <p className="text-xs text-slate-500">Waypoints, elevation profile & route path</p>
              </div>
              <button
                onClick={handleDownloadGPX}
                className="px-4 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all self-start sm:self-auto"
              >
                <Download size={15} />
                <span>Download GPX File</span>
              </button>
            </div>

            <TrailMap
              trails={[trail]}
              showRouteLine={true}
              activeTrailRoute={trail.route}
              height="450px"
              zoomLevel={12}
            />
          </section>

          {/* Trail Timeline Walkthrough */}
          <section className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Trail Timeline & Key Waypoints</h2>
            <TrailTimeline waypoints={trail.route.waypoints} />
          </section>

          {/* Safety Info & Packing List */}
          <section className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 space-y-3">
              <h3 className="font-extrabold text-lg text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <ShieldCheck size={20} />
                <span>Safety Guidelines & Advice</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                {trail.safetyInformation.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PackingChecklist items={trail.whatToBring} />
          </section>

          {/* Photo Gallery */}
          <section className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Photo Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {trail.gallery.map((photo, idx) => (
                <div key={idx} className="relative h-40 rounded-xl overflow-hidden bg-slate-100 group">
                  <Image src={photo} alt={`${trail.name} ${idx}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Reviews & Ratings */}
          <section className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Hiker Reviews & Ratings</h2>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={trail.rating} reviewCount={trail.reviewCount + customReviews.length} size={18} />
                </div>
              </div>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md hover:bg-[#4B4BEE] transition-all self-start sm:self-auto"
              >
                <Plus size={16} />
                <span>Write Review</span>
              </button>
            </div>

            {/* Custom User Reviews List */}
            <div className="space-y-4 divide-y divide-slate-200 dark:divide-slate-800">
              {customReviews.map((rev) => (
                <div key={rev.id} className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#5C5CFF]/20 text-[#5C5CFF] font-bold flex items-center justify-center text-sm">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">{rev.userName}</span>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <RatingStars rating={rev.rating} showValue={false} size={14} />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}

              {/* Sample Review */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Hiker" fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">Oliver Schmidt</span>
                      <span className="text-[10px] text-slate-400">2 weeks ago</span>
                    </div>
                  </div>
                  <RatingStars rating={5} showValue={false} size={14} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Breathtaking view from the summit cliff! We started at 5:30 AM from Ella Railway station. The rail walk was easy, pine forest switchbacks were a bit steep, but total effort was worth every step.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 sticky top-28">
          {/* Trail Condition Status Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Live Trail Status</h3>
            <TrailConditionBadge status={trail.currentStatus} updatedAt={trail.statusLastUpdated} />

            <button
              onClick={() => setReportModalOpen(true)}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={15} />
              <span>Report Condition Update</span>
            </button>
          </div>

          {/* Weather Widget */}
          <WeatherWidget destination={trail.destination} />

          {/* Nearby Amenities */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Nearby Places</h3>
            <div className="space-y-3">
              {trail.nearbyPlaces.map((place) => (
                <div key={place.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{place.name}</span>
                    <span className="text-[10px] text-slate-500">{place.category} • {place.distanceKm} km away</span>
                  </div>
                  <span className="font-bold text-amber-500">⭐ {place.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 5. SIMILAR TRAILS */}
      {similarTrails.length > 0 && (
        <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Similar Trails You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarTrails.map((simTrail) => (
              <TrailCard key={simTrail.id} trail={simTrail} />
            ))}
          </div>
        </section>
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
