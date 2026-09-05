'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mountain, Navigation, Award, Heart, CheckCircle2, MapPin } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailCard } from '../../components/TrailCard';

export default function UserProfilePage() {
  const { userProfile, trails, savedTrailIds } = useTrails();

  const savedTrails = trails.filter((t) => savedTrailIds.includes(t.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#5C5CFF] shadow-lg flex-shrink-0">
          <Image src={userProfile.avatar} alt={userProfile.name} fill className="object-cover" />
        </div>

        <div className="flex-grow text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {userProfile.name}
              </h1>
              <span className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <MapPin size={13} className="text-amber-500" />
                {userProfile.location}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#5C5CFF]/10 text-[#5C5CFF]">
              Active Hiker
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            {userProfile.bio}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 pt-3 max-w-md">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center">
              <span className="text-xs text-slate-400 font-bold block">Trails Done</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{userProfile.trailsCompleted}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center">
              <span className="text-xs text-slate-400 font-bold block">Total Distance</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{userProfile.totalDistanceKm} km</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center">
              <span className="text-xs text-slate-400 font-bold block">Elevation Climbed</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{userProfile.totalElevationM} m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="text-amber-400" size={22} />
          <span>Hiking Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {userProfile.achievements.map((ach) => (
            <div key={ach.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
              <span className="text-3xl">{ach.icon}</span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ach.title}</h4>
                <p className="text-xs text-slate-500">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Trails Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" size={22} />
            <span>My Saved Trails ({savedTrails.length})</span>
          </h2>
          <Link href="/saved" className="text-xs font-bold text-[#5C5CFF] hover:underline">
            Manage Collections →
          </Link>
        </div>

        {savedTrails.length === 0 ? (
          <div className="py-10 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm">No saved trails yet. Browse the directory to bookmark your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
