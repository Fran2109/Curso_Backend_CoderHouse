import { faker } from "@faker-js/faker";
import { normalize, schema } from "normalizr";
import Service from "./../service/service.js";

export default class socketController {
    #io
    #service
    #schemaAuthor
    #schemaMessages
    /**
        @param {Service} service
    **/
    constructor(io, service){
        this.#io = io;
        this.#service = service;
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
            array_productos: await this.#service.getAllProducts(),
            array_mensajes: this.#normalizeMessages(await this.#service.getAllMessages()),
        });
        socket.emit("connectionToTest", {
            productsTest: this.#service.populateProducts(this.#generateObject),
        });
        socket.on("agregarProducto", async (data) => {
            await this.#service.insertProduct(data);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await this.#service.getAllProducts(),
            });
        });
        socket.on("enviarMensaje", async (data) => {
            await this.#service.insertMessage(data);
            this.#io.sockets.emit("actualizarMensajes", {
                array_mensajes: this.#normalizeMessages(await this.#service.getAllMessages()),
            });
        });
        socket.on("eliminarProductos", async () => {
            await this.#service.deleteAllProducts();
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await this.#service.getAllProducts(),
            });
        });
        socket.on("eliminarMensajes", async () => {
            await this.#service.deleteAllMessages();
            this.#io.sockets.emit("actualizarMensajes", {
                array_mensajes: this.#normalizeMessages(await this.#service.getAllMessages()),
            });
        });
        socket.on("eliminarProducto", async (id) => {
            await this.#service.deleteProductById(id);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await this.#service.getAllProducts(),
            });
        });
        socket.on("editarProducto", async (id, producto) => {
            await this.#service.updateProductById(id, producto);
            this.#io.sockets.emit("actualizarTabla", {
                array_productos: await this.#service.getAllProducts(),
            });
        });
    }
}