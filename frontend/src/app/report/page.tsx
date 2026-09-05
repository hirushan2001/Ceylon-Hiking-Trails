'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailStatus } from '../../types';

export default function ReportPage() {
  const { trails, addConditionReport, userProfile } = useTrails();

  const [selectedTrailId, setSelectedTrailId] = useState(trails[0]?.id || '1');
  const [status, setStatus] = useState<TrailStatus>('Open');
  const [weather, setWeather] = useState<'Clear' | 'Sunny' | 'Rainy' | 'Mist / Fog' | 'Windy'>('Clear');
  const [waterAvailable, setWaterAvailable] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trail = trails.find((t) => t.id === selectedTrailId);
    if (!trail) return;

    addConditionReport({
      trailId: trail.id,
      trailName: trail.name,
      status,
      reportedBy: userProfile.name,
      userAvatar: userProfile.avatar,
      weather,
      notes: notes || 'Trail update submitted.',
      waterAvailable
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Community Safety</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Submit Trail Condition Report
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Inform fellow Sri Lankan hikers about current weather, trail hazards, and water availability.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="mx-auto text-emerald-500" size={64} />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Report Live!</h2>
            <p className="text-sm text-slate-500">
              Thank you for contributing to safe hiking in Sri Lanka.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Submit Another Report
              </button>
              <Link
                href="/community"
                className="px-5 py-2.5 rounded-xl bg-[#5C5CFF] text-white text-xs font-bold shadow-md"
              >
                View Community Feed
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Select Trail
              </label>
              <select
                value={selectedTrailId}
                onChange={(e) => setSelectedTrailId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
              >
                {trails.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.destination})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Trail Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Open', 'Caution', 'Slippery', 'Flooded', 'Closed', 'Crowded'] as TrailStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                      status === st
                        ? 'bg-[#5C5CFF] text-white border-[#5C5CFF]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Weather
                </label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="Clear">Clear</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Mist / Fog">Mist / Fog</option>
                  <option value="Windy">Windy</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Drinkable Water Stream Available?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setWaterAvailable(true)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                      waterAvailable ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterAvailable(false)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                      !waterAvailable ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Hiker Advice & Observations
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any fallen trees, mud, stream levels, leeches, or park ranger notices..."
                rows={4}
                required
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#5C5CFF] text-white font-extrabold text-sm shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
            >
              Publish Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
