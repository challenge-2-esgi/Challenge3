const MongoUser = require('../User')
const operations = require('./operations')

module.exports = async (userId, User, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: { all: true, nested: true },
        })
        const deliverer = await user.getDeliverer()

        await MongoUser.deleteOne({ _id: userId })

        let mongoUser = new MongoUser({
            ...user.dataValues,
        })

        if (deliverer != null) {
            mongoUser = new MongoUser({
                _id: userId,
                ...user.dataValues,
                delivererId: deliverer.id,
                ...deliverer.dataValues,
            })
        }

        await mongoUser.save()
    }

    if (operation === operations.delete) {
        await MongoUser.deleteOne({ _id: userId })
    }
}
