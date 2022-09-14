import fs from 'fs';

const overwriteFile = async (nombreArchivo, datos) => {
    try{
        await fs.promises.writeFile(nombreArchivo, JSON.stringify(datos, null, 2));
    }
    catch (error) {
        throw new Error(`Error en escritura: ${error.message}`);
    }
}

export default overwriteFile;