const bcrypt = require('bcrypt')

const ROUND = 10

function generateSalt() {
    return bcrypt.genSalt(ROUND)
}

async function compare(plain, hash) {
    return await bcrypt.compare(plain, hash)
}

async function hash(data) {
    return bcrypt.hash(data, await generateSalt())
}

module.exports = {
    compare,
    hash,
}
