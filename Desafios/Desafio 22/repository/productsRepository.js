import { products } from './../factory/factory.js';

export default class ProductsRepository {
    #products;
    constructor() {
        this.#products = products;
    }
    async save(elem){
        return await this.#products.save(elem);
    }
    async getById(id){
        return await this.#products.getById(id);
    }
    async getAll(){
        return await this.#products.getAll();
    }
    async updateById(id, elem){
        return await this.#products.updateById(id, elem);
    }
    async deleteById(id){
        return await this.#products.deleteById(id);
    }
    async deleteAll(){
        await this.#products.deleteAll();
    }
    populate(generateObject, cant){
        return this.#products.populate(generateObject, cant);
    }
}