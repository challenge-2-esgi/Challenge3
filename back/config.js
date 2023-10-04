const joi = require('joi')

const envVarsSchema = joi
    .object({
        NODE_ENV: joi.string().valid('prod', 'dev', 'test').required(),
        PORT: joi.number().required(),
        POSTGRES_URL: joi.string().required(),
        MONGO_URL: joi.string().required(),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    postgresUrl: envVars.POSTGRES_URL,
    mongoUrl: envVars.MONGO_URL,
}
