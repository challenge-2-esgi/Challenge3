const { Model, DataTypes } = require('sequelize')
const ratingDto = require('../mongo-models/dtos/rating-dto')
const operations = require('../mongo-models/dtos/operations')

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

            Rating.belongsTo(db.Order, {
                as: 'order',
                foreignKey: { name: 'orderId', allowNull: true },
            })
        }

        static addHooks(db) {
            Rating.addHook('afterCreate', (rating) => {
                ratingDto(rating.id, db.Rating)
            })

            Rating.addHook('afterUpdate', (rating) => {
                ratingDto(rating.id, db.Rating, operations.update)
            })

            Rating.addHook('afterDestroy', (rating) => {
                ratingDto(rating.id, db.Rating, operations.delete)
            })
        }
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
