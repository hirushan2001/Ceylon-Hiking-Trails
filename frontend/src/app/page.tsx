'use client';

import React from 'react';
import {
  HeroSection,
  PopularTrailsSection,
  ExploreDifficultySection,
  FeaturedAdventureSection,
  HowItWorksSection,
  HomeMapSection,
  TestimonialsSection,
  TravelTipsSection,
  NewsletterSection
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 bg-[#FAF5F2] text-[#252525] font-sans">
      <HeroSection />
      <PopularTrailsSection />
      <ExploreDifficultySection />
      <FeaturedAdventureSection />
      <HowItWorksSection />
      <HomeMapSection />
      <TestimonialsSection />
      <TravelTipsSection />
      <NewsletterSection />
    </div>
  );
}
