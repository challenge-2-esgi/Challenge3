const joi = require('joi')
const { ORDER_STATUS } = require('../constants')

const createOrderSchema = joi.object({
    sku: joi.string().required(),
    pickupTime: joi.date().allow(null),
    deliverTime: joi.date().allow(null),
    validationCode: joi.string().required(),
    distance: joi.number().allow(null),
    status: joi
        .string()
        .valid(...Object.values(ORDER_STATUS))
        .default(ORDER_STATUS.waitingForPickup),
    recieverEmail: joi.string().email().required(),
    recieverPhone: joi.string().length(10).required(),
    clientId: joi.string().guid().required(),
    delivererId: joi.string().guid().required(),
    pickupAddressId: joi.string().guid().required(),
    deliveryAddressId: joi.string().guid().required(),
})

module.exports = createOrderSchema
