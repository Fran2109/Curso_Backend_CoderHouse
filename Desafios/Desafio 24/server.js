// Server
import express from 'express';
// Logs
import { errorHandling } from './errors/errorHandling.js';
// Yargs
import { port } from './args/args.js';
// Routers
import ImagesRouter from './routers/imagesRouter.js';



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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});