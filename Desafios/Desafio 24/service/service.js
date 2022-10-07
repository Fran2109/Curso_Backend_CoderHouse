import ProductsRepository from "../repository/productsRepository.js";
import UsersRepository from "./../repository/usersRepository.js";
import CartsRepository from "./../repository/cartsRepository.js";
import OrdersRepository from "./../repository/ordersRepository.js";
import MessagesRepository from "./../repository/messagesRepository.js";
import Mailer from "./../mail/mailer.js";
import logger from "./../logs/index.js";
import { mailReceiver } from "./../configs/config.js";

export default class Service {
    #repoProducts;
    #repoUsers;
    #repoCarts;
    #repoOrders;
    #repoMessages;
    #mail
    /**
    * @param {ProductsRepository} repoProducts
    * @param {UsersRepository} repoUsers
    * @param {CartsRepository} repoCarts
    * @param {OrdersRepository} repoOrders
    * @param {MessagesRepository} repoMessages
    * @param {Mailer} mail
    **/
    constructor(repoProducts, repoUsers, repoCarts, repoOrders, repoMessages, mail) {
        this.#repoProducts = repoProducts;
        this.#repoUsers = repoUsers;
        this.#repoCarts = repoCarts;
        this.#repoOrders = repoOrders;
        this.#repoMessages = repoMessages;
        this.#mail = mail;
    }
    async insertProduct(product) {
        try {
            const added = await this.#repoProducts.save(product);
            return added;
        } catch (err) {
            logger.error(`Error al Insertar: ${err.message}`);
            throw new Error(`Error al Insertar: ${err.message}`)
        }
    }
    async getProductById(id) {
        try {
            const element = await this.#repoProducts.getById(id);
            return element;
        } catch (err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
    async getAllProducts() {
        try {
            const elements = await this.#repoProducts.getAll();
            return elements;
        } catch (err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
    async updateProductById(id, elem) {
        try {
            const updated = await this.#repoProducts.updateById(id, elem);
            return updated;
        } catch (err) {
            logger.error(`Error al Actualizar: ${err.message}`);
            throw new Error(`Error al Actualizar: ${err.message}`)
        }
    }
    async deleteProductById(id) {
        try {
            const deleted = await this.#repoProducts.deleteById(id);
            await this.#repoCarts.deleteProductFromAllCarts(id);
            return deleted;
        } catch (err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    async deleteAllProducts() {
        try {
            await this.#repoProducts.deleteAll();
            await this.#repoCarts.deleteAllProductsFromCarts();
        } catch (err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    async registerUser(user) {
        try {
            const added = await this.#repoUsers.saveIfNotExists(user);
            if(added) {
                this.#mail.sendMailInRegister(user, mailReceiver)
                await this.#repoCarts.createIfNotExists({id: added.id})
            }
            return added;
        } catch (err) {
            logger.error(`Error al Registrar: ${err.message}`);
            throw new Error(`Error al Registrar: ${err.message}`)
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.#repoUsers.findUserByEmail(email);
            return user;
        } catch (err) {
            logger.error(`Error al Loguear: ${err.message}`);
            throw new Error(`Error al Loguear: ${err.message}`)
        }
    }
    async insertProductToCart(userId, productId) {
        try {
            const product = await this.#repoProducts.getById(productId);
            if(!product) {
                throw new Error(`Product not Found`);
            }
            const cart = await this.#repoCarts.insertProductToCart(userId, productId);
            return cart;
        } catch (err) {
            logger.error(`Error al Agregar Producto al Carrito: ${err.message}`);
            throw new Error(`Error al Agregar Producto al Carrito: ${err.message}`)
        }
    }
    async getCart(userId) {
        try {
            const cart = await this.#repoCarts.getCart(userId);
            if(!cart) {
                throw new Error(`Cart not Found`);
            }
            for(const product of cart.products) {
                const productData = await this.#repoProducts.getById(product.id);
                product.product = {
                    id: productData.id,
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    image: productData.image
                }
                delete(product.id);
            }
            return cart;
        } catch (err) {
            logger.error(`Error al Obtener Carrito: ${err.message}`);
            throw new Error(`Error al Obtener Carrito: ${err.message}`)
        }
    }
    async deleteProductFromCart(userId, productId) {
        try {
            const product = await this.#repoProducts.getById(productId);
            if(!product) {
                throw new Error(`Product not Exists`);
            }
            const deleted = await this.#repoCarts.deleteProductFromCart(userId, productId);
            return deleted;
        } catch (err) {
            logger.error(`Error al Borrar Producto del Carrito: ${err.message}`);
            throw new Error(`Error al Borrar Producto del Carrito: ${err.message}`)
        }
    }
    async createOrder(cart, user){
        try {
            const order = await this.#repoOrders.createOrder(cart);
            this.#mail.sendMailInAcceptToUser(order, user);
            this.#mail.sendMailInAcceptToAdmin(order, user, mailReceiver);
            await this.clearCart(order.idClient)
            return order;
        } catch (err) {
            logger.error(`Error al Crear Orden: ${err.message}`);
            throw new Error(`Error al Crear Orden: ${err.message}`)
        }
    }
    async clearCart(userId){
        try {
            const cleared = await this.#repoCarts.clearCart(userId);
            return cleared;
        } catch (err) {
            logger.error(`Error al Limpiar Carrito: ${err.message}`);
            throw new Error(`Error al Limpiar Carrito: ${err.message}`)
        }
    }
    async getOrders(userId){
        try{
            const orders = await this.#repoOrders.getOrders(userId);
            return orders;
        } catch (err) {
            logger.error(`Error al Obtener Ordenes: ${err.message}`);
            throw new Error(`Error al Obtener Ordenes: ${err.message}`)
        }
    }
    async getAllMessages(){
        try{
            const messages = await this.#repoMessages.getAll();
            return messages;
        } catch (err) {
            logger.error(`Error al Obtener Mensajes: ${err.message}`);
            throw new Error(`Error al Obtener Mensajes: ${err.message}`)
        }
    }
    async insertMessage(message){
        try{
            const created = await this.#repoMessages.save(message);
            return created;
        } catch (err) {
            logger.error(`Error al Crear Mensaje: ${err.message}`);
            throw new Error(`Error al Crear Mensaje: ${err.message}`)
        }
    }
}