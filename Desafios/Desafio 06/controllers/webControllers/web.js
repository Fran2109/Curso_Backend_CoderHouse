const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html')
    }
}

module.exports = { webControllers }