const { Router } = require('express')

const CRUDRouter = require('./item-router')
const { User, Deliverer, Order } = require('../models')

const { ROLE } = require('../constants')
const validators = require('../validators')

const AuthGuard = require('../middlewares/auth-guard')
const LoggedInUser = require('../middlewares/logged-in-user')
const RolesGuard = require('../middlewares/roles-guard')
const OwnershipGuard = require('../middlewares/ownership-guard')
const Validator = require('../middlewares/validator')
const { isAdmin, isClient } = require('../utils/authorization')

function UserRouter() {
    const router = new Router()

    async function findUser(req) {
        return await User.findOne({
            where: { id: req.params.id },
        })
    }

    router.get('/users/current', AuthGuard, async (req, res) => {
        const user = req.user

        res.status(200).json(user)
    })
    router.get(
        '/users/current/orders',
        AuthGuard,
        RolesGuard([ROLE.client, ROLE.deliverer]),
        async (req, res) => {
            const query = {
                ...(isClient(req.user)
                    ? { clientId: req.user.id }
                    : { delivererId: req.user.deliverer.id }),
            }

            const orders = await Order.findAll({
                where: query,
                include: [
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
            })

            res.json(orders)
        }
    )

    router.post('/users/update-availability', AuthGuard, async (req, res) => {
        console.log(req.body)
        const deliverer = await Deliverer.findOne({
            where: { userId: req.user.id },
        })

        const updateDeliverer = await Deliverer.update(
            {
                isActive: req.body.isActive,
            },
            {
                where: { id: deliverer.id },
            }
        )

        res.status(200).json(updateDeliverer)
    })

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
