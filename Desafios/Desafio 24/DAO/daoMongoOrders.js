import mongoContainer from "../containers/mongoContainer.js";

export default class daoMongoOrders extends mongoContainer {
    #collection;
    constructor(collection) {
        super(collection);
        this.#collection = collection;
    }
    async getOrders(idClient){
        const orders = await this.#collection.find({idClient});
        return orders.map((order) => this.asDto(order));
    }
    /**
    * @override
    **/
    asDto(document){
        return {
            id: document.id,
            date: document.date,
            idClient: document.idClient,
            products: document.products.map(product => {
                return {
                    product: {
                        id: product.product.id,
                        name: product.product.name,
                        description: product.product.description,
                        price: product.product.price,
                        thumbnail: product.product.thumbnail,
                    },
                    cant: product.cant,
                }
            })
        }
    }
}