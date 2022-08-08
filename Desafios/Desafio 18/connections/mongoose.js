import mongoose from "mongoose";
import { mongooseConfig, mongoUrl, mongoOptions } from '../configs/config.js';
import logger from "../logs/logger.js";

const { collections } = mongooseConfig;
const { users } = collections;

let usersCollection;

await mongoose.connect(mongoUrl, mongoOptions)
    .then(() => {
        usersCollection = mongoose.model(users.name, users.schema);
    })
    .catch(err => {
        logger.error(err);
    }
);

export { usersCollection };