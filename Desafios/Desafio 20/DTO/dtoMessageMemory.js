export default class dtoMessage {
    constructor(message) {
        this.id = message.id;
        this.author = {
            email: message.author.email,
            nombre: message.author.nombre,
            apellido: message.author.apellido,
            edad: message.author.edad,
            alias: message.author.alias,
            avatar: message.author.avatar
        },
        this.text = message.text,
        this.dateString = message.dateString
    }
}