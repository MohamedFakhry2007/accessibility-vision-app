// server/routes/visualImpairmentRoutes.ts
import express from 'express';
import { getVisualImpairments, addVisualImpairment } from '../controllers/visualImpairmentController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/visual-impairments', getVisualImpairments);
router.post('/visual-impairments', auth, addVisualImpairment);

export default router;
