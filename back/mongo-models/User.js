const { mongoose } = require('../db')

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: 'id',
        },
        firstname: String,
        lastname: String,
        email: String,
        role: String,
        createdAt: Date,

        // deliverer properties
        delivererId: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: null,
        },
        phone: {
            type: String,
            default: null,
        },
        latitude: {
            type: Number,
            default: null,
        },
        longitude: {
            type: Number,
            default: null,
        },
        validationCode: {
            type: String,
            default: null,
        },
    },
    { collection: 'users' }
)
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const User = mongoose.model('User', schema)

module.exports = User
