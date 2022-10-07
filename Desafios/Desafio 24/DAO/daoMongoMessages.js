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
    asDto(document){
        return {
            id: document.id,
            date: document.date,
            email: document.email,
            message: document.message
        }
    }
}