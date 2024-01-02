const { Model, DataTypes } = require('sequelize')

module.exports = function (connection) {
    class Complaint extends Model {
        static associate(db) {
            Complaint.belongsTo(db.User, {
                as: 'user',
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                },
            })
            Complaint.belongsTo(db.Order, {
                as: 'order',
                foreignKey: {
                    name: 'orderId',
                    allowNull: false,
                },
            })
        }

        static addHooks(db) {}
    }

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
            sequelize: connection,
            tableName: 'complaint',
        }
    )

    return Complaint
}
