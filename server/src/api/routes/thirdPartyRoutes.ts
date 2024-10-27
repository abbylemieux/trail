import { Router } from 'express';
import { getTrails, getWeather } from '../controllers/thirdPartyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/trails', authMiddleware, getTrails);
router.get('/weather', authMiddleware, getWeather);

export default router;
