'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ShieldAlert, ThumbsUp, Calendar, MapPin, Plus, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useTrails } from '../../context/TrailsContext';
import { TrailConditionBadge } from '../../components/TrailConditionBadge';
import { ReportConditionModal } from '../../components/ReportConditionModal';

export default function CommunityPage() {
  const { conditionReports, upvoteReport, groupEvents, joinGroupEvent, userProfile, trails } = useTrails();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'events'>('reports');

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C5CFF] uppercase tracking-wider mb-1">
            <Users size={16} />
            <span>Sri Lanka Hiker Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Community & Live Trail Reports
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Stay updated with real-time condition reports, group meetups, and trail advice.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Report Trail Condition</span>
        </button>
      </div>

      {/* Tab Controls */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reports'
              ? 'bg-[#5C5CFF] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Live Condition Reports ({conditionReports.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-[#5C5CFF] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Upcoming Group Treks ({groupEvents.length})
        </button>
      </div>

      {/* TAB 1: Condition Reports */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conditionReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={report.userAvatar} alt={report.reportedBy} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">{report.reportedBy}</span>
                    <span className="text-[10px] text-slate-400">{report.timestamp}</span>
                  </div>
                </div>
                <TrailConditionBadge status={report.status} compact />
              </div>

              {/* Trail Name & Notes */}
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                  {report.trailName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  &quot;{report.notes}&quot;
                </p>
              </div>

              {/* Report Metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span>Weather: <strong className="text-slate-800 dark:text-slate-200">{report.weather}</strong></span>
                  <span>Water: <strong className="text-slate-800 dark:text-slate-200">{report.waterAvailable ? 'Yes' : 'No'}</strong></span>
                </div>

                <button
                  onClick={() => upvoteReport(report.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-500 font-bold text-xs transition-colors"
                >
                  <ThumbsUp size={14} />
                  <span>Helpful ({report.upvotes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Group Events */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupEvents.map((event) => {
            const hasJoined = event.joinedUserIds.includes(userProfile.id);

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                        {event.date} • {event.time}
                      </span>
                      <h3 className="text-xl font-extrabold">{event.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <MapPin size={14} className="text-amber-500" />
                      <span>{event.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span>Organizer: <strong className="text-slate-900 dark:text-white">{event.organizerName}</strong></span>
                      <span className="font-bold text-[#5C5CFF]">
                        {event.currentParticipants}/{event.maxParticipants} Hikers
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => joinGroupEvent(event.id)}
                    disabled={hasJoined || event.currentParticipants >= event.maxParticipants}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      hasJoined
                        ? 'bg-emerald-500/20 text-emerald-500 cursor-default'
                        : 'bg-[#5C5CFF] text-white hover:bg-[#4B4BEE] shadow-md'
                    }`}
                  >
                    {hasJoined ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>You are Registered!</span>
                      </>
                    ) : (
                      <span>Join Hiking Group Trek</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Report Modal */}
      <ReportConditionModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        trailId={trails[0]?.id || '1'}
        trailName={trails[0]?.name || 'Ella Rock'}
      />
    </div>
  );
}
