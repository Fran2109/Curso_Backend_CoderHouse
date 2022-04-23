const express = require('express');

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    //res.end("<h1>Hola Mundo</h1>");
    res.send("<h1>Hola Mundo</h1>");
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(error.message));