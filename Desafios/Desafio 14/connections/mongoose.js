import mongoose from "mongoose";
import { mongooseConfig } from '../config.js';
const { collections } = mongooseConfig;
const { products, messages, users } = collections;
import path from 'path';
import dotenv from 'dotenv';

const __dirname = process.cwd();
dotenv.config({
    path: path.resolve(__dirname, 'config.env')
})

let productsCollection;
let messagesCollection;
let usersCollection;

await mongoose.connect(process.env.MONGOURL, JSON.parse(process.env.MONGOOPTIONS))
    .then(() => {
        productsCollection = mongoose.model(products.name, products.schema);
        messagesCollection = mongoose.model(messages.name, messages.schema);
        usersCollection = mongoose.model(users.name, users.schema);
    })
    .catch(err => {
        console.log(err);
    }
);

export { productsCollection, messagesCollection, usersCollection };