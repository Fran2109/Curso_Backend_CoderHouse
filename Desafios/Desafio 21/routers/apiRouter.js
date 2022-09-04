import { Router } from "express";
import apiController from "../controllers/apiController.js";
import authenticationController from "../controllers/authenticationController.js";
import { auth, debug } from "../middlewares/middlewares.js";
import compression from "compression";
import { logInfo } from "../middlewares/logsMiddlewares.js";

const router = new Router();

export default class apiRouter {
    #apiController;
    #authenticationController
    constructor(){
        this.#apiController = new apiController();
        this.#authenticationController = new authenticationController();
    }
    start(){
        // Authentication
        router.post("/login", logInfo, this.#authenticationController.loginController());        
        router.get("/successLogin", logInfo, this.#authenticationController.succesLogin);
        router.get("/failureLogin", logInfo, this.#authenticationController.failureLogin);
        router.post("/signup", logInfo, this.#authenticationController.registerController());
        router.get("/failureSignup", logInfo, this.#authenticationController.failureSignup);
        router.get("/successSignup", logInfo, this.#authenticationController.successSignup);
        router.post("/logout", logInfo, this.#authenticationController.logout);
        // API
        router.get("/login", logInfo, this.#apiController.getName);
        router.get("/productos-test", auth, logInfo, this.#apiController.productosTest);
        router.get("/getInfo", logInfo, this.#apiController.getInfo);
        router.get("/getInfo-debug", logInfo, debug, this.#apiController.getInfo);
        router.get("/getInfoZip", compression(), logInfo, this.#apiController.getInfo);
        router.get("/randoms/:cant?", logInfo, this.#apiController.getNumbers);
        router.get("/randoms-debug/:cant?", logInfo, debug, this.#apiController.getNumbers);
        return router;
    }
}