export default class dtoMongoProducts {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
    }
}