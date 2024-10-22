import { Router } from 'express';
import { fetchFromApi1, fetchFromApi2 } from '../controllers/thirdPartyController';

const router = Router();

router.get('/api1', fetchFromApi1);
router.get('/api2', fetchFromApi2);

export default router;
