import { productDao, cartDao } from '../daos/index.js';

export const productsController = {
    getAll: async (req, res) => {
        const products = await productDao.getAll();
        res.json(products);
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try
        {
            const product = await productDao.getById(id);
            res.json(product);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    },
    save: async (req, res) => {
        const product = await productDao.save(req.body);
        res.json(product);
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productDao.updateById(id, req.body);
            res.json(product);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    deleteById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productDao.deleteById(id);
            const carts = await cartDao.getAll();
            for(const cart of carts){
                if(cart.products.includes(Number(id))){
                    cart.products = cart.products.filter(idActual => idActual != id);
                    await cartDao.updateById(cart.id, cart);
                }
            }
            res.json(product);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    deleteAll: async (req, res) => {
        await productDao.deleteAll();
        const carts = await cartDao.getAll();
        for(const cart of carts){
            await cartDao.clearCart(cart.id);
        }
        res.json({message: 'Todos los productos fueron eliminados'});
    }
}
