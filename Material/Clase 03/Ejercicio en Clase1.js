const http = require("http");
function controlador(peticion, respuesta) {
    console.log(`[${peticion.method}]${peticion.url}`);
    respuesta.end("<h1>Hola Mundo</h1>");
}

const server = http.createServer(controlador);

const connectedServer = server.listen(8080, () => {
    console.log("Servidor Http escuchando en el puerto " + connectedServer.address().port);
});

connectedServer.on('error', manejadorDeErrores);

function manejadorDeErrores(error) {
    console.log(error);
    console.log(error.message);
}