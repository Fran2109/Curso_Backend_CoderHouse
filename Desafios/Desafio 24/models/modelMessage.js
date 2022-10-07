import DateString from "./modelDate.js"

export default class Cart {
    #id
    #date
    #email
    #message
    
    constructor({ id, email, message }) {
        this.id = id;
        this.date = DateString.getDate();
        this.email = email;
        this.message = message;
    }

    get id() { return this.#id; }
    get date() { return this.#date; }
    get email() { return this.#email; }
    get message() { return this.#message; }

    set id(id) {
        if(!id) {
            throw new Error("Id is required");
        }
        if(this.#id) {
            throw new Error("Id cannot be changed");
        }
        this.#id = id;
    }
    set date(date) {
        if(!date) {
            throw new Error("Date is required");
        }
        this.#date = date;
    }
    set email(email) {
        if(!email) {
            throw new Error("Email is required");
        }
        this.#email = email;
    }
    set message(message) {
        if(!message) {
            throw new Error("Message is required");
        }
        this.#message = message;
    }

    toJSON() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            date: this.#date,
            email: this.#email,
            message: this.#message,
        })))
    }
}