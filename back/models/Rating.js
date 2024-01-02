const { Model, DataTypes } = require('sequelize')

module.exports = function (connection) {
    class Rating extends Model {
        static associate(db) {
            Rating.belongsTo(db.User, {
                as: 'client',
                foreignKey: 'clientId',
            })
            db.User.hasMany(Rating, { as: 'ratings', foreignKey: 'clientId' })

            Rating.belongsTo(db.Deliverer, {
                as: 'deliverer',
                foreignKey: {
                    name: 'delivererId',
                    allowNull: true,
                },
            })
            db.Deliverer.hasMany(Rating, {
                as: 'ratings',
                foreignKey: {
                    name: 'delivererId',
                    allowNull: true,
                },
            })
        }

        static addHooks(db) {}
    }

    Rating.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: 'rating',
        }
    )

    return Rating
}
