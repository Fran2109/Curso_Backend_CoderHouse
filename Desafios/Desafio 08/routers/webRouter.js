import { Router } from 'express';
import webControllers from '../controllers/webControllers/web.js';

const router = new Router()

router.get('/', webControllers.inicio)

export default router