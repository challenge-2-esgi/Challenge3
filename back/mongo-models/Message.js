const { mongoose } = require('../db')

const senderSchemaDef = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
}

const receiverSchemaDef = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
}

const orderSchemaDef = {
    id: String,
    sku: String,
    isDelivered: Boolean,
    status: String,
}

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: 'id',
        },
        content: String,
        createdAt: Date,
        sender: senderSchemaDef,
        receiver: receiverSchemaDef,
        order: orderSchemaDef,
    },
    { collection: 'messages' }
);

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const Message = mongoose.model('Message', schema)

module.exports = Message