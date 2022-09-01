import MongoStore from "connect-mongo";
import path from "path";
import dotenv from "dotenv";
import { dev } from "./../args/args.js";

if (dev) {
    const __dirname = process.cwd();
    dotenv.config({
        path: path.resolve(__dirname, "configs/config.env"),
    });
}

export const mongooseConfig = {
    collections: {
        products: {
            name: "products",
            schema: {
                title: { type: String, require: true },
                price: { type: Number, require: true },
                thumbnail: { type: String, require: true },
            },
        },
        messages: {
            name: "messages",
            schema: {
                author: {
                    email: { type: String, require: true },
                    nombre: { type: String, require: true },
                    apellido: { type: String, require: true },
                    edad: { type: Number, require: true },
                    alias: { type: String, require: true },
                    avatar: { type: String, require: true },
                },
                text: { type: String, require: true },
                dateString: { type: String, require: true },
            },
        },
        users: {
            name: "users",
            schema: {
                username: { type: String, require: true },
                password: { type: String, require: true },
            },
        },
    },
};
export const mongoUrl = process.env.MONGOURL;
export const mongoOptions = JSON.parse(process.env.MONGOOPTIONS);
export const productsFile = process.env.PRODUCTSFILE;
export const messagesFile = process.env.MESSAGESFILE;
export const mongoStore = {
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        mongoOptions: mongoOptions,
    }),
    secret: "shhhhhhhhhhhhhhhhhhhh",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
    },
};

