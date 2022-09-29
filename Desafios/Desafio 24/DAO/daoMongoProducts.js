import mongoContainer from "../containers/mongoContainer.js";
import dtoMongoProducts from "../DTO/dtoMongoProducts.js";

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
        return new dtoMongoProducts(document)
    }
}