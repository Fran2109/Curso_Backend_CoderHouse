import { Router } from 'express';
import { cartsController } from '../controllers/cartsController.js';

const cartsRouter = Router();
const { createCart, insertInCart, emptyCart } = cartsController;


cartsRouter.post('/', createCart);
cartsRouter.post('/:id/products/:idProd', insertInCart);

cartsRouter.delete('/:id', emptyCart);
/*

cartsRouter.get('/:id/products', );
cartsRouter.delete('/:id/products/:idProd', );
*/

export default cartsRouter;