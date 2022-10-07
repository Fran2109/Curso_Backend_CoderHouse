// Server
import express from 'express';
// Handlebars
import { engine } from 'express-handlebars';
import { handlebarsConfig } from './configs/config.js';
// Socket.io
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import SocketController from "./controllers/socketController.js";
// Logs
import { errorHandling } from './errors/errorHandling.js';
// Routers
import ImagesRouter from './routers/imagesRouter.js';
import ProductsRouter from './routers/productsRouter.js';
import UsersRouter from './routers/usersRouter.js';
import LoginRouter from './routers/loginRouter.js';
import CartsRouter from './routers/cartsRouter.js';
import OrdersRouter from './routers/ordersRouter.js';
import InfoRouter from './routers/infoRouter.js';
// Server
import initializeServer from './server/initializeServer.js';
// Middlewares
import { logInfo } from "./middlewares/logsMiddlewares.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const imagesRouter = new ImagesRouter();
const productsRouter = new ProductsRouter();
const usersRouter = new UsersRouter();
const loginRouter = new LoginRouter();
const cartsRouter = new CartsRouter();
const ordersRouter = new OrdersRouter();
const infoRouter = new InfoRouter();
const socketController = new SocketController(io);

// Handlebars
app.engine('handlebars', engine(handlebarsConfig));
app.set('view engine', 'handlebars')
app.set('views', './public/views');

// Middlewares
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logInfo);

// Routers
app.use('/api/images', imagesRouter.start());
app.use('/api/products', productsRouter.start());
app.use('/api/users', usersRouter.start());
app.use('/api/shoppingcartproducts', cartsRouter.start());
app.use('/api/orders', ordersRouter.start());
app.use('/api/info', infoRouter.start());
app.use('/login', loginRouter.start());

// Error handling
app.use(errorHandling);

io.on("connection", (socket) => socketController.start(socket));

initializeServer(httpServer);