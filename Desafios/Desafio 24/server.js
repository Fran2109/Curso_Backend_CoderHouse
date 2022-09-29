// Server
import express from 'express';
// Logs
import { errorHandling } from './errors/errorHandling.js';
// Routers
import ImagesRouter from './routers/imagesRouter.js';
import ProductsRouter from './routers/productsRouter.js';
// Server
import initializeServer from './server/initializeServer.js';
// Middlewares
import { logInfo } from "./middlewares/logsMiddlewares.js";

const app = express();
const imagesRouter = new ImagesRouter();
const productsRouter = new ProductsRouter();

// Middlewares
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logInfo);

// Routers
app.use('/api/images', imagesRouter.start());
app.use('/api/products', productsRouter.start());

// Error handling
app.use(errorHandling);

initializeServer(app);