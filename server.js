const config = require('./config/app-config')
const db = require('./db')
const app = require('./app')
const { io } = require("./socket");

const init = async () => {
    await db.open()
    app.listen(config.port, () => {
        console.log(`app listening on port ${config.port}`)
    })

    io.listen(9000);
}

init()
process.on('SIGINT', () => {
    db.close()
    process.exit(0)
})
