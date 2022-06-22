const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html', { root: './public/views' })
    },
    productosTest: (req, res) => {
        res.sendFile('indexTest.html', { root: './public/views' })
    }
}

export default webControllers;

/*productosTest: (req, res) => {
        res.sendFile('indexTest.html', { root: './public' })
    }*/