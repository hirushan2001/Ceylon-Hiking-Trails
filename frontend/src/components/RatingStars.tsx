import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  showValue?: boolean;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  showValue = true,
  size = 16
}) => {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <div className="flex items-center text-amber-400">
        <Star className="fill-amber-400 stroke-amber-400" size={size} />
      </div>
      {showValue && <span className="font-bold text-slate-800 dark:text-slate-100">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-slate-500 dark:text-slate-400 text-xs">({reviewCount})</span>
      )}
    </div>
  );
};
