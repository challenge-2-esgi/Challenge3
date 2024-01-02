const { Model, DataTypes } = require('sequelize')
const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')

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
        }

        static addHooks(db) {}

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

    Deliverer.addHook('afterUpdate', (instance, { fields }) => {
        if (fields.includes('latitude') || fields.includes('longitude')) {
            sseChannel.publish(
                {
                    delivererId: instance.id,
                    latitude: instance.latitude,
                    longitude: instance.longitude,
                },
                sseEvent.delivererLocation
            )

            sseChannel.publish(
                {
                    delivererId: instance.id,
                    latitude: instance.latitude,
                    longitude: instance.longitude,
                },
                sseEvent.orderLocation
            )
        }
    })

    return Deliverer
}
