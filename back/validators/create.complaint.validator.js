const joi = require('joi')

const createComplaintSchema = joi.object({
    subject: joi.string().required(),
    content: joi.string().required(),
    orderId: joi.string().uuid().required(),
})

module.exports = createComplaintSchema
