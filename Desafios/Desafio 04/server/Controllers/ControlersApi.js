const { Contenedor } = require('../Classes/Contenedor.js')
const string_nombreArchivo = "./productos.txt";
const productos = new Contenedor(string_nombreArchivo);

const ControlersApi = {
    getProductos: async (req, res) => {
        let serverInfo;
        serverInfo = await productos.getAll();
        res.json(serverInfo);
    },
    getProducto: async (req, res) => {
        const id = req.params.id;
        try {
            const productoBuscado = await productos.getById(id);
            res.json(productoBuscado)
        } catch (error) {
            if (error.tipo === 'Product not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    postProducto: async (req, res) => {
        let productoAgregado = req.body;
        try {
            productoAgregado = await productos.save(productoAgregado);
            res.status(201).json(productoAgregado)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    putProducto: async (req, res) => {
        const id = req.params.id;
        const datos = req.body;
        try {
            const productoReemplazado = await productos.updateById(id, datos);
            res.json(productoReemplazado)
        } catch (error) {
            if (error.tipo === 'Product not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    deleteProducto: async (req, res) => {
        const id = req.params.id
        try {
            await productos.deleteById(id);
            res.sendStatus(204)
        } catch (error) {
            if (error.tipo === 'Product not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }
}

module.exports = { ControlersApi };