import express from 'express';
// Session
import cookieParser from 'cookie-parser';
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

// Consts
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(cookieParser())
app.use(sessionHandler)
app.use(passportInitialize)
app.use(passportSession)

// Routers
app.use('/', webRouter)
app.use('/api', apiRouter)

io.on('connection', socket => socketController(socket, io))

//Listen
const server = httpServer.listen(8080, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})