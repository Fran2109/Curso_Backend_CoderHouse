import { logger } from "../containers/index.js";
import ProductsRepository from "../repository/productsRepository.js";
import MessagesRepository from "../repository/messagesRepository.js";
import UsersRepository from "../repository/usersRepository.js";

export default class Service {
    #repoProducts;
    #repoMessages;
    #repoUsers;
    /**
    * @param {ProductsRepository} repoProducts
    * @param {MessagesRepository} repoMessages
    * @param {UsersRepository} repoUsers
    **/
    constructor(repoProducts, repoMessages, repoUsers) {
        this.#repoProducts = repoProducts;
        this.#repoMessages = repoMessages;
        this.#repoUsers = repoUsers;
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
            return deleted;
        } catch (err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    async deleteAllProducts() {
        try {
            await this.#repoProducts.deleteAll();
        } catch (err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    populateProducts(generateObject, cant = 100) {
        try {
            const array = this.#repoProducts.populate(generateObject, cant);
            return array
        } catch (err) {
            logger.error(`Error al Crear: ${err.message}`);
            throw new Error(`Error al Crear: ${err.message}`)
        }
    }
    async insertMessage(message) {
        try {
            const added = await this.#repoMessages.save(message);
            return added;
        } catch (err) {
            logger.error(`Error al Insertar: ${err.message}`);
            throw new Error(`Error al Insertar: ${err.message}`)
        }
    }
    async getAllMessages() {
        try {
            const elements = await this.#repoMessages.getAll();
            return elements;
        } catch (err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
    async deleteAllMessages() {
        try {
            await this.#repoMessages.deleteAll();
        } catch (err) {
            logger.error(`Error al Borrar: ${err.message}`);
            throw new Error(`Error al Borrar: ${err.message}`)
        }
    }
    async saveUserIfDontExists(user) {
        try {
            const added = await this.#repoUsers.saveIfDontExists(user);
            return added;
        } catch (err) {
            logger.error(`Error al Insertar: ${err.message}`);
            throw new Error(`Error al Insertar: ${err.message}`)
        }
    }
    async findByUsername(username) {
        try {
            const user = await this.#repoUsers.findByUsername(username);
            return user;
        } catch (err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
    async getUserById(id) {
        try {
            const element = await this.#repoUsers.getById(id);
            return element;
        } catch (err) {
            logger.error(`Error al Leer: ${err.message}`);
            throw new Error(`Error al Leer: ${err.message}`)
        }
    }
}