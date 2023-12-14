const { Model, DataTypes } = require('sequelize')
const db = require('../db')
const { ROLE } = require('../constants')
const hasher = require('../services/hasher')

class User extends Model {
    toJSON() {
        const attributes = Object.assign({}, this.get())
        delete attributes['password']
        return attributes
    }
}

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
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
    }
)

User.addHook('beforeCreate', async function (user) {
    user.password = await hasher.hash(user.password)
})

User.addHook('beforeUpdate', async function (user, { fields }) {
    if (fields.includes('password')) {
        user.password = await hasher.hash(user.password)
    }
})

module.exports = User
