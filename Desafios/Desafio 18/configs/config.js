import { dev } from './../args/args.js';
import path from 'path';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';

if(dev){
    const __dirname = process.cwd();
    dotenv.config({
        path: path.resolve(__dirname, 'configs/config.env')
    })
}

export const mongoUrl = process.env.MONGOURL;

export const mongoOptions = JSON.parse(process.env.MONGOOPTIONS);

export const mongoStore = {
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        mongoOptions: mongoOptions
    }),
    secret: process.env.MONGOSECRET,
    resave: eval(process.env.MONGORESAVE),
    saveUninitialized: eval(process.env.MONGOSAVEUNINITIALIZED),
    cookie: {
        maxAge: eval(process.env.MONGOCOOKIEMAXAGE)
    }
}

export const mongooseConfig = {
    collections: {
        users: {
            name: "users",
            schema: {
                email: { type: String, required: true },
                password: { type: String, required: true },
                name: { type: String, required: true },
                lastname: { type: String, required: true },
                phone: { type: String, required: true }
            }
        }
    }
}