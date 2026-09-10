'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function NewsletterSection() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="bg-[#1B261C] text-white rounded-[2.5rem] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Ready for your next adventure?
          </h2>
          <p className="text-xs sm:text-sm text-white/70">
            Find your trail, meet your guide and start exploring Sri Lanka.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
          {subscribed ? (
            <div className="w-full py-3 px-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              <span>You’re subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <>
              <input
                suppressHydrationWarning
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-6 py-3 rounded-full bg-white/10 text-white placeholder-white/50 text-xs border border-white/20 focus:outline-none focus:border-[#2D6A4F]"
              />
              <button
                suppressHydrationWarning
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-extrabold text-xs shadow-md shadow-[#2D6A4F]/30 flex-shrink-0 transition-transform hover:scale-105"
              >
                Get Started
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
