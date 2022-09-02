import NoticiasService from '../../services/noticias/NoticiasService.js'

export default class NoticiasController {
    #noticiasService

    /**
     * @param {NoticiasService} noticiasService
     */
    constructor(noticiasService) {
        this.#noticiasService = noticiasService
    }

    obtenerNoticias = async (req, res, next) => {
        try {
            const noticias = await this.#noticiasService.obtenerNoticias(req.params.id)
            res.json(noticias)
        } catch (error) {
            // console.log('error obtenerNoticias', error)
            next(error)
        }
    }

    guardarNoticia = async (req, res, next) => {
        try {
            const noticiaGuardada = await this.#noticiasService.guardarNoticia(req.body)
            res.status(201).json(noticiaGuardada)
        } catch (error) {
            // console.log('error obtenerNoticias', error)
            next(error)
        }
    }

    actualizarNoticia = async (req, res, next) => {
        try {
            const noticiaActualizada = await this.#noticiasService.actualizarNoticia(req.params.id, req.body)
            res.json(noticiaActualizada)
        } catch (error) {
            // console.log('error obtenerNoticias', error)
            next(error)
        }
    }

    borrarNoticia = async (req, res, next) => {
        try {
            const noticiaBorrada = await this.#noticiasService.borrarNoticia(req.params.id)
            res.json(noticiaBorrada)
        } catch (error) {
            // console.log('error obtenerNoticias', error)
            next(error)
        }
    }
}
