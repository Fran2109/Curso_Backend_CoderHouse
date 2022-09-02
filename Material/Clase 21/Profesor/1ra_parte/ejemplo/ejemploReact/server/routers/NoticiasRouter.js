import { Router } from 'express'

export default class NoticiasRouter {
    #noticiasRouter

    constructor(noticiasController) {
        this.#noticiasRouter = Router()
            .get('/:id?', noticiasController.obtenerNoticias)
            .post('/', noticiasController.guardarNoticia)
            .put('/:id', noticiasController.actualizarNoticia)
            .delete('/:id', noticiasController.borrarNoticia)
    }

    get() {
        return this.#noticiasRouter
    }
}
