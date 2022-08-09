// Server
import express from 'express';
import initializeServer from './server/initializeServer.js';
// Yargs
import { port } from './args/args.js';
// Session
import sessionHandler from './session/session.js';
// Passport
import { passportInitialize, passportSession } from './passport/passport.js';
// Routers
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import usersRouter from './routers/usersRouter.js';

const app = express();

// Middlewares
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionHandler);
app.use(passportInitialize);
app.use(passportSession);

// Routers
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/users', usersRouter);

initializeServer(app, port);