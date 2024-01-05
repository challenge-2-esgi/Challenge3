const MongoRating = require('../Rating')
const operations = require('./operations')

module.exports = async (ratingId, Rating, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const rating = await Rating.findByPk(ratingId, {
            include: [
                { association: 'client' },
                { association: 'deliverer', include: ['user'] },
                { association: 'order' },
            ],
        })
        await MongoRating.deleteOne({ _id: ratingId })

        const mongoRating = new MongoRating({
            _id: ratingId,
            ...rating.dataValues,
            client: rating.client.dataValues,
            deliverer: {
                ...rating.deliverer.user.dataValues,
                ...rating.deliverer.dataValues,
            },
            orderId: rating.order.id,
        })

        await mongoRating.save()
    }

    if (operation === operations.delete) {
        await MongoRating.deleteOne({ _id: ratingId })
    }
}
