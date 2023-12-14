const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const User = require('./User')
const Order = require('./Order')

class Complaint extends Model {}

Complaint.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'complaint',
    }
)

Complaint.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
})
Complaint.belongsTo(Order, {
    as: 'order',
    foreignKey: {
        name: 'orderId',
        allowNull: false,
    },
})

module.exports = Complaint
