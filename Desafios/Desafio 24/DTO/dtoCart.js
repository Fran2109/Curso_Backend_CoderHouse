export default class dtoCart {
    /**
    * @param {Array} products    
    **/
    constructor({id, products}){
        this.id = id;
        this.products = products.map((product) => {
            return {
                id: product.id,
                cant: product.cant
            }
        });
    }
}