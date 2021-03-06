import http from 'http'

const calculo = () => {
    let sum = 0
    for (let i = 0; i < 6e9; i++) {
        sum += i
    }
    return sum
}

let visitas = 0

const server = http.createServer()

server.on('request', (req, res) => {
    const { url } = req
    if (url == '/calcular') {
        const sum = calculo()
        res.end(`La suma es ${sum}`)
    }
    else if (url == '/') {
        res.end('Ok ' + (++visitas))
    }
})

const PORT = 8080
server.listen(PORT, err => {
    if (err) throw new Error(`Error en servidor: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})