// server/routes/guideRoutes.ts
import express from 'express';
import { createGuide, getGuides, getGuideById, rateGuide } from '../controllers/guideController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/guides', auth, createGuide);
router.get('/guides', getGuides);
router.get('/guides/:id', getGuideById);
router.post('/guides/:id/rate', auth, rateGuide);

export default router;
