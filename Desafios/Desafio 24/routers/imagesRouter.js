import { Router } from "express";
import multer from "./../multer/multer.js";
import ImagesController from "./../controllers/imagesController.js";

const router = new Router();

export default class ImagesRouter {
    #imageController;
    constructor () {
        this.#imageController = new ImagesController();
    }
    start(){
        router.post('/', multer.single('image'), this.#imageController.getFile);
        return router;
    }
}