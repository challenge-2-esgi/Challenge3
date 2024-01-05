const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const { Rating } = require('../models')
const MongoRating = require('../mongo-models/Rating')
const RolesGuard = require('../middlewares/roles-guard')
const { ROLE } = require('../constants')
const OwnershipGuard = require('../middlewares/ownership-guard')
const { isClient } = require('../utils/authorization')
const Validator = require('../middlewares/validator')
const validators = require('../validators')

function RatingRouter() {
    const router = new Router()

    async function findRating(req) {
        return await Rating.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/ratings',
        AuthGuard,
        CRUDRouter({
            model: Rating,
            mongoModel: MongoRating,
            collectionMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.client, ROLE.admin]),
                (req, res, next) => {
                    if (isClient(req.user)) {
                        req.query = {
                            ['client.id']: req.user.id,
                        }
                    }
                    next()
                },
            ],
            itemCreateMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client]),
                Validator(validators.createRating),
            ],
            itemReadMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client, ROLE.deliverer]),
            ],
            itemUpdateMiddlewares: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findRating,
                    ownerKey: 'clientId',
                    includeAdmin: true,
                }),
                Validator(validators.updateRating),
            ],
            itemDeleteGuards: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findRating,
                    ownerKey: 'clientId',
                    includeAdmin: true,
                }),
            ],
        })
    )

    return router
}

module.exports = RatingRouter
