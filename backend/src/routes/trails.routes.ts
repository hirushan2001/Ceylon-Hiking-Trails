import { Router, Request, Response } from 'express';
import { dbStore } from '../db/dbStore';
import { Trail } from '../types';

const router = Router();

// GET /api/trails
router.get('/', (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string)?.toLowerCase() || '';
    const destination = (req.query.destination as string)?.toLowerCase() || '';
    const difficulty = (req.query.difficulty as string) || '';
    const trailType = (req.query.trailType as string) || '';
    const maxDistance = Number(req.query.maxDistance) || 100;

    let trails = dbStore.getTrails();

    if (search) {
      trails = trails.filter(
        (t) =>
          t.name.toLowerCase().includes(search) ||
          t.destination.toLowerCase().includes(search) ||
          t.district.toLowerCase().includes(search)
      );
    }

    if (destination && destination !== 'all' && destination !== 'all destinations') {
      trails = trails.filter((t) => t.destination.toLowerCase() === destination);
    }

    if (difficulty && difficulty !== 'All') {
      trails = trails.filter((t) => t.difficulty === difficulty);
    }

    if (trailType && trailType !== 'All') {
      trails = trails.filter((t) => t.trailType === trailType);
    }

    if (maxDistance < 100) {
      trails = trails.filter((t) => t.distanceKm <= maxDistance);
    }

    res.json({ success: true, count: trails.length, data: trails });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/trails/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const trail = dbStore.getTrailById(req.params.id);
    if (!trail) {
      return res.status(404).json({ success: false, error: 'Trail not found' });
    }
    res.json({ success: true, data: trail });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/trails
router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.name || !body.destination || !body.district) {
      return res.status(400).json({ success: false, error: 'Name, destination, and district are required.' });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newTrail: Trail = {
      id: `trail_${Date.now()}`,
      slug,
      name: body.name,
      shortDescription: body.shortDescription || 'Sri Lankan trail',
      description: body.description || body.shortDescription || 'Sri Lankan trail details',
      district: body.district,
      province: body.province || 'Central Province',
      destination: body.destination,
      difficulty: body.difficulty || 'Moderate',
      distanceKm: Number(body.distanceKm) || 5.0,
      estimatedDuration: body.estimatedDuration || '2 - 3 hours',
      elevationGainMeters: Number(body.elevationGainMeters) || 300,
      highestElevationMeters: Number(body.highestElevationMeters) || 1200,
      trailType: body.trailType || 'Mountain',
      bestSeason: body.bestSeason || 'December to April',
      latitude: Number(body.latitude) || 7.0,
      longitude: Number(body.longitude) || 80.5,
      heroImage: body.heroImage || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      gallery: body.gallery || ['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'],
      rating: 5.0,
      reviewCount: 0,
      features: body.features || ['Viewpoint'],
      safetyInformation: body.safetyInformation || ['Carry sufficient drinking water.'],
      whatToBring: body.whatToBring || ['Hiking shoes', '1L Water'],
      currentStatus: body.currentStatus || 'Open',
      statusLastUpdated: 'Just now',
      isFeatured: body.isFeatured || false,
      route: body.route || {
        coordinates: [
          [Number(body.latitude) || 7.0, Number(body.longitude) || 80.5],
          [(Number(body.latitude) || 7.0) + 0.005, (Number(body.longitude) || 80.5) + 0.005]
        ],
        waypoints: [
          {
            id: 'wp1',
            name: 'Trailhead Start',
            type: 'start',
            latitude: Number(body.latitude) || 7.0,
            longitude: Number(body.longitude) || 80.5,
            elevation: Number(body.elevationGainMeters) || 300,
            description: 'Starting trailhead entrance'
          }
        ],
        elevationProfile: [
          { distanceKm: 0, elevationMeters: 300 },
          { distanceKm: Number(body.distanceKm) || 5.0, elevationMeters: Number(body.highestElevationMeters) || 1200 }
        ]
      },
      nearbyPlaces: []
    };

    const created = dbStore.createTrail(newTrail);
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/trails/:id
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updated = dbStore.updateTrail(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Trail not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/trails/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = dbStore.deleteTrail(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Trail not found' });
    }
    res.json({ success: true, message: 'Trail deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
