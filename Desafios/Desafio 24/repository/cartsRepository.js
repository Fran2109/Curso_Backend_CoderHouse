import { carts } from './../factory/factory.js';

export default class UsersRepository {
    #carts;
    constructor() {
        this.#carts = carts;
    }
    async createIfNotExists(elem){
        return await this.#carts.createIfNotExists(elem);
    }
}