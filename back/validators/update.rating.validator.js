const joi = require('joi')

const schema = joi.object({
    rating: joi.number().integer().min(0).max(5),
})

module.exports = schema
