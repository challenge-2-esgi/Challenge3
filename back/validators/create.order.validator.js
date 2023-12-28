const joi = require('joi')

const addressSchema = joi.object({
    streetNumber: joi.string().required(),
    street: joi.string().required(),
    zipCode: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    latitude: joi.number().required(),
    longitude: joi.number().required(),
})

const createOrderSchema = joi.object({
    receiverEmail: joi.string().email().required(),
    receiverPhone: joi.string().length(10).required(),
    pickupAddress: addressSchema,
    deliveryAddress: addressSchema,
    distance: joi.number().required(),
})

module.exports = createOrderSchema
