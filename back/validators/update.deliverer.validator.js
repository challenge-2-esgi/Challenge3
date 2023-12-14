const joi = require('joi')

const schema = joi.object({
    isActive: joi.boolean(),
    phone: joi.string().length(10),
    latitude: joi.number(),
    longitude: joi.number(),
})

module.exports = schema
