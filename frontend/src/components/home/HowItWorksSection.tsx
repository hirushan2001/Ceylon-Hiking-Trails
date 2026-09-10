'use client';

import React from 'react';
import { Compass, Calendar, ShieldCheck } from 'lucide-react';

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

export function HowItWorksSection() {
  return (
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
  );
}
