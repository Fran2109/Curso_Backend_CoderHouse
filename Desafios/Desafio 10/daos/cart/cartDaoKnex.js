import ContainerKnex from "../../containers/ContainerKnex.js"
class cartDaoKnex extends ContainerKnex {
    constructor(config, tabla, createTable) {
        super(config, tabla, createTable);
    }
    async addProductToCart(id, idProd) {
        const { productDao } = await import('../index.js');
        const product = await productDao.getById(idProd);
        await this.getById(id);
        product.cartId = Number(id);
        productDao.updateById(idProd, product);        
    }
}

export default cartDaoKnex