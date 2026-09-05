import fs from 'fs';
import path from 'path';
import { Trail, TrailConditionReport, Review, Guide } from '../types';
import { TRAILS_DATA } from '../data/trailsData';
import { INITIAL_CONDITION_REPORTS } from '../data/communityData';
import { GUIDES_DATA } from '../data/guidesData';

interface DBStructure {
  trails: Trail[];
  conditionReports: TrailConditionReport[];
  reviews: Record<string, Review[]>;
  guides: Guide[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure directory exists
function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DBStructure = {
      trails: TRAILS_DATA,
      conditionReports: INITIAL_CONDITION_REPORTS,
      reviews: {},
      guides: GUIDES_DATA
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
      trails: TRAILS_DATA,
      conditionReports: INITIAL_CONDITION_REPORTS,
      reviews: {},
      guides: GUIDES_DATA
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
  getTrails: (): Trail[] => {
    return readDb().trails;
  },

  getTrailById: (id: string): Trail | undefined => {
    return readDb().trails.find((t) => t.id === id || t.slug === id);
  },

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

    if (updatedTrail) {
      writeDb({ ...db, trails: updatedTrails });
    }
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

  getConditionReports: (): TrailConditionReport[] => {
    return readDb().conditionReports;
  },

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

    if (updatedReport) {
      writeDb({ ...db, conditionReports: updatedList });
    }
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
    if (!trailId) {
      return Object.values(db.reviews).flat();
    }
    return db.reviews[trailId] || [];
  },

  createReview: (trailId: string, review: Review): Review => {
    const db = readDb();
    const existing = db.reviews[trailId] || [];
    const updated = {
      ...db.reviews,
      [trailId]: [review, ...existing]
    };
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

    if (found) {
      writeDb({ ...db, reviews: updatedReviews });
    }
    return found;
  },

  getGuides: (): Guide[] => {
    return readDb().guides;
  },

  createGuide: (guide: Guide): Guide => {
    const db = readDb();
    const updated = [guide, ...db.guides];
    writeDb({ ...db, guides: updated });
    return guide;
  }
};
