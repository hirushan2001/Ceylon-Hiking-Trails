import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Navigation, Calendar, ChevronRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/destinationsData';

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Hiking Hubs</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Sri Lankan Hiking Destinations
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Discover unique regional ecosystems, mountain microclimates, best seasons to trek, and iconic trailheads across the island.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESTINATIONS_DATA.map((dest) => (
          <div
            key={dest.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 w-full">
                <Image src={dest.heroImage} alt={dest.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                    {dest.district} District • {dest.province}
                  </span>
                  <h3 className="text-2xl font-extrabold">{dest.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dest.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Best Season</span>
                    <span>{dest.bestMonths}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Avg. Elevation</span>
                    <span>{dest.averageElevation} m</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Top Landmarks</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.map((hl) => (
                      <span key={hl} className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full">
                        📍 {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/trails?location=${encodeURIComponent(dest.name)}`}
                className="w-full py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#4B4BEE] transition-all"
              >
                <span>View {dest.trailsCount} Trails in {dest.name}</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
