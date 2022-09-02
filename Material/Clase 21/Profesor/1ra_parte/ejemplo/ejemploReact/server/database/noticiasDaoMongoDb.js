import { Db } from 'mongodb';
import NoticiaDto from '../models/NoticiaDto.js';
import DaoMongoDb from './shared/mongodb/DaoMongoDb.js';

export default class NoticiasDaoMongoDB extends DaoMongoDb {

    /**
     * @param {Db} db 
     */
    constructor(db) {
        super(db, 'noticias')
    }

    /**
     * @override
     * @param {Object} document
     * @return {NoticiaDto}
     */
    asDto = document => {
        return new NoticiaDto(document)
    }
}
