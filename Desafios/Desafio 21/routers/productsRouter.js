import { Router } from "express";
import productsController from "./../controllers/productsController.js";

const router = new Router();

export default class apiRouter {
    #productsController;
    constructor(){
        this.#productsController = new productsController();
    }
    start(){
        router.get("/", this.#productsController.getAllProducts);
        router.get("/:id", this.#productsController.getProductById);
        router.post("/", this.#productsController.createProduct);
        router.put("/:id", this.#productsController.updateProduct);
        router.delete("/:id", this.#productsController.deleteProduct);
        router.delete("/", this.#productsController.deleteAllProducts);
        return router;
    }
}