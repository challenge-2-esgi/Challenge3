const { Router } = require('express')

const CRUDRouter = require('./item-router')

const User = require('../models/User')
const { ROLE } = require('../constants')
const validators = require('../validators')

const AuthGuard = require('../middlewares/auth-guard')
const LoggedInUser = require('../middlewares/logged-in-user')
const RolesGuard = require('../middlewares/roles-guard')
const OwnershipGuard = require('../middlewares/ownership-guard')
const Validator = require('../middlewares/validator')
const { isAdmin } = require('../utils/authorization')

function UserRouter() {
    const router = new Router()

    async function findUser(req) {
        return await User.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/users',
        CRUDRouter({
            model: User,
            collectionMiddlewares: [AuthGuard, RolesGuard([ROLE.admin])],
            itemCreateMiddlewares: [
                Validator(validators.createUser),
                LoggedInUser,
                // only admin can create support
                (req, res, next) => {
                    if (req.user == null && req.body['role'] === ROLE.support) {
                        return res.sendStatus(401)
                    }

                    if (
                        !isAdmin(req.user) &&
                        req.body['role'] === ROLE.support
                    ) {
                        return res.sendStatus(403)
                    }

                    next()
                },
            ],
            itemReadMiddlewares: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findUser,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
            itemUpdateMiddlewares: [
                Validator(validators.updateUser),
                AuthGuard,
                OwnershipGuard({
                    findResource: findUser,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
            itemDeleteGuards: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findUser,
                    ownerKey: 'id',
                    includeAdmin: true,
                }),
            ],
        })
    )

    return router
}

module.exports = UserRouter
