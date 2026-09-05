import { Router, Request, Response } from 'express';
import { dbStore } from '../db/dbStore';
import { Review } from '../types';

const router = Router();

// GET /api/reviews
router.get('/', (req: Request, res: Response) => {
  try {
    const trailId = req.query.trailId as string;
    const reviews = dbStore.getReviews(trailId || undefined);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/reviews
router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.trailId || !body.comment) {
      return res.status(400).json({ success: false, error: 'trailId and comment are required' });
    }

    const review: Review = {
      id: `rev_${Date.now()}`,
      trailId: body.trailId,
      userName: body.userName || 'Hiker',
      userAvatar: body.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: Number(body.rating) || 5,
      comment: body.comment,
      likes: 0,
      date: 'Today',
      hikeDate: body.hikeDate || 'Recent'
    };

    const created = dbStore.createReview(body.trailId, review);
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = dbStore.deleteReview(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    res.json({ success: true, message: 'Review deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
