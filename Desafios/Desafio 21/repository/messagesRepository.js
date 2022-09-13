import { messages } from './../factory/factory.js';

export default class MessagesRepository {
    #messages
    constructor() {
        this.#messages = messages;
    }
    async save(message) {
        return await this.#messages.save(message);
    }
    async getAll(){
        return await this.#messages.getAll();
    }
    async deleteAll(){
        await this.#messages.deleteAll();
    }
}