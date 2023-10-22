const jwt = require('jsonwebtoken')
const appConfig = require('../config/app-config')

function sign(payload) {
    return jwt.sign(payload, appConfig.tokenSecret, {
        expiresIn: appConfig.tokenExpireTime,
    })
}

function verify(token, callback) {
    return jwt.verify(token, appConfig.tokenSecret, callback)
}

module.exports = {
    sign,
    verify,
}
