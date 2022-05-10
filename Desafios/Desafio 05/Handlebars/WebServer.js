const express = require('express')
const { engine } = require('express-handlebars')
const { routerWebServer } = require('./routers/routerWebServer.js')

const app = express()

const handlebarsConfig = {
    defaultLayout: 'main.handlebars'
}

app.engine('handlebars', engine(handlebarsConfig))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get("/", (req, res) => {
    res.redirect("/productos")
})

app.use("/productos", routerWebServer);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })