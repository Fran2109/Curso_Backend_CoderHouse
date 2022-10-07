import mongoContainer from "../containers/mongoContainer.js";

export default class daoMongoCarts extends mongoContainer {
    #collection;
    constructor(collection) {
        super(collection);
        this.#collection = collection;
    }
    async createIfNotExists(elem){
        const { id } = elem;
        const cart = await this.#collection.findOne({ id });
        if(!cart){
            const created = await this.#collection(elem);
            created.save();
            return this.asDto(created);
        } else {
            return this.asDto(cart);
        }
    }
    async getCart(userId){
        const cart = await this.#collection.findOne({ id: userId });
        if(!cart){
            throw new Error(`Cart not Found`);
        }
        cart.products = cart.products.map((product) => {
            return { id: product.id, cant: product.cant };
        });
        return this.asDto(cart);
    }
    async deleteProductFromAllCarts(productId){
        const carts = await this.#collection.find({});
        carts.forEach((cart) => {
            const { products } = cart;
            const product = products.find((product) => product.id === productId);
            if(product){
                products.splice(products.indexOf(product), 1);
                this.updateById(cart.id, cart)
            }
        });
        return carts.map((cart) => this.asDto(cart));
    }
    async deleteAllProductsFromCarts(){
        const carts = await this.#collection.find({});
        carts.forEach((cart) => {
            cart.products = [];
            this.updateById(cart.id, cart)
        });
        return carts.map((cart) => this.asDto(cart));
    }
    /**
    * @override
    **/
    asDto(document){
        return {
            id: document.id,
            products: document.products.map((product) => {
                return { id: product.id, cant: product.cant };
            })
        }
    }
}