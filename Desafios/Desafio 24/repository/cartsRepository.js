import { carts } from './../factory/factory.js';
import Cart from './../models/modelCart.js';
import CartDto from './../DTO/dtoCart.js';

export default class CartsRepository {
    #carts;
    constructor() {
        this.#carts = carts;
    }
    async createIfNotExists(elem){
        const cart = new Cart({...elem, products: []});
        const newCart = await this.#carts.createIfNotExists(cart.toJSON());
        return new CartDto(newCart);
    }
    async insertProductToCart(userId, productId){
        const cart = await this.#carts.getById(userId);
        const modifiedCart = new Cart(cart);
        modifiedCart.addProduct(productId)
        const savedCart = await this.#carts.updateById(userId, modifiedCart.toJSON());
        return new CartDto(savedCart);
    }
    async getCart(userId){
        const cart = await this.#carts.getCart(userId);
        return new CartDto(cart);
    }
    async deleteProductFromAllCarts(productId){
        return await this.#carts.deleteProductFromAllCarts(productId);
    }
    async deleteAllProductsFromCarts(){
        return await this.#carts.deleteAllProductsFromCarts();
    }
    async deleteProductFromCart(userId, productId){
        const cart = await this.#carts.getById(userId);
        const modifiedCart = new Cart(cart);
        modifiedCart.deleteProduct(productId);
        const savedCart = await this.#carts.updateById(userId, modifiedCart.toJSON());
        return new CartDto(savedCart);
    }
    async clearCart(userId){
        const cart = await this.#carts.getById(userId);
        const modifiedCart = new Cart(cart);
        modifiedCart.clearCart();
        const savedCart = await this.#carts.updateById(userId, modifiedCart.toJSON());
        return new CartDto(savedCart);
    }
}