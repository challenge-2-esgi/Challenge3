const db = require('./db')
require('./models/User')

db.sequelize
    .sync({ force: true })
    .then(() => {
        db.sequelize.close()
    })
    .then(() => {
        console.log('[Sequelize]: Database synced')
    })
