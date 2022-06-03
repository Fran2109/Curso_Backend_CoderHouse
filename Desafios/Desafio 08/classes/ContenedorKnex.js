import crearKnex from 'knex'

export default class ContenedorKnex {
    constructor(config, tabla, createTable) {
        this.conexion = config;
        this.tabla = tabla;
        createTable(config, tabla);
    }
    async save(producto) {
        const knex = crearKnex(this.conexion);
        await knex.insert(producto).into(this.tabla)
            .then(() => {
                console.log(`Agregado a la DB`, producto);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                knex.destroy();
            })
        return producto;
    }
    async updateById(id, producto) {
        const knex = crearKnex(this.conexion);
        await knex.from(this.tabla).where('id', id).update(producto)
            .then(() => {
                console.log(`Id:${id} actualizado`);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                knex.destroy();
            })
    }
    async getById(id) {
        const knex = crearKnex(this.conexion);
        let contenido;
        await knex.from(this.tabla).where('id', id).select('*')
            .then(rows => {
                contenido = rows;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                knex.destroy();
            })
        return contenido;
    }
    async getAll() {
        try {
            let contenido;
            const knex = crearKnex(this.conexion);
            await knex.from(this.tabla).select('*')
                .then(rows => {
                    contenido = rows;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    knex.destroy();
                })
            return contenido;
        }
        catch (error) {
            return [];
        }
    }
    async deleteById(id) {
        const knex = crearKnex(this.conexion);
        await knex.from(this.tabla).where('id', id).del()
            .then(() => {
                console.log(`Id:${id} eliminado`);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                knex.destroy();
            })
    }
    async deleteAll() {
        const knex = crearKnex(this.conexion);
        await knex.from(this.tabla).del()
            .then(() => {
                console.log(`Tabla ${this.tabla} vaciada`);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                knex.destroy();
            })
    }
}