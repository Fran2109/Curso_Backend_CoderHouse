import { products } from './../factory/factory.js';

export default class ProductsRepository {
    constructor() {
        this.products = products;
    }
    async save(elem){
        const added = await this.products.save(elem);
        return added;
    }
    async getById(id){
        const element = await this.products.getById(id);
        return element;
    }
    async getAll(){
        const elements = await this.products.getAll();
        return elements;
    }
    async updateById(id, elem){
        const updated = await this.products.updateById(id, elem);
        return updated;
    }
    async deleteById(id){
        const deleted = await this.products.deleteById(id);
        return deleted;
    }
    async deleteAll(){
        await this.products.deleteAll();
    }
    populate(generateObject, cant){
        const array = this.products.populate(generateObject, cant);
        return array;
    }
}