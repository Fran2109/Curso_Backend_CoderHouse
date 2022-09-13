import { users } from './../factory/factory.js';

export default class UsersRepository {
    #users;
    constructor() {
        this.#users = users;
    }
    async saveIfDontExists(userSignup) {
        return await this.#users.saveIfDontExists(userSignup);
    }
    async findByUsername(username) {
        return await this.#users.findByUsername(username);
    }
    async getById(id) {
        return await this.#users.getById(id);
    }
}