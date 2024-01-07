const { Router } = require('express')
const AuthGuard = require('../middlewares/auth-guard')
const CRUDRouter = require('./item-router')
const { ROLE, ORDER_STATUS } = require('../constants')
const validators = require('../validators')
const RolesGuard = require('../middlewares/roles-guard')
const Validator = require('../middlewares/validator')
const OwnershipGuard = require('../middlewares/ownership-guard')
const { uuidv7 } = require('uuidv7')
const { Complaint, Order } = require('../models')
const MongoComplaint = require('../mongo-models/Complaint')

function ComplaintRouter() {
    const router = new Router()

    async function findComplaint(req) {
        return await Complaint.findOne({
            where: { id: req.params.id },
        })
    }

    router.use(
        '/complaints',
        CRUDRouter({
            model: Complaint,
            mongoModel: MongoComplaint,
            collectionMiddlewares: [
                AuthGuard,
                RolesGuard([ROLE.admin, ROLE.support]),
            ],
            itemCreateMiddlewares: [
                AuthGuard,
                Validator(validators.createComplaint),
                async (req, res, next) => {
                    const order = await Order.findByPk(req.body['orderId'], {
                        include: ['complaint'],
                    })

                    if (!order) {
                        return res.sendStatus(400)
                    }

                    if (
                        ![
                            ORDER_STATUS.delivered,
                            ORDER_STATUS.cancelled,
                        ].includes(order.status)
                    ) {
                        return res.sendStatus(400)
                    }

                    if (order.complaint) {
                        return res.sendStatus(400)
                    }

                    next()
                },
                async (req, res, next) => {
                    req.body = {
                        id: uuidv7(),
                        subject: req.body['subject'],
                        content: req.body['content'],
                        userId: req.user.id,
                        orderId: req.body['orderId'],
                    }

                    next()
                },
            ],
            itemReadMiddlewares: [
                AuthGuard,
                OwnershipGuard({
                    findResource: findComplaint,
                    ownerKey: 'userId',
                    includeAdmin: true,
                    includeSupport: true,
                }),
            ],
            itemUpdateMiddlewares: [
                Validator(validators.updateComplaint),
                AuthGuard,
                OwnershipGuard({
                    findResource: findComplaint,
                    ownerKey: 'userId',
                    includeAdmin: true,
                    includeSupport: true,
                }),
            ],
            itemDeleteGuards: [AuthGuard, RolesGuard([ROLE.admin])],
        })
    )
    return router
}

module.exports = ComplaintRouter
