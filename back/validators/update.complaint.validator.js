const joi = require('joi')

const schema = joi.object({
    subject: joi.string().length(10),
    content: joi.string().length(10),
})

module.exports = schema
