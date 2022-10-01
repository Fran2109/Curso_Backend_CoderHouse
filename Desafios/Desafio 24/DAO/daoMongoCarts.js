import mongoContainer from "../containers/mongoContainer.js";

export default class daoMongoCarts extends mongoContainer {
    #collection;
    constructor(collection) {
        super(collection);
        this.#collection = collection;
    }
    async createIfNotExists(elem){
        const { id } = elem;
        const cart = await this.#collection.findOne({ id });
        if(!cart){
            return await this.save(elem);
        } else {
            return cart;
        }
    }
    /**
    * @override
    **/
    asDto = document => {
        console.log(document);
        return {
            document
        }
    }
}