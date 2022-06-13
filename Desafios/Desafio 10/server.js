import express from 'express';
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))