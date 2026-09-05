'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Guide } from '../types';

interface BookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: Guide;
}

export const BookGuideModal: React.FC<BookGuideModalProps> = ({
  isOpen,
  onClose,
  guide
}) => {
  const [date, setDate] = useState('');
  const [hikersCount, setHikersCount] = useState(2);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
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
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Booking Request Sent!</h3>
            <p className="text-sm text-slate-500">
              {guide.name} has received your request and will contact you via WhatsApp / email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Guide Card Mini */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{guide.name}</h4>
                  <ShieldCheck size={16} className="text-[#5C5CFF]" />
                </div>
                <p className="text-xs text-slate-500">{guide.location} • ${guide.dailyRateUSD}/day</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Trek Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#5C5CFF]"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Number of Hikers
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={hikersCount}
                  onChange={(e) => setHikersCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#5C5CFF]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Target Trails / Requests
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. Ella Rock Sunrise Trek, multi-day Knuckles expedition, transport required..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-sm shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
            >
              Send Guide Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
