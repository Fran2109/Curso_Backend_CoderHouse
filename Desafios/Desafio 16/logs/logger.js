import log4js from 'log4js'

log4js.configure({
    appenders: {
        console: { type: 'console' },
        infoFile: { type: 'file', filename: './logs/info.log' },
        warningFile: { type: 'file', filename: './logs/warning.log' },
        errorFile: { type: 'file', filename: './logs/error.log' },
        infoLogger: {
            type: 'logLevelFilter',
            appender: 'infoFile',
            level: 'info'
        },
        warningLogger: {
            type: 'logLevelFilter',
            appender: 'warningFile',
            level: 'warn'
        },
        errorLogger: {
            type: 'logLevelFilter',
            appender: 'errorFile',
            level: 'error'
        }
    },
    categories: {
        default: {
            appenders: ['infoLogger', 'warningLogger', 'errorLogger', 'console'],
            level: 'all'
        }
    }
})

export default log4js.getLogger()