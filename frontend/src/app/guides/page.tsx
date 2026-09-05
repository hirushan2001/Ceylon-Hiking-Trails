'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, MapPin, Phone, Mail, Star, Calendar } from 'lucide-react';
import { GUIDES_DATA } from '../../data/guidesData';
import { Guide } from '../../types';
import { BookGuideModal } from '../../components/BookGuideModal';

export default function GuidesDirectoryPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
          <ShieldCheck size={14} />
          <span>Licensed Local Experts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Verified Local Hiking Guides
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Connect directly with certified Sri Lankan mountain guides trained in wilderness first aid, navigation, and local ecology.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GUIDES_DATA.map((guide) => (
          <div
            key={guide.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Hero Backdrop & Avatar */}
              <div className="relative h-44 w-full bg-slate-200">
                <Image src={guide.heroImage} alt={guide.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute -bottom-6 left-6 flex items-end gap-3">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-lg">
                    <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-6 pt-8 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{guide.name}</h3>
                      <ShieldCheck size={18} className="text-[#5C5CFF]" />
                    </div>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <Star size={14} className="fill-amber-400" />
                      {guide.rating} ({guide.reviewCount})
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={13} className="text-rose-500" />
                    {guide.location} • {guide.experienceYears} Years Experience
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {guide.bio}
                </p>

                {/* Specialties & Languages */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Specialties</span>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((spec) => (
                        <span key={spec} className="text-[10px] font-semibold bg-[#5C5CFF]/10 text-[#5C5CFF] px-2.5 py-0.5 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Languages Spoken</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      🗣️ {guide.languages.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Rate</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">${guide.dailyRateUSD} <span className="text-xs font-normal text-slate-500">/ day</span></span>
              </div>

              <button
                onClick={() => setSelectedGuide(guide)}
                className="px-5 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
              >
                Inquire & Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedGuide && (
        <BookGuideModal
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
          guide={selectedGuide}
        />
      )}
    </div>
  );
}
