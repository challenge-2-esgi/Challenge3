const { Model, DataTypes } = require('sequelize')
const mongoMessageDto = require('../mongo-models/dtos/message-dto')


module.exports = function (connection) {
    class Message extends Model {
        static associate(db) {
            Message.belongsTo(db.User, {
                as: 'sender',
                foreignKey: {
                    name: 'senderId',
                    allowNull: false,
                },
            })
    
            Message.belongsTo(db.User, {
                as: 'receiver',
                foreignKey: {
                    name: 'receiverId',
                    allowNull: false,
                },
            })
    
            Message.belongsTo(db.Order, {
                as: 'order',
                foreignKey: {
                    name: 'orderId',
                    allowNull: false,
                },
            })    
        }

        static addHooks(db) {
            Message.addHook('afterCreate', async (message) => {
                mongoMessageDto(message.id, db.Message)
            })

            Message.addHook('afterUpdate', async (message) => {
                mongoMessageDto(message.id, db.Message)
            })
        }
    }


        Message.init(
            {
                id: { type: DataTypes.UUID, primaryKey: true },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize: connection,
                tableName: 'message',
            }
        )

        return Message
}