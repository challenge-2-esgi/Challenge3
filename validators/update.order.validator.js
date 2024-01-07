const joi = require('joi')
const { ORDER_STATUS } = require('../constants')

const schema = joi.object({
    sku: joi.string(),
    isDelivered: joi.boolean(),
    pickupTime: joi.date(),
    deliverTime: joi.date(),
    status: joi
        .string()
        .valid(...Object.values(ORDER_STATUS))
        .messages({ 'any.only': '"status" is required' }),
})

module.exports = schema
