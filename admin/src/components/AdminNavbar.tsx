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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E2E8F0] py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-[#2D6A4F]/20">
            ▲
          </div>
          <div>
            <span className="font-extrabold text-lg text-[#1B261C] tracking-tight flex items-center gap-1.5 font-heading">
              WeHike Admin
            </span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#2D6A4F] block">
              Management Portal
            </span>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#6C757D] hover:text-[#1B261C] hover:bg-[#FAF8F5] transition-colors shadow-sm cursor-pointer"
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] text-xs font-bold transition-colors shadow-sm"
          >
            <span>Open Hiker App</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </header>
  );
};
