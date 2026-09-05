'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Compass, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailCard } from '../../components/TrailCard';
import { TrailDifficulty } from '../../types';

export default function SmartTrailFinderPage() {
  const { trails } = useTrails();
  const [step, setStep] = useState(1);

  // Quiz Responses
  const [region, setRegion] = useState<string>('Anywhere');
  const [difficulty, setDifficulty] = useState<TrailDifficulty | 'Any'>('Any');
  const [time, setTime] = useState<string>('Any');
  const [scenery, setScenery] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const toggleScenery = (item: string) => {
    setScenery((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleReset = () => {
    setStep(1);
    setRegion('Anywhere');
    setDifficulty('Any');
    setTime('Any');
    setScenery([]);
    setQuizCompleted(false);
  };

  // Recommendation Scoring Engine
  const matchedTrails = React.useMemo(() => {
    if (!quizCompleted) return [];

    return trails
      .map((trail) => {
        let score = 50; // base match

        // Region match
        if (region !== 'Anywhere') {
          if (trail.destination.toLowerCase() === region.toLowerCase()) score += 25;
        } else score += 10;

        // Difficulty match
        if (difficulty !== 'Any') {
          if (trail.difficulty === difficulty) score += 25;
        } else score += 10;

        // Time match
        if (time !== 'Any') {
          if (time === 'short' && trail.distanceKm <= 5) score += 20;
          if (time === 'medium' && trail.distanceKm > 5 && trail.distanceKm <= 10) score += 20;
          if (time === 'long' && trail.distanceKm > 10) score += 20;
        }

        // Scenery features match
        scenery.forEach((sc) => {
          if (trail.features.some((f) => f.toLowerCase().includes(sc.toLowerCase()))) {
            score += 15;
          }
        });

        const matchPercent = Math.min(Math.max(score, 45), 98);
        return { trail, matchPercent };
      })
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [trails, quizCompleted, region, difficulty, time, scenery]);

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-500 font-bold text-xs">
          <Sparkles size={14} />
          <span>Interactive Match Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Find Your Perfect Sri Lankan Trail
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Answer 4 quick questions to get personalized trail recommendations across the island.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Step {step} of 4</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full transition-all ${
                    i <= step ? 'bg-[#5C5CFF]' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Region */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
                1. Where in Sri Lanka do you want to hike?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Anywhere', label: 'Anywhere in Sri Lanka', desc: 'Show me top trails island-wide' },
                  { id: 'Ella', label: 'Ella Region', desc: 'Badulla tea hills, cliffs & railway loops' },
                  { id: 'Knuckles', label: 'Knuckles Range', desc: 'Misty cloud forests & wilderness ridges' },
                  { id: 'Horton Plains', label: 'Horton Plains & Nuwara Eliya', desc: 'Highland plateaus & World’s End cliff' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRegion(item.id)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      region === item.id
                        ? 'bg-[#5C5CFF]/10 border-[#5C5CFF] ring-2 ring-[#5C5CFF]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Difficulty */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
                2. What is your preferred difficulty level?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Any', label: 'Any Difficulty', desc: 'Show all fitness levels' },
                  { id: 'Easy', label: '🟢 Easy Trek', desc: 'Gentle paths, suitable for beginners & families' },
                  { id: 'Moderate', label: '🟡 Moderate Trek', desc: 'Steady climbs through tea hills (3-4 hours)' },
                  { id: 'Difficult', label: '🟠 Difficult Trek', desc: 'Steep inclines, thousand-step climbs & high altitude' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDifficulty(item.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      difficulty === item.id
                        ? 'bg-[#5C5CFF]/10 border-[#5C5CFF] ring-2 ring-[#5C5CFF]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Time Commitment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
                3. How much time do you have available?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Any', label: 'Flexible Time', desc: 'No time limits' },
                  { id: 'short', label: 'Short Hike (1-2 hours)', desc: 'Under 5 km, quick viewpoint walk' },
                  { id: 'medium', label: 'Half-Day Trek (3-5 hours)', desc: '5-10 km, comprehensive mountain route' },
                  { id: 'long', label: 'Full Day Expedition (6+ hours)', desc: '10+ km, challenging multi-peak trek' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTime(item.id)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      time === item.id
                        ? 'bg-[#5C5CFF]/10 border-[#5C5CFF] ring-2 ring-[#5C5CFF]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Scenery Highlights */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
                4. What highlights do you want to see? (Select all that apply)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Waterfall', 'Sunrise', 'Sunset', 'Camping', 'Wildlife', 'Photography', 'Tea Plantations', 'Historical Site'].map((sc) => {
                  const active = scenery.includes(sc);
                  return (
                    <button
                      key={sc}
                      onClick={() => toggleScenery(sc)}
                      className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                        active
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span>{sc}</span>
                      {active && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                ← Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all flex items-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setQuizCompleted(true)}
                className="px-8 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl hover:bg-amber-300 transition-all flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Calculate Trail Matches</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RECOMMENDATION RESULTS */
        <div className="space-y-8 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">Your Trail Matches</h2>
              <p className="text-xs text-slate-500">Based on your region, fitness level, and scenery preferences</p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>Retake Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedTrails.map(({ trail, matchPercent }) => (
              <div key={trail.id} className="relative">
                <div className="absolute top-3 right-3 z-10 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                  🔥 {matchPercent}% Match
                </div>
                <TrailCard trail={trail} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
