const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const User = require('./User')
const Deliverer = require('./Deliverer')

class Rating extends Model {}

Rating.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'rating',
    }
)

Rating.belongsTo(User, {
    as: 'client',
    foreignKey: 'clientId',
})
Rating.belongsTo(Deliverer, {
    as: 'deliverer',
    foreignKey: 'delivererId',
})

module.exports = Rating
