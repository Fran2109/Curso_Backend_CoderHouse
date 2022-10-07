import { messages } from '../factory/factory.js';
import Id from '../models/modelId.js';
import Message from '../models/modelMessage.js';
import MessageDto from '../DTO/dtoMessage.js';

export default class MessagesRepository {
    #messages;
    constructor() {
        this.#messages = messages;
    }
    async save(elem){
        const id = Id.new();
        const message = new Message({id, ...elem});
        const saved = await this.#messages.save(message.toJSON());
        return new MessageDto(saved);
    }
    async getAll(){
        const messages = await this.#messages.getAll();
        return messages.map(message => new MessageDto(message));
    }
}