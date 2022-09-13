import { Db } from 'mongodb'
import Dao from '../Dao.js'

export default class DaoMongoDb extends Dao {
    #collection

    /**
     * @param {Db} db 
     * @param  {String} nombre 
     */
    constructor(db, nombre) {
        super()
        this.#collection = db.collection(nombre)
    }

    /**
     * @return {Promise<Array<Dto>>}
     */
    obtenerTodas = async () => {
        const documents = await this.#collection.find().project({ _id: 0 }).toArray()
        return documents.map(this.asDto)
    }

    /**
     * @param {String} id 
     * @return {Promise<Dto>}
     */
    obtenerPorId = async id => {
        const buscada = await this.#collection.findOne({ id })
        if (!buscada) throw new Error('NOT_FOUND')
        return this.asDto(buscada)
    }

    /**
     * @param {Dto} dto
     * @return {Promise<void>}
     */
    guardar = async dto => {
        await this.#collection.insertOne(dto)
    }

    /**
     * @param {String} id 
     * @param {Dto} dto
     * @return {Promise<Dto>}
     */
    actualizarPorId = async (id, dto) => {
        const { matchedCount, modifiedCount } = await this.#collection.replaceOne({ id }, dto)
        if (matchedCount === 0) throw new Error("NOT_FOUND")
        if (modifiedCount === 0) throw new Error("DATABASE_ERROR")
        return this.asDto(dto)
    }

    /**
     * @param {String} id 
     * @return {Promise<Dto>}
     */
    borrarPorId = async id => {
        const { ok, value } = await this.#collection.findOneAndDelete({ id })
        if (!ok) throw new Error("DATABASE_ERROR")
        if (!value) throw new Error("NOT_FOUND")
        return this.asDto(value)
    }
}
