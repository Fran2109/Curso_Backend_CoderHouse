import dtoMessage from '../DTO/dtoMessageMemory.js';
import overwriteFile from '../functions/overwriteFile.js';
import fs from 'fs';

export default class daoFileMessages {
    #filePath;
    constructor(filePath) {
        this.#filePath = filePath;
    }
    async save(message) {
        let content = await this.getAll();
        let newId
        if (content.length == 0) {
            newId = 1
        } else {
            newId = content[ content.length - 1 ].id + 1
        }
        message.id = newId;
        content.push(message);
        await overwriteFile(this.#filePath, content);
        return new dtoMessage(message);
    }
    async getAll() {
        try {
            let content = await fs.promises.readFile(this.#filePath, 'utf-8');
            return JSON.parse(content).map(element => new dtoMessage(element));
        }
        catch (error) {
            return [];
        }
    }
    async deleteAll() {
        await overwriteFile(this.#filePath, []);
    }
}