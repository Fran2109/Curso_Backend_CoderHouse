import express from 'express';
import { port } from './args/args.js';
import initializeServer from './server/initializeServer.js';
//import productsRouter from './routers/productsRouter.js';
//import cartsRouter from './routers/cartsRouter.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/products', productsRouter);
//app.use('/carts', cartsRouter);

initializeServer(app, port);