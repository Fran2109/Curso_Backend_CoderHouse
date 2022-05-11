const { Contenedor } = require('../classes/Contenedor.js')
const string_nombreArchivo = "./productos.txt";
const productos = new Contenedor(string_nombreArchivo);

const controlersWeb = {
    getProductos : async (req, res) => {
        const datos = {
            tipo: "datos",
            titulo: "Productos",
            productos: [],
            hayProductos: false,
            total: 0
        }
        datos.productos = await productos.getAll();
        datos.hayProductos = Boolean(datos.productos.length > 0);
        datos.total = datos.productos.length
        res.render('datos', datos);
    },
    sendFormulario : (req, res) => {
        const datos = { tipo: "formulario" }
        res.render('formulario', datos);
    },
    postProducto : (req, res) => {
        productos.save(req.body);
        res.redirect('/productos');
    }
}

module.exports = { controlersWeb }