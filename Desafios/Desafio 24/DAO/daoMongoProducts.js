import mongoContainer from "../containers/mongoContainer.js";

export default class daoMongoProducts extends mongoContainer {
    #collection;
    constructor(collection) {
        super(collection);
        this.#collection = collection;
    }
    /**
    * @override
    **/
    asDto = document => {
        return {
            id: document.id,
            name: document.name,
            description: document.description,
            price: document.price,
            image: document.image
        }
    }
}