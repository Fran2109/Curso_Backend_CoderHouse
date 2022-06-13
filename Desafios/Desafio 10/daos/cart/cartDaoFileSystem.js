import ContainerFileSystem from "../../containers/ContainerFileSystem.js"

class cartDaoFileSystem extends ContainerFileSystem {
    constructor(filePath) {
        super(filePath);
    }
    async getProductsInCart(id) {
        const cart = await this.getById(id);
        const products = [];
        const { productDao } = await import('../index.js');
        for(const idproduct in cart.products){
            try {
                let product = await productDao.getById(idproduct);
                products.push(product);
            } catch (error) { }
        }
        return products;
    }
    async addProductToCart(idCart, idproduct) {
        const { productDao } = await import('../index.js');
        const cart = await this.getById(idCart);
        const product = await productDao.getById(idproduct);
        cart.products.push(product.id);
        await this.updateById(cart.id, cart);
        return cart;
    }
    async clearCart(id) {
        const cart = await this.getById(id);
        cart.products = [];
        await this.updateById(cart.id, cart);
        return cart;
    }
    async deleteProductFromCart(idCart, idProduct) {
        const cart = await this.getById(idCart);
        if(cart.products.includes(Number(idProduct))){
            cart.products = cart.products.filter(idActual => idActual != idProduct);
            await this.updateById(cart.id, cart);
            return cart;
        } else {
            throw new Error("El producto no está en el carrito");
        }
    }
    async deleteProductFromAllCarts(idProduct) {
        const carts = await cartDao.getAll();
        for(const cart of carts){
            if(cart.products.includes(Number(idProduct))){
                cart.products = cart.products.filter(idActual => idActual != idProduct);
                await cartDao.updateById(cart.id, cart);
            }
        }
    }
    async deleteAllProductsInCarts() {
        const carts = await cartDao.getAll();
        for(const cart of carts){
            if(cart.products.length > 0){
                await cartDao.clearCart(cart.id);
            }
        }
    }
}

export default cartDaoFileSystem