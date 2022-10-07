import DateString from "./modelDate.js"

export default class Cart {
    #id
    #idClient
    #products
    #date
    
    constructor({ id, products, idClient }) {
        this.id = id;
        this.products = products;
        this.idClient = idClient;
        this.date = DateString.getDate();
    }

    get id() { return this.#id; }
    get products() { return this.#products; }
    get idClient() { return this.#idClient; }
    get date() { return this.#date; }

    set id(id) {
        if(!id) {
            throw new Error("Id is required");
        }
        if(this.#id) {
            throw new Error("Id cannot be changed");
        }
        this.#id = id;
    }
    set products(products) {
        if(!products) {
            throw new Error("Products is required");
        }
        this.#products = products;
    }
    set idClient(idClient) {
        if(!idClient) {
            throw new Error("IdClient is required");
        }
        this.#idClient = idClient;
    }
    set date(date) {
        if(!date) {
            throw new Error("Date is required");
        }
        this.#date = date;
    }

    toJSON() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            products: this.#products,
            idClient: this.#idClient,
            date: this.#date
        })))
    }
}