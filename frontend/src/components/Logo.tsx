'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <Link href="/" className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
      {/* Exact Vector Logo Mark */}
      <div className="relative flex-shrink-0 w-12 h-10 flex items-center justify-center">
        <svg viewBox="0 0 160 110" className="w-full h-full overflow-visible" fill="none">
          {/* Golden Sun Disk */}
          <circle cx="82" cy="38" r="24" fill="#F5B731" />

          {/* Left Peak Shadow & Face */}
          <path
            d="M 5,82 L 42,42 L 72,82 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 42,42 L 72,82 L 42,82 Z"
            fill="#CBD5E1"
            opacity="0.4"
          />

          {/* Right Peak Shadow & Face */}
          <path
            d="M 68,82 L 122,50 L 155,82 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 122,50 L 155,82 L 122,82 Z"
            fill="#94A3B8"
            opacity="0.4"
          />

          {/* Main Tall Center Mountain Peak */}
          <path
            d="M 28,82 L 80,24 L 132,82 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 80,24 L 132,82 L 80,82 Z"
            fill="#E2E8F0"
            opacity="0.5"
          />

          {/* Mountain Ridge Stroke Outline */}
          <path
            d="M 5,82 L 42,42 L 80,24 L 122,50 L 155,82"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Winding Trail S-Ribbon */}
          <path
            d="M 80,82 C 50,88 120,94 85,99 C 60,102 110,107 72,110"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-2xl text-white tracking-tight font-heading group-hover:text-[#F5B731] transition-colors">
            Ceylon
          </span>
          <span className="font-medium text-[11px] text-white/90 tracking-[0.22em] font-sans uppercase mt-1">
            Hiking Trails
          </span>
        </div>
      )}
    </Link>
  );
};
