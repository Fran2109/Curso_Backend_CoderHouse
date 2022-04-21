console.log("Desafio 02");
const fs = require('fs');
const string_nombreArchivo = "./productos.txt";

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
        await contenido.push(producto);
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido, null, 2));
            return contenido.length;
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }
    async getById(id) {
        let contenido = await this.getAll();
        let object_encontrado = contenido.find(producto => producto.id == id);
        if(object_encontrado == undefined) {
            return null;
        } else {
            return object_encontrado;
        }
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
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido, null, 2));
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }
    async deleteAll() {
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }
}


(async function(){
    const contenedor_productos = new Contenedor(string_nombreArchivo);
    let producto;
    let int_indiceAgregado;

    for (let i = 0; i < 10; i++) {
        producto = {
            title: 'Escuadra', 
            price: Math.floor(Math.random()*100),
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        };
        int_indiceAgregado = await contenedor_productos.save(producto);
        console.log("Indice Agregado: " + int_indiceAgregado, producto);
    }

    console.log(await contenedor_productos.getById(6));

    console.log(await contenedor_productos.getById(23));

    console.log(await contenedor_productos.getAll());

    await contenedor_productos.deleteById(2);

    console.log(await contenedor_productos.getAll());

    await contenedor_productos.deleteAll();
})();