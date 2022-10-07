export default class dtoOrder {
    /**
    * @param {Array} products    
    **/
    constructor({id, date, idClient, products}){
        this.id = id,
        this.date = date,
        this.idClient = idClient,
        this.products = products
    }
}