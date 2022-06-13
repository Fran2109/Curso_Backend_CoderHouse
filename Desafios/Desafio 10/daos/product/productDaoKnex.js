import ContainerKnex from "../../containers/ContainerKnex.js"

class productDaoKnex extends ContainerKnex {
    constructor(config, tabla, createTable) {
        super(config, tabla, createTable);
    }
    async getProductsFromCart(id){
        const { cartDao } = await import('../index.js');
        await cartDao.getById(id);//Para verificar que exista el carrito. De lo contrario se genera una excepcion.
        let responce = await this.conexion.select("*").from(this.tabla).where({cartId: id});
        return responce;
    }
}

export default productDaoKnex