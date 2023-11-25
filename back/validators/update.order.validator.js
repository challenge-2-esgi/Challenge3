const joi = require('joi')

const schema = joi.object({
    sku: joi.string(),
    isDelivered: joi.boolean(),
    pickupTime: joi.date(),
    deliverTime: joi.date(),
    status: joi.string(),
})

module.exports = schema
