const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const Order = require('../models/Order')
const { ROLE } = require('../constants')
const validators = require('../validators')

const LoggedInUser = require('../middlewares/logged-in-user')
const RolesGuard = require('../middlewares/roles-guard')
const OwnershipGuard = require('../middlewares/ownership-guard')
const Validator = require('../middlewares/validator')
const { isAdmin } = require('../utils/authorization')

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
        CRUDRouter({
            model: Order,
            collectionMiddlewares: [AuthGuard, RolesGuard([ROLE.admin])],
            itemCreateMiddlewares: [
                AuthGuard,
                Validator(validators.createOrder),
            ],
            itemReadMiddlewares: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findOrder,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
            itemUpdateMiddlewares: [
                Validator(validators.updateOrder),
                AuthGuard,
                OwnershipGuard({
                    findResource: findOrder,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
            itemDeleteGuards: [
                AuthGuard,
                RolesGuard([ROLE.admin]),
                OwnershipGuard({
                    findResource: findOrder,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
        })
    )
    return router
}

module.exports = OrderRouter
