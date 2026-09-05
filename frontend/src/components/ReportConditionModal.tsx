'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { TrailStatus } from '../types';
import { useTrails } from '../context/TrailsContext';

interface ReportConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailId: string;
  trailName: string;
}

export const ReportConditionModal: React.FC<ReportConditionModalProps> = ({
  isOpen,
  onClose,
  trailId,
  trailName
}) => {
  const { addConditionReport, userProfile } = useTrails();

  const [status, setStatus] = useState<TrailStatus>('Open');
  const [weather, setWeather] = useState<'Clear' | 'Sunny' | 'Rainy' | 'Mist / Fog' | 'Windy'>('Clear');
  const [waterAvailable, setWaterAvailable] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConditionReport({
      trailId,
      trailName,
      status,
      reportedBy: userProfile.name,
      userAvatar: userProfile.avatar,
      weather,
      notes: notes || 'Trail conditions reported by hiker.',
      waterAvailable
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Report Submitted!</h3>
            <p className="text-sm text-slate-500">Thank you for updating the hiking community in Sri Lanka.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#5C5CFF]/10 text-[#5C5CFF]">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Report Trail Condition</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{trailName}</p>
              </div>
            </div>

            {/* Status Option */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current Trail Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Open', 'Caution', 'Slippery', 'Flooded', 'Closed', 'Crowded'] as TrailStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
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

            {/* Weather & Water */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Weather
                </label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="Clear">Clear</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Mist / Fog">Mist / Fog</option>
                  <option value="Windy">Windy</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Water Available?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setWaterAvailable(true)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      waterAvailable
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterAvailable(false)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      !waterAvailable
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Hiker Notes / Advice
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any obstacles, leech density, slippery steps, or stream levels..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-sm shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
            >
              Submit Condition Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
