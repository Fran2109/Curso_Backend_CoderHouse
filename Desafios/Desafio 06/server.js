const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {Contenedor} = require('./classes/Contenedor.js');
const rutaProductos = "./productos.txt"

const productos = new Contenedor(rutaProductos);

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

io.on('connection', async (socket) => {
    console.log('Usuario conectado: ' + socket.id)
    const array_productos = await productos.getAll();
    socket.emit('connectionToServer', { array_productos })
})

io.on('agregarProducto', async (data) => {
    const { title, price, thumbnail } = data;
    console.log(data)
    const producto = { title, price, thumbnail }
    await productos.add(producto);
    socket.emit('actualizarTabla', { array_productos: await productos.getAll() })
})

const server = httpServer.listen(8080, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})