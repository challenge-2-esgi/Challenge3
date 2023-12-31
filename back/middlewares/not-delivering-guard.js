const { Sequelize } = require('sequelize')
const Order = require('../models/Order')
const { isDeliverer } = require('../utils/authorization')
const { ORDER_STATUS } = require('../constants')

async function NotDeliveringGuard(req, res, next) {
    if (!isDeliverer(req.user) || req.user.deliverer == null) {
        return res.sendStatus(403)
    }

    const orders = await Order.findAll({
        where: Sequelize.and(
            { delivererId: req.user.deliverer.id },
            Sequelize.or(
                { status: ORDER_STATUS.waitingForPickup },
                { status: ORDER_STATUS.delivering }
            )
        ),
    })

    if (orders.length > 0) {
        return res.sendStatus(403)
    }

    next()
}

module.exports = NotDeliveringGuard
