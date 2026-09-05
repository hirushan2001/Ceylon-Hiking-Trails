'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trail } from '../types';

interface TrailMapProps {
  trails: Trail[];
  selectedTrailId?: string;
  onSelectTrail?: (trail: Trail) => void;
  showRouteLine?: boolean;
  activeTrailRoute?: Trail['route'];
  height?: string;
  zoomLevel?: number;
}

export const TrailMap: React.FC<TrailMapProps> = ({
  trails,
  selectedTrailId,
  onSelectTrail,
  showRouteLine = false,
  activeTrailRoute,
  height = '500px',
  zoomLevel = 8
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      const centerLat = activeTrailRoute?.coordinates?.[0]?.[0] || trails[0]?.latitude || 7.8731;
      const centerLng = activeTrailRoute?.coordinates?.[0]?.[1] || trails[0]?.longitude || 80.7718;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: zoomLevel,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Add OpenStreetMap Terrain / CartoDB Voyager tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Map difficulty to marker badge colors
    const colorMap: Record<string, string> = {
      Easy: '#10B981',
      Moderate: '#F59E0B',
      Difficult: '#F97316',
      Extreme: '#EF4444'
    };

    const bounds = L.latLngBounds([]);

    // Draw Trail Markers
    trails.forEach((trail) => {
      const color = colorMap[trail.difficulty] || '#5C5CFF';
      const isSelected = trail.id === selectedTrailId;

      const markerHtml = `
        <div style="
          background-color: ${color};
          width: ${isSelected ? '28px' : '22px'};
          height: ${isSelected ? '28px' : '22px'};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 11px;
          cursor: pointer;
          transition: transform 0.2s;
        ">
          ⛺
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [isSelected ? 28 : 22, isSelected ? 28 : 22],
        iconAnchor: [isSelected ? 14 : 11, isSelected ? 14 : 11]
      });

      const marker = L.marker([trail.latitude, trail.longitude], { icon: customIcon });

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 180px; padding: 4px;">
          <img src="${trail.heroImage}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />
          <h4 style="font-weight: 800; margin: 0 0 4px 0; font-size: 14px; color: #0F172A;">${trail.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748B;">📍 ${trail.destination} • 📏 ${trail.distanceKm} km</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="background: ${color}20; color: ${color}; font-weight: 700; font-size: 10px; padding: 2px 8px; border-radius: 12px;">${trail.difficulty}</span>
            <a href="/trails/${trail.slug}" style="font-[#5C5CFF]; font-size: 11px; font-weight: 700; text-decoration: none;">View Trail →</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectTrail) onSelectTrail(trail);
      });

      marker.addTo(layerGroup);
      bounds.extend([trail.latitude, trail.longitude]);
    });

    // Draw active GeoJSON / Coordinate polyline route if provided
    if (showRouteLine && activeTrailRoute && activeTrailRoute.coordinates.length > 0) {
      const polyline = L.polyline(activeTrailRoute.coordinates, {
        color: '#5C5CFF',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8'
      }).addTo(layerGroup);

      // Add Waypoint Markers
      activeTrailRoute.waypoints.forEach((wp) => {
        const wpIcon = L.divIcon({
          html: `<div style="background:#FFB900; width:14px; height:14px; border-radius:50%; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
          className: 'wp-marker',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        const wpMarker = L.marker([wp.latitude, wp.longitude], { icon: wpIcon });
        wpMarker.bindPopup(`<b>${wp.name}</b><br/>${wp.description}<br/>Elevation: ${wp.elevation}m`);
        wpMarker.addTo(layerGroup);
      });

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    } else if (trails.length > 0 && !selectedTrailId) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (selectedTrailId) {
      const target = trails.find((t) => t.id === selectedTrailId);
      if (target) {
        map.setView([target.latitude, target.longitude], 12);
      }
    }
  }, [trails, selectedTrailId, onSelectTrail, showRouteLine, activeTrailRoute, zoomLevel]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
      <div ref={mapContainerRef} style={{ height }} className="w-full bg-slate-100 dark:bg-slate-900" />
    </div>
  );
};
