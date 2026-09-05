import React from 'react';
import Link from 'next/link';
import { Mountain, MapPin, Shield, Compass, Heart, Globe, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Vision Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5C5CFF] to-[#8080FF] text-white flex items-center justify-center font-bold text-xl">
                ⛺
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Ceylon Hiking Trails
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-amber-400">
                  Discover the Trails. Explore Sri Lanka.
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Sri Lanka’s premier digital platform dedicated to discovering, planning, navigating, and sharing authentic hiking trails across the island’s mountains, cloud forests, and waterfalls.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                <Globe size={14} className="text-[#5C5CFF]" />
                PostGIS & Leaflet GIS Powered
              </span>
              <span className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                <Shield size={14} className="text-emerald-400" />
                Verified Guides & Community Reports
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Compass size={16} className="text-[#5C5CFF]" />
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/trails" className="hover:text-white transition-colors">
                  All Sri Lankan Trails
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Interactive GIS Map
                </Link>
              </li>
              <li>
                <Link href="/finder" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Smart Trail Finder</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Quiz</span>
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Community & Reports
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  Verified Local Guides
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition-colors">
                  Saved Trail Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Destinations */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <MapPin size={16} className="text-amber-400" />
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/trails?location=Ella" className="hover:text-white transition-colors">
                  Ella Rock & Little Adam’s
                </Link>
              </li>
              <li>
                <Link href="/trails?location=Knuckles" className="hover:text-white transition-colors">
                  Knuckles Conservation Area
                </Link>
              </li>
              <li>
                <Link href="/trails?location=Nuwara+Eliya" className="hover:text-white transition-colors">
                  Horton Plains & World’s End
                </Link>
              </li>
              <li>
                <Link href="/trails?location=Ratnapura" className="hover:text-white transition-colors">
                  Sri Pada (Adam’s Peak)
                </Link>
              </li>
              <li>
                <Link href="/trails?location=Sinharaja" className="hover:text-white transition-colors">
                  Sinharaja Rainforest
                </Link>
              </li>
              <li>
                <Link href="/trails?location=Matale" className="hover:text-white transition-colors">
                  Riverston & Pitawala Pathana
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Responsible Hiking */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Mountain size={16} className="text-emerald-400" />
              Leave No Trace
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Protect Sri Lanka’s endemic biodiversity. Carry out all trash, stay on marked trails, refrain from single-use plastics, and respect local wildlife and sacred heritage sites.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="font-bold text-amber-400 block mb-1">Emergency Numbers:</span>
              <div className="flex justify-between text-slate-300">
                <span>Tourist Police: 1912</span>
                <span>Disaster Mgt: 117</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ceylon Hiking Trails. All rights reserved. Made for Sri Lanka outdoor adventure.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <span>Admin Portal</span>
              <ArrowUpRight size={12} />
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart size={12} className="text-rose-500 fill-rose-500" /> in Sri Lanka
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
