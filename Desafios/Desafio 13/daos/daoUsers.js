import ContainerMongoose from "../containers/ContainerMongoose.js";

class daoUsers extends ContainerMongoose{
    constructor(collection, url, options) {
        super(collection, url, options)
    }
    async findByUsername(username) {
        const userFinded = await this.collection.findOne({ username });
        return userFinded;
    }
    async saveIfDontExists(user) {
        const userFinded = await this.findByUsername(user.username);
        let added;
        if(!userFinded){
            added= await this.save(user);
        }
        return added;
    }
}

export default daoUsers;