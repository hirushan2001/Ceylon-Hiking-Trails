'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Mountain,
  Users,
  MessageSquare,
  Award,
  Check,
  Trash2,
  Edit,
  Plus,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { Trail, TrailConditionReport, Guide, Review } from '../../types';
import { DifficultyBadge } from '../../components/DifficultyBadge';
import { AdminTrailModal } from '../../components/AdminTrailModal';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'trails' | 'reports' | 'guides' | 'reviews'>('trails');
  const [trails, setTrails] = useState<Trail[]>([]);
  const [reports, setReports] = useState<TrailConditionReport[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [trailToEdit, setTrailToEdit] = useState<Trail | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [trailsRes, reportsRes, guidesRes, reviewsRes] = await Promise.all([
        fetch(`${API_BASE}/trails`).then((r) => r.json()),
        fetch(`${API_BASE}/conditions`).then((r) => r.json()),
        fetch(`${API_BASE}/guides`).then((r) => r.json()),
        fetch(`${API_BASE}/reviews`).then((r) => r.json())
      ]);

      if (trailsRes.success) setTrails(trailsRes.data);
      if (reportsRes.success) setReports(reportsRes.data);
      if (guidesRes.success) setGuides(guidesRes.data);
      if (reviewsRes.success) setReviews(reviewsRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data from backend API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteTrail = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trail from the backend database?')) return;
    try {
      const res = await fetch(`${API_BASE}/trails/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/conditions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            <ShieldAlert size={16} />
            <span>Full-Stack REST API Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Platform Admin Panel
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            title="Refresh DB Data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => {
              setTrailToEdit(null);
              setModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#5C5CFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
          >
            <Plus size={16} />
            <span>Add New Trail</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total Trails</span>
            <Mountain size={18} className="text-[#5C5CFF]" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{trails.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Condition Reports</span>
            <MessageSquare size={18} className="text-amber-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{reports.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Verified Guides</span>
            <Award size={18} className="text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{guides.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">API Status</span>
            <BarChart3 size={18} className="text-blue-500" />
          </div>
          <span className="text-2xl font-black text-emerald-500">Connected</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('trails')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'trails' ? 'bg-[#5C5CFF] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Trail Management ({trails.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reports' ? 'bg-[#5C5CFF] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Condition Reports ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reviews' ? 'bg-[#5C5CFF] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'guides' ? 'bg-[#5C5CFF] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Verified Guides ({guides.length})
        </button>
      </div>

      {/* TAB 1: Trails CRUD Table */}
      {activeTab === 'trails' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">Trail Name</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Distance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {trails.map((trail) => (
                  <tr key={trail.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <Link href={`/trails/${trail.slug}`} className="hover:text-[#5C5CFF]">
                        {trail.name}
                      </Link>
                    </td>
                    <td className="p-4">{trail.destination}, {trail.district}</td>
                    <td className="p-4">
                      <DifficultyBadge difficulty={trail.difficulty} size="sm" />
                    </td>
                    <td className="p-4 font-semibold">{trail.distanceKm} km</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                        {trail.currentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setTrailToEdit(trail);
                          setModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#5C5CFF] hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit Trail"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrail(trail.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
                        title="Delete Trail"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Condition Moderation */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{report.trailName}</span>
                <p className="text-slate-500 mt-1">&quot;{report.notes}&quot; • Reported by {report.reportedBy}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition-colors"
                >
                  Delete Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No user reviews submitted yet.</div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{rev.userName} • ⭐ {rev.rating}</span>
                  <p className="text-slate-500 mt-1">&quot;{rev.comment}&quot;</p>
                </div>
                <button
                  onClick={() => handleDeleteReview(rev.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition-colors"
                >
                  Delete Review
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: Guide Verifications */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <div key={guide.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{guide.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">Verified</span>
              </div>
              <p className="text-slate-500">{guide.location} • {guide.experienceYears} Yrs Exp • ${guide.dailyRateUSD}/day</p>
            </div>
          ))}
        </div>
      )}

      {/* Admin Trail Modal */}
      <AdminTrailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trailToEdit={trailToEdit}
        onSuccess={fetchAdminData}
      />
    </div>
  );
}
