const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { socketController } = require('./controllers/socketControllers/socket.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const webRouter = require('./routers/webRouter.js')

app.use(express.static('./public'))
app.use('/', webRouter)

io.on('connection', socket => socketController(socket, io))

const server = httpServer.listen(8080, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})