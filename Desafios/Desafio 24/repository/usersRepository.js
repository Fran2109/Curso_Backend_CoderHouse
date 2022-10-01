import { users } from './../factory/factory.js';

export default class UsersRepository {
    #users;
    constructor() {
        this.#users = users;
    }
    async saveIfNotExists(elem){
        return await this.#users.saveIfNotExists(elem);
    }
    async findUserByEmail(email){
        return await this.#users.findUserByEmail(email);
    }
}