const { Model, DataTypes } = require('sequelize')
const { ROLE } = require('../constants')
const hasher = require('../services/hasher')
const mongoUserDto = require('../mongo-models/dtos/user-dto')
const operations = require('../mongo-models/dtos/operations')

module.exports = function (connection) {
    class User extends Model {
        static associate(db) {}

        static addHooks(db) {
            User.addHook('afterCreate', (user) => {
                mongoUserDto(user.id, db.User)
            })

            User.addHook('afterUpdate', (user) => {
                mongoUserDto(user.id, db.User, operations.update)
            })

            User.addHook('afterDestroy', (user) => {
                mongoUserDto(user.id, db.User, operations.delete)
            })
        }

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
            validationCode: {
                type: DataTypes.STRING(25),
                allowNull: true,
            },
        },
        {
            sequelize: connection,
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

    return User
}
