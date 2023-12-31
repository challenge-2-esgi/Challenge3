const { Router } = require('express')
const { uuidv7 } = require('uuidv7')
const ValidationError = require('../errors/ValidationError')

function ItemRouter({
    model: Model,
    mongoModel: MongoModel,
    allowedMethods = ['findAll', 'create', 'findOne', 'update', 'delete'],
    // middlewares order is important
    collectionMiddlewares = [],
    itemCreateMiddlewares = [],
    itemReadMiddlewares = [],
    itemUpdateMiddlewares = [],
    itemDeleteGuards = [],
    includeCreateModels = [],
}) {
    const router = new Router()

    if (allowedMethods.includes('findAll')) {
        router.get('/', ...collectionMiddlewares, async function (req, res) {
            const items = await MongoModel.find({ ...req.query })
            res.json(items)
        })
    }

    if (allowedMethods.includes('create')) {
        router.post(
            '/',
            ...itemCreateMiddlewares,
            async function (req, res, next) {
                try {
                    const id = uuidv7()
                    const item = await Model.create(
                        { id, ...req.body },
                        {
                            include: includeCreateModels,
                        }
                    )
                    res.status(201).json(item)
                } catch (error) {
                    if (error.name === 'SequelizeValidationError') {
                        error = ValidationError.fromSequelize(error)
                    }
                    next(error)
                }
            }
        )
    }

    if (allowedMethods.includes('findOne')) {
        router.get(
            '/:id',
            ...itemReadMiddlewares,
            async function (req, res, next) {
                try {
                    const item = await MongoModel.findOne({
                        _id: req.params.id,
                    })
                    if (item) {
                        res.json(item)
                    } else {
                        res.sendStatus(404)
                    }
                } catch (error) {
                    next(error)
                }
            }
        )
    }

    // router.put('/:id', async function (req, res, next) {
    //     try {
    //         const id = req.params.id
    //         const nbDeleted = await Model.destroy({ where: { id } })
    //         const item = await Model.create({ id, ...req.body })
    //         res.status(nbDeleted ? 200 : 201).json(item)
    //     } catch (error) {
    //         if (error.name === 'SequelizeValidationError') {
    //             error = ValidationError.fromSequelize(error)
    //         }
    //         next(error)
    //     }
    // })

    if (allowedMethods.includes('update')) {
        router.patch(
            '/:id',
            ...itemUpdateMiddlewares,
            async function (req, res, next) {
                try {
                    const id = req.params.id
                    const [_, items] = await Model.update(req.body, {
                        where: { id },
                        returning: true,
                        individualHooks: true,
                    })
                    if (!items.length) {
                        res.sendStatus(404)
                    } else {
                        res.json(items[0])
                    }
                } catch (error) {
                    if (error.name === 'SequelizeValidationError') {
                        error = ValidationError.fromSequelize(error)
                    }
                    next(error)
                }
            }
        )
    }

    if (allowedMethods.includes('delete')) {
        router.delete(
            '/:id',
            ...itemDeleteGuards,
            async function (req, res, next) {
                try {
                    const nbDeleted = await Model.destroy({
                        where: {
                            id: req.params.id,
                        },
                        individualHooks: true,
                    })
                    res.sendStatus(nbDeleted ? 204 : 404)
                } catch (error) {
                    next(error)
                }
            }
        )
    }

    return router
}

module.exports = ItemRouter
