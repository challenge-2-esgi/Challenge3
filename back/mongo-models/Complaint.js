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
        subject: String,
        content: String,
        user: userSchemaDef,
    },
    { collection: 'complaints' }
)
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

const Complaint = mongoose.model('Complaint', schema)

module.exports = Complaint
