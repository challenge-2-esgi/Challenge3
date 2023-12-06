const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const User = require('./User')
const sseChannel = require('../sse/channel')
const sseEvent = require('../sse/events')

class Deliverer extends Model {}

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
        sequelize: db.sequelize,
        tableName: 'deliverer',
    }
)

Deliverer.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})

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

module.exports = Deliverer
