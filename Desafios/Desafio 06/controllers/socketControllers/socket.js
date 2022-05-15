const {Contenedor} = require('./../../classes/Contenedor.js');
const productos = new Contenedor("./data/productos.txt");
const mensajes = new Contenedor('./data/mensajes.txt');

async function socketController(socket, io) {
    console.log('Usuario conectado: ' + socket.id)
    const array_productos = await productos.getAll();
    const array_mensajes = await mensajes.getAll();
    socket.emit('connectionToServer', { array_productos, array_mensajes })

    socket.on('agregarProducto', async (data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })

    socket.on("enviarMensaje", async (data) => {
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { array_mensajes: await mensajes.getAll() })
    })
}

module.exports = { socketController }