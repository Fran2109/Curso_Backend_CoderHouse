import service from "./../service/index.js";

export default class productsController {
    constructor() { }
    async getAllProducts(req, res) {
        try {
            const products = await service.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getProductById(req, res) {
        try {
            const product = await service.getProductById(req.params.id);
            if(!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createProduct(req, res) {
        try {
            if(!req.body.title || !req.body.price || !req.body.thumbnail) {
                res.status(400).json({ error: "Product not created" });
            } else {
                const product = await service.insertProduct(req.body);
                res.json(product);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const product = await service.updateProductById(req.params.id, req.body);
            if(!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const product = await service.deleteProductById(req.params.id);
            if(!product) {
                return res.status(404).json({ error: "Product not found" });
            }
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