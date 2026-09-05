import React from 'react';
import { Waypoint } from '../types';
import { MapPin, Mountain, Flag, AlertTriangle, Droplets } from 'lucide-react';

interface TrailTimelineProps {
  waypoints: Waypoint[];
}

export const TrailTimeline: React.FC<TrailTimelineProps> = ({ waypoints }) => {
  const getIcon = (type: Waypoint['type']) => {
    switch (type) {
      case 'start':
        return <MapPin className="text-emerald-500" size={16} />;
      case 'end':
        return <Flag className="text-[#5C5CFF]" size={16} />;
      case 'waterfall':
        return <Droplets className="text-blue-500" size={16} />;
      case 'danger':
        return <AlertTriangle className="text-rose-500" size={16} />;
      default:
        return <Mountain className="text-amber-500" size={16} />;
    }
  };

  return (
    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-6 py-2">
      {waypoints.map((wp, idx) => (
        <div key={wp.id} className="relative pl-6 group">
          {/* Node Bullet */}
          <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:border-[#5C5CFF] transition-colors">
            {getIcon(wp.type)}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {idx + 1}. {wp.name}
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {wp.elevation} m
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {wp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
