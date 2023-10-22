const Joi = require('joi')
const ValidationError = require('../errors/ValidationError')

function Validator(validationSchema) {
    return async function (req, res, next) {
        try {
            await validationSchema.validateAsync(req.body)
            next()
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                error = ValidationError.fromJoi(error)
            }
            next(error)
        }
    }
}

module.exports = Validator
