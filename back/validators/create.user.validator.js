const joi = require('joi')
const { ROLE } = require('../constants')

const schema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi
        .string()
        .valid(...[ROLE.client, ROLE.deliverer, ROLE.support])
        .messages({ 'any.only': '"role" is required' }),
})

module.exports = schema
