import contenedor from "../classes/contenedor.js";

const productos = new contenedor("./data/productos.txt");

const controleProductos = {
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

export default controleProductos;