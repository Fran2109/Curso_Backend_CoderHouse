import dtoMessageMemory from '../DTO/dtoMessageMemory.js';

export default class daoMongoMessages {
    #collection;
    constructor() {
        this.#collection = [];
    }
    async save(message) {
        let newId;
        if (this.#collection.length == 0) {
            newId = 1;
        } else {
            newId = this.#collection[ this.#collection.length - 1 ].id + 1;
        }
        const newElem = { ...message, id: newId };
        this.#collection.push(newElem);
        return new dtoMessageMemory(newElem);
    }
    async getAll() {
        return this.#collection.map((message) => new dtoMessageMemory(message) );
    }
    async deleteAll() {
        this.#collection = [];
    }
}