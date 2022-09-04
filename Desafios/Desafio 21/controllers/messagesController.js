import service from "./../service/index.js";

export default class messagesController {
    #service;
    constructor() {
    this.#service = service;
    }
    async getAllMessages(req, res) {
        try {
            const messages = await this.#service.getAllMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteAllMessages(req, res) {
        try {
            const messages = await this.#service.deleteAllMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async insertMessage(req, res) {
        try {
            const message = await this.#service.insertMessage(req.body);
            res.json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}