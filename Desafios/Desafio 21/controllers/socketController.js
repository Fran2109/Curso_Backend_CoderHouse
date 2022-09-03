import { faker } from "@faker-js/faker";
import { normalize, schema } from "normalizr";
import service from "./../service/index.js";

const generateObject = () => {
    return {
        title: faker.vehicle.vehicle(),
        thumbnail: faker.image.transport(640, 480, true),
        price: faker.random.numeric(7),
    };
};

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
const schemaMessages = new schema.Entity(
    "messages",
    {
        author: schemaAuthor,
    },
    { idAttribute: "id" }
);

const normalizeMessages = (messages) => {
    const messagesNormalized = normalize(messages, [schemaMessages]);
    return messagesNormalized;
};

async function socketController(socket, io) {
    socket.emit("connectionToServer", {
        array_productos: await service.getAllProducts(),
        array_mensajes: normalizeMessages(await service.getAllMessages()),
    });
    socket.emit("connectionToTest", {
        productsTest: service.populateProducts(generateObject),
    });
    socket.on("agregarProducto", async (data) => {
        await service.insertProduct(data);
        io.sockets.emit("actualizarTabla", {
            array_productos: await service.getAllProducts(),
        });
    });
    socket.on("enviarMensaje", async (data) => {
        await service.insertMessage(data);
        io.sockets.emit("actualizarMensajes", {
            array_mensajes: normalizeMessages(await service.getAllMessages()),
        });
    });
    socket.on("eliminarProductos", async () => {
        await service.deleteAllProducts();
        io.sockets.emit("actualizarTabla", {
            array_productos: await service.getAllProducts(),
        });
    });
    socket.on("eliminarMensajes", async () => {
        await service.deleteAllMessages();
        io.sockets.emit("actualizarMensajes", {
            array_mensajes: normalizeMessages(await service.getAllMessages()),
        });
    });
    socket.on("eliminarProducto", async (id) => {
        await service.deleteProductById(id);
        io.sockets.emit("actualizarTabla", {
            array_productos: await service.getAllProducts(),
        });
    });
    socket.on("editarProducto", async (id, producto) => {
        await service.updateProductById(id, producto);
        io.sockets.emit("actualizarTabla", {
            array_productos: await service.getAllProducts(),
        });
    });
}

export default socketController;
