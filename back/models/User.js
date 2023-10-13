const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const { ROLE } = require('../constants')

class User extends Model {}

User.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true },
        firstname: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(Object.values(ROLE)),
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'user',
    }
)
module.exports = User
