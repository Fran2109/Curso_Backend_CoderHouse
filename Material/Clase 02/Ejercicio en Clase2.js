const fs = require('fs');

const ruta='./Material/Clase 02/package.json';

const info = {
    contenidoStr: JSON.stringify(fs.readFileSync(ruta, 'utf-8')),
    contenidoObj: JSON.parse(fs.readFileSync(ruta, 'utf-8')),
    size: JSON.stringify(fs.readFileSync(ruta, 'utf-8')).length
}

console.log(info);