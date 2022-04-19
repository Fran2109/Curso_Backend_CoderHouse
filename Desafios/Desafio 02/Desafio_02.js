console.log("Desafio 02");
const fs = require('fs');
const string_nombreArchivo = "./Desafios/Desafio 02/productos.txt";

class Contenedor {
    constructor(productos) {
        this.objectArray = productos;
    }
    save(producto) {
        if(this.objectArray.length == 0) {
            producto.id = 1;
        } else {
            producto.id = this.objectArray[this.objectArray.length-1].id + 1;
        }        
        this.objectArray.push(producto);
        try{
            fs.writeFileSync(string_nombreArchivo, JSON.stringify(this.objectArray, null, 2));
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
        return this.objectArray.length;
    }
    getById(id) {
        let object_encontrado = this.objectArray.find(producto => producto.id == id);
        if(object_encontrado == undefined) {
            return null;
        } else {
            return object_encontrado;
        }
    }
    getAll() {
        return this.objectArray;
    }
    deleteById(id) {
        this.objectArray = this.objectArray.filter(producto => producto.id != id);
        try{
            fs.writeFileSync(string_nombreArchivo, JSON.stringify(this.objectArray, null, 2));
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }
    deleteAll() {
        this.objectArray = [];
        try{
            fs.writeFileSync(string_nombreArchivo, JSON.stringify([], null, 2));
        }
        catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }
}

function leerProductos() {
    try {
        let contenido = fs.readFileSync(string_nombreArchivo, 'utf-8');
        if(contenido.length == 0) {
            return [];//en el caso de que el archivo esté completamente vacío
        }
        else {
            return JSON.parse(contenido);
        }
    }
    catch (error) {
        throw new Error(`Error en lectura: ${error.message}`);
    }
}

const contenedor_productos = new Contenedor(leerProductos());

let producto;
let int_indiceAgregado;
for (let i = 0; i < 10; i++) {
    producto = {
        title: 'Escuadra', 
        price: Math.floor(Math.random()*100),
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    };
    int_indiceAgregado = contenedor_productos.save(producto);
    console.log(int_indiceAgregado);
}

console.log(contenedor_productos.getById(6));
console.log(contenedor_productos.getById(23));

console.log(contenedor_productos.getAll());

contenedor_productos.deleteById(2);

console.log(contenedor_productos.getAll());

contenedor_productos.deleteAll();