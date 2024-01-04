const { Router } = require('express')

const { Order } = require('../models')

const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')
const { Subscriber, OrderSubscriber } = require('../sse/subscribers')

const AuthGuard = require('../middlewares/auth-guard')
const RolesGuard = require('../middlewares/roles-guard')
const OwnershipGuard = require('../middlewares/ownership-guard')
const NotDeliveringGuard = require('../middlewares/not-delivering-guard')

const { ROLE } = require('../constants')

function NotificationRouter() {
    const router = new Router()

    function findOrder(req) {
        return Order.findByPk(req.query.orderId)
    }

    router.get(
        '/notifications/deliverer-location',
        AuthGuard,
        RolesGuard([ROLE.admin]),
        (req, res) => {
            sseChannel.subscribe(
                new Subscriber(req.user.id, sseEvent.delivererLocation, res)
            )
        }
    )

    router.get(
        '/notifications/order-location',
        AuthGuard,
        (req, res, next) => {
            if (!req.query.orderId) {
                return res.sendStatus(400)
            }
            next()
        },
        OwnershipGuard({
            findResource: findOrder,
            ownerKey: 'clientId',
            passResource: true,
        }),
        (req, res) => {
            sseChannel.subscribe(
                new OrderSubscriber(
                    req.user.id,
                    sseEvent.orderLocation,
                    res,
                    res.locals.resource
                )
            )
        }
    )

    router.get(
        '/notifications/order-status',
        AuthGuard,
        (req, res, next) => {
            if (!req.query.orderId) {
                return res.sendStatus(400)
            }
            next()
        },
        OwnershipGuard({
            findResource: findOrder,
            ownerKey: 'clientId',
            passResource: true,
        }),
        (req, res) => {
            sseChannel.subscribe(
                new OrderSubscriber(
                    req.user.id,
                    sseEvent.orderStatus,
                    res,
                    res.locals.resource
                )
            )
        }
    )

    router.get(
        '/notifications/new-order',
        AuthGuard,
        RolesGuard([ROLE.deliverer]),
        NotDeliveringGuard,
        (req, res) => {
            sseChannel.subscribe(
                new Subscriber(req.user.deliverer.id, sseEvent.newOrder, res)
            )
        }
    )

    return router
}

module.exports = NotificationRouter
