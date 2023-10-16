const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const User = require('./User')

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

module.exports = Deliverer
