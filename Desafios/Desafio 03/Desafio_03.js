const express = require('express');
const app = express();
const { ControlersWeb } = require('./Controllers/ControlersWeb.js');
const { ControlersApi } = require('./Controllers/ControlersApi.js');

app.get('/', ControlersWeb.inicio);

app.get('/productos', ControlersApi.productos);
app.get('/productoRandom', ControlersApi.productoRandom);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })