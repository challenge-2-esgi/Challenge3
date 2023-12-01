const Order = require('../models/Order')
const { isAdminOrOwner, isOwner, isClient } = require('../utils/authorization')

function OwnerOrClientPerson({ findResource, ownerKey, includeAdmin = false }) {
    return async (req, res, next) => {
        try {
            const userId = req.user.id
            const item = await findResource(req)

            if (!item) {
                return res.sendStatus(404)
            }

            if (isClient(req.user)) {
                console.log('is Client')
                const clientOrders = await Order.findAll({
                    where: { clientId: req.user.id, delivererId: item.id },
                    include: ['deliverer'],
                })

                if (includeAdmin) {
                    return clientOrders.length > 0
                        ? next()
                        : res.sendStatus(403)
                }

                const canAccess = clientOrders.length > 0
                return canAccess ? next() : res.sendStatus(403)
            } else {
                console.log('is not Client')
                if (includeAdmin) {
                    console.log('item[ownerKey]', item['userId'])
                    return isAdminOrOwner(item['userId'], req.user)
                        ? next()
                        : res.sendStatus(403)
                }

                const canAccess =
                    isOwner(item.user, req.user) || userId === item.id
                return canAccess ? next() : res.sendStatus(403)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OwnerOrClientPerson
