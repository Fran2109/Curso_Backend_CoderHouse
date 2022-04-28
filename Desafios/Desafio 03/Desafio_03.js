const express = require('express');
const app = express();
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
        return object_encontrado ? object_encontrado : null;
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

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

const productos = new Contenedor(string_nombreArchivo);

app.get('/', (req,res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

app.get('/productos', (req,res) => {
    (async function(){
        let contenido = await productos.getAll();
        console.log(contenido);
        res.json(contenido)
    })();
})


app.get('/productoRandom', (req,res) => {
    (async function(){
        let id=0;
        let contenido = await productos.getAll();
        id = random(contenido[0].id, contenido[contenido.length-1].id);
        let producto = await productos.getById(id);
        res.json(producto);
    })();
    
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })