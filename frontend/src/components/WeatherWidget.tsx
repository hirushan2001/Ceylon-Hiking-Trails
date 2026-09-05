import React from 'react';
import { Sun, CloudRain, Wind, Thermometer, ShieldAlert } from 'lucide-react';

interface WeatherWidgetProps {
  destination: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ destination }) => {
  // Destination specific mock weather forecast
  const weatherMap: Record<string, { temp: number; status: string; rainProb: number; windSpeed: number; advisory?: string }> = {
    Ella: { temp: 23, status: 'Partly Cloudy', rainProb: 20, windSpeed: 14, advisory: 'Optimal morning hiking weather' },
    Knuckles: { temp: 18, status: 'Misty & Breezy', rainProb: 45, windSpeed: 24, advisory: 'High mountain wind speeds above 1,200m' },
    'Horton Plains': { temp: 14, status: 'Cool & Clear', rainProb: 15, windSpeed: 18, advisory: 'Cold early mornings (10°C); dress warm' },
    Matale: { temp: 24, status: 'Sunny', rainProb: 10, windSpeed: 12 },
    Ratnapura: { temp: 26, status: 'Humid & Passing Rain', rainProb: 60, windSpeed: 10, advisory: 'Afternoon rain showers probable' },
    Kandy: { temp: 25, status: 'Pleasant Sunshine', rainProb: 15, windSpeed: 9 }
  };

  const weather = weatherMap[destination] || { temp: 22, status: 'Clear Skies', rainProb: 20, windSpeed: 12 };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg border border-slate-700/60">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Weather Outlook</span>
          <h4 className="font-extrabold text-lg">{destination} Region</h4>
        </div>
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md">
          {weather.rainProb > 40 ? <CloudRain className="text-blue-400" size={24} /> : <Sun className="text-amber-400" size={24} />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 py-3 px-4 rounded-xl bg-black/30 border border-white/10 text-center text-xs mb-3">
        <div>
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Thermometer size={14} />
            <span>Temp</span>
          </div>
          <span className="font-bold text-base">{weather.temp}°C</span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <CloudRain size={14} />
            <span>Rain</span>
          </div>
          <span className="font-bold text-base">{weather.rainProb}%</span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Wind size={14} />
            <span>Wind</span>
          </div>
          <span className="font-bold text-base">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {weather.advisory && (
        <div className="flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
          <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
          <span>{weather.advisory}</span>
        </div>
      )}
    </div>
  );
};
