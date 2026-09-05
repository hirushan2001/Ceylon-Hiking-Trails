import React from 'react';
import { TrailStatus } from '../types';
import { ShieldCheck, AlertTriangle, CloudRain, Ban, Users } from 'lucide-react';

interface TrailConditionBadgeProps {
  status: TrailStatus;
  updatedAt?: string;
  compact?: boolean;
}

export const TrailConditionBadge: React.FC<TrailConditionBadgeProps> = ({
  status,
  updatedAt,
  compact = false
}) => {
  const statusMap = {
    Open: {
      label: 'Trail Open',
      bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400',
      icon: ShieldCheck,
      dot: 'bg-emerald-500'
    },
    Caution: {
      label: 'Exercise Caution',
      bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400',
      icon: AlertTriangle,
      dot: 'bg-amber-500'
    },
    Slippery: {
      label: 'Slippery Slope',
      bg: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400',
      icon: AlertTriangle,
      dot: 'bg-orange-500'
    },
    Flooded: {
      label: 'Waterlogged / Flooded',
      bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400',
      icon: CloudRain,
      dot: 'bg-blue-500'
    },
    Closed: {
      label: 'Temporarily Closed',
      bg: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400',
      icon: Ban,
      dot: 'bg-rose-500'
    },
    Crowded: {
      label: 'High Traffic / Crowded',
      bg: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400',
      icon: Users,
      dot: 'bg-purple-500'
    }
  };

  const config = statusMap[status] || statusMap['Open'];
  const Icon = config.icon;

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <span>{config.label}</span>
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${config.bg}`}>
      <div className="p-2 rounded-lg bg-white/40 dark:bg-black/20">
        <Icon size={20} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse`} />
          <span className="font-bold text-sm">{config.label}</span>
        </div>
        {updatedAt && <p className="text-xs opacity-80 mt-0.5">Updated {updatedAt}</p>}
      </div>
    </div>
  );
};
