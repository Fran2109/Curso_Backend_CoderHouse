import { storage } from "./../args/args.js";

let products;

switch(storage){
    case "mongo":
        const { productsCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoProducts } = await import('./../DAO/daoMongoProducts.js');
        products = new daoMongoProducts(productsCollection);
        break;
    default:
        throw new Error("No se ha encontrado el tipo de almacenamiento");
}

export { products };

