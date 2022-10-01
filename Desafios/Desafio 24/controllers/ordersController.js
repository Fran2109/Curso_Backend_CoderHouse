import service from "../service/index.js";

export default class cartsController {
    constructor () { }
    async createOrder(req, res){
        try {
            const { id } = req.user;
            const cart = await service.cartsService.getCart(id);
            if(cart.products.length === 0){
                return res.status(400).json({message: "No products in cart"});
            }
            
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
