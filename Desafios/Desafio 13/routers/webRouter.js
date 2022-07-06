import { Router } from 'express';
import webControllers from '../controllers/webController.js';
import { auth } from '../middlewares/middlewares.js';

const router = new Router()

const { inicio, login, logout, signup, signupError, loginError } = webControllers;

router.get('/', auth, inicio)
router.get('/login', login)
router.get('/logout', logout)
router.get('/signup', signup)
router.get('/signupError', signupError)
router.get('/loginError', loginError)

export default router