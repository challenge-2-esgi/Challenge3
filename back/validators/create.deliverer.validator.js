const joi = require('joi')
const { ROLE } = require('../constants')

const createDelivererSchema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    phone: joi.string().length(10).required(),
    role: joi
        .string()
        .equal(ROLE.deliverer)
        .required()
        .messages({ 'any.only': '"role" is required' }),
})

module.exports = createDelivererSchema
