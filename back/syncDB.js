const db = require('./db')
require('./models/Address')
require('./models/Complaint')
require('./models/Deliverer')
require('./models/Order')
require('./models/Rating')
require('./models/User')

db.sequelize
    .sync({ force: true })
    .then(() => {
        db.sequelize.close()
    })
    .then(() => {
        console.log('[Sequelize]: Database synced')
    })
