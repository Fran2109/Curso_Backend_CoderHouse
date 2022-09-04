import { storage } from "./../args/args.js";
const { usersCollection } = await import("./../connections/mongoose.js");
import daoUsers from "./../DAO/daoMongoUsers.js";

let products;
let messages;
let users;

switch(storage){
    case "mongo":
        const { productsCollection, messagesCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoProducts } = await import('./../dao/daoMongoProducts.js');
        products = new daoMongoProducts(productsCollection);
        const { default : daoMongoMessages } = await import('./../dao/daoMongoMessages.js');
        messages = new daoMongoMessages(messagesCollection);
        break;
    case "memory":
        const { default : daoMemoryProducts } = await import('./../dao/daoMemoryProducts.js');
        products = new daoMemoryProducts();
        const { default : daoMemoryMessages } = await import('./../dao/daoMemoryMessages.js');
        messages = new daoMemoryMessages();
        break;
    case "file":
        const { productsFile, messagesFile } = await import("./../configs/config.js");
        const { default : daoFileProducts } = await import('./../dao/daoFileProducts.js');
        products = new daoFileProducts(productsFile);
        const { default : daoFileMessages } = await import('./../dao/daoFileMessages.js');
        messages = new daoFileMessages(messagesFile);
        break;
    default:
        throw new Error("No se ha encontrado el tipo de almacenamiento");
}

users = new daoUsers(usersCollection);

export { products, messages, users };

