import mongoContainer from "../containers/mongoContainer.js";

export default class daoMongoUsers extends mongoContainer {
    #collection;
    constructor(collection) {
        super(collection);
        this.#collection = collection;
    }
    async saveIfNotExists(user) {
        const userExists = await this.#collection.findOne({ email: user.email });
        if (userExists) {
            return null;
        }
        return await this.save(user);
    }
    async findUserByEmail(email) {
        const user = await this.#collection.findOne({ email: email });
        if(!user){
            return null;
        }
        return this.asDto(user);
    }
    /**
    * @override
    **/
    asDto(document){
        return {
            id: document.id,
            email: document.email,
            password: document.password,
            name: document.name,
            lastname: document.lastname,
            phone: document.phone,
            image: document.image,
        }
    }
}