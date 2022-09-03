import { messages } from './../factory/factory.js';

export default class MessagesRepository {
    constructor() {
        this.messages = messages;
    }
    async save(message) {
        const added = await this.messages.save(message);
        return added;
    }
    async getAll(){
        const elements = await this.messages.getAll();
        return elements;
    }
    async deleteAll(){
        await this.messages.deleteAll();
    }
}