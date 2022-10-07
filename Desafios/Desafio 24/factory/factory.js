import { storage } from "./../args/args.js";

let products;
let users;
let carts;
let orders;
let messages;

switch(storage){
    case "mongo":
        const { productsCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoProducts } = await import('../DAO/daoMongoProducts.js');
        products = new daoMongoProducts(productsCollection);
        const { usersCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoUsers } = await import('../DAO/daoMongoUsers.js');
        users = new daoMongoUsers(usersCollection);
        const { cartsCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoCarts } = await import('../DAO/daoMongoCarts.js');
        carts = new daoMongoCarts(cartsCollection);
        const { ordersCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoOrders } = await import('../DAO/daoMongoOrders.js');
        orders = new daoMongoOrders(ordersCollection);
        const { messagesCollection } = await import("./../connections/mongoose.js");
        const { default : daoMongoMessages } = await import('../DAO/daoMongoMessages.js');
        messages = new daoMongoMessages(messagesCollection);
        break;
    default:
        throw new Error("No se ha encontrado el tipo de almacenamiento");
}

export { products, users, carts, orders, messages };

