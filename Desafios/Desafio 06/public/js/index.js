const socket = io()

socket.on('connectionToServer', ({ array_productos }) => {
    mostrarProductos(array_productos);
});

socket.on('actualizarTabla', ({ array_productos }) => {
    mostrarProductos(array_productos);
});

const btn = document.getElementById('botonEnviar')
btn.addEventListener('click', event => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('agregarProducto', { title, price, thumbnail })
})

async function mostrarProductos(array_productos) {
    const divProductos = document.getElementById('tableProducts');
    divProductos.innerHTML = await armarTabla(array_productos)
}

async function armarTabla(array_productos) {
    const contexto = { titulo:"Productos", array_productos, hayProductos: array_productos.length > 0, total: array_productos.length }
    return armarHtmlRemoto('templates/table.handlebars', contexto)
}

function armarHtmlRemoto(url, contexto) {
    return buscarPlantilla(url).then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla);
        return generarHtml(contexto)
    })
}

function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}