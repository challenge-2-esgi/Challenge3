const MongoOrder = require('../Order')
const operations = require('./operations')

module.exports = async (orderId, Order, operation = operations.create) => {
    if (operation === operations.create || operation === operations.update) {
        const order = await Order.findByPk(orderId, {
            include: [
                { association: 'user' },
                { association: 'deliverer' },
                { association: 'pickupAddress' },
                { association: 'deliveryAddress' },
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
                          ...order.deliverer.dataValues,
                          ...order.deliverer.user.dataValues,
                      },
        })

        await mongoOrder.save()
    }

    if (operation === operations.delete) {
        await MongoOrder.deleteOne({ _id: orderId })
    }
}
