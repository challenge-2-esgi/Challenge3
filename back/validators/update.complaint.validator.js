const joi = require('joi')
const { COMPLAINT_STATUS } = require('../constants')

const schema = joi.object({
    status: joi
        .string()
        .valid(...[COMPLAINT_STATUS.pending, COMPLAINT_STATUS.processing, COMPLAINT_STATUS.closed])
        .messages({ 'any.only': '"status" is required' }),
})

module.exports = schema
