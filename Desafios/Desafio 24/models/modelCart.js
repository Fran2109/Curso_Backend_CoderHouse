export default class Cart {
    #id
    #products
    
    constructor({ id, products }) {
        this.id = id;
        this.products = products;
    }

    get id() { return this.#id; }
    get products() { return this.#products; }

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

    addProduct(id) {
        if(!id) {
            throw new Error("IdProduct is required");
        }
        const productInCart = this.#products.find((product) => product.id === id);
        if(!productInCart) {
            this.#products.push({ id, cant: 1 });
        } else {
            productInCart.cant++;
        }
    }

    deleteProduct(id) {
        if(!id) {
            throw new Error("IdProduct is required");
        }
        const productInCart = this.#products.find((product) => product.id === id);
        if(!productInCart) {
            throw new Error("Product not found");
        } else {
            if(productInCart.cant > 1) {
                productInCart.cant--;
            } else {
                this.#products.splice(this.#products.indexOf(productInCart), 1);
            }
        }
    }

    clearCart() {
        this.#products = [];
    }

    toJSON() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            products: this.#products
        })))
    }
}