import ContainerFileSystem from "../../containers/ContainerFileSystem.js"

class cartDaoFileSystem extends ContainerFileSystem {
    constructor(filePath) {
        super(filePath);
    }
    async getProductsInCart(id) {
        const cart = await this.getById(id);
        const products = [];
        const { productDao } = await import('../index.js');
        cart.products.forEach(element => {
            products.push(productDao.getById(element.id));
        });
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
}

export default cartDaoFileSystem