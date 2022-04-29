const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    async save(producto) {
        let contenido = await this.getAll();
        if(contenido.length == 0) {
            producto.id = 1;
        } else {
            producto.id = contenido[contenido.length-1].id + 1;
        }
        contenido.push(producto);
        await sobreescribrirArchivo(this.nombreArchivo, contenido);
        return contenido.length;
    }
    async getById(id) {
        let contenido = await this.getAll();
        let object_encontrado = contenido.find(producto => producto.id == id);
        return object_encontrado ?? null;
    }
    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(contenido);
        }
        catch (error) {
            return [];
        }
    }
    async deleteById(id) {
        let contenido = await this.getAll();
        contenido = contenido.filter(producto => producto.id != id);
        await sobreescribrirArchivo(this.nombreArchivo, contenido);
    }
    async deleteAll() {
        await sobreescribrirArchivo(this.nombreArchivo, []);
    }
}

async function sobreescribrirArchivo(nombreArchivo, datos) {
    try{
        await fs.promises.writeFile(nombreArchivo, JSON.stringify(datos, null, 2));
    }
    catch (error) {
        throw new Error(`Error en escritura: ${error.message}`);
    }
}

module.exports = { Contenedor }