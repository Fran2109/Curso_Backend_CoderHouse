import ContainerMongoose from "../../containers/ContainerMongoose.js";

class productDaoMongoose extends ContainerMongoose{
    constructor(collection, url, options){
        super(collection, url, options);
    }
}

export default productDaoMongoose;