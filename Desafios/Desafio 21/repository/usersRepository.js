import { users } from './../factory/factory.js';

export default class UsersRepository {
    constructor() {
        this.users = users;
    }
    async saveIfDontExists(userSignup) {
        const user = await this.users.saveIfDontExists(userSignup);
        return user;
    }
    async findByUsername(username) {
        const user = await this.users.findByUsername(username);
        return user;
    }
    async getById(id) {
        const user = await this.users.getById(id);
        return user;
    }
}