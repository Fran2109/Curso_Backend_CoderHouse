import path from "path";
import dotenv from "dotenv";
import { dev } from "../args/args.js";

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
                id: { type: String, require: true },
                name: { type: String, require: true },
                description: { type: String, require: true },
                price: { type: Number, require: true },
                image: { type: String, require: true },
            },
        },
        users: {
            name: "users",
            schema: {                    
                id: { type: String, require: true },
                email: { type: String, require: true },
                password: { type: String, require: true },
                name: { type: String, require: true },
                lastname: { type: String, require: true },
                phone: { type: String, require: true },
                image: { type: String, require: true }
            }
        },
        carts: {
            name: "carts",
            schema: {
                id: { type: String, require: true },
                products: {
                    type: [{
                        id: { type: String, require: true },
                        cant: { type: Number, require: true }
                    }],
                    default: []
                }
            }
        }
    },
};


export const mongoOptions = JSON.parse(process.env.MONGOOPTIONS);
export const mongoUrl = dev? process.env.MONGOURLDEV : process.env.MONGOURLPROD;
export const privateJWTKey = process.env.PRIVATE_JWT_KEY;
export const expiresInToken = process.env.EXPIRES_IN_TOKEN;
export const adminMail = process.env.ADMIN_MAIL;