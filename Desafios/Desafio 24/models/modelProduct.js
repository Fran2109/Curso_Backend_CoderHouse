export default class Product {
    #id
    #name
    #description
    #price
    #image
    
    constructor({ id, name, description, price, image }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get price() { return this.#price; }
    get image() { return this.#image; }

    set id(id){
        if(!id) {
            throw new Error("Id is required");
        }
        if(this.#id) {
            throw new Error("Id cannot be changed");
        }
        this.#id = id;
    }
    set name(name) {
        if(!name) {
            throw new Error("Name is required");
        }
        this.#name = name;
    }
    set description(description) {
        if(!description) {
            throw new Error("Description is required");
        }
        this.#description = description;
    }
    set price(price) {
        if(!price) {
            throw new Error("Price is required");
        }
        this.#price = price;
    }
    set image(image) {
        if(!image) {
            throw new Error("Image is required");
        }
        this.#image = image;
    }

    toJSON() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            image: this.#image
        })));
    }
}