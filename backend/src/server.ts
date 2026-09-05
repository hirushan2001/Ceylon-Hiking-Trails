import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trailsRoutes from './routes/trails.routes';
import conditionsRoutes from './routes/conditions.routes';
import reviewsRoutes from './routes/reviews.routes';
import guidesRoutes from './routes/guides.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'Ceylon Hiking Trails Backend REST API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/trails', trailsRoutes);
app.use('/api/conditions', conditionsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/guides', guidesRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Standalone Backend Server running on http://localhost:${PORT}`);
});
