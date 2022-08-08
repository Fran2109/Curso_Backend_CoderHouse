import { Router } from 'express';
import { logInfo } from '../middlewares/logMiddlewares.js';
import { register, login } from '../controllers/userController.js';
import passport from 'passport';

const router = new Router();

router.post('/register', logInfo, passport.authenticate('register'), register);
router.post('/login', logInfo, passport.authenticate('login'), login);

export default router;