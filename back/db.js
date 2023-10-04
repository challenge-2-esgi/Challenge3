const { Sequelize } = require('sequelize')
const mongoose = require('mongoose')

const MONGO_TIME_OUT = 3000

let sequelize = null

module.exports = {
    // sequelize:
    init: async (config) => {
        // init sequelize
        sequelize = new Sequelize(config.postgresUrl)
        try {
            await sequelize.authenticate()
            console.log(
                '[Sequelize]: Connection has been established successfully.'
            )
        } catch (error) {
            throw new Error(
                '[Sequelize]: Unable to connect to postgres : ',
                error.orginal
            )
        }

        // init mongoose
        try {
            await mongoose.connect(config.mongoUrl, {
                serverSelectionTimeoutMS: MONGO_TIME_OUT,
            })
            console.log(
                '[Mongoose]: Connection has been established successfully.'
            )
        } catch (error) {
            throw new Error(
                '[Mongoose]: Unable to connect to mongodb : ',
                error.message
            )
        }
    },
    close: () => {
        sequelize.close()
        mongoose.disconnect()
    },
    sequelize,
    mongoose,
}
