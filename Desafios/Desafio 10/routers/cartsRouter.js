import { Router } from 'express';
import { cartsController } from '../controllers/cartsController.js';

const cartsRouter = Router();
const { createCart, insertInCart, emptyCart, getProducts, deleteFromCart } = cartsController;


cartsRouter.post('/', createCart);
cartsRouter.post('/:id/products/:idProd', insertInCart);
cartsRouter.get('/:id/products', getProducts);
cartsRouter.delete('/:id', emptyCart);
cartsRouter.delete('/:id/products/:idProd', deleteFromCart);

export default cartsRouter;