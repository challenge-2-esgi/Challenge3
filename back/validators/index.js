const login = require('./login.validator')
const createUser = require('./create.user.validator')
const updateUser = require('./update.user.validator')
const createOrder = require('./create.order.validator')
const updateOrder = require('./update.order.validator')
const updateDeliverer = require('./update.deliverer.validator')
const createDeliverer = require('./create.deliverer.validator')

module.exports = {
    login,
    createUser,
    updateUser,
    createOrder,
    updateOrder,
    updateDeliverer,
    createDeliverer,
}
