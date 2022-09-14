import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import {
    getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, deleteAllProducts,
    getAllMessages, deleteAllMessages, insertMessage,
    getInfo
} from "./../controllers/graphqlController.js";

const schema = buildSchema(`
    input ProductInput{
        title: String
        price: Float
        thumbnail: String
    }
    type Product {
        id: ID
        title: String
        price: Float
        thumbnail: String
    }
    type Author{
        email: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    type Message{
        id: ID
        author: Author
        text: String
        dateString: String
    }
    input AuthorInput{
        email: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    input MessageInput{
        author: AuthorInput
        text: String
        dateString: String
    }
    type Info{
        argvs: String,
        nodeVersion: String,
        platform: String,
        memory: Float,
        pathEject: String,
        id: Float,
        pathProject: String,
        processors: Int,
    }
    type Query{
        getAllProducts: [Product]
        getProductById(id: ID): Product
        getAllMessages: [Message]
        getInfo: Info
    }
    type Mutation{
        createProduct(product: ProductInput): Product
        updateProduct(id: ID, product: ProductInput): Product
        deleteProduct(id: ID): Product
        deleteAllProducts: [Product]
        deleteAllMessages: [Message]
        insertMessage(message: MessageInput): Message
    }
`)

export const graphql = graphqlHTTP({
    schema: schema,
    rootValue: {
        getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, deleteAllProducts,
        getAllMessages, deleteAllMessages, insertMessage,
        getInfo
    },
    graphiql: true
});