import dtoProduct from '../DTO/dtoProductMongo.js';
import populateProducts from './../functions/populate.js';

export default class daoMongoProducts {
    constructor(collection) {
        this.collection = collection;
    }
    async save(elem){
        const added = new this.collection(elem);
        await added.save();
        return new dtoProduct(added);
    }
    async getById(id){
        const element = await this.collection.findById(id).select({ __v: 0 }).lean();
        return new dtoProduct(element);
    }
    async getAll(){
        const elements = await this.collection.find().select({ __v: 0 }).lean();
        console.log(elements)
        return elements.map(elem => new dtoProduct(elem));
    }
    async updateById(id, elem){
        const updated = await this.collection.findByIdAndUpdate(id, elem, { new: true });
        return new dtoProduct(updated);
    }
    async deleteById(id){
        const deleted = await this.collection.findByIdAndDelete(id);
        if(!deleted){ throw new Error(`Error al Borrar: Elemento no encontrado`) }
        return new dtoProduct(deleted);
    }
    async deleteAll(){
        await this.collection.deleteMany({});
    }
    populate(generateObject, cant){
        return populateProducts(generateObject, cant);
    }
}