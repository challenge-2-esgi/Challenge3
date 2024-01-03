const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const { Rating } = require('../models')
const MongoRating = require('../mongo-models/Rating')
const RolesGuard = require('../middlewares/roles-guard')
const { ROLE } = require('../constants')
const OwnershipGuard = require('../middlewares/ownership-guard')

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
            ],
            itemCreateMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.client]),
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
