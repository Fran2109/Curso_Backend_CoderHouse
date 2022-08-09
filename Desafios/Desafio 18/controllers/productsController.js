import { products, carts } from './../daos/index.js';

export const getAll = async (req, res) => {
    try {
        const allProducts = await products.getAll();
        res.json(allProducts);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const getById = async (req, res) => {
    const { id } = req.params;
    try{
        const product = await products.getById(id);
        res.json(product);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const postSave = async (req, res) => {
    const { body } = req;
    try{
        const product = await products.save(body);
        res.json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const putUpdate = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    body._id = id;
    try{
        const product = await products.updateById(body);
        res.json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteById = async (req, res) => {
    const { id } = req.params;
    try{
        const product = await products.deleteById(id);
        const allCarts = await carts.getAll();
        await allCarts.forEach(async item => {
            item.products = item.products.filter(product => product.productId != id);
            await carts.updateById(item);
        });
        res.json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteAll = async (req, res) => {
    try{
       await products.deleteAll();
        const allCarts = await carts.getAll();
        await allCarts.forEach(async item => {
            item.products = [];
            await carts.updateById(item);
        });
        res.json({ message: 'All products deleted' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}
