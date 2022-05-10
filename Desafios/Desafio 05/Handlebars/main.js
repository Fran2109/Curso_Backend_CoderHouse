import express from 'express'
import exphbs from 'express-handlebars'
import axios from 'axios';

const app = express()

const handlebarsConfig = {
    defaultLayout: 'main.handlebars'
}

app.engine('handlebars', exphbs.engine(handlebarsConfig))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', async (req, res) => {
    const datos = {
        titulo: "Productos",
        productos: [],
        hayProductos: false,
        total: 0
    }
    await axios.get('http://localhost:8080/api/productos/')
    .then(res => {
        datos.productos = res.data;
        datos.hayProductos=Boolean(datos.productos.length > 0);
        datos.total = datos.productos.length
    })
    .catch((error) => {
        console.log(error);
    })  
    res.render('datos', datos);  
})


const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })