const joi = require('joi')

const schema = joi.object({
    subject: joi.string(),
    content: joi.string(),
})

module.exports = schema
