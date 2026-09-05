import { Router, Request, Response } from 'express';
import { dbStore } from '../db/dbStore';

const router = Router();

// GET /api/admin/stats
router.get('/stats', (req: Request, res: Response) => {
  try {
    const trails = dbStore.getTrails();
    const reports = dbStore.getConditionReports();
    const reviews = dbStore.getReviews();
    const guides = dbStore.getGuides();

    res.json({
      success: true,
      data: {
        totalTrails: trails.length,
        totalConditionReports: reports.length,
        totalReviews: reviews.length,
        totalGuides: guides.length,
        activeHikers: 1420,
        systemStatus: 'Healthy - Standalone Express Server'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
