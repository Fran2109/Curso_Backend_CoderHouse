import * as config from './config.js';
import express from 'express'
import cors from 'cors'
import noticiasRouter from './routers/index.js';
import { errorHandler } from './middlewares/errorHandling.js';

const app = express()

app.use(cors())

app.use(express.static('public'))
app.use(express.json())

app.use('/api/noticias', noticiasRouter)
app.use(errorHandler)

const PORT = config.PORT || 8000
const server = app.listen(PORT, () => {
    console.log(
        `Servidor express escuchando en el puerto ${PORT} (entorno: ${config.NODE_ENV} - persistencia: ${config.TIPO_PERSISTENCIA})`)
})
server.on('error', error => console.log('Servidor express en error:', error))
