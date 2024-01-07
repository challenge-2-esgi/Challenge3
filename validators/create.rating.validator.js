const joi = require('joi')

const schema = joi.object({
    rating: joi.number().integer().min(0).max(5),
    clientId: joi.string().uuid().required(),
    delivererId: joi.string().uuid().required(),
    orderId: joi.string().uuid().required(),
})

module.exports = schema
