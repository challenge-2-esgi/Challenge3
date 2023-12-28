const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const { ORDER_STATUS } = require('../constants')
const User = require('./User')
const Deliverer = require('./Deliverer')
const Address = require('./Address')
const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')

class Order extends Model {}

Order.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isDelivered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        pickupTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deliverTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        validationCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        distance: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(Object.values(ORDER_STATUS)),
            defaultValue: ORDER_STATUS.waitingForPickup,
        },
        receiverFirstname: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        receiverLastname: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        receiverEmail: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        receiverPhone: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'order',
    }
)

Order.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'clientId',
        allowNull: false,
    },
})
Order.belongsTo(Deliverer, {
    as: 'deliverer',
    foreignKey: {
        name: 'delivererId',
        allowNull: true,
    },
})
Order.belongsTo(Address, {
    as: 'pickupAddress',
    foreignKey: {
        name: 'pickupAddressId',
        allowNull: false,
    },
})
Order.belongsTo(Address, {
    as: 'deliveryAddress',
    foreignKey: {
        name: 'deliveryAddressId',
        allowNull: false,
    },
})

Order.addHook('afterUpdate', (instance, { fields }) => {
    if (fields.includes('status')) {
        sseChannel.publish(
            { orderId: instance.id, status: instance.status },
            sseEvent.orderStatus
        )
    }
})

module.exports = Order
