import { cartDao } from "../daos/index.js";

const cartsControllerSql = {
    createCart: async (req, res) => {
        const cart = await cartDao.save({ timestamp: `${Date.now()}` });
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
    getProducts: async (req, res) => {
        try {
            const { id } = req.params;
            const { productDao } = await import('../daos/index.js');
            const results = await productDao.getProductsFromCart(id);
            res.status(200).json(results);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    emptyCart: async (req, res) => {
        /*try {
            const { id } = req.params;
            const cart = await cartDao.clearCart(id);
            res.status(201).json(cart);
        } catch (error) {
            res.status(404).json({message: error.message});
        }*/
    },
    deleteFromCart: async(req, res) => {
        /*try {
            const { id, idProd } = req.params;
            const cart = await cartDao.deleteProductFromCart(id, idProd);
            res.status(201).json(cart);
        } catch (error) {
            res.status(404).json({message: error.message});
        }*/
    }
}

export default cartsControllerSql;