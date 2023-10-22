const jwt = require('jsonwebtoken')
const appConfig = require('../config/app-config')

function sign(payload) {
    return jwt.sign(payload, appConfig.tokenSecret, {
        expiresIn: appConfig.tokenExpireTime,
    })
}

module.exports = {
    sign,
}
