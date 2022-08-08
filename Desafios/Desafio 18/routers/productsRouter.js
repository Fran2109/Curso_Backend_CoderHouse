import { Router } from 'express';
import { auth, isAdmin } from './../middlewares/authMiddlewares.js';
import { getAll, getById, postSave, putUpdate, deleteById, deleteAll } from './../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/', auth, getAll);
productsRouter.get('/:id', auth, getById);
productsRouter.post('/', isAdmin, postSave);
productsRouter.put('/:id', isAdmin, putUpdate);
productsRouter.delete('/:id', isAdmin, deleteById);
productsRouter.delete('/', isAdmin, deleteAll);

export default productsRouter;