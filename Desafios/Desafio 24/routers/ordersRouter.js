import { Router } from "express";
import OrdersController from "../controllers/ordersController.js";
import { auth } from "../jwt/jwt.js";

const router = new Router();

export default class CartsRouter {
    #ordersController
    constructor () {
        this.#ordersController = new OrdersController();
    }
    start(){
        router.post("/", auth, this.#ordersController.createOrder);
        router.get('/', auth, this.#ordersController.getOrders)
        return router;
    }
}