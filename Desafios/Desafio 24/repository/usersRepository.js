import { users } from './../factory/factory.js';
import Id from './../models/modelId.js';
import User from './../models/modelUser.js';
import UsertDto from './../DTO/dtoUser.js';

export default class UsersRepository {
    #users;
    constructor() {
        this.#users = users;
    }
    async saveIfNotExists(elem){
        const id = Id.new();
        const user = new User({id, ...elem});
        const saved = await this.#users.saveIfNotExists(user.toJSON());
        if(!saved){
            return null;
        }
        return new UsertDto(saved);
    }
    async findUserByEmail(email){
        const user = await this.#users.findUserByEmail(email);
        if(!user){
            return null;
        }
        return new UsertDto(user);
    }
}