const { Contenedor } = require('./../Classes/Contenedor.js')
const string_nombreArchivo = "./productos.txt";
const productos = new Contenedor(string_nombreArchivo);
const { RandomFunction } = require('./../Functions/RandomFunction.js')

const ControlersApi = {
    productos: async (req,res) => {
        let contenido = await productos.getAll();
        res.json(contenido)
    },
    productoRandom: async (req,res) => {
        let id=0;
        let contenido = await productos.getAll();
        id = RandomFunction(contenido[0].id, contenido[contenido.length-1].id);
        let producto = await productos.getById(id);
        res.json(producto);
    }
}

module.exports = { ControlersApi };