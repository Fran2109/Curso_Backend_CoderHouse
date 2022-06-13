import { cartDao } from "../daos/index.js";

export const cartsController = {
    createCart: async (req, res) => {
        const cart = await cartDao.save({ timestamp: `${Date.now()}`, products: [] });
        res.status(201).json(cart);
    },
    insertInCart: async (req, res) =>{
        try {
            const { id, idProd } = req.params;
            const cart = await cartDao.addProductToCart(id, idProd);
            res.status(201).json(cart);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    emptyCart: async (req, res) => {
        try {
            const { id } = req.params;
            const cart = await cartDao.clearCart(id);
            res.status(201).json(cart);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}