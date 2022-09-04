import dtoMessageMemory from '../DTO/dtoMessageMemory.js';

export default class daoMongoMessages {
    constructor() {
        this.collection = [];
    }
    async save(message) {
        let newId;
        if (this.collection.length == 0) {
            newId = 1;
        } else {
            newId = this.collection[ this.collection.length - 1 ].id + 1;
        }
        const newElem = { ...message, id: newId };
        this.collection.push(newElem);
        return new dtoMessageMemory(newElem);
    }
    async getAll() {
        console.log("Get All Mongo Messages")
        return this.collection.map((message) => new dtoMessageMemory(message) );
    }
    async deleteAll() {
        this.collection = [];
    }
}