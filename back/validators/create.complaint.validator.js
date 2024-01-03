const joi = require('joi')
const { ROLE } = require('../constants')

const createComplaintSchema = joi.object({
    subject: joi.string().required(),
    content: joi.string().required(),
    orderId: joi.string().required(),
})

module.exports = createComplaintSchema
