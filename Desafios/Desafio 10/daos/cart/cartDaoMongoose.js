import ContainerMongoose from "../../containers/ContainerMongoose.js";

class cartDaoMongoose extends ContainerMongoose{
    constructor(collection, url, options){
        super(collection, url, options);
    }
}

export default cartDaoMongoose;