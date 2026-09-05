import React from 'react';
import { TrailDifficulty } from '../types';

interface DifficultyBadgeProps {
  difficulty: TrailDifficulty;
  size?: 'sm' | 'md' | 'lg';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, size = 'md' }) => {
  const styles = {
    Easy: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400',
    Moderate: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400',
    Difficult: 'bg-orange-500/10 text-orange-600 border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-400',
    Extreme: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400'
  };

  const icons = {
    Easy: '🟢',
    Moderate: '🟡',
    Difficult: '🟠',
    Extreme: '🔴'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold'
  };

  return (
    <span className={`inline-flex items-center border rounded-full backdrop-blur-sm ${styles[difficulty]} ${sizeClasses[size]}`}>
      <span>{icons[difficulty]}</span>
      <span>{difficulty}</span>
    </span>
  );
};
