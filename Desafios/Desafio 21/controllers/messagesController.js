import service from "./../service/index.js";

export default class messagesController {
    constructor() { }
    async getAllMessages(req, res) {
        try {
            const messages = await service.getAllMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteAllMessages(req, res) {
        try {
            const messages = await service.deleteAllMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async insertMessage(req, res) {
        try {
            if(!req.body.text || !req.body.author || !req.body.dateString) {
                return res.status(400).json({ error: "Message not created" });
            } else {
                const message = await service.insertMessage(req.body);
                res.json(message);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}