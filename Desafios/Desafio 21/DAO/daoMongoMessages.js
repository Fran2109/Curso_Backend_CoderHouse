import dtoMessageMongo from './../DTO/dtoMessageMongo.js';

export default class daoMongoMessages {
    #collection;
    constructor(collection) {
        this.#collection = collection;
    }
    async save(message) {
        const added = await this.#collection.create(message);
        return new dtoMessageMongo(added);
    }
    async getAll() {
        const elements = await this.#collection.find().select({ __v: 0 }).lean();
        return elements.map(elem => new dtoMessageMongo(elem));
    }
    async deleteAll() {
        await this.#collection.deleteMany({});
    }
}