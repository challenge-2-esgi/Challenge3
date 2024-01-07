const { Model, DataTypes } = require('sequelize')
const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')
const mongoUserDto = require('../mongo-models/dtos/user-dto')
const operations = require('../mongo-models/dtos/operations')

module.exports = function (connection) {
    class Deliverer extends Model {
        static associate(db) {
            Deliverer.belongsTo(db.User, {
                as: 'user',
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            })
            db.User.hasOne(Deliverer, {
                as: 'deliverer',
                foreignKey: { name: 'userId', allowNull: false },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            })
        }

        static addHooks(db) {
            Deliverer.addHook('afterUpdate', async (deliverer, { fields }) => {
                const user = await deliverer.getUser()
                mongoUserDto(user.id, db.User, operations.update)

                if (
                    fields.includes('latitude') ||
                    fields.includes('longitude')
                ) {
                    sseChannel.publish(
                        {
                            delivererId: deliverer.id,
                            latitude: deliverer.latitude,
                            longitude: deliverer.longitude,
                        },
                        sseEvent.delivererLocation
                    )

                    sseChannel.publish(
                        {
                            delivererId: deliverer.id,
                            latitude: deliverer.latitude,
                            longitude: deliverer.longitude,
                        },
                        sseEvent.orderLocation
                    )
                }
            })

            Deliverer.addHook('afterDestroy', async (deliverer) => {
                const user = await deliverer.getUser()
                mongoUserDto(user.id, db.User, operations.delete)
            })
        }

        toJSON() {
            const attributes = Object.assign({}, this.get())
            if (attributes.user != null) {
                delete attributes.user['password']
            }

            return attributes
        }
    }

    Deliverer.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            latitude: DataTypes.DECIMAL(8, 6),
            longitude: DataTypes.DECIMAL(9, 6),
        },
        {
            sequelize: connection,
            tableName: 'deliverer',
        }
    )

    return Deliverer
}
