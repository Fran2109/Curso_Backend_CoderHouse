import express from 'express';
import routerProductos from './routers/routerProductos.js';
import routerLogin from './routers/routerLogin.js';
const app = express();

app.use('/api/productos', routerProductos);
app.use('/login', routerLogin);

app.all('*', (req, res) => {
    res.status(404).json( { error : 404, descripcion: `ruta '${req.url}' método '${req.method}' no implementada` } )
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })