const { Model, DataTypes } = require('sequelize')
const { ORDER_STATUS } = require('../constants')
const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')

module.exports = function (connection) {
    class Order extends Model {
        static associate(db) {
            Order.belongsTo(db.User, {
                as: 'user',
                foreignKey: {
                    name: 'clientId',
                    allowNull: false,
                },
            })
            Order.belongsTo(db.Deliverer, {
                as: 'deliverer',
                foreignKey: {
                    name: 'delivererId',
                    allowNull: true,
                },
            })
            Order.belongsTo(db.Address, {
                as: 'pickupAddress',
                foreignKey: {
                    name: 'pickupAddressId',
                    allowNull: false,
                },
            })
            Order.belongsTo(db.Address, {
                as: 'deliveryAddress',
                foreignKey: {
                    name: 'deliveryAddressId',
                    allowNull: false,
                },
            })
        }

        static addHooks(db) {}
    }

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
                defaultValue: ORDER_STATUS.waitingForDeliverer,
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
            sequelize: connection,
            tableName: 'order',
        }
    )

    Order.addHook('afterCreate', async (order) => {
        const user = await order.getUser()
        sseChannel.publish(
            {
                id: order.id,
                distance: order.distance,
                status: order.status,
                receiverFirstname: order.receiverFirstname,
                receiverLastname: order.receiverLastname,
                receiverEmail: order.receiverEmail,
                receiverPhone: order.receiverPhone,
                pickupAddress: order.pickupAddress,
                deliveryAddress: order.deliveryAddress,
                createdAt: order.createdAt,
                user: user,
                deliverer: null,
            },
            sseEvent.newOrder
        )
    })

    Order.addHook('afterUpdate', (instance, { fields }) => {
        if (fields.includes('status')) {
            sseChannel.publish(
                { orderId: instance.id, status: instance.status },
                sseEvent.orderStatus
            )
        }
    })

    return Order
}
