const MongoOrder = require('../Order')
const operations = require('./operations')

module.exports = async (orderId, Order, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const order = await Order.findByPk(orderId, {
            include: [
                { association: 'user' },
                { association: 'deliverer', include: ['user'] },
                { association: 'pickupAddress' },
                { association: 'deliveryAddress' },
                { association: 'complaint' },
            ],
        })
        await MongoOrder.deleteOne({ _id: orderId })

        const mongoOrder = new MongoOrder({
            _id: orderId,
            ...order.dataValues,
            pickupAddress: order.pickupAddress.dataValues,
            deliveryAddress: order.deliveryAddress.dataValues,
            user: order.user.dataValues,
            deliverer:
                order.deliverer == null
                    ? null
                    : {
                          id: order.deliverer.id,
                          ...order.deliverer.user.dataValues,
                          ...order.deliverer.dataValues,
                      },
            complaintId: order.complaint?.id,
        })

        await mongoOrder.save()
    }

    if (operation === operations.delete) {
        await MongoOrder.deleteOne({ _id: orderId })
    }
}
