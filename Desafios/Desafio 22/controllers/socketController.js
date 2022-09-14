import { faker } from "@faker-js/faker";
import { normalize, schema } from "normalizr";
import service from "./../service/index.js";
export default class socketController {
    #io
    #schemaAuthor
    #schemaMessages
    constructor(io){
        this.#io = io;
        this.#schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
        this.#schemaMessages = new schema.Entity("messages", { author: this.#schemaAuthor, }, { idAttribute: "id" });
    }
    #generateObject() {
        return {
            title: faker.vehicle.vehicle(),
            thumbnail: faker.image.transport(640, 480, true),
            price: faker.random.numeric(7),
        };
    }
    #normalizeMessages(messages) {
        const messagesNormalized = normalize(messages, [this.#schemaMessages]);
        return messagesNormalized;
    }
    async start(socket){
        socket.emit("connectionToServer", {
            array_productos: await service.getAllProducts(),
            array_mensajes: this.#normalizeMessages(await service.getAllMessages()),
        });
        socket.emit("connectionToTest", {
            productsTest: service.populateProducts(this.#generateObject),
        });
        socket.on("agregarProducto", async (data) => {
            await service.insertProduct(data);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await service.getAllProducts(),
            });
        });
        socket.on("enviarMensaje", async (data) => {
            await service.insertMessage(data);
            this.#io.sockets.emit("actualizarMensajes", {
                array_mensajes: this.#normalizeMessages(await service.getAllMessages()),
            });
        });
        socket.on("eliminarProductos", async () => {
            await service.deleteAllProducts();
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await service.getAllProducts(),
            });
        });
        socket.on("eliminarMensajes", async () => {
            await service.deleteAllMessages();
            this.#io.sockets.emit("actualizarMensajes", {
                array_mensajes: this.#normalizeMessages(await service.getAllMessages()),
            });
        });
        socket.on("eliminarProducto", async (id) => {
            await service.deleteProductById(id);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await service.getAllProducts(),
            });
        });
        socket.on("editarProducto", async (id, producto) => {
            await service.updateProductById(id, producto);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await service.getAllProducts(),
            });
        });
    }
}