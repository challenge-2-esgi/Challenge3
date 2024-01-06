const { mongoose } = require('../db')

const userSchemaDef = {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
}

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: 'id',
        },
        rating: Number,
        client: userSchemaDef,
        deliverer: userSchemaDef,
        orderId: String,
    },
    { collection: 'ratings' }
)
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const Rating = mongoose.model('Rating', schema)

module.exports = Rating
