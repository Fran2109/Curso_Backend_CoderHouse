// Server
import express from 'express';
// Logs
import { errorHandling } from './errors/errorHandling.js';
// Routers
import ImagesRouter from './routers/imagesRouter.js';
import ProductsRouter from './routers/productsRouter.js';
import UsersRouter from './routers/usersRouter.js';
import LoginRouter from './routers/loginRouter.js';
// Server
import initializeServer from './server/initializeServer.js';
// Middlewares
import { logInfo } from "./middlewares/logsMiddlewares.js";

const app = express();
const imagesRouter = new ImagesRouter();
const productsRouter = new ProductsRouter();
const usersRouter = new UsersRouter();
const loginRouter = new LoginRouter();

// Middlewares
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logInfo);

// Routers
app.use('/api/images', imagesRouter.start());
app.use('/api/products', productsRouter.start());
app.use('/api/users', usersRouter.start());
app.use('/login', loginRouter.start());

// Error handling
app.use(errorHandling);

initializeServer(app);