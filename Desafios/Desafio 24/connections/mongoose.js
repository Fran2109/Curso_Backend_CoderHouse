import mongoose from "mongoose";
import { mongoUrl, mongoOptions, mongooseConfig } from "../configs/config.js";
import logger from "./../logs/index.js";

const { collections } = mongooseConfig;
const { products, messages, users, carts } = collections;

let productsCollection;
//let messagesCollection;
let usersCollection;
let cartsCollection;

await mongoose
    .connect(mongoUrl, mongoOptions)
    .then(() => {
        productsCollection = mongoose.model(products.name, products.schema);
        //messagesCollection = mongoose.model(messages.name, messages.schema);
        usersCollection = mongoose.model(users.name, users.schema);
        cartsCollection = mongoose.model(carts.name, carts.schema);
    })
    .catch((err) => {
        logger.error(err);
    });

export { productsCollection, usersCollection, cartsCollection };
