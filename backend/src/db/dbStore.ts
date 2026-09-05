import fs from 'fs';
import path from 'path';
import { Trail, TrailConditionReport, Review, Guide } from '../types';

const INITIAL_TRAILS: Trail[] = [
  {
    id: '1',
    slug: 'ella-rock',
    name: 'Ella Rock Trek',
    shortDescription: 'Spectacular mountain cliff offering panoramic views of Ella Gap, Ravana Falls, and lush tea estates.',
    description: 'Ella Rock is one of Sri Lanka\'s iconic cliffside summits located high above the town of Ella in Badulla District.',
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Ella',
    difficulty: 'Moderate',
    distanceKm: 8.5,
    estimatedDuration: '3.5 - 4.5 hours',
    elevationGainMeters: 450,
    highestElevationMeters: 1350,
    trailType: 'Mountain',
    bestSeason: 'December to April',
    latitude: 6.8572,
    longitude: 81.0486,
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 142,
    features: ['Viewpoint', 'Sunrise', 'Tea Plantations', 'Photography'],
    safetyInformation: ['Carry at least 2 liters of water.', 'Watch out for train traffic.'],
    whatToBring: ['Sturdy hiking shoes', '2L Water bottle', 'Rain jacket'],
    currentStatus: 'Open',
    statusLastUpdated: '2 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8667, 81.0465],
        [6.8580, 81.0440],
        [6.8572, 81.0486]
      ],
      waypoints: [
        { id: 'w1', name: 'Ella Railway Station', type: 'start', latitude: 6.8667, longitude: 81.0465, elevation: 990, description: 'Starting point' },
        { id: 'w2', name: 'Ella Rock Summit Viewpoint', type: 'end', latitude: 6.8572, longitude: 81.0486, elevation: 1350, description: 'Main summit cliff' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 990 },
        { distanceKm: 8.5, elevationMeters: 1350 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '2',
    slug: 'little-adams-peak',
    name: 'Little Adam’s Peak (Punchi Sri Pada)',
    shortDescription: 'Gentle, picturesque trek through verdant tea hills ending at a dramatic ridge viewpoint.',
    description: 'Little Adam’s Peak is named after the sacred mountain Adam\'s Peak due to its matching pyramid shape.',
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Ella',
    difficulty: 'Easy',
    distanceKm: 4.2,
    estimatedDuration: '1.5 - 2 hours',
    elevationGainMeters: 180,
    highestElevationMeters: 1141,
    trailType: 'Mountain',
    bestSeason: 'Year-round',
    latitude: 6.8605,
    longitude: 81.0620,
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.9,
    reviewCount: 320,
    features: ['Sunrise', 'Sunset', 'Tea Plantations', 'Family Friendly'],
    safetyInformation: ['Stone steps can become slippery when wet.'],
    whatToBring: ['Comfortable walking shoes', '1L Water'],
    currentStatus: 'Open',
    statusLastUpdated: '1 hour ago',
    isFeatured: true,
    route: {
      coordinates: [[6.8710, 81.0545], [6.8605, 81.0620]],
      waypoints: [{ id: 'w1', name: 'Summit Ridge', type: 'end', latitude: 6.8605, longitude: 81.0620, elevation: 1141, description: 'Summit viewpoint' }],
      elevationProfile: [{ distanceKm: 0, elevationMeters: 960 }, { distanceKm: 4.2, elevationMeters: 1141 }]
    },
    nearbyPlaces: []
  },
  {
    id: '3',
    slug: 'horton-plains-worlds-end',
    name: 'Horton Plains & World’s End Loop',
    shortDescription: 'High-altitude cloud forest and grassland plateau featuring the breathtaking 880m sheer drop at World’s End.',
    description: 'Horton Plains National Park is a UNESCO World Heritage site situated on a cold, high plateau.',
    district: 'Nuwara Eliya',
    province: 'Central Province',
    destination: 'Horton Plains',
    difficulty: 'Moderate',
    distanceKm: 9.5,
    estimatedDuration: '3.0 - 4.0 hours',
    elevationGainMeters: 150,
    highestElevationMeters: 2300,
    trailType: 'Forest',
    bestSeason: 'January to March',
    latitude: 6.8028,
    longitude: 80.8091,
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.9,
    reviewCount: 280,
    features: ['Waterfall', 'Viewpoint', 'Wildlife'],
    safetyInformation: ['No-Plastic policy enforced at entrance gate.'],
    whatToBring: ['Warm jacket', 'Reusable water bottle'],
    currentStatus: 'Open',
    statusLastUpdated: '3 hours ago',
    isFeatured: true,
    route: {
      coordinates: [[6.8028, 80.8091], [6.7840, 80.7950]],
      waypoints: [{ id: 'w1', name: 'World’s End Cliff', type: 'viewpoint', latitude: 6.7840, longitude: 80.7950, elevation: 2100, description: '870m cliff drop' }],
      elevationProfile: [{ distanceKm: 0, elevationMeters: 2150 }, { distanceKm: 9.5, elevationMeters: 2150 }]
    },
    nearbyPlaces: []
  }
];

const INITIAL_REPORTS: TrailConditionReport[] = [
  {
    id: 'cr1',
    trailId: '1',
    trailName: 'Ella Rock Trek',
    status: 'Open',
    reportedBy: 'Kasun Wickramasinghe',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    timestamp: '2 hours ago',
    weather: 'Clear',
    notes: 'Trail is in great condition today! Rail track section clear.',
    waterAvailable: true,
    upvotes: 24
  }
];

const INITIAL_GUIDES: Guide[] = [
  {
    id: 'g1',
    name: 'Sanath Jayasinghe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    location: 'Ella, Badulla',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 148,
    languages: ['English', 'Sinhala', 'German'],
    specialties: ['High Altitude Treks', 'Bird Watching'],
    isVerified: true,
    hikesLed: 420,
    bio: 'Licensed Sri Lankan mountain guide born in Ella.',
    coveredTrails: ['Ella Rock Trek', 'Little Adam’s Peak'],
    dailyRateUSD: 45,
    phone: '+94 77 123 4567',
    email: 'sanath.guides@ceylonhiking.lk'
  }
];

interface DBStructure {
  trails: Trail[];
  conditionReports: TrailConditionReport[];
  reviews: Record<string, Review[]>;
  guides: Guide[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DBStructure = {
      trails: INITIAL_TRAILS,
      conditionReports: INITIAL_REPORTS,
      reviews: {},
      guides: INITIAL_GUIDES
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function readDb(): DBStructure {
  try {
    ensureDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading DB file:', error);
    return {
      trails: INITIAL_TRAILS,
      conditionReports: INITIAL_REPORTS,
      reviews: {},
      guides: INITIAL_GUIDES
    };
  }
}

function writeDb(data: DBStructure) {
  try {
    ensureDb();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing DB file:', error);
  }
}

export const dbStore = {
  getTrails: (): Trail[] => readDb().trails,
  getTrailById: (id: string): Trail | undefined => readDb().trails.find((t) => t.id === id || t.slug === id),
  createTrail: (trail: Trail): Trail => {
    const db = readDb();
    const updated = [trail, ...db.trails];
    writeDb({ ...db, trails: updated });
    return trail;
  },
  updateTrail: (id: string, update: Partial<Trail>): Trail | null => {
    const db = readDb();
    let updatedTrail: Trail | null = null;
    const updatedTrails = db.trails.map((t) => {
      if (t.id === id || t.slug === id) {
        updatedTrail = { ...t, ...update };
        return updatedTrail;
      }
      return t;
    });
    if (updatedTrail) writeDb({ ...db, trails: updatedTrails });
    return updatedTrail;
  },
  deleteTrail: (id: string): boolean => {
    const db = readDb();
    const filtered = db.trails.filter((t) => t.id !== id && t.slug !== id);
    if (filtered.length !== db.trails.length) {
      writeDb({ ...db, trails: filtered });
      return true;
    }
    return false;
  },
  getConditionReports: (): TrailConditionReport[] => readDb().conditionReports,
  createConditionReport: (report: TrailConditionReport): TrailConditionReport => {
    const db = readDb();
    const updated = [report, ...db.conditionReports];
    writeDb({ ...db, conditionReports: updated });
    return report;
  },
  upvoteConditionReport: (id: string): TrailConditionReport | null => {
    const db = readDb();
    let updatedReport: TrailConditionReport | null = null;
    const updatedList = db.conditionReports.map((r) => {
      if (r.id === id) {
        updatedReport = { ...r, upvotes: r.upvotes + 1 };
        return updatedReport;
      }
      return r;
    });
    if (updatedReport) writeDb({ ...db, conditionReports: updatedList });
    return updatedReport;
  },
  deleteConditionReport: (id: string): boolean => {
    const db = readDb();
    const filtered = db.conditionReports.filter((r) => r.id !== id);
    if (filtered.length !== db.conditionReports.length) {
      writeDb({ ...db, conditionReports: filtered });
      return true;
    }
    return false;
  },
  getReviews: (trailId?: string): Review[] => {
    const db = readDb();
    if (!trailId) return Object.values(db.reviews).flat();
    return db.reviews[trailId] || [];
  },
  createReview: (trailId: string, review: Review): Review => {
    const db = readDb();
    const existing = db.reviews[trailId] || [];
    const updated = { ...db.reviews, [trailId]: [review, ...existing] };
    writeDb({ ...db, reviews: updated });
    return review;
  },
  deleteReview: (reviewId: string): boolean => {
    const db = readDb();
    let found = false;
    const updatedReviews: Record<string, Review[]> = {};
    Object.keys(db.reviews).forEach((trailId) => {
      const filtered = db.reviews[trailId].filter((r) => r.id !== reviewId);
      if (filtered.length !== db.reviews[trailId].length) found = true;
      updatedReviews[trailId] = filtered;
    });
    if (found) writeDb({ ...db, reviews: updatedReviews });
    return found;
  },
  getGuides: (): Guide[] => readDb().guides,
  createGuide: (guide: Guide): Guide => {
    const db = readDb();
    const updated = [guide, ...db.guides];
    writeDb({ ...db, guides: updated });
    return guide;
  }
};
