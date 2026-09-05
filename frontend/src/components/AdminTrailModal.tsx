'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Mountain, Plus, MapPin } from 'lucide-react';
import { Trail, TrailDifficulty, TrailType } from '../types';

interface AdminTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailToEdit?: Trail | null;
  onSuccess: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AdminTrailModal: React.FC<AdminTrailModalProps> = ({
  isOpen,
  onClose,
  trailToEdit,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Badulla');
  const [destination, setDestination] = useState('Ella');
  const [difficulty, setDifficulty] = useState<TrailDifficulty>('Moderate');
  const [trailType, setTrailType] = useState<TrailType>('Mountain');
  const [distanceKm, setDistanceKm] = useState(6.0);
  const [estimatedDuration, setEstimatedDuration] = useState('3 - 4 hours');
  const [elevationGainMeters, setElevationGainMeters] = useState(400);
  const [highestElevationMeters, setHighestElevationMeters] = useState(1200);
  const [heroImage, setHeroImage] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(7.0);
  const [longitude, setLongitude] = useState(80.5);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (trailToEdit) {
      setName(trailToEdit.name);
      setDistrict(trailToEdit.district);
      setDestination(trailToEdit.destination);
      setDifficulty(trailToEdit.difficulty);
      setTrailType(trailToEdit.trailType);
      setDistanceKm(trailToEdit.distanceKm);
      setEstimatedDuration(trailToEdit.estimatedDuration);
      setElevationGainMeters(trailToEdit.elevationGainMeters);
      setHighestElevationMeters(trailToEdit.highestElevationMeters);
      setHeroImage(trailToEdit.heroImage);
      setShortDescription(trailToEdit.shortDescription);
      setDescription(trailToEdit.description);
      setLatitude(trailToEdit.latitude);
      setLongitude(trailToEdit.longitude);
    } else {
      setName('');
      setHeroImage('https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80');
      setShortDescription('');
      setDescription('');
    }
  }, [trailToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);

    const payload = {
      name,
      district,
      destination,
      difficulty,
      trailType,
      distanceKm,
      estimatedDuration,
      elevationGainMeters,
      highestElevationMeters,
      heroImage: heroImage || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      shortDescription,
      description: description || shortDescription,
      latitude,
      longitude,
      features: ['Viewpoint', 'Photography'],
      safetyInformation: ['Carry water and wear suitable boots.'],
      whatToBring: ['2L Water', 'Hiking shoes', 'Rain jacket']
    };

    try {
      const url = trailToEdit ? `${API_BASE}/trails/${trailToEdit.id}` : `${API_BASE}/trails`;
      const method = trailToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
          onSuccess();
          onClose();
        }, 1200);
      } else {
        alert(data.error || 'Failed to save trail');
      }
    } catch (err: any) {
      alert('Error connecting to backend API: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full"
        >
          <X size={20} />
        </button>

        {successMsg ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
            <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white">
              {trailToEdit ? 'Trail Updated!' : 'New Trail Created!'}
            </h3>
            <p className="text-sm text-slate-500">Saved directly to backend REST API & persistent database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-[#5C5CFF]/10 text-[#5C5CFF]">
                <Mountain size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  {trailToEdit ? `Edit ${trailToEdit.name}` : 'Add New Sri Lankan Trail'}
                </h3>
                <p className="text-xs text-slate-500">Backend API CRUD Trail Creator</p>
              </div>
            </div>

            {/* Name & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Trail Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Ella Rock Summit Trek"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#5C5CFF]"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Destination / Region
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="E.g. Ella, Knuckles, Nuwara Eliya"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-[#5C5CFF]"
                />
              </div>
            </div>

            {/* District & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  District
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="E.g. Badulla, Matale"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as TrailDifficulty)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                  <option value="Extreme">Extreme</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                  Trail Type
                </label>
                <select
                  value={trailType}
                  onChange={(e) => setTrailType(e.target.value as TrailType)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="Mountain">Mountain</option>
                  <option value="Forest">Forest</option>
                  <option value="Waterfall">Waterfall</option>
                  <option value="Viewpoint">Viewpoint</option>
                  <option value="Tea Plantations">Tea Plantations</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
            </div>

            {/* Distance, Duration, Elevation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Distance (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Duration</label>
                <input
                  type="text"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Elevation Gain (m)</label>
                <input
                  type="number"
                  value={elevationGainMeters}
                  onChange={(e) => setElevationGainMeters(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Highest Peak (m)</label>
                <input
                  type="number"
                  value={highestElevationMeters}
                  onChange={(e) => setHighestElevationMeters(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
            </div>

            {/* Coordinates & Hero Image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                Short Description
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary of the trail highlights..."
                rows={2}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-[#5C5CFF]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#5C5CFF] text-white font-extrabold text-sm shadow-lg shadow-[#5C5CFF]/30 hover:bg-[#4B4BEE] transition-all"
            >
              {submitting ? 'Saving to Database...' : trailToEdit ? 'Update Trail in DB' : 'Save New Trail to DB'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
