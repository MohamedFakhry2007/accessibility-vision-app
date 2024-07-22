// server/routes/colorContrastRoutes.ts
import express from 'express';
import { saveColorScheme, getUserColorSchemes } from '../controllers/colorContrastController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/colorschemes', auth, saveColorScheme);
router.get('/colorschemes', auth, getUserColorSchemes);

export default router;
