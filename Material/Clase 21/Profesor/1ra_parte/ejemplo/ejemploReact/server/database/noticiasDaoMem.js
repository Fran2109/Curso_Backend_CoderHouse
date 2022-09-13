import NoticiaDto from '../models/NoticiaDto.js'
import Dao from './shared/Dao.js'

export default class NoticiasDaoMem extends Dao {
    #noticias

    constructor() {
        super()
        this.#noticias = []
    }

    /**
     * @return {Promise<Array<NoticiaDto>>}
     */
    obtenerTodas = async () => {
        return this.#noticias.map(n => new NoticiaDto(n))
    }

    /**
     * @param {String} id 
     * @return {Promise<NoticiaDto>}
     */
    obtenerPorId = async (id) => {
        const buscada = this.#noticias.find(n => n.id === id)
        if (!buscada) throw new Error('NOT_FOUND')
        return new NoticiaDto(buscada)
    }

    /**
     * @param {NoticiaDto} noticiaDto
     * @return {Promise<void>}
     */
    guardar = async (noticiaDto) => {
        this.#noticias.push(noticiaDto)
    }

    /**
     * @param {String} id 
     * @param {NoticiaDto} noticiaDto
     * @return {Promise<NoticiaDto>}
     */
    actualizarPorId = async (id, noticiaDto) => {
        const index = this.#noticias.findIndex(n => n.id === id)
        if (index === -1) throw new Error('NOT_FOUND')
        this.#noticias[index] = noticiaDto
        return noticiaDto
    }

    /**
     * @param {String} id 
     * @return {Promise<NoticiaDto>}
     */
    borrarPorId = async (id) => {
        const index = this.#noticias.findIndex(n => n.id === id)
        if (index === -1) throw new Error('NOT_FOUND')
        const [borrado] = this.#noticias.splice(index, 1)
        return borrado
    }
}
