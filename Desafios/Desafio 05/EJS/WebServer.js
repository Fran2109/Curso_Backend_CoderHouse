const express = require('express')
const { routerWebServer } = require('./routers/routerWebServer.js')

const app = express()

app.set('view engine', 'ejs')
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