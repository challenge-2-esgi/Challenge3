const { connection } = require('./models')

connection
    .sync({ force: true })
    .then(() => {
        connection.close()
    })
    .then(() => {
        console.log('[Sequelize]: Database synced')
    })
