const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const Order = require('../models/Order')
const { ROLE } = require('../constants')
const validators = require('../validators')
const RolesGuard = require('../middlewares/roles-guard')
const Validator = require('../middlewares/validator')
const OwnerOrDeliveryPerson = require('../middlewares/owner-or-delivery-person-guard')
const { isClient } = require('../utils/authorization')

function OrderRouter() {
    const router = new Router()

    async function findOrder(req) {
        return await Order.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/orders',
        AuthGuard,
        (req, res, next) => {
            if (isClient(req.user)) {
                req.query = { clientId: req.user.id }
            }
            next()
        },
        CRUDRouter({
            model: Order,
            includeCollectionModels: [
                {
                    association: 'user',
                },
                {
                    association: 'pickupAddress',
                },
                {
                    association: 'deliveryAddress',
                },
            ],
            collectionMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client]),
            ],
            itemCreateMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client]),
                Validator(validators.createOrder),
            ],
            itemReadMiddlewares: [
                AuthGuard,
                OwnerOrDeliveryPerson({
                    findResource: findOrder,
                    includeAdmin: true,
                }),
            ],
            itemUpdateMiddlewares: [
                Validator(validators.updateOrder),
                AuthGuard,
                OwnerOrDeliveryPerson({
                    findResource: findOrder,
                    includeAdmin: true,
                }),
            ],
            itemDeleteGuards: [AuthGuard, RolesGuard([ROLE.admin])],
        })
    )
    return router
}

module.exports = OrderRouter
