import dtoProduct from "../DTO/dtoProductMemory.js";
import populateProducts from "./../functions/populate.js";

export default class daoMemoryProducts {
    #collection;
    constructor() {
        this.#collection = [];
    }
    async save(elem){
        let newId;
        if (this.#collection.length == 0) {
            newId = 1;
        } else {
            newId = this.#collection[ this.#collection.length - 1 ].id + 1;
        }
        const newElem = { ...elem, id: newId };
        this.#collection.push(newElem);
        return new dtoProduct(newElem);
    }
    async getById(id){
        const elem = this.objectArray.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`Error al Leer: Elemento no encontrado`)
        } else {
            return new dtoProduct(elem);
        }
    }
    async getAll(){
        return this.#collection.map(elem => new dtoProduct(elem));
    }
    async updateById(id, elem){
        this.#collection.forEach(item => {
            if(item.id == id){
                item = elem;
            }
        });
        return new dtoProduct(elem);
    }
    async deleteById(id){
        const index = this.#collection.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Error al Borrar: Elemento no encontrado`)
        }
        const deleted = this.#collection.splice(index, 1);
        return new dtoProduct(deleted);
    }
    async deleteAll(){
        this.#collection = [];
    }
    populate(generateObject, cant){
        return populateProducts(generateObject, cant);
    }
}