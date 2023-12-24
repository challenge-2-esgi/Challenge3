const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const Order = require('../models/Order')
const { ROLE } = require('../constants')
const validators = require('../validators')
const RolesGuard = require('../middlewares/roles-guard')
const Validator = require('../middlewares/validator')
const OwnerOrDeliveryPerson = require('../middlewares/owner-or-delivery-person-guard')
const { isClient, isDeliverer } = require('../utils/authorization')
const Deliverer = require('../models/Deliverer')
const { uuidv7 } = require('uuidv7')

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

    router.use(
        '/orders',
        AuthGuard,
        async (req, res, next) => {
            if (isClient(req.user)) {
                req.query = { clientId: req.user.id }
            }
            if (isDeliverer(req.user)) {
                const deliverer = await Deliverer.findOne({
                    where: { userId: req.user.id },
                })
                req.query = { delivererId: deliverer.id }
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
                RolesGuard([ROLE.admin, ROLE.client, ROLE.deliverer]),
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
