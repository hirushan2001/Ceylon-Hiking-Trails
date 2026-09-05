'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ExternalLink, RefreshCw, Bell } from 'lucide-react';

interface AdminNavbarProps {
  onRefresh?: () => void;
  loading?: boolean;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onRefresh, loading }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5C5CFF] to-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-lg shadow-[#5C5CFF]/20">
            🛡️
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
              Ceylon Trails Admin
            </span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-amber-400 block">
              Standalone Portal (Port 3001)
            </span>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Refresh REST API Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          )}

          {/* Direct link to public Hiker App */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-bold transition-colors"
          >
            <span>Open Public App</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </header>
  );
};
