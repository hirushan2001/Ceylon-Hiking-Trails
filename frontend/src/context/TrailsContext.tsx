'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trail, TrailConditionReport, Review, UserProfile, HikingGroupEvent } from '../types';
import { TRAILS_DATA } from '../data/trailsData';
import { INITIAL_CONDITION_REPORTS, UPCOMING_GROUP_EVENTS } from '../data/communityData';

interface TrailsContextType {
  trails: Trail[];
  savedTrailIds: string[];
  toggleSaveTrail: (trailId: string) => void;
  isSaved: (trailId: string) => boolean;
  
  conditionReports: TrailConditionReport[];
  addConditionReport: (report: Omit<TrailConditionReport, 'id' | 'timestamp' | 'upvotes'>) => void;
  upvoteReport: (reportId: string) => void;
  
  userReviews: Record<string, Review[]>;
  addReview: (trailId: string, review: Omit<Review, 'id' | 'date' | 'likes'>) => void;
  
  groupEvents: HikingGroupEvent[];
  joinGroupEvent: (eventId: string) => void;
  
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultProfile: UserProfile = {
  id: 'user_1',
  name: 'Nipuna Senanayake',
  email: 'nipuna.hiker@ceylonhiking.lk',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  location: 'Colombo, Sri Lanka',
  bio: 'Avid mountain trekker, tea estate explorer, and nature photographer passionate about conserving Sri Lankan wilderness.',
  trailsCompleted: 14,
  totalDistanceKm: 128.5,
  totalElevationM: 8450,
  savedTrailIds: ['1', '3', '5'],
  achievements: [
    { id: 'a1', title: 'Knuckles Conqueror', description: 'Completed a trek in the Knuckles Range', icon: '🏔️', unlockedAt: '2026-04-12' },
    { id: 'a2', title: 'Sacred Summit', description: 'Reached Sri Pada for Sunrise', icon: '🌅', unlockedAt: '2026-01-08' },
    { id: 'a3', title: 'Pekoe Trail Pioneer', description: 'Walked Stage 1 of the Pekoe Trail', icon: '🍃', unlockedAt: '2026-06-20' }
  ]
};

const TrailsContext = createContext<TrailsContextType | undefined>(undefined);

export const TrailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trails] = useState<Trail[]>(TRAILS_DATA);
  const [savedTrailIds, setSavedTrailIds] = useState<string[]>(['1', '3', '5']);
  const [conditionReports, setConditionReports] = useState<TrailConditionReport[]>(INITIAL_CONDITION_REPORTS);
  const [userReviews, setUserReviews] = useState<Record<string, Review[]>>({});
  const [groupEvents, setGroupEvents] = useState<HikingGroupEvent[]>(UPCOMING_GROUP_EVENTS);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('ceylon_saved_trails');
    if (saved) {
      try {
        setSavedTrailIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleSaveTrail = (trailId: string) => {
    setSavedTrailIds((prev) => {
      const exists = prev.includes(trailId);
      const updated = exists ? prev.filter((id) => id !== trailId) : [...prev, trailId];
      localStorage.setItem('ceylon_saved_trails', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (trailId: string) => savedTrailIds.includes(trailId);

  const addConditionReport = (reportData: Omit<TrailConditionReport, 'id' | 'timestamp' | 'upvotes'>) => {
    const newReport: TrailConditionReport = {
      ...reportData,
      id: `cr_${Date.now()}`,
      timestamp: 'Just now',
      upvotes: 1
    };
    setConditionReports((prev) => [newReport, ...prev]);
  };

  const upvoteReport = (reportId: string) => {
    setConditionReports((prev) =>
      prev.map((rep) => (rep.id === reportId ? { ...rep, upvotes: rep.upvotes + 1 } : rep))
    );
  };

  const addReview = (trailId: string, reviewData: Omit<Review, 'id' | 'date' | 'likes'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: 'Today',
      likes: 0
    };
    setUserReviews((prev) => ({
      ...prev,
      [trailId]: [newReview, ...(prev[trailId] || [])]
    }));
  };

  const joinGroupEvent = (eventId: string) => {
    setGroupEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId && !event.joinedUserIds.includes(userProfile.id)) {
          return {
            ...event,
            currentParticipants: event.currentParticipants + 1,
            joinedUserIds: [...event.joinedUserIds, userProfile.id]
          };
        }
        return event;
      })
    );
  };

  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profileUpdate }));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <TrailsContext.Provider
      value={{
        trails,
        savedTrailIds,
        toggleSaveTrail,
        isSaved,
        conditionReports,
        addConditionReport,
        upvoteReport,
        userReviews,
        addReview,
        groupEvents,
        joinGroupEvent,
        userProfile,
        updateUserProfile,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </TrailsContext.Provider>
  );
};

export const useTrails = () => {
  const context = useContext(TrailsContext);
  if (!context) {
    throw new Error('useTrails must be used within a TrailsProvider');
  }
  return context;
};
