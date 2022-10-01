import { Router } from "express";
import UserController from "./../controllers/usersController.js";
import { auth } from "./../jwt/jwt.js";

const router = new Router();

export default class UsersRouter {
    #userController;
    constructor () {
        this.#userController = new UserController();
    }
    start(){
        router.post("/", this.#userController.register);
        return router;
    }
}