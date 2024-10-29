import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authControllers";
import { registerUserHandler } from '../controllers/authControllers';
import { validateRegistration } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/register', validateRegistration as any, registerUserHandler);

router.post('/login', loginUser);

export default router;


