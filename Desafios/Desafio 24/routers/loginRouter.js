import { Router } from "express";
import LoginController from "./../controllers/loginController.js";

const router = new Router();

export default class LoginRouter {
    #loginController;
    constructor () {
        this.#loginController = new LoginController();
    }
    start(){
        router.post("/", this.#loginController.login);
        return router;
    }
}