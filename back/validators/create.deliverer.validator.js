const joi = require('joi')
const { ORDER_STATUS } = require('../constants')

const createDelivererSchema = joi.object({
    userId: joi.string().guid().required(),
    phone: joi.string().length(10).required(),
    latitude: joi.number(),
    longitude: joi.number(),
})

module.exports = createDelivererSchema
