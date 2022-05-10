const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const handlebarsConfig = {
    defaultLayout: 'main.handlebars'
}

app.engine('handlebars', exphbs.engine(handlebarsConfig))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
    const nombres = [
        { nombre: 'a' },
        { nombre: 'b' },
        { nombre: 'c' },
    ]
    const datos = {
        nombres,
        hayNombres: Boolean(nombres.length > 0),
    }
    res.render('datos', datos)
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })