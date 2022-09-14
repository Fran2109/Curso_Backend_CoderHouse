export default class daoMongoUsers {
    #collection;
    constructor(collection) {
        this.#collection = collection;
    }
    async save(user) {
        const added = new this.#collection(user);
        await added.save();
        return added;
    }
    async findByUsername(username) {
        const userFinded = await this.#collection.findOne({ username });
        return userFinded;
    }
    async saveIfDontExists(user) {
        const userFinded = await this.findByUsername(user.username);
        let added;
        if (!userFinded) {
            added = await this.save(user);
        }
        return added;
    }
    async getById(id) {
        const userFinded = await this.#collection.findOne({ _id: id });
        return userFinded;
    }
}