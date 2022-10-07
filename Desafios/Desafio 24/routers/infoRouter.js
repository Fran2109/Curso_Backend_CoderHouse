import { Router } from "express";
import InfoController from "./../controllers/infoController.js";

const router = new Router();

export default class InfoRouter {
    #infoController;
    constructor () {
        this.#infoController = new InfoController();
    }
    start(){
        router.get("/", this.#infoController.info);
        return router;
    }
}