// Server
import express from 'express';
// Logs
import { errorHandling } from './errors/errorHandling.js';
// Routers
import ImagesRouter from './routers/imagesRouter.js';
// Server
import initializeServer from './server/initializeServer.js';


const app = express();
const imagesRouter = new ImagesRouter();

// Middlewares
app.use(express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api/images', imagesRouter.start());

// Error handling
app.use(errorHandling);

initializeServer(app);