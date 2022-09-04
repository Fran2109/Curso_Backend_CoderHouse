import service from "./../service/index.js";

export default class productsController {
    constructor() { }
    async getAllProducts(req, res) {
        try {
            const products = await service.getAllProducts();
            res.json(products);
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    }
    async getProductById(req, res) {
        try {
            const product = await service.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createProduct(req, res) {
        try {
            const product = await service.createProduct(req.body);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const product = await service.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const product = await service.deleteProduct(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteAllProducts(req, res) {
        try {
            const products = await service.deleteAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}