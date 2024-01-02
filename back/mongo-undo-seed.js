const mongoose = require('mongoose')

const appConfig = require('./config/app-config')

const MongoUser = require('./mongo-models/User')
const MongoOrder = require('./mongo-models/Order')
const MongoRating = require('./mongo-models/Rating')
const MongoComplaint = require('./mongo-models/Complaint')

async function resetDB() {
    await MongoUser.deleteMany()
    await MongoOrder.deleteMany()
    await MongoComplaint.deleteMany()
    await MongoRating.deleteMany()
}

async function main() {
    await mongoose.connect(appConfig.mongoUrl)
    await resetDB()
}

main()
    .then(() => {
        console.log('mongo undo seed succeeded')
    })
    .catch((e) => {
        console.log('mongo undo seed failed\n', e)
    })
    .finally(() => {
        mongoose.disconnect().then(() => process.exit(0))
    })
