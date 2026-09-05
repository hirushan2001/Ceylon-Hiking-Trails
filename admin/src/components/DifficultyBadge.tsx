import React from 'react';
import { TrailDifficulty } from '../types';

interface DifficultyBadgeProps {
  difficulty: TrailDifficulty;
  size?: 'sm' | 'md';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, size = 'sm' }) => {
  const styles = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Moderate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Difficult: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    Extreme: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const icons = {
    Easy: '🟢',
    Moderate: '🟡',
    Difficult: '🟠',
    Extreme: '🔴'
  };

  return (
    <span className={`inline-flex items-center gap-1 border rounded-full font-semibold ${styles[difficulty]} ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
      <span>{icons[difficulty]}</span>
      <span>{difficulty}</span>
    </span>
  );
};
