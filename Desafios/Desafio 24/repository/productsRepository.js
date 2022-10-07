import { products } from './../factory/factory.js';
import Id from './../models/modelId.js';
import Product from './../models/modelProduct.js';
import ProductDto from './../DTO/dtoProduct.js';

export default class ProductsRepository {
    #products;
    constructor() {
        this.#products = products;
    }
    async save(elem){
        const id = Id.new();
        const product = new Product({id, ...elem});
        const saved = await this.#products.save(product.toJSON());
        return new ProductDto(saved);
    }
    async getById(id){
        const product = await this.#products.getById(id);
        if(!product) {
            return null;
        }
        return new ProductDto(product);
    }
    async getAll(){
        const products = await this.#products.getAll();
        return products.map(product => new ProductDto(product));
    }
    async updateById(id, elem){
        const newProduct = new Product({id, ...elem});
        const product = await this.#products.updateById(id, newProduct.toJSON());
        if(!product) {
            return null;
        }
        return new ProductDto(product);
    }
    async deleteById(id){
        const product = await this.#products.deleteById(id);
        if(!product) {
            return null;
        }
        return new ProductDto(product);
    }
    async deleteAll(){
        await this.#products.deleteAll();
    }
}