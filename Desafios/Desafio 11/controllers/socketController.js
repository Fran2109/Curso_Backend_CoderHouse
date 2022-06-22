import ContainerMongoose from '../containers/ContainerMongoose.js';
import mongoose from '../config.js';
import { faker } from '@faker-js/faker'

const productos = new ContainerMongoose(mongoose.collections.products, mongoose.url, mongoose.options);
const mensajes = new ContainerMongoose(mongoose.collections.messages, mongoose.url, mongoose.options);

async function socketController(socket, io) {
    const array_productos = await productos.getAll();
    const array_mensajes = await mensajes.getAll();
    socket.emit('connectionToServer', { array_productos, array_mensajes })
    socket.on('connectionToTest', () => {
        const productsTest = [];
        for (let i = 0; i < 5; i++) {
            productsTest.push({
                id: faker.random.uuid(),
                title: faker.vehicle.vehicle(),
                thumbnail: faker.image.transport(),
                price: faker.random.numeric(8)
            })
        }
        socket.emit('sendTest', { productsTest })
    });
    socket.on('agregarProducto', async (data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("enviarMensaje", async (data) => {
        console.log(data);
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { array_mensajes: await mensajes.getAll() })
    })
    socket.on("eliminarProductos", async () => {
        await productos.deleteAll();
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("eliminarMensajes", async () => {
        await mensajes.deleteAll();
        io.sockets.emit('actualizarMensajes', { array_mensajes: await mensajes.getAll() })
    })
    socket.on("eliminarProducto", async (id) => {
        await productos.deleteById(id);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("editarProducto", async (id, producto) => {
        await productos.updateById(id, producto);
        io.sockets.emit('actualizarTabla', { array_productos: await productos.getAll() })
    })
    socket.on("connectionToTest", async () => {
        console.log("gfdgs");
    })
}

export default socketController;