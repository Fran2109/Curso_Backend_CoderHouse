import ContainerMongoose from "../../containers/ContainerMongoose.js";

class cartDaoMongoose extends ContainerMongoose{
    constructor(collection, url, options){
        super(collection, url, options);
    }
    async getProductsInCart(id) {
        const products = await this.collection.findOne({_id:{ $eq : id}}).populate({ path: 'products', select: '_id title price thumbnail' }).lean();
        if(products){
            return products.products;
        } else {
            throw new Error("El carrito no existe");
        }
    }
    async addProductToCart(idCart, idproduct) {
        const { productDao } = await import('../index.js');
        const cart = await this.getById(idCart);
        const product = await productDao.getById(idproduct);
        cart.products.push(product._id);
        await this.updateById(cart._id, cart);
        return cart;
    }
    async clearCart(id) {
        let cart = await this.getById(id);
        cart.products = [];
        cart = await this.updateById(cart._id, cart);
        return cart;
    }
    async deleteProductFromCart(idCart, idProduct) {
        const cart = await this.getById(idCart);
        if(verifyExistenceOfId(cart.products, idProduct)){
            cart.products = cart.products.filter(idActual => idActual != idProduct);
            await this.updateById(cart._id, cart);
            return cart;
        } else {
            throw new Error("El producto no está en el carrito");
        }
    }
    async deleteProductFromAllCarts(idProduct) {
        const carts = await this.getAll();
        for(const cart of carts)
        {
            if(verifyExistenceOfId(cart.products, idProduct)){
                await this.deleteProductFromCart(cart._id, idProduct);
            }
        }
    }
    async deleteAllProductsInCarts() {
        const carts = await this.getAll();
        for(const cart of carts)
        {
            if(cart.products.length > 0){
                await this.clearCart(cart._id);
            }
        }
    }
}
const verifyExistenceOfId = (arrayOfIds, idProduct) => {
    let found = false;
    for(const id in arrayOfIds)
    {
        if(arrayOfIds[id] == idProduct){
            found = true;
            break;
        }
    }
    return found;
}//Metodo rudimentario que se me ocurrio para verificar si existe el id en el array. Si conoce alguna mejor manera estaria buenisimo.
export default cartDaoMongoose;