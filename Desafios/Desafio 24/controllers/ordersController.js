import service from "../service/index.js";

export default class cartsController {
    constructor () { }
    async createOrder(req, res){
        try {
            const { id } = req.user;
            const cart = await service.getCart(id);
            if(cart.products.length === 0){
                return res.status(400).json({message: "No products in cart"});
            }
            const order = await service.createOrder(cart, req.user);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getOrders(req, res){
        try{
            const { id } = req.user;
            const orders = await service.getOrders(id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}