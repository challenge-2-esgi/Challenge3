const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const { ORDER_STATUS } = require('../constants')
const User = require('./User')
const Deliverer = require('./Deliverer')
const Address = require('./Address')

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
        pickupTime: DataTypes.DATE,
        deliverTime: DataTypes.DATE,
        validationCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        distance: {
            type: DataTypes.FLOAT,
            allowNull: null,
        },
        status: {
            type: DataTypes.ENUM(Object.values(ORDER_STATUS)),
            defaultValue: ORDER_STATUS.waitingForPickup,
        },
        recieverEmail: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recieverPhone: {
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
        allowNull: false,
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

module.exports = Order