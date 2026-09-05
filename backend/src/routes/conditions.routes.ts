import { Router, Request, Response } from 'express';
import { dbStore } from '../db/dbStore';
import { TrailConditionReport } from '../types';

const router = Router();

// GET /api/conditions
router.get('/', (req: Request, res: Response) => {
  try {
    const trailId = req.query.trailId as string;
    let reports = dbStore.getConditionReports();
    if (trailId) {
      reports = reports.filter((r) => r.trailId === trailId);
    }
    res.json({ success: true, count: reports.length, data: reports });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/conditions
router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.trailId || !body.status) {
      return res.status(400).json({ success: false, error: 'trailId and status are required' });
    }

    const trail = dbStore.getTrailById(body.trailId);

    const report: TrailConditionReport = {
      id: `cr_${Date.now()}`,
      trailId: body.trailId,
      trailName: body.trailName || trail?.name || 'Trail',
      status: body.status,
      reportedBy: body.reportedBy || 'Hiker',
      userAvatar: body.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      timestamp: 'Just now',
      weather: body.weather || 'Clear',
      notes: body.notes || 'Condition report submitted.',
      waterAvailable: body.waterAvailable !== undefined ? body.waterAvailable : true,
      upvotes: 1
    };

    const created = dbStore.createConditionReport(report);

    if (trail) {
      dbStore.updateTrail(trail.id, {
        currentStatus: body.status,
        statusLastUpdated: 'Just now'
      });
    }

    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/conditions/:id/upvote
router.post('/:id/upvote', (req: Request, res: Response) => {
  try {
    const updated = dbStore.upvoteConditionReport(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/conditions/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = dbStore.deleteConditionReport(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, message: 'Report deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
