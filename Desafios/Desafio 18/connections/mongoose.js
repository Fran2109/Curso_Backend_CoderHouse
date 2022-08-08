import mongoose from "mongoose";
import { mongooseConfig, mongoUrl, mongoOptions } from '../configs/config.js';
import logger from "../logs/logger.js";

const { collections } = mongooseConfig;
const { users, products, carts } = collections;

let usersCollection;
let productsCollection;
let cartsCollection;

await mongoose.connect(mongoUrl, mongoOptions)
    .then(() => {
        usersCollection = mongoose.model(users.name, users.schema);
        productsCollection = mongoose.model(products.name, products.schema);
        cartsCollection = mongoose.model(carts.name, carts.schema);
    })
    .catch(err => {
        logger.error(err);
    }
);

export { usersCollection, productsCollection, cartsCollection };