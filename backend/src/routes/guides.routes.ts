import { Router, Request, Response } from 'express';
import { dbStore } from '../db/dbStore';
import { Guide } from '../types';

const router = Router();

// GET /api/guides
router.get('/', (req: Request, res: Response) => {
  try {
    const guides = dbStore.getGuides();
    res.json({ success: true, count: guides.length, data: guides });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/guides
router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.name || !body.location) {
      return res.status(400).json({ success: false, error: 'name and location are required' });
    }

    const guide: Guide = {
      id: `g_${Date.now()}`,
      name: body.name,
      avatar: body.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      heroImage: body.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      location: body.location,
      experienceYears: Number(body.experienceYears) || 5,
      rating: 5.0,
      reviewCount: 0,
      languages: body.languages || ['English', 'Sinhala'],
      specialties: body.specialties || ['Mountain Trekking'],
      isVerified: true,
      hikesLed: 1,
      bio: body.bio || 'Licensed Sri Lankan hiking guide.',
      coveredTrails: body.coveredTrails || ['Ella Rock Trek'],
      dailyRateUSD: Number(body.dailyRateUSD) || 40,
      phone: body.phone || '+94 77 000 0000',
      email: body.email || 'guide@ceylonhiking.lk'
    };

    const created = dbStore.createGuide(guide);
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
