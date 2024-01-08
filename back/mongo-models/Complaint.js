const { mongoose } = require('../db')

const userSchemaDef = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
}

const orderSchemaDef = {
    id: String,
    sku: String,
}

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: 'id',
        },
        subject: String,
        content: String,
        status: String,
        createdAt: Date,
        user: userSchemaDef,
        order: orderSchemaDef,
    },
    { collection: 'complaints' }
)
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const Complaint = mongoose.model('Complaint', schema)

module.exports = Complaint
