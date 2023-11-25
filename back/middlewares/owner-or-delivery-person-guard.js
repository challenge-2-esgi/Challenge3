const Order = require('../models/Order')
const { isAdminOrOwner, isOwner } = require('../utils/authorization')

function OwnerOrDeliveryPerson({ includeAdmin = false }) {
    return async (req, res, next) => {
        try {
            const userId = req.user.id
            const item = await Order.findOne({
                where: { id: req.params.id },
                include: ['user', 'deliverer'],
            })

            if (!item) {
                return res.sendStatus(404)
            }

            if (includeAdmin) {
                return isAdminOrOwner(item[userId], req.user)
                    ? next()
                    : res.sendStatus(403)
            }

            const canAccess =
                isOwner(item.user, req.user) || userId === item.delivererId
            return canAccess ? next() : res.sendStatus(403)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OwnerOrDeliveryPerson
