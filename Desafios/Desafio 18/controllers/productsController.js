import { products } from './../daos/index.js';

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
    try{
        const product = await products.updateById(id, body);
        res.json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteById = async (req, res) => {
    const { id } = req.params;
    try{
        const product = await products.deleteById(id);
        res.json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteAll = async (req, res) => {
    try{
        const products = await products.deleteAll();
        res.json(products);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}
