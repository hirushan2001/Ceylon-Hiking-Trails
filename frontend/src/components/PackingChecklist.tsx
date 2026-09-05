'use client';

import React, { useState } from 'react';
import { Check, Backpack } from 'lucide-react';

interface PackingChecklistProps {
  items: string[];
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const total = items.length;
  const completed = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Backpack className="text-[#5C5CFF]" size={20} />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">What to Bring Checklist</h3>
        </div>
        <span className="text-xs font-bold text-[#5C5CFF] bg-[#5C5CFF]/10 px-2.5 py-1 rounded-full">
          {completed}/{total} Packed ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#5C5CFF] to-[#8080FF] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Checkbox Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((item) => {
          const isChecked = !!checkedItems[item];
          return (
            <button
              key={item}
              onClick={() => toggleItem(item)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                isChecked
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#5C5CFF]/50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                  isChecked
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 bg-transparent'
                }`}
              >
                {isChecked && <Check size={14} />}
              </div>
              <span className={`text-xs font-medium ${isChecked ? 'line-through opacity-80' : ''}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
