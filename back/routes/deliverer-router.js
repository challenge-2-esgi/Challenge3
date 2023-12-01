const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const Deliverer = require('../models/Deliverer')
const { ROLE } = require('../constants')
const validators = require('../validators')
const RolesGuard = require('../middlewares/roles-guard')
const Validator = require('../middlewares/validator')
const OwnerOrClientPerson = require('../middlewares/owner-or-client-person-guard')
const OwnershipGuard = require('../middlewares/ownership-guard')

function DelivererRouter() {
    const router = new Router()

    async function findDeliverer(req) {
        return await Deliverer.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/deliverers',
        AuthGuard,
        CRUDRouter({
            model: Deliverer,
            collectionMiddlewares: [AuthGuard, RolesGuard([ROLE.admin])],
            itemCreateMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.deliverer]),
                Validator(validators.createOrder),
            ],
            itemReadMiddlewares: [
                AuthGuard,
                OwnerOrClientPerson({
                    findResource: findDeliverer,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
            itemUpdateMiddlewares: [
                Validator(validators.updateDeliverer),
                AuthGuard,
                OwnershipGuard({
                    findResource: findDeliverer,
                    ownerKey: 'id',
                }),
            ],
            itemDeleteGuards: [AuthGuard, RolesGuard([ROLE.admin])],
        })
    )
    return router
}

module.exports = DelivererRouter
