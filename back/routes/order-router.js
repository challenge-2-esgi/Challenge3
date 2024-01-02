const { Router } = require('express')
const { uuidv7 } = require('uuidv7')

const CRUDRouter = require('./item-router')
const { Order } = require('../models')

const AuthGuard = require('../middlewares/auth-guard')
const RolesGuard = require('../middlewares/roles-guard')
const Validator = require('../middlewares/validator')
const OwnerOrDeliveryPerson = require('../middlewares/owner-or-delivery-person-guard')
const NotDeliveringGuard = require('../middlewares/not-delivering-guard')

const validators = require('../validators')
const { ROLE, ORDER_STATUS } = require('../constants')
const { isDeliverer } = require('../utils/authorization')

function OrderRouter() {
    const router = new Router()

    async function findOrder(req) {
        return await Order.findOne({
            where: { id: req.params.id },
        })
    }

    // TODO: generate order SKU and validation code
    function generateValidationCode() {
        return uuidv7()
    }
    function generateSKU() {
        return uuidv7()
    }

    router.post(
        '/orders/:id/assign',
        AuthGuard,
        RolesGuard([ROLE.deliverer]),
        NotDeliveringGuard,
        async (req, res, next) => {
            try {
                const order = await Order.findOne({
                    where: {
                        id: req.params.id,
                    },
                })

                if (!order) {
                    return res.sendStatus(404)
                }

                if (order.delivererId) {
                    return res.sendStatus(403)
                }

                await Order.update(
                    {
                        delivererId: req.user.deliverer.id,
                        status: ORDER_STATUS.waitingForPickup,
                    },
                    {
                        where: {
                            id: order.id,
                        },
                        individualHooks: true,
                    }
                )

                res.sendStatus(200)
            } catch (error) {
                next(error)
            }
        }
    )
    router.use(
        '/orders',
        AuthGuard,
        CRUDRouter({
            model: Order,
            includeCollectionModels: [
                {
                    association: 'user',
                },
                {
                    association: 'deliverer',
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
                RolesGuard([ROLE.admin, ROLE.deliverer]),
                (req, res, next) => {
                    if (isDeliverer(req.user)) {
                        req.query = {
                            status: ORDER_STATUS.waitingForDeliverer,
                        }
                        return next()
                    }
                    next()
                },
            ],
            itemCreateMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client]),
                Validator(validators.createOrder),
                (req, res, next) => {
                    req.body = {
                        ...req.body,
                        sku: generateSKU(),
                        validationCode: generateValidationCode(),
                        clientId: req.user.id,
                        pickupAddress: {
                            ...req.body.pickupAddress,
                            id: uuidv7(),
                        },
                        deliveryAddress: {
                            ...req.body.deliveryAddress,
                            id: uuidv7(),
                        },
                    }
                    next()
                },
            ],
            includeCreateModels: [
                { association: 'pickupAddress' },
                { association: 'deliveryAddress' },
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
