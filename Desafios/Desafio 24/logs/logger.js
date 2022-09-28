import log4js from 'log4js'
import { dev } from '../args/args.js'

export default class Logger {
    constructor() {
        log4js.configure({
            appenders: {
                console: { type: 'console' },
                infoFile: { type: 'file', filename: './logs/info.log' },
                warningFile: { type: 'file', filename: './logs/warning.log' },
                errorFile: { type: 'file', filename: './logs/error.log' },
                infoLogger: {type: 'logLevelFilter', appender: 'infoFile', level: 'info' },
                warningLogger: { type: 'logLevelFilter', appender: 'warningFile', level: 'warn' },
                errorLogger: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
            },
            categories: {
                default: { appenders: ['infoLogger', 'warningLogger', 'errorLogger'], level: 'all' },
                dev: { appenders: ['infoLogger', 'warningLogger', 'errorLogger', 'console'], level: 'all' }
            }
        })
        if(dev){
            this.log = log4js.getLogger('dev');
        }else{
            this.log = log4js.getLogger('default');
        }
    }
    error(message){
        this.log.error(message);
    }
    warn(message){
        this.log.warn(message);
    }
    info(message){
        this.log.info(message);
    }
}