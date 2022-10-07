import { orders } from './../factory/factory.js';
import Order from './../models/modelOrder.js';
import dtoOrder from './../dto/dtoOrder.js';
import Id from './../models/modelId.js';

export default class UsersRepository {
    #orders;
    constructor() {
        this.#orders = orders;
    }
    async createOrder(cart) {
        const id = Id.new();
        const order = new Order({ id, idClient: cart.id,...cart });
        const newOrder = await this.#orders.save(order.toJSON());
        return new dtoOrder(newOrder);
    }
}