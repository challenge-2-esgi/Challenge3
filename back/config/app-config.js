const joi = require('joi')

const SUPPORTED_ENVS = {
    dev: 'dev',
    test: 'test',
    prod: 'prod',
}

if (process.env.NODE_ENV === SUPPORTED_ENVS.dev) {
    require('dotenv').config()
}

const envVarsSchema = joi
    .object({
        NODE_ENV: joi
            .string()
            .valid(...Object.values(SUPPORTED_ENVS))
            .required(),
        PORT: joi.number().required(),
        POSTGRES_URL: joi.string().required(),
        MONGO_URL: joi.string().required(),
        TOKEN_SECRET: joi.string().required(),
        TOKEN_EXPIRE_TIME: joi.number().required(),
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
    tokenSecret: envVars.TOKEN_SECRET,
    tokenExpireTime: envVars.TOKEN_EXPIRE_TIME,
    supportedEnvs: SUPPORTED_ENVS,
}
