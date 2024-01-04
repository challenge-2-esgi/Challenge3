const MongoRating = require('../Rating')
const operations = require('./operations')

module.exports = async (ratingId, Rating, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const rating = await Rating.findByPk(ratingId, {
            include: [
                { association: 'client' },
                { association: 'deliverer', include: ['user'] },
            ],
        })
        await MongoRating.deleteOne({ _id: ratingId })

        const mongoRating = new MongoRating({
            _id: ratingId,
            ...rating.dataValues,
            client: rating.client.dataValues,
            deliverer: {
                ...rating.deliverer.dataValues,
                ...rating.deliverer.user.dataValues,
            },
        })

        await mongoRating.save()
    }

    if (operation === operations.delete) {
        await MongoRating.deleteOne({ _id: ratingId })
    }
}
