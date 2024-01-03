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
const Complaint = require('../models/Complaint')
const User = require('../models/User')

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
            collectionMiddlewares: [AuthGuard, RolesGuard([ROLE.admin, ROLE.support])],
            itemCreateMiddlewares: [
                Validator(validators.createComplaint),
                LoggedInUser,
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
        })
    )
    return router
}

module.exports = ComplaintRouter
