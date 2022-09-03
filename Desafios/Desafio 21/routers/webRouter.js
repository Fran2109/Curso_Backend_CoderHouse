import { Router } from "express";
import WebController from "../controllers/webController.js";
import { auth } from "../middlewares/middlewares.js";
import { logInfo } from "../middlewares/logsMiddlewares.js";

const router = new Router();

export default class WebRouter {
    constructor () {
        this.WebController = new WebController();
    }
    start(){
        router.get("/", auth, logInfo, this.WebController.inicio);
        router.get("/login", logInfo, this.WebController.login);
        router.get("/logout", logInfo, this.WebController.logout);
        router.get("/signup", logInfo, this.WebController.signup);
        router.get("/signupError", logInfo, this.WebController.signupError);
        router.get("/loginError", logInfo, this.WebController.loginError);
        router.get("/info", auth, logInfo, this.WebController.info);
        router.get("/infoZip", auth, logInfo, this.WebController.infoZip);
        router.get("/random", auth, logInfo, this.WebController.random);
    }
}