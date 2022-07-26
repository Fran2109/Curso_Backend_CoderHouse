import MongoStore from 'connect-mongo';
import path from 'path';
import dotenv from 'dotenv';

/*const __dirname = process.cwd();
dotenv.config({
    path: path.resolve(__dirname, 'configs/config.env')
})

console.log(path.resolve(__dirname, 'configs/config.env'))*/

const mongooseConfig = {
    collections: {
        products: {
            name: "products",
            schema: {
                title: { type: String, require: true },
                price: { type: Number, require: true },
                thumbnail: { type: String, require: true }
            }
        },
        messages:{
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
                dateString: { type: String, require: true }
            }
        },
        users: {
            name: "users",
            schema: {
                username: { type: String, require: true },
                password: { type: String, require: true }
            }
        }
    }
}
const mongoStore = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://fran2109:Fran-2109@cluster0.9ghdw.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhh',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}

//const mongoUrl = process.env.MONGOURL;
const mongoUrl = "mongodb+srv://fran2109:Fran-2109@cluster0.9ghdw.mongodb.net/ecommerce?retryWrites=true&w=majority"
//const mongoOptions = JSON.parse(process.env.MONGOOPTIONS);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export { mongooseConfig, mongoStore, mongoUrl, mongoOptions };