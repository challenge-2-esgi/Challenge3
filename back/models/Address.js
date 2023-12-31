const { Model, DataTypes } = require('sequelize')

module.exports = function (connection) {
    class Address extends Model {}

    Address.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            streetNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            street: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            zipCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            latitude: DataTypes.DECIMAL(8, 6),
            longitude: DataTypes.DECIMAL(9, 6),
        },
        {
            sequelize: connection,
            tableName: 'address',
        }
    )

    return Address
}
