import { Router } from 'express';
import { trailApi, weatherApi } from '../controllers/thirdPartyController';

const router = Router();

router.get('/api1', trailApi);
router.get('/api2', weatherApi);

export default router;
