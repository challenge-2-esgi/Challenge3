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
const { uuidv7 } = require('uuidv7')
const LoggedInUser = require('../middlewares/logged-in-user')

function DelivererRouter() {
    const router = new Router()

    async function findDeliverer(req) {
        return await Deliverer.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/deliverers',
        CRUDRouter({
            model: Deliverer,
            collectionMiddlewares: [AuthGuard, RolesGuard([ROLE.admin])],
            itemCreateMiddlewares: [
                Validator(validators.createDeliverer),
                LoggedInUser,
                (req, res, next) => {
                    if (req.user != null) {
                        return res.sendStatus(403)
                    }

                    next()
                },
                (req, res, next) => {
                    req.body = {
                        user: {
                            id: uuidv7(),
                            firstname: req.body['firstname'],
                            lastname: req.body['lastname'],
                            email: req.body['email'],
                            password: req.body['password'],
                            role: req.body['role'],
                        },
                        phone: req.body['phone'],
                        isActive: true,
                    }

                    next()
                },
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
                    ownerKey: 'userId',
                }),
            ],
            itemDeleteGuards: [AuthGuard, RolesGuard([ROLE.admin])],
            includeCollectionModels: [
                {
                    all: true,
                    nested: true,
                },
            ],
            includeReadModels: [
                {
                    all: true,
                    nested: true,
                },
            ],
            includeCreateModels: [
                {
                    association: 'user',
                },
            ],
        })
    )
    return router
}

module.exports = DelivererRouter
