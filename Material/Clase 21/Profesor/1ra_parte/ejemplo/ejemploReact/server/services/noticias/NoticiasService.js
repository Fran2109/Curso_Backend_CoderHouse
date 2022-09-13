import Noticia from '../../models/Noticia.js'
import Dao from '../../database/shared/Dao.js'
import NoticiaDTO from '../../models/NoticiaDto.js'
import Id from '../../models/Id.js'

export default class NoticiasService {
    #noticiasDao

    /**
     * @param {Dao} noticiasDao 
     */
    constructor(noticiasDao) {
        this.#noticiasDao = noticiasDao
    }

    async obtenerNoticias(id) {
        if (id) return await this.#noticiasDao.obtenerPorId(id)
        return await this.#noticiasDao.obtenerTodas()
    }

    async guardarNoticia(datosNoticia) {
        const id = Id.new()
        const noticia = new Noticia({ id, ...datosNoticia })
        const noticiaDto = new NoticiaDTO(noticia.asPOJO())
        await this.#noticiasDao.guardar(noticiaDto)
        return noticiaDto
    }

    async actualizarNoticia(id, datosNoticia) {
        const noticia = new Noticia(datosNoticia)
        const noticiaDto = new NoticiaDTO(noticia.asPOJO())
        await this.#noticiasDao.actualizarPorId(id, noticiaDto)
        return noticiaDto
    }

    async borrarNoticia(id) {
        return await this.#noticiasDao.borrarPorId(id)
    }
}
