const ControlersWeb = {
    inicio: (req,res) => {
        res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
    }
}

module.exports = { ControlersWeb }