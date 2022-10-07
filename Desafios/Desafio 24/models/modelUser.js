export default class User {
    #id
    #email
    #password
    #name
    #lastname
    #phone
    #image
    
    constructor({id, email, password, name, lastname, phone, image}) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
    }

    get id() { return this.#id; }
    get email() { return this.#email; }
    get password() { return this.#password; }
    get name() { return this.#name; }
    get lastname() { return this.#lastname; }
    get phone() { return this.#phone; }
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
    set email(email) {
        if(!email) {
            throw new Error("Email is required");
        }
        this.#email = email;
    }
    set password(password) {
        if(!password) {
            throw new Error("Password is required");
        }
        this.#password = password;
    }
    set name(name) {
        if(!name) {
            throw new Error("Name is required");
        }
        this.#name = name;
    }
    set lastname(lastname) {
        if(!lastname) {
            throw new Error("Lastname is required");
        }
        this.#lastname = lastname;
    }
    set phone(phone) {
        if(!phone) {
            throw new Error("Phone is required");
        }
        this.#phone = phone;
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
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            phone: this.#phone,
            image: this.#image
        })));
    }
}