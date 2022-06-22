import { Router } from 'express';
import webControllers from '../controllers/webController.js';

const router = new Router()

router.get('/', webControllers.inicio)
router.get('/api/productos-test', webControllers.productosTest)

export default router