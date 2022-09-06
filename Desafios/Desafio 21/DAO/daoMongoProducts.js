import dtoProduct from '../DTO/dtoProductMongo.js';
import populateProducts from './../functions/populate.js';

export default class daoMongoProducts {
    #collection;
    constructor(collection) {
        this.#collection = collection;
    }
    async save(elem){
        const added = new this.#collection(elem);
        await added.save();
        return new dtoProduct(added);
    }
    async getById(id){
        try {
            const element = await this.#collection.findById(id).select({ __v: 0 }).lean();
            return new dtoProduct(element); 
        } catch (error) {
            return null;
        }
    }
    async getAll(){
        const elements = await this.#collection.find().select({ __v: 0 }).lean();
        return elements.map(elem => new dtoProduct(elem));
    }
    async updateById(id, elem){
        try {
            const updated = await this.#collection.findByIdAndUpdate(id, elem, { new: true });
            return new dtoProduct(updated);
        } catch (error) {
            return null;
        }
    }
    async deleteById(id){
        try {
            const deleted = await this.#collection.findByIdAndDelete(id);
            return new dtoProduct(deleted);
        } catch (error) {
            return null
        }        
    }
    async deleteAll(){
        await this.#collection.deleteMany({});
    }
    populate(generateObject, cant){
        return populateProducts(generateObject, cant);
    }
}