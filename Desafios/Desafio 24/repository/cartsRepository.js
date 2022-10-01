import { carts } from './../factory/factory.js';

export default class UsersRepository {
    #carts;
    constructor() {
        this.#carts = carts;
    }
    async createIfNotExists(elem){
        return await this.#carts.createIfNotExists(elem);
    }
    async insertProductToCart(userId, productId){
        return await this.#carts.insertProductToCart(userId, productId);
    }
    async getCart(userId){
        return await this.#carts.getCart(userId);
    }
    async deleteProductFromAllCarts(productId){
        return await this.#carts.deleteProductFromAllCarts(productId);
    }
    async deleteAllProductsFromCarts(){
        return await this.#carts.deleteAllProductsFromCarts();
    }
    async deleteProductFromCart(userId, productId){
        return await this.#carts.deleteProductFromCart(userId, productId);
    }
}