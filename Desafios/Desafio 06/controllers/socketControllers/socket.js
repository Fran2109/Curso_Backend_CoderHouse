const {Contenedor} = require('./../../classes/Contenedor.js');
const rutaProductos = "./productos.txt"
const productos = new Contenedor(rutaProductos);

async function socketController(socket, io) {
    console.log('Usuario conectado: ' + socket.id)
    const array_productos = await productos.getAll();
    socket.emit('connectionToServer', { array_productos })

    socket.on('agregarProducto', async (data) => {
        const { title, price, thumbnail } = data;
        const producto = { title, price, thumbnail }
        await productos.save(producto);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
}

module.exports = { socketController }