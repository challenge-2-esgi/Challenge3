const { mongoose } = require('../db')

const addressSchemaDef = {
    streetNumber: String,
    street: String,
    zipCode: String,
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
}
const userSchemaDef = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    validationCode: String,
}
const delivererSchema = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    latitude: Number,
    longitude: Number,
}

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: 'id',
        },
        sku: String,
        isDelivered: Boolean,
        pickupTime: Date,
        deliverTime: Date,
        validationCode: String,
        distance: Number,
        status: String,
        receiverFirstname: String,
        receiverLastname: String,
        receiverEmail: String,
        receiverPhone: String,
        pickupAddress: addressSchemaDef,
        deliveryAddress: addressSchemaDef,
        user: userSchemaDef,
        deliverer: delivererSchema,
        createdAt: Date,
        complaintId: {
            type: String,
            default: null,
        },
    },
    { collection: 'orders' }
)
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const Order = mongoose.model('Order', schema)

module.exports = Order
