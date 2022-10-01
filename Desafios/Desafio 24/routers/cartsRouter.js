import { Router } from "express";
import CartsController from "./../controllers/cartsController.js";
import { auth } from "./../jwt/jwt.js";

const router = new Router();

export default class CartsRouter {
    #cartsController
    constructor () {
        this.#cartsController = new CartsController();
    }
    start(){
        router.get("/", auth, this.#cartsController.getCart);
        router.post("/", auth, this.#cartsController.postProduct);
        router.delete("/:productId", auth, this.#cartsController.deleteProduct);
        return router;
    }
}