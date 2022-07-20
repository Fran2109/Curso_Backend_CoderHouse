import express, { json } from 'express';
// Session
import { sessionHandler } from './middlewares/session.js';
// Authentication
import { passportInitialize, passportSession } from './middlewares/passport.js';
// Socket
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import socketController from './controllers/socketController.js';
// Routers
import webRouter from './routers/webRouter.js';
import apiRouter from './routers/apiRouter.js';
// Yargs
import yargsParser from 'yargs/yargs';

// Consts
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const yargs = yargsParser(process.argv.slice(2))

// Middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionHandler)
app.use(passportInitialize)
app.use(passportSession)

// Routers
app.use('/', webRouter)
app.use('/api', apiRouter)

io.on('connection', socket => socketController(socket, io))

const { port } = yargs
    .alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

//Listen
const server = httpServer.listen(port, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})