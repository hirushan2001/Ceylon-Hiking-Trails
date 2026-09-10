'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Mountain,
  MessageSquare,
  Award,
  Check,
  Trash2,
  Edit,
  Plus,
  BarChart3,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Trail, TrailConditionReport, Guide, Review } from '../types';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { AdminTrailModal } from '../components/AdminTrailModal';
import { AdminNavbar } from '../components/AdminNavbar';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminHomePage() {
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
    if (!confirm('Are you sure you want to delete this trail from the backend PostgreSQL database?')) return;
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B261C]">
      {/* Top Navbar */}
      <AdminNavbar onRefresh={fetchAdminData} loading={loading} />

      {/* Main Container */}
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mb-1">
              <ShieldAlert size={16} />
              <span>Admin Management Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1B261C] font-heading">
              Administrative Control Center
            </h1>
          </div>

          <button
            onClick={() => {
              setTrailToEdit(null);
              setModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-full bg-[#2D6A4F] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#2D6A4F]/20 hover:bg-[#1B4D3E] transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Trail</span>
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#6C757D]">
              <span className="text-xs font-bold uppercase">Total Trails</span>
              <Mountain size={18} className="text-[#2D6A4F]" />
            </div>
            <span className="text-2xl font-black text-[#1B261C]">{trails.length}</span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#6C757D]">
              <span className="text-xs font-bold uppercase">Condition Reports</span>
              <MessageSquare size={18} className="text-amber-500" />
            </div>
            <span className="text-2xl font-black text-[#1B261C]">{reports.length}</span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#6C757D]">
              <span className="text-xs font-bold uppercase">Verified Guides</span>
              <Award size={18} className="text-emerald-600" />
            </div>
            <span className="text-2xl font-black text-[#1B261C]">{guides.length}</span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#6C757D]">
              <span className="text-xs font-bold uppercase">REST API Status</span>
              <BarChart3 size={18} className="text-blue-500" />
            </div>
            <span className="text-2xl font-black text-emerald-600">Connected</span>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('trails')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'trails' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-[#6C757D] hover:bg-[#E8F5E9]'
            }`}
          >
            Trail Management ({trails.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reports' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-[#6C757D] hover:bg-[#E8F5E9]'
            }`}
          >
            Condition Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-[#6C757D] hover:bg-[#E8F5E9]'
            }`}
          >
            User Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'guides' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-[#6C757D] hover:bg-[#E8F5E9]'
            }`}
          >
            Verified Guides ({guides.length})
          </button>
        </div>

        {/* TAB 1: Trails CRUD Table */}
        {activeTab === 'trails' && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E8F5E9]/60 text-[#6C757D] uppercase font-bold border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-4">Trail Name</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Distance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#1B261C]">
                  {trails.map((trail) => (
                    <tr key={trail.id} className="hover:bg-[#FAF8F5]">
                      <td className="p-4 font-bold text-[#1B261C]">
                        <a
                          href={`http://localhost:3000/trails/${trail.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2D6A4F] inline-flex items-center gap-1"
                        >
                          <span>{trail.name}</span>
                          <ExternalLink size={12} opacity={0.6} />
                        </a>
                      </td>
                      <td className="p-4">{trail.destination}, {trail.district}</td>
                      <td className="p-4">
                        <DifficultyBadge difficulty={trail.difficulty} size="sm" />
                      </td>
                      <td className="p-4 font-semibold">{trail.distanceKm} km</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                          {trail.currentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setTrailToEdit(trail);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#6C757D] hover:text-[#2D6A4F] hover:bg-[#E8F5E9] cursor-pointer"
                          title="Edit Trail"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTrail(trail.id)}
                          className="p-1.5 rounded-lg text-[#6C757D] hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
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

        {/* TAB 2: Condition Reports Moderation */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-5 rounded-3xl bg-white border border-[#E6DFD9] shadow-sm flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-[#252525] block">{report.trailName}</span>
                  <p className="text-[#777777] mt-1">&quot;{report.notes}&quot; • Reported by {report.reportedBy}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 border border-rose-200 font-bold hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                  >
                    Delete Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Reviews Queue */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="p-8 text-center text-[#777777]">No user reviews submitted yet.</div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-3xl bg-white border border-[#E6DFD9] shadow-sm flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[#252525] block">{rev.userName} • ⭐ {rev.rating}</span>
                    <p className="text-[#777777] mt-1">&quot;{rev.comment}&quot;</p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 border border-rose-200 font-bold hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                  >
                    Delete Review
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Guides Directory */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <div key={guide.id} className="p-5 rounded-3xl bg-white border border-[#E6DFD9] shadow-sm text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#252525]">{guide.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">Verified</span>
                </div>
                <p className="text-[#777777]">{guide.location} • {guide.experienceYears} Yrs Exp • ${guide.dailyRateUSD}/day</p>
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
    </div>
  );
}
