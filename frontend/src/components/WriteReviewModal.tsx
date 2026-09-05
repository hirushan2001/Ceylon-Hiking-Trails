'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { useTrails } from '../context/TrailsContext';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailId: string;
  trailName: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  trailId,
  trailName
}) => {
  const { addReview, userProfile } = useTrails();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(trailId, {
      trailId,
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      rating,
      comment,
      hikeDate: 'Recent',
      conditionRating: 'Good'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Review Posted!</h3>
            <p className="text-sm text-slate-500">Your review helps fellow adventurers plan safely.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Review {trailName}</h3>

            {/* Star selector */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Tap stars to rate</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      size={28}
                      className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Your Experience & Advice
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share trail conditions, highlights, scenic spots, or tips..."
                rows={4}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#5C5CFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-sm shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
            >
              Post Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
