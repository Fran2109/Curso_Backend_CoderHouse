import { Router } from "express";
import WebController from "../controllers/webController.js";
import { auth } from "../middlewares/middlewares.js";
import { logInfo } from "../middlewares/logsMiddlewares.js";

const router = new Router();

export default class WebRouter {
    #webController;
    constructor () {
        this.#webController = new WebController();
    }
    start(){
        router.get("/", auth, logInfo, this.#webController.inicio);
        router.get("/login", logInfo, this.#webController.login);
        router.get("/logout", logInfo, this.#webController.logout);
        router.get("/signup", logInfo, this.#webController.signup);
        router.get("/signupError", logInfo, this.#webController.signupError);
        router.get("/loginError", logInfo, this.#webController.loginError);
        router.get("/info", auth, logInfo, this.#webController.info);
        router.get("/infoZip", auth, logInfo, this.#webController.infoZip);
        router.get("/random", auth, logInfo, this.#webController.random);
        return router;
    }
}