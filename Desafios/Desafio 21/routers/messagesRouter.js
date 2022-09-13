import { Router } from "express";
import messagesController from "./../controllers/messagesController.js";

const router = new Router();

export default class messagesRouter {
    #messagesController;
    constructor(){
        this.#messagesController = new messagesController();
    }
    start(){
        router.get("/", this.#messagesController.getAllMessages);
        router.post("/", this.#messagesController.insertMessage);
        router.delete("/", this.#messagesController.deleteAllMessages);
        return router;
    }
}