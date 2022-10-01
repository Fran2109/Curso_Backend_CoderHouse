import { Router } from "express";
import productsController from "./../controllers/productsController.js";
import { auth, isAdmin } from "../jwt/jwt.js";

const router = new Router();

export default class productsRouter {
    #productsController;
    constructor(){
        this.#productsController = new productsController();
    }
    start(){
        router.get("/", this.#productsController.getAllProducts);
        router.get("/:id", this.#productsController.getProductById);
        router.post("/", auth, isAdmin, this.#productsController.createProduct);
        router.put("/:id", auth, isAdmin, this.#productsController.updateProduct);
        router.delete("/:id", auth, isAdmin, this.#productsController.deleteProduct);
        router.delete("/", auth, isAdmin, this.#productsController.deleteAllProducts);
        return router;
    }
}