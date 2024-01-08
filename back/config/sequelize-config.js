const appConfig = require('./app-config')

module.exports = {
    [appConfig.supportedEnvs.dev]: {
        url: appConfig.postgresUrl,
        dialect: 'postgres',
    },
    [appConfig.supportedEnvs.test]: {
        url: '',
        dialect: 'postgres',
    },
    [appConfig.supportedEnvs.prod]: {
        url: appConfig.postgresUrl,
        dialect: 'postgres',
    },
}
