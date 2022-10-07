
export default class mongoContainer {
    #collection;
    constructor(collection) {
        this.#collection = collection;
    }
    async save(elem){
        const added = new this.#collection(elem);
        await added.save();
        return this.asDto(added);
    }
    async getById(id){
        try {
            const element = await this.#collection.findOne({id}).select({ __v: 0, _id: 0}).lean();
            return this.asDto(element); 
        } catch (error) {
            return null;
        }
    }
    async getAll(){
        const elements = await this.#collection.find().select({ __v: 0, _id: 0}).lean();
        return elements.map(elem => this.asDto(elem));
    }
    async updateById(id, elem){
        try {
            const updated = await this.#collection.findOneAndUpdate({id}, elem, { new: true });
            return this.asDto(updated);
        } catch (error) {
            return null;
        }
    }
    async deleteById(id){
        try {
            const deleted = await this.#collection.findOneAndDelete({id});
            return this.asDto(deleted);
        } catch (error) {
            return null
        }        
    }
    async deleteAll(){
        await this.#collection.deleteMany({});
    }
    asDto(document){
        throw new Error('Not Implemented') 
    }
}