const joi = require('joi')

const schema = joi.object({
    firstname: joi.string(),
    lastname: joi.string(),
    email: joi.string().email(),
    role: joi.forbidden(),
})

module.exports = schema
