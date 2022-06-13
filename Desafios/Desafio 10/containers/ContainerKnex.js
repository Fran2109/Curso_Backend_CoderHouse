import crearKnex from 'knex'

class ContainerKnex {
    constructor(config, tabla, createTable) {
        this.conexion = crearKnex(config);
        this.tabla = tabla;
        createTable(this.conexion, tabla);
    }
    async save(producto) {
        try {
            await this.conexion.insert(producto).into(this.tabla)
            return producto;
        } catch (error) {
            console.log(error); 
        }       
    }
    async updateById(id, producto) {
        let modified = await this.conexion.from(this.tabla).where('id', id).update(producto);
        if(modified == 0){
            throw new Error(`Error al Actualizar: Elemento no encontrado`)
        }
        return producto;
    }
    async getById(id) {
        let answer = await this.conexion.from(this.tabla).where('id', id).first();
        if(!answer){
            throw new Error(`Error al Leer: Elemento no encontrado`)
        }
        return answer
    }
    async getAll() {
        let content = await this.conexion.from(this.tabla).select('*');
        return content;
    }
    async deleteById(id) {
        let deleted = await this.conexion.from(this.tabla).where('id', id).del();
        if(deleted == 0){
            throw new Error(`Error al Borrar: Elemento no encontrado`)
        }
    }
    async deleteAll() {
        await this.conexion.from(this.tabla).del()
    }
}

export default ContainerKnex