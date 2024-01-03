const { Op } = require('sequelize')
const mongoose = require('mongoose')

const appConfig = require('./config/app-config')

const { Order, User, Complaint, Rating } = require('./models')
const MongoUser = require('./mongo-models/User')
const MongoOrder = require('./mongo-models/Order')
const MongoRating = require('./mongo-models/Rating')
const MongoComplaint = require('./mongo-models/Complaint')

const { ROLE } = require('./constants')

async function insertUsers() {
    const users = await User.findAll({
        where: { role: { [Op.ne]: ROLE.deliverer } },
        include: { all: true },
        logging: false,
    })

    const deliverers = await User.findAll({
        where: { role: ROLE.deliverer },
        include: {
            association: 'deliverer',
        },
        logging: false,
    })

    await MongoUser.insertMany(
        users.map((user) => ({
            _id: user.id,
            ...user.dataValues,
        }))
    )

    await MongoUser.insertMany(
        deliverers.map((user) => ({
            _id: user.id,
            ...user.dataValues,
            delivererId: user.deliverer.id,
            ...user.deliverer.dataValues,
        }))
    )
}

async function insertOrders() {
    const orders = await Order.findAll({
        include: {
            all: true,
            nested: true,
        },
        logging: false,
    })

    await MongoOrder.insertMany(
        orders.map((order) => ({
            _id: order.id,
            ...order.dataValues,
            pickupAddress: order.pickupAddress.dataValues,
            deliveryAddress: order.deliveryAddress.dataValues,
            user: order.user.dataValues,
            deliverer:
                order.deliverer == null
                    ? null
                    : {
                          id: order.deliverer.id,
                          ...order.deliverer.user.dataValues,
                          ...order.deliverer.dataValues,
                      },
        }))
    )
}

async function insertComplaints() {
    const complaints = await Complaint.findAll({
        include: { all: true, nested: true },
        logging: false,
    })

    await MongoComplaint.insertMany(
        complaints.map((complaint) => ({
            ...complaint.dataValues,
            user: complaint.user.dataValues,
            order: complaint.order.dataValues,
        }))
    )
}

async function insertRatings() {
    const ratings = await Rating.findAll({
        include: { all: true, nested: true },
        logging: false,
    })

    await MongoRating.insertMany(
        ratings.map((rating) => ({
            ...rating.dataValues,
            client: rating.client.dataValues,
            deliverer: {
                ...rating.deliverer.dataValues,
                ...rating.deliverer.user.dataValues,
            },
        }))
    )
}

async function resetDB() {
    await MongoUser.deleteMany()
    await MongoOrder.deleteMany()
    await MongoComplaint.deleteMany()
    await MongoRating.deleteMany()
}

async function main() {
    await mongoose.connect(appConfig.mongoUrl)
    await resetDB()
    await insertUsers()
    await insertOrders()
    await insertComplaints()
    await insertRatings()
}

main()
    .then(() => {
        console.log('mongo seed succeeded')
    })
    .catch((e) => {
        console.log('mongo seed failed\n', e)
    })
    .finally(() => {
        mongoose.disconnect().then(() => process.exit(0))
    })
