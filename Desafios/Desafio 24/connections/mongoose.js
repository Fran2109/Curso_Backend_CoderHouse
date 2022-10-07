import mongoose from "mongoose";
import { mongoUrl, mongoOptions, mongooseConfig } from "../configs/config.js";
import logger from "./../logs/index.js";

const { collections } = mongooseConfig;
const { products, users, carts, orders } = collections;

let productsCollection;
let usersCollection;
let cartsCollection;
let ordersCollection;

await mongoose
    .connect(mongoUrl, mongoOptions)
    .then(() => {
        productsCollection = mongoose.model(products.name, products.schema);
        usersCollection = mongoose.model(users.name, users.schema);
        cartsCollection = mongoose.model(carts.name, carts.schema);
        ordersCollection = mongoose.model(orders.name, orders.schema);
    })
    .catch((err) => {
        logger.error(err);
    });

export { productsCollection, usersCollection, cartsCollection, ordersCollection };