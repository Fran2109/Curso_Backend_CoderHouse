import { Router } from 'express';
import { productsController } from '../controllers/productsController.js';

const productsRouter = Router();
const { getAll, getById, save, update, deleteById, deleteAll } = productsController;

productsRouter.get('/', getAll);
productsRouter.get('/:id', getById);
productsRouter.post('/', save);
productsRouter.put('/:id', update);
productsRouter.delete('/:id', deleteById);
productsRouter.delete('/', deleteAll);

export default productsRouter;