import crearKnex from 'knex';

export const createTableProductos = (dbConfig, tabla) => {
    const knex = crearKnex(dbConfig)
    knex.schema.hasTable(tabla)
        .then(exists => {
            if (!exists) {
                knex.schema.createTable(tabla, tabla => {
                    tabla.increments('id'),
                    tabla.string("title"),
                    tabla.decimal('price', 8, 2),
                    tabla.string("thumbnail")
                }).then(() => {
                    console.log(`Tabla ${tabla} creada!`)
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            knex.destroy();
        })
}

export const createTableMensajes = (dbConfig, tabla) => {
    const knex = crearKnex(dbConfig)
    knex.schema.hasTable(tabla)
        .then(exists => {
            if (!exists) {
                knex.schema.createTable(tabla, tabla => {
                    tabla.increments('id'),
                    tabla.string("email"),
                    tabla.string("fechaString"),
                    tabla.string("mensaje")
                }).then(() => {
                    console.log(`Tabla ${tabla} creada!`)
                })
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            knex.destroy();
        })
}
