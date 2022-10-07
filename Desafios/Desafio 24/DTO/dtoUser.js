export default class dtoUser {
    constructor({id, email, password, name, lastname, phone, image}){
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
    }
    toJSON(){
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            name: this.name,
            lastname: this.lastname,
            phone: this.phone,
            image: this.image,
        }
    }
}