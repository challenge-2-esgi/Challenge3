const { Model, DataTypes } = require('sequelize')
const { COMPLAINT_STATUS } = require('../constants')

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
            db.User.hasMany(Complaint, {
                as: 'complaints',
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
            status: {
                type: COMPLAINT_STATUS,
                allowNull: false,
                defaultValue: COMPLAINT_STATUS.pending,
            },
        },
        {
            sequelize: connection,
            tableName: 'complaint',
        }
    )

    return Complaint
}
