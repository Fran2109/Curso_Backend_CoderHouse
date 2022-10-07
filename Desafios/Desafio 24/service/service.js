import ProductsRepository from "../repository/productsRepository.js";
import UsersRepository from "./../repository/usersRepository.js";
import CartsRepository from "./../repository/cartsRepository.js";
import logger from "./../logs/index.js";

export default class Service {
    #repoProducts;
    #repoUsers;
    #repoCarts;
    /**
    * @param {ProductsRepository} repoProducts
    * @param {UsersRepository} repoUsers
    * @param {CartsRepository} repoCarts
    **/
    constructor(repoProducts, repoUsers, repoCarts) {
        this.#repoProducts = repoProducts;
        this.#repoUsers = repoUsers;
        this.#repoCarts = repoCarts;
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
                await this.#repoCarts.createIfNotExists({id: added.id});
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
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                product.image = productData.image;
            }
            return cart;
        } catch (err) {
            logger.error(`Error al Obtener Carrito: ${err.message}`);
            throw new Error(`Error al Obtener Carrito: ${err.message}`)
        }
    }
    async deleteProductFromCart(userId, productId) {
        try {
            const deleted = await this.#repoCarts.deleteProductFromCart(userId, productId);
            return deleted;
        } catch (err) {
            logger.error(`Error al Borrar Producto del Carrito: ${err.message}`);
            throw new Error(`Error al Borrar Producto del Carrito: ${err.message}`)
        }
    }
}