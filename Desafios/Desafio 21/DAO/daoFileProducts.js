import fs from 'fs';
import dtoProduct from './../DTO/dtoProductMemory.js';
import populateProducts from './../functions/populate.js';
import overwriteFile from './../functions/overwriteFile.js';

export default class daoFileProducts {
    #filePath;
    constructor(filePath) {
        this.#filePath = filePath;
    }
    async save(element) {
        let content = await this.getAll();
        let newId
        if (content.length == 0) {
            newId = 1
        } else {
            newId = content[ content.length - 1 ].id + 1
        }
        element.id = newId;
        content.push(element);
        await overwriteFile(this.#filePath, content);
        return new dtoProduct(element);
    }
    async getById(id) {
        let content = await this.getAll();
        let element = content.find(element2 => element2.id == id);
        if(!element) {
            throw new Error(`Error al Leer: Elemento no encontrado`)
        } 
        return new dtoProduct(element);
    }
    async getAll() {
        try {
            let content = await fs.promises.readFile(this.#filePath, 'utf-8');
            return JSON.parse(content).map(element => new dtoProduct(element));
        }
        catch (error) {
            return [];
        }
    }
    async updateById(id, producto) {
        let content = await this.getAll();
        let element = content.find(producto => producto.id == id);
        if(!element) {
            throw new Error(`Error al Actualizar: Elemento no encontrado`);
        }
        Object.keys(producto).forEach(el => {
            element[el]=producto[el];
        });
        await overwriteFile(this.#filePath, content);
        return new dtoProduct(element);
    }
    async deleteById(id) {
        let content = await this.getAll();
        let newContent;
        newContent = content.filter(producto => producto.id != id);
        if(newContent.length == content.length) {  
            throw new Error(`Error al Borrar: Elemento no encontrado`);
        }
        await overwriteFile(this.#filePath, newContent);
        return new dtoProduct(content.find(producto => producto.id == id));
    }
    async deleteAll() {
        await overwriteFile(this.#filePath, []);
    }
    populate(generateObject, cant){
        return populateProducts(generateObject, cant)
    }
}