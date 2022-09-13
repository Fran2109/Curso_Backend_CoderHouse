export default class Dao {

    asDto = document => { throw new Error('NOT_IMPLEMENTED') }

    /**
     * @return {Promise<Array<Dto>>}
     */
    obtenerTodas = async () => { throw new Error('NOT_IMPLEMENTED') }

    /**
     * @param {String} id 
     * @return {Promise<Dto>}
     */
    obtenerPorId = async (id) => { throw new Error('NOT_IMPLEMENTED') }

    /**
     * @param {Dto} dto
     * @return {Promise<void>}
     */
    guardar = async (dto) => { throw new Error('NOT_IMPLEMENTED') }

    /**
     * @param {String} id 
     * @param {Dto} dto
     * @return {Promise<Dto>}
     */
    actualizarPorId = async (id, dto) => { throw new Error('NOT_IMPLEMENTED') }

    /**
     * @param {String} id 
     * @return {Promise<Dto>}
     */
    borrarPorId = async (id) => { throw new Error('NOT_IMPLEMENTED') }
}