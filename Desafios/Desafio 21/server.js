import express from "express";
// Session
import { sessionHandler } from "./middlewares/session.js";
// Authentication
import { passportInitialize, passportSession } from "./middlewares/passport.js";
// Socket
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import SocketController from "./controllers/socketController.js";
// Routers
import WebRouter from "./routers/webRouter.js";
import ApiRouter from "./routers/apiRouter.js";
// Args
import { port } from "./args/args.js";
// Server
import initializeServer from "./server/initializeServer.js";
// Logs
import { logWarning } from "./middlewares/logsMiddlewares.js";
// Service
import service from "./service/index.js";

// Consts
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionHandler);
app.use(passportInitialize);
app.use(passportSession);

// Routers
const webRouter = new WebRouter();
const apiRouter = new ApiRouter();
app.use("/", webRouter.start());
app.use("/api", apiRouter.start());

app.all("*", logWarning, (req, res) => {
    res.status(404).json({
        error: 404,
        descripcion: `ruta '${req.url}' método '${req.method}' no implementada`,
    });
});

const socketController = new SocketController(io, service);
io.on("connection", (socket) => socketController.start(socket));
//io.on("connection", (socket) => socketController(socket, io));

//Listen
initializeServer(httpServer, port);
